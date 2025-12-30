import { Page, Route } from "@playwright/test";

export const mockOnboardingSuccess = async (page: Page) => {
  await page.route("**/auth/onboarding", async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
};

export const mockAuthRefresh = async (page: Page) => {
  await page.route("**/auth/refresh", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        accessToken: "test-access-token",
      }),
    });
  });
};

export const mock401ThenRefresh = async (page: Page) => {
  let called = false;

  await page.route("**/protected/**", async (route) => {
    if (!called) {
      called = true;
      await route.fulfill({ status: 401 });
    } else {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ data: "ok" }),
      });
    }
  });
};

export const mockRateLimit429 = async (page: Page) => {
  await page.route("**/auth/**", async (route) => {
    await route.fulfill({
      status: 429,
      headers: {
        "retry-after": "5",
      },
      body: JSON.stringify({ message: "Too many requests" }),
    });
  });
};
