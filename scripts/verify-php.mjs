import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const original = await browser.newPage();
const converted = await browser.newPage();
for (const page of [original, converted]) {
  await page.route(/https:\/\/maps\.google\.com\//, route => route.abort());
}
const routes = ['', 'about', 'services', 'facilities', 'faq', 'contact', 'privacy', 'terms'];
let checked = 0;
try {
  for (const width of [320, 375, 430, 768, 1024, 1280, 1440]) {
    for (const page of [original, converted]) await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const [before, after] = await Promise.all([
        original.goto('http://127.0.0.1:3000/' + route, { waitUntil: 'domcontentloaded' }),
        converted.goto('http://127.0.0.1:8080/' + route, { waitUntil: 'domcontentloaded' }),
      ]);
      assert.equal(after.status(), before.status());
      await original.waitForFunction(() => !!document.title);
      assert.equal(await converted.title(), await original.title());
      const describe = page => page.evaluate(() => ({
        text: document.querySelector('main').innerText.replace(/\s+/g, ' ').trim(),
        overflow: document.documentElement.scrollWidth > innerWidth,
        links: [...document.querySelectorAll('main a')].map(a => a.getAttribute('href')),
        headings: [...document.querySelectorAll('h1,h2,h3')].map(e => ({
          text: e.textContent.replace(/\s+/g, ' ').trim(),
          top: Math.round(e.getBoundingClientRect().top),
          height: Math.round(e.getBoundingClientRect().height),
        })),
      }));
      const [a, b] = await Promise.all([describe(original), describe(converted)]);
      assert.equal(b.overflow, false, `${route} at ${width}: overflow`);
      assert.equal(b.text.replace(/\s/g, ''), a.text.replace(/\s/g, ''), `${route}: text changed`);
      assert.deepEqual(b.links, a.links, `${route}: links changed`);
      assert.deepEqual(b.headings, a.headings, `${route} at ${width}: layout changed`);
      for (const img of await converted.locator('img').all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(img => img.decode());
      }
      checked++;
    }
    console.log(`Compared all eight pages at ${width}px.`);
  }
  await converted.setViewportSize({ width: 375, height: 812 });
  await converted.goto('http://127.0.0.1:8080/');
  await converted.getByRole('button', { name: 'Open menu' }).click();
  assert.equal(await converted.locator('.menu-button').getAttribute('aria-expanded'), 'true');
  await converted.keyboard.press('Escape');
  assert.equal(await converted.locator('.menu-button').getAttribute('aria-expanded'), 'false');
  await converted.goto('http://127.0.0.1:8080/faq');
  await converted.locator('summary').first().click();
  assert.equal(await converted.locator('details').first().getAttribute('open'), '');
  await converted.goto('http://127.0.0.1:8080/contact?workspace=Dedicated%20Desk');
  assert.equal(await converted.locator('#workspace').inputValue(), 'Dedicated Desk');
  assert.equal(await converted.locator('.inquiry-form button').isDisabled(), true);
  const valid = { name: 'Test User', email: 'test@example.com', phone: '9876543210', workspace: 'Dedicated Desk', date: '', message: 'Test' };
  const post = async data => (await fetch('http://127.0.0.1:8080/api/inquiry', { method: 'POST', body: JSON.stringify(data) })).status;
  assert.equal(await post({}), 400);
  assert.equal(await post(valid), 503);
  assert.equal(await post({ ...valid, date: '2999-02-31' }), 400);
  assert.equal(await post({ ...valid, website: 'spam' }), 400);
  assert.equal((await fetch('http://127.0.0.1:8080/api/inquiry', { method: 'POST', body: '{}', headers: { Origin: 'https://other.example' } })).status, 403);
  assert.equal((await fetch('http://127.0.0.1:8080/api/inquiry', { method: 'POST', body: 'x'.repeat(17000) })).status, 413);
  assert.equal((await fetch('http://127.0.0.1:8080/missing')).status, 404);
  assert.match(await (await fetch('http://127.0.0.1:8080/sitemap.xml')).text(), /<urlset/);
  assert.match(await (await fetch('http://127.0.0.1:8080/robots.txt')).text(), /Disallow: \/api\//);
  console.log(`Passed: ${checked} page/viewport comparisons, images, menu, FAQ, prefill, API validation, 404, sitemap and robots.`);
} finally {
  await browser.close();
}
