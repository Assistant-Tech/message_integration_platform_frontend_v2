import { test, expect } from "@playwright/test";
import {
  mockLoginVerifiedAndOnboarded,
  mockLoginVerifiedNotOnboarded,
  mockLoginNotVerified,
  mockLoginError,
  mockUserProfile,
} from "../mocks/auth.mocks";

// ──────────────────────────────────────────────────────────────────────────────
// LESSON 1: "A test that asserts the opposite of its description is not a test.
//           It is performance art." — Every senior engineer, sighing
// ──────────────────────────────────────────────────────────────────────────────

test.describe("Login Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("redirects to tenant dashboard when verified + onboarded", async ({
    page,
  }) => {
    await mockLoginVerifiedAndOnboarded(page);
    await mockUserProfile(page, "admin");

    await page.getByLabel(/email.*phone number/i).fill("admin@chatblix.com");
    await page.getByLabel(/^password$/i).fill("Password123!");
    await page.locator('button[type="submit"]').first().click();

    // Your previous test asserted /login/ after a SUCCESSFUL login.
    // That is not a test. That is a confession.
    // LoginForm.tsx:109 navigates to /app/:tenantSlug/admin/dashboard.
    await expect(page).toHaveURL(
      /\/app\/chatblix\/admin\/dashboard/,
      { timeout: 10000 },
    );
  });

  test("redirects to onboarding when verified but NOT onboarded", async ({
    page,
  }) => {
    await mockLoginVerifiedNotOnboarded(page);

    await page.getByLabel(/email.*phone number/i).fill("verified@chatblix.com");
    await page.getByLabel(/^password$/i).fill("Password123!");
    await page.locator('button[type="submit"]').first().click();

    // LoginForm.tsx:106 navigates to APP_ROUTES.AUTH.ONBOARDING_FORM.
    // If this fails, the onboarding redirect is broken — congratulations,
    // your "suspicion" was correct and the test now proves it.
    await expect(page).toHaveURL(/\/onboardingform/, { timeout: 10000 });
  });

  test("redirects to /check-email when tenantSlug is null", async ({
    page,
  }) => {
    // Regression guard: the old LoginForm would navigate to
    // /app/null/admin/dashboard when the backend returned success with
    // tenantSlug:null. The fix sends the user to /check-email instead.
    await mockLoginNotVerified(page);

    await page
      .getByLabel(/email.*phone number/i)
      .fill("unverified@example.com");
    await page.getByLabel(/^password$/i).fill("Password123!");
    await page.locator('button[type="submit"]').first().click();

    await expect(page).toHaveURL(/\/check-email/, { timeout: 10000 });
    await expect(page).not.toHaveURL(/\/app\/null\//);
  });

  test("blocks submit with short password (client-side validation)", async ({
    page,
  }) => {
    await page.getByLabel(/email.*phone number/i).fill("user@example.com");
    await page.getByLabel(/^password$/i).fill("short");
    await page.locator('button[type="submit"]').first().click();

    await expect(
      page.getByText(/password must be at least 6 characters/i),
    ).toBeVisible();
  });

  test("blocks submit when email/phone is empty", async ({ page }) => {
    await page.getByLabel(/^password$/i).fill("Password123!");
    await page.locator('button[type="submit"]').first().click();

    // Stays on /login. If it doesn't, the form is accepting empty identifiers,
    // which is the auth equivalent of leaving your house keys in the door.
    await expect(page).toHaveURL(/\/login/);
  });

  test("stays on /login and does not navigate on 401", async ({ page }) => {
    await mockLoginError(page, 401, "Invalid email or password");

    await page.getByLabel(/email.*phone number/i).fill("wrong@example.com");
    await page.getByLabel(/^password$/i).fill("WrongPassword123!");
    await page.locator('button[type="submit"]').first().click();

    // Small wait so any (incorrect) navigation would have happened by now.
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/login/);
  });

  test("handles 500 gracefully (no crash, stays on /login)", async ({
    page,
  }) => {
    await mockLoginError(page, 500, "Something exploded");

    await page.getByLabel(/email.*phone number/i).fill("user@example.com");
    await page.getByLabel(/^password$/i).fill("Password123!");
    await page.locator('button[type="submit"]').first().click();

    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/login/);
  });
});
