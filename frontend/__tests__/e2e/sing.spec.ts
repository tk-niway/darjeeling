import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByText(/Sign up/)).toBeVisible();
  await page.click('[data-testid="signup-button"]');
  // await page.waitForTimeout(3000);
  await page.waitForSelector('input[type="text"]');
  await page.getByLabel("Email address").fill(process.env.E2E_EMAIL || "");
  await page.getByLabel("Password").fill(process.env.E2E_PASSWORD || "");
  await page.click('button[type="submit"]');
  await page.waitForSelector('[data-testid="profile-button"]');
});

test.describe("signed in", () => {
  test("click signup", async ({ page }) => {
    await page.click('[data-testid="profile-button"]');

    await expect(page.getByText(/Profile/)).toBeVisible();
    await expect(page.getByText(/My account/)).toBeVisible();
    await expect(page.getByText(/サインアウト/)).toBeVisible();
  });
});
