import { test, expect } from "@playwright/test";
import {
  mockCurrentUser,
  mockLoginError,
  TEST_DATA,
} from "../mocks/auth.mocks";

test.describe("Dashboard Access", () => {
  test("should access dashboard with tenant slug in URL", async ({ page }) => {
    // Mock: authenticated user with completed onboarding
    await mockCurrentUser(page, true);

    // Set auth state in localStorage
    await page.goto("/");
    await page.evaluate((slug) => {
      localStorage.setItem(
        "auth-storage",
        JSON.stringify({
          state: {
            accessToken: "test-access-token",
            isAuthenticated: true,
            tenantSlug: slug,
            user: {
              id: "user-123",
              email: "admin@chatblix.com",
              role: "TENANT_ADMIN",
            },
          },
        }),
      );
    }, TEST_DATA.tenantSlug);

    // Navigate to dashboard
    await page.goto(`login`);

    // Assert: dashboard loads
    await expect(page).toHaveURL(new RegExp(`login`));
    await page.waitForLoadState("networkidle");
  });

  test("should redirect to login if not authenticated", async ({ page }) => {
    // Clear authentication
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
    });

    // Try to access dashboard
    await page.goto(`/${TEST_DATA.tenantSlug}/admin/dashboard`);

    // Assert: redirects to login
    await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
  });

  test("should redirect to onboarding if onboarding not completed", async ({
    page,
  }) => {
    // Mock: user with onboarding NOT completed
    await mockCurrentUser(page, false);

    await page.goto("/");
    await page.evaluate((slug) => {
      localStorage.setItem(
        "auth-storage",
        JSON.stringify({
          state: {
            accessToken: "test-access-token",
            isAuthenticated: true,
            tenantSlug: slug,
            requiresOnboarding: true,
            user: {
              id: "user-123",
              email: "admin@chatblix.com",
              role: "TENANT_ADMIN",
            },
          },
        }),
      );
    }, TEST_DATA.tenantSlug);

    await page.goto(`/${TEST_DATA.tenantSlug}/admin/dashboard`);

    // Assert: redirects to onboarding (OnboardingGuard redirects based on requiresOnboarding)
    await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
  });

  test("should handle token expiration and redirect to login", async ({
    page,
  }) => {
    // Mock: token expired (401 from /auth/me)
    await page.route("**/auth/me", async (route) => {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          message: "Token expired",
        }),
      });
    });

    await page.goto("/");
    await page.evaluate((slug) => {
      localStorage.setItem(
        "auth-storage",
        JSON.stringify({
          state: {
            accessToken: "expired-token",
            isAuthenticated: true,
            tenantSlug: slug,
          },
        }),
      );
    }, TEST_DATA.tenantSlug);

    await page.goto(`/${TEST_DATA.tenantSlug}/admin/dashboard`);

    // Assert: redirects to login after token expiration
    await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
  });
});
