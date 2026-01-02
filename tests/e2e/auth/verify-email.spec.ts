import { test, expect } from "@playwright/test";
import { mockVerifyEmail } from "../mocks/auth.mocks";

test.describe("Email Verification Flow", () => {
  test("should verify email and redirect to login", async ({ page }) => {
    // Mock: verification success → login
    await mockVerifyEmail(page);

    // Navigate to verification URL
    await page.goto("/verify/test-verification-token-123");

    // Assert: redirects to login (user will then login and be redirected to onboarding if needed)
    await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
  });

  test("should handle invalid verification token", async ({ page }) => {
    // Mock: verification API returns error
    await page.route("**/auth/verify/*", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          message: "Invalid or expired verification token",
        }),
      });
    });

    await page.goto("/verify/invalid-token-789");

    // Assert: error shown, redirects to register
    await expect(
      page.getByText(/verification failed|invalid.*token/i)
    ).toBeVisible({ timeout: 5000 });
    await expect(page).toHaveURL(/\/register/, { timeout: 5000 });
  });
});
