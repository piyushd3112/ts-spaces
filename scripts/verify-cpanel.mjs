import assert from 'node:assert/strict';

// Start: php -S 127.0.0.1:8082 -t dist/cpanel router.php
const base = 'http://127.0.0.1:8082';
for (const route of ['/', '/about', '/services', '/facilities', '/faq', '/contact', '/privacy', '/terms']) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<h1/);
  assert.ok(!html.includes('http://localhost:3000'));
  assert.ok(!html.includes('/_next/'));
}
for (const route of ['/assets/site.css', '/assets/site.js', '/assets/icon.svg', '/images/hero.jpg', '/robots.txt', '/sitemap.xml']) {
  assert.equal((await fetch(base + route)).status, 200);
}
assert.equal((await fetch(base + '/not-found')).status, 404);
assert.equal((await fetch(base + '/api/inquiry', { method: 'POST', body: '{}' })).status, 400);
assert.ok((await (await fetch(base + '/sitemap.xml')).text()).includes(base));
console.log('Passed: eight packaged pages, assets, automatic domain, sitemap, robots, 404 and API validation.');
