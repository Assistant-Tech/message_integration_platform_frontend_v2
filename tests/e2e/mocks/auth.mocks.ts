import { Page } from "@playwright/test";
import {
  mockUsers,
  createUserProfileResponse,
  createErrorResponse,
} from "../../fixtures/mockUsers";
import type { User } from "../../../src/app/types/auth.types";

// Deterministic test data
export const TEST_DATA = {
  tenantSlug: "chatblix",
  accessToken: "test-access-token",
  userEmail: "admin@chatblix.com",
  userId: "user-123",
  tenantId: "tenant-123",
};

/**
 * Mock successful registration response
 */
export async function mockRegister(page: Page) {
  await page.route("**/auth/register", async (route) => {
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        message: "Verification email sent",
      }),
    });
  });
}

/**
 * Mock login response for verified and onboarded user
 * Redirects to: /:tenantSlug/admin/dashboard
 */
export async function mockLoginVerifiedAndOnboarded(page: Page) {
  await page.route("**/auth/login", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        message: "Login successful",
        data: {
          accessToken: TEST_DATA.accessToken,
          accessTokenExpiresIn: 3600,
          csrfToken: "test-csrf-token",
          requiresOnboarding: false,
          tenantSlug: TEST_DATA.tenantSlug,
        },
        timestamp: new Date().toISOString(),
      }),
    });
  });
}

/**
 * Mock login response for verified but NOT onboarded user
 * Redirects to: /onboardingform
 */
export async function mockLoginVerifiedNotOnboarded(page: Page) {
  await page.route("**/auth/login", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        message: "Login successful",
        data: {
          accessToken: TEST_DATA.accessToken,
          accessTokenExpiresIn: 3600,
          csrfToken: "test-csrf-token",
          requiresOnboarding: true,
          tenantSlug: TEST_DATA.tenantSlug,
        },
        timestamp: new Date().toISOString(),
      }),
    });
  });
}

/**
 * Mock login response when backend succeeds but has no tenantSlug yet
 * (e.g. email not verified / tenant not provisioned).
 * Frontend behavior: LoginForm.tsx redirects to /check-email.
 */
export async function mockLoginNotVerified(page: Page) {
  await page.route("**/auth/login", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        message: "Login successful",
        data: {
          accessToken: TEST_DATA.accessToken,
          accessTokenExpiresIn: 3600,
          csrfToken: "test-csrf-token",
          requiresOnboarding: false,
          tenantSlug: null,
        },
        timestamp: new Date().toISOString(),
      }),
    });
  });
}

/**
 * Mock email verification response
 * Note: Actual implementation redirects to /login after verification
 */
export async function mockVerifyEmail(page: Page) {
  await page.route("**/auth/verify/*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        message: "Email verified successfully",
        timestamp: new Date().toISOString(),
      }),
    });
  });
}

/**
 * Mock onboarding submit endpoint
 */
export async function mockOnboardingSubmit(page: Page) {
  await page.route("**/auth/onboarding", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
      }),
    });
  });
}

/**
 * Mock current user profile endpoint (used after onboarding/login)
 * Uses the actual API endpoint: /user/profile
 * @deprecated Use mockUserProfile with explicit user type instead
 */
export async function mockCurrentUser(page: Page, onboardingCompleted: boolean = true) {
  await page.route("**/user/profile", async (route) => {
    const user = onboardingCompleted ? mockUsers.admin : mockUsers.requiresOnboarding;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(createUserProfileResponse(user)),
    });
  });
}

/**
 * Mock user profile endpoint with specific user type
 * @param page - Playwright page object
 * @param userType - Key from mockUsers object (admin, member, unverified, etc.)
 */
export async function mockUserProfile(
  page: Page,
  userType: keyof typeof mockUsers = "admin",
) {
  await page.route("**/user/profile", async (route) => {
    const user = mockUsers[userType];
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(createUserProfileResponse(user)),
    });
  });
}

/**
 * Mock user profile endpoint with custom user data
 * @param page - Playwright page object
 * @param user - Custom user object
 */
export async function mockUserProfileCustom(page: Page, user: User) {
  await page.route("**/user/profile", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(createUserProfileResponse(user)),
    });
  });
}

/**
 * Mock user profile endpoint with unwrapped response (no data wrapper)
 */
export async function mockUserProfileUnwrapped(
  page: Page,
  userType: keyof typeof mockUsers = "admin",
) {
  await page.route("**/user/profile", async (route) => {
    const user = mockUsers[userType];
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(user),
    });
  });
}

/**
 * Mock user profile endpoint returning an error
 * @param page - Playwright page object
 * @param statusCode - HTTP status code (default: 401)
 * @param message - Error message
 */
export async function mockUserProfileError(
  page: Page,
  statusCode: number = 401,
  message: string = "Unauthorized",
) {
  await page.route("**/user/profile", async (route) => {
    await route.fulfill({
      status: statusCode,
      contentType: "application/json",
      body: JSON.stringify(createErrorResponse(statusCode, message)),
    });
  });
}

/**
 * Mock user profile endpoint with network error (no response)
 */
export async function mockUserProfileNetworkError(page: Page) {
  await page.route("**/user/profile", async (route) => {
    await route.abort("failed");
  });
}

/**
 * Mock user profile endpoint with timeout
 */
export async function mockUserProfileTimeout(page: Page, delay: number = 30000) {
  await page.route("**/user/profile", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    await route.fulfill({
      status: 504,
      contentType: "application/json",
      body: JSON.stringify(
        createErrorResponse(504, "Gateway Timeout"),
      ),
    });
  });
}

/**
 * Mock user profile endpoint returning 403 Forbidden
 */
export async function mockUserProfileForbidden(page: Page) {
  await mockUserProfileError(page, 403, "Forbidden: Access denied");
}

/**
 * Mock user profile endpoint returning 404 Not Found
 */
export async function mockUserProfileNotFound(page: Page) {
  await mockUserProfileError(page, 404, "User profile not found");
}

/**
 * Mock user profile endpoint returning 500 Internal Server Error
 */
export async function mockUserProfileServerError(page: Page) {
  await mockUserProfileError(page, 500, "Internal server error");
}

/**
 * Mock user profile endpoint with slow response (for loading state testing)
 */
export async function mockUserProfileSlow(
  page: Page,
  userType: keyof typeof mockUsers = "admin",
  delay: number = 2000,
) {
  await page.route("**/user/profile", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    const user = mockUsers[userType];
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(createUserProfileResponse(user)),
    });
  });
}

/**
 * Mock login error response
 */
export async function mockLoginError(page: Page, status: number = 401, message: string = "Invalid email or password") {
  await page.route("**/auth/login", async (route) => {
    await route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify({
        success: false,
        message,
      }),
    });
  });
}

/**
 * Mock resend verification email endpoint
 */
export async function mockResendVerification(page: Page, success: boolean = true) {
  await page.route("**/auth/resend-verification", async (route) => {
    await route.fulfill({
      status: success ? 200 : 400,
      contentType: "application/json",
      body: JSON.stringify({
        success,
        message: success ? "Verification email resent successfully" : "Failed to resend verification email",
      }),
    });
  });
}

