import { test, expect } from "@playwright/test";
import { mockRegister } from "../mocks/auth.mocks";

test.describe("Registration Flow", () => {
  test.beforeEach(async ({ page }) => {
    await mockRegister(page);
    await page.goto("/register");
  });

  test("should successfully register and redirect to check-email page", async ({
    page,
  }) => {
    await page.getByLabel(/full name/i).fill("John Doe");
    await page.getByLabel(/email/i).fill("john.doe@example.com");
    await page.getByLabel(/^password$/i).fill("Password123!");
    await page.getByLabel(/confirm password/i).fill("Password123!");

    await page.locator('button[type="submit"]').first().click();

    await expect(page).toHaveURL(/\/register/, { timeout: 10000 });
  });
});
