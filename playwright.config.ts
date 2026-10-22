import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";
const localBrowser =
  process.env.LOCALAPPDATA +
  "/ms-playwright/chromium-1243/chrome-win64/chrome.exe";
export default defineConfig({
  testDir: "./tests",
  timeout: 180000,
  workers: 1,
  use: {
    browserName: "chromium",
    launchOptions: {
      executablePath:
        process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ||
        (existsSync(localBrowser) ? localBrowser : undefined),
    },
    headless: true,
  },
  reporter: "list",
});
