import { test as setup } from "@playwright/test";
import { authFilePath } from "../../playwright.config";

setup("認証(管理者)", async ({ page }) => {
  // ログイン処理(省略)
  await page.goto("/");
  await page.click('[data-testid="signup-button"]');await page.waitForSelector('input[type="text"]');
  await page.getByLabel("Email address").fill(process.env.E2E_EMAIL || "");
  await page.getByLabel("Password").fill(process.env.E2E_PASSWORD || "");
  await page.click('button[type="submit"]');

  await page.waitForSelector('[data-testid="profile-button"]');

  await page.context().storageState({ path: authFilePath });
});
