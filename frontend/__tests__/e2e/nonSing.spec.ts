import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Not sign in", () => {
  test("has app title", async ({ page }) => {
    await expect(page).toHaveTitle(/Darjeeling/);
  });

  test("has app headline", async ({ page }) => {
    await expect(page.getByText(/Welcome to Darjeeling/)).toBeVisible();
  });

  test("signup & signin", async ({ page }) => {
    await expect(page.getByText(/Sign up/)).toBeVisible();
    await expect(page.getByText(/Sign in/)).toBeVisible();
  });
});
