import { test, expect } from "@playwright/test";
import { validateInquiry } from "../lib/inquiry";
test("inquiry validation rejects malformed details and dates", () => {
  const valid = {
    name: "Test User",
    email: "test@example.com",
    phone: "+91 9876543210",
    workspace: "Dedicated Desk",
    date: "",
    message: "Workspace enquiry",
  };
  expect(validateInquiry(valid).errors).toEqual({});
  for (const [field, value] of Object.entries({
    name: "",
    email: "invalid",
    phone: "-------",
    workspace: "Unknown",
    date: "2999-02-31",
    message: "a".repeat(3001),
  })) {
    expect(
      validateInquiry({ ...valid, [field]: value }).errors[field],
    ).toBeTruthy();
  }
  expect(
    validateInquiry({ ...valid, date: "2020-01-01" }).errors.date,
  ).toBeTruthy();
});
const routes = [
  "/",
  "/about",
  "/services",
  "/facilities",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
];
test("all pages and required widths are responsive", async ({ page }) => {
  for (const width of [320, 375, 430, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const response = await page.goto("http://localhost:3000" + route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      for (const img of await page.locator("img").all()) {
        await img.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            img.evaluate(
              (e) =>
                (e as HTMLImageElement).complete &&
                (e as HTMLImageElement).naturalWidth > 0,
            ),
          )
          .toBe(true);
      }
    }
  }
});
test("mobile navigation and FAQ controls", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("http://localhost:3000");
  const menu = page.getByRole("button", { name: "Open menu" });
  await menu.click();
  await expect(
    page.getByRole("button", { name: "Close menu" }),
  ).toHaveAttribute("aria-expanded", "true");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "FAQ", exact: true })
    .click();
  await expect(page).toHaveURL(/faq/);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  const question = page.locator("summary").first();
  await question.click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await question.click();
  await expect(page.locator("details").first()).not.toHaveAttribute("open", "");
});
test("unconfigured delivery is explicit and API validates", async ({
  page,
  request,
}) => {
  await page.goto("http://localhost:3000/contact");
  await expect(
    page.getByRole("button", { name: "Request a Visit / Send Enquiry" }),
  ).toBeDisabled();
  const invalid = await request.post("http://localhost:3000/api/inquiry", {
    data: {},
  });
  expect(invalid.status()).toBe(400);
  const missing = await request.post("http://localhost:3000/api/inquiry", {
    data: {
      name: "Test User",
      email: "test@example.com",
      phone: "9876543210",
      workspace: "Dedicated Desk",
      date: "",
      message: "Test",
    },
  });
  expect(missing.status()).toBe(503);
});
