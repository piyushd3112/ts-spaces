import fs from 'node:fs/promises';
import { chromium } from '@playwright/test';
import prettier from 'prettier';

// One-time conversion: retain the exact rendered markup and compiled stylesheet.
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage();
await fs.mkdir('php/pages', { recursive: true });
await fs.mkdir('public/assets', { recursive: true });
const routes = ['', 'about', 'services', 'facilities', 'faq', 'contact', 'privacy', 'terms', '404'];
for (const route of routes) {
  await page.goto('http://127.0.0.1:3000/' + route, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => !!document.title);
  const result = await page.evaluate(() => {
    const cssUrl = document.querySelector('link[rel="stylesheet"]').href;
    document.querySelectorAll('script:not([type="application/ld+json"]),link[rel="preload"],nextjs-portal').forEach(e => e.remove());
    document.querySelectorAll('img').forEach(img => {
      if (img.getAttribute('src')?.startsWith('/_next/image')) {
        img.src = new URL(img.src).searchParams.get('url');
        img.removeAttribute('srcset');
      }
    });
    document.querySelectorAll('link[rel="stylesheet"]').forEach(e => { e.href = '/assets/site.css'; e.removeAttribute('data-precedence'); });
    document.querySelectorAll('link[rel="icon"]').forEach(e => e.href = '/icon.svg');
    const main = document.querySelector('main');
    const metadata = [...document.querySelectorAll('title,meta,link[rel="canonical"]')].map(e => e.outerHTML).join('\n');
    document.querySelectorAll('main title,main meta,main link[rel="canonical"]').forEach(e => e.remove());
    return { cssUrl, metadata, main: main.innerHTML, header: document.querySelector('header').outerHTML, footer: document.querySelector('footer').outerHTML };
  });
  if (!route) {
    const css = await (await fetch(result.cssUrl)).text();
    await fs.writeFile('public/assets/site.css', css);
    let header = result.header.replace(/ aria-current="page"/g, '');
    header = header.replace(/<a href="([^"]+)"/g, (all, href) => `<a href="${href}"<?php if ($path === '${href}') echo ' aria-current="page"'; ?>`);
    await fs.writeFile('php/header.php', header);
    await fs.writeFile('php/footer.php', result.footer.replace(/© <!-- -->\d{4}<!-- -->/, '© <?= date("Y") ?>'));
  }
  let main = await prettier.format(result.main, { parser: 'html' });
  if (route === 'contact') {
    main = main.replace(/<div class="notice" role="status">[\s\S]*?<\/div>/, '<?php if (!$inquiryEnabled): ?>$&<?php endif; ?>');
    main = main.replace('disabled=""', '<?php if (!$inquiryEnabled) echo \'disabled\'; ?>');
  }
  await fs.writeFile(`php/pages/${route || 'home'}.php`, main);
  await fs.writeFile(`php/pages/${route || 'home'}.head.php`, result.metadata.replace(/http:\/\/localhost:3000/g, '<?= htmlspecialchars($siteUrl, ENT_QUOTES, "UTF-8") ?>'));
}
await fs.copyFile('app/icon.svg', 'public/assets/icon.svg');
await browser.close();
