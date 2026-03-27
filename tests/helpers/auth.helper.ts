import { Page } from "@playwright/test";
import { mockCurrentUser, TEST_DATA } from "../e2e/mocks/auth.mocks";

export const setupAuthenticatedAdmin = async (page: Page) => {
  await mockCurrentUser(page, true);
  await page.goto("/");

  await page.evaluate(({ tenantSlug, accessToken }) => {
    localStorage.setItem(
      "auth-storage",
      JSON.stringify({
        state: {
          accessToken,
          isAuthenticated: true,
          tenantSlug,
          user: {
            id: "user-123",
            role: "TENANT_ADMIN",
            email: "admin@chatblix.com",
          },
        },
      }),
    );
  }, TEST_DATA);
};
