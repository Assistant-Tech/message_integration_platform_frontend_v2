import { test, expect } from "@playwright/test";

test.describe("MFA Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Mock login response that requires MFA
    await page.route("**/auth/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          requiresMfa: true,
          mfaToken: "mock-mfa-token",
        }),
      });
    });

    // Mock MFA verify
    await page.route("**/auth/mfa/verify", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          accessToken: "mock-access-token",
          user: { id: 1, email: "test@test.com" },
        }),
      });
    });
  });

  test("should complete MFA and redirect to onboarding", async ({ page }) => {
    await page.goto("/login");

    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "password123!");
    await page.click('button[type="submit"]');

    // MFA screen
    await expect(page.getByText("Enter verification code")).toBeVisible();

    await page.fill('input[name="mfaCode"]', "123456");
    await page.click("text=Verify");

    await expect(page).toHaveURL("/onboarding");
  });
});
