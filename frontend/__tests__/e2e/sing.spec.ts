import { test, expect } from "@playwright/test";
import { authFilePath } from "../../playwright.config";

test.use({ storageState: authFilePath });

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("signed in", () => {
  test("click signup", async ({ page }) => {
    await page.click('[data-testid="profile-button"]');

    await expect(page.getByText(/Profile/)).toBeVisible();
    await expect(page.getByText(/My account/)).toBeVisible();
    await expect(page.getByText(/サインアウト/)).toBeVisible();
  });
});
