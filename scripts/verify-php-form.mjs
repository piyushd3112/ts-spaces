import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

// Run PHP on port 8081 with INQUIRY_WEBHOOK_URL=https://127.0.0.1:1/inquiry.
// UI acceptance is mocked; no enquiry is sent to a real receiver.
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage();
  await page.route(/https:\/\/maps\.google\.com\//, route => route.abort());
  await page.goto('http://127.0.0.1:8081/contact', { waitUntil: 'domcontentloaded' });
  const submit = page.locator('.inquiry-form button');
  assert.equal(await submit.isEnabled(), true);
  assert.equal(await page.locator('.notice').count(), 0);
  await submit.click();
  assert.equal(await page.locator('[role=alert]').textContent(), 'Please check the highlighted fields.');
  assert.equal(await page.locator('#email').getAttribute('aria-invalid'), 'true');
  await page.locator('#name').fill('Test User');
  await page.locator('#email').fill('test@example.com');
  await page.locator('#phone').fill('9876543210');
  await page.locator('#workspace').selectOption('Dedicated Desk');
  await submit.click();
  await page.waitForFunction(() => document.querySelector('.form-status')?.textContent.includes('could not be delivered'));
  assert.equal(await submit.isEnabled(), true);
  await page.route('**/api/inquiry', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ message: 'Enquiry delivered.' }) }));
  await submit.click();
  await page.waitForFunction(() => document.querySelector('.form-status')?.textContent.includes('Your enquiry has been sent.'));
  assert.equal(await page.locator('#name').inputValue(), '');
  assert.equal(await page.locator('#workspace').inputValue(), '');
  assert.equal(await submit.isEnabled(), true);
  console.log('Passed: enabled form, client validation, delivery failure, mocked acceptance and form reset.');
} finally {
  await browser.close();
}
