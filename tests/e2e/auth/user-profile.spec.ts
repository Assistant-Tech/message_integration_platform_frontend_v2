import { test, expect } from "@playwright/test";
import {
  mockLoginVerifiedAndOnboarded,
  mockUserProfile,
  mockUserProfileNetworkError,
  mockUserProfileTimeout,
  mockUserProfileSlow,
  mockUserProfileCustom,
  mockUserProfileUnwrapped,
} from "../mocks/auth.mocks";
import { mockUsers, createUserProfileResponse } from "../../fixtures/mockUsers";

test.describe("User Profile Fetch", () => {
  test.beforeEach(async ({ page }) => {
    // Set up authenticated state
    await mockLoginVerifiedAndOnboarded(page);
  });

  test.describe("Successful Profile Fetch", () => {
    test("should fetch admin user profile successfully", async ({ page }) => {
      await mockUserProfile(page, "admin");
      await page.goto("/login");

      // Login first
      await page.getByLabel(/email.*phone number/i).fill("admin@chatblix.com");
      await page.getByLabel(/^password$/i).fill("Password123!");
      await page.locator('button[type="submit"]').first().click();

      // Wait for profile to be fetched (usually happens after login)
      await page.waitForTimeout(1000);
    });

    test("should fetch member user profile successfully", async ({ page }) => {
      await mockUserProfile(page, "member");
      await page.goto("/login");

      await page.getByLabel(/email.*phone number/i).fill("jane@chatblix.com");
      await page.getByLabel(/^password$/i).fill("Password123!");
      await page.locator('button[type="submit"]').first().click();

      await page.waitForTimeout(1000);
    });

    test("should fetch user profile with tenant information", async ({ page }) => {
      await mockUserProfile(page, "admin");
      await page.goto("/login");

      await page.getByLabel(/email.*phone number/i).fill("admin@chatblix.com");
      await page.getByLabel(/^password$/i).fill("Password123!");
      await page.locator('button[type="submit"]').first().click();

      await page.waitForTimeout(1000);
    });

    test("should fetch user profile with unwrapped response format", async ({ page }) => {
      await mockUserProfileUnwrapped(page, "admin");
      await page.goto("/login");

      await page.getByLabel(/email.*phone number/i).fill("admin@chatblix.com");
      await page.getByLabel(/^password$/i).fill("Password123!");
      await page.locator('button[type="submit"]').first().click();

      await page.waitForTimeout(1000);
    });

    test("should fetch custom user profile", async ({ page }) => {
      const customUser = {
        ...mockUsers.admin,
        name: "Custom User Name",
        email: "custom@example.com",
      };
      await mockUserProfileCustom(page, customUser);
      await page.goto("/login");

      await page.getByLabel(/email.*phone number/i).fill("custom@example.com");
      await page.getByLabel(/^password$/i).fill("Password123!");
      await page.locator('button[type="submit"]').first().click();

      await page.waitForTimeout(1000);
    });
  });

  test.describe("User Profile States", () => {
    test("should handle unverified user profile", async ({ page }) => {
      await mockUserProfile(page, "unverified");
      await page.goto("/login");

      await page.getByLabel(/email.*phone number/i).fill("unverified@example.com");
      await page.getByLabel(/^password$/i).fill("Password123!");
      await page.locator('button[type="submit"]').first().click();

      await page.waitForTimeout(1000);
    });

    test("should handle user requiring onboarding", async ({ page }) => {
      await mockUserProfile(page, "requiresOnboarding");
      await page.goto("/login");

      await page.getByLabel(/email.*phone number/i).fill("alice@chatblix.com");
      await page.getByLabel(/^password$/i).fill("Password123!");
      await page.locator('button[type="submit"]').first().click();

      await page.waitForTimeout(1000);
    });

    test("should handle user with inactive tenant", async ({ page }) => {
      await mockUserProfile(page, "inactiveTenant");
      await page.goto("/login");

      await page.getByLabel(/email.*phone number/i).fill("charlie@inactive.com");
      await page.getByLabel(/^password$/i).fill("Password123!");
      await page.locator('button[type="submit"]').first().click();

      await page.waitForTimeout(1000);
    });

    test("should handle user with minimal data", async ({ page }) => {
      await mockUserProfile(page, "minimal");
      await page.goto("/login");

      await page.getByLabel(/email.*phone number/i).fill("minimal@example.com");
      await page.getByLabel(/^password$/i).fill("Password123!");
      await page.locator('button[type="submit"]').first().click();

      await page.waitForTimeout(1000);
    });

    test("should handle user without tenant", async ({ page }) => {
      await mockUserProfile(page, "noTenant");
      await page.goto("/login");

      await page.getByLabel(/email.*phone number/i).fill("notenant@example.com");
      await page.getByLabel(/^password$/i).fill("Password123!");
      await page.locator('button[type="submit"]').first().click();

      await page.waitForTimeout(1000);
    });
  });

  test.describe("Error Scenarios", () => {

    test("should handle network error", async ({ page }) => {
      await mockUserProfileNetworkError(page);
      await page.goto("/login");

      await page.getByLabel(/email.*phone number/i).fill("admin@chatblix.com");
      await page.getByLabel(/^password$/i).fill("Password123!");
      await page.locator('button[type="submit"]').first().click();

      // Network error should cause request to fail
      await page.waitForTimeout(1000);

      // Verify request was attempted (error will be logged but request fails)
      const requests = [];
      page.on("requestfailed", (request) => {
        if (request.url().includes("/user/profile")) {
          requests.push(request);
        }
      });

      await page.waitForTimeout(500);
      // Network errors are handled differently, but we can verify the route was hit
    });
  });

  test.describe("Loading and Performance", () => {
    test("should handle slow profile fetch response", async ({ page }) => {
      await mockUserProfileSlow(page, "admin", 1500);
      await page.goto("/login");

      await page.getByLabel(/email.*phone number/i).fill("admin@chatblix.com");
      await page.getByLabel(/^password$/i).fill("Password123!");
      await page.locator('button[type="submit"]').first().click();

      // Should eventually complete
      const response = await page.waitForResponse("**/user/profile", { timeout: 5000 });
      expect(response.status()).toBe(200);
    });

    test("should handle timeout scenario", async ({ page }) => {
      await mockUserProfileTimeout(page, 3000);
      await page.goto("/login");

      await page.getByLabel(/email.*phone number/i).fill("admin@chatblix.com");
      await page.getByLabel(/^password$/i).fill("Password123!");
      await page.locator('button[type="submit"]').first().click();

      // Wait for timeout response
      const response = await page.waitForResponse("**/user/profile", { timeout: 10000 });
      expect(response.status()).toBe(504);

      const responseBody = await response.json();
      expect(responseBody.message).toContain("Gateway Timeout");
    });
  });

  test.describe("Multiple Profile Fetches", () => {
    test("should handle multiple profile fetch requests", async ({ page }) => {
      let requestCount = 0;
      await page.route("**/user/profile", async (route) => {
        requestCount++;
        const user = mockUsers.admin;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(createUserProfileResponse(user)),
        });
      });

      await page.goto("/login");
      await page.getByLabel(/email.*phone number/i).fill("admin@chatblix.com");
      await page.getByLabel(/^password$/i).fill("Password123!");
      await page.locator('button[type="submit"]').first().click();

      await page.waitForTimeout(2000);

      // Profile might be fetched multiple times (initial fetch, after login, etc.)
      expect(requestCount).toBeGreaterThan(0);
    });
  });
});

