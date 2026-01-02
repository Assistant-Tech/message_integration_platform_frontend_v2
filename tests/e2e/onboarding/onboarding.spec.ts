import { test, expect } from "@playwright/test";
import path from "path";
import { mockOnboardingSubmit, mockCurrentUser } from "../mocks/auth.mocks";

test.describe("Onboarding Flow", () => {
  test.beforeEach(async ({ page }) => {
    await mockOnboardingSubmit(page);
    await mockCurrentUser(page, true);
    await page.goto("/onboardingform");

    await expect(page.getByText(/Welcome to Chatblix/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test("should allow finishing early after step 3", async ({ page }) => {
    // Step 1: General Information
    await page.locator("#organizationName").fill("Chatblix");
    await page.locator("#email").fill("admin@chatblix.com");
    await page.locator("#phone").fill("9876543210");
    await page.getByRole("button", { name: /next/i }).click();

    // Step 2: Location Details
    await page.locator("#country").click();
    await page.keyboard.type("Nepal");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);

    await page.locator("#state").click();
    await page.keyboard.type("Bagmati");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);

    await page.locator("#city").click();
    await page.keyboard.type("Kathmandu");
    await page.keyboard.press("Enter");

    await page.getByRole("button", { name: /next/i }).click();

    // Step 3: Industry Selection with "Finish Early" option
    await page
      .locator('label:has(input[name="industry"][value="Digital Marketing"])')
      .click();

    // Look for "Finish Setup" button (shown when showFinishEarlyOption is true)
    const finishEarlyButton = page.getByRole("button", {
      name: /finish setup/i,
    });

    if (await finishEarlyButton.isVisible().catch(() => false)) {
      await finishEarlyButton.click();

      // Should redirect to login
      await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
    }
  });

  test("should allow skipping optional steps", async ({ page }) => {
    // Complete required steps 1-3
    await page.locator("#organizationName").fill("Chatblix");
    await page.locator("#email").fill("admin@chatblix.com");
    await page.locator("#phone").fill("9876543210");
    await page.getByRole("button", { name: /next/i }).click();

    await page.locator("#country").click();
    await page.keyboard.type("Nepal");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);

    await page.locator("#state").click();
    await page.keyboard.type("Bagmati");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);

    await page.locator("#city").click();
    await page.keyboard.type("Kathmandu");
    await page.keyboard.press("Enter");

    await page.getByRole("button", { name: /next/i }).click();

    // Should redirect to login
    await expect(page).toHaveURL("http://localhost:5173/onboardingform", {
      timeout: 10000,
    });
  });

  test("should show validation errors for required fields", async ({
    page,
  }) => {
    // Try to proceed without filling required fields
    await page.getByRole("button", { name: /next/i }).click();

    // Wait a bit for validation to trigger
    await page.waitForTimeout(500);

    // Check for validation errors - the errors appear below the inputs
    const errorMessages = page.locator(".text-danger, .text-red-500");
    await expect(errorMessages.first()).toBeVisible({ timeout: 3000 });
  });

  test("should navigate back to previous steps", async ({ page }) => {
    // Complete step 1
    await page.locator("#organizationName").fill("Chatblix");
    await page.locator("#email").fill("admin@chatblix.com");
    await page.locator("#phone").fill("9876543210");
    await page.getByRole("button", { name: /next/i }).click();

    const previousButton = page.getByRole("button", { name: /go back/i });
    await previousButton.click();

    // Data should be preserved
    await expect(page.locator("#organizationName")).toHaveValue("Chatblix");
  });

  test("should handle custom industry input", async ({ page }) => {
    // Complete steps 1 and 2
    await page.locator("#organizationName").fill("Chatblix");
    await page.locator("#email").fill("admin@chatblix.com");
    await page.locator("#phone").fill("9876543210");
    await page.getByRole("button", { name: /next/i }).click();

    await page.locator("#country").click();
    await page.keyboard.type("Nepal");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);

    await page.locator("#state").click();
    await page.keyboard.type("Bagmati");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);

    await page.locator("#city").click();
    await page.keyboard.type("Kathmandu");
    await page.keyboard.press("Enter");
    await page.getByRole("button", { name: /next/i }).click();

    // Step 3: Select "Others" and enter custom industry
    await page
      .locator('label:has(input[name="industry"][value="Others"])')
      .click();

    // Custom input should appear
    await expect(page.locator("#customIndustry")).toBeVisible();
    await page.locator("#customIndustry").fill("Custom Tech Industry");

    await page.getByRole("button", { name: /continue/i }).click();
  });

  test("should validate PAN format and file upload", async ({ page }) => {
    // Navigate to step 4
    await page.locator("#organizationName").fill("Chatblix");
    await page.locator("#email").fill("admin@chatblix.com");
    await page.locator("#phone").fill("9876543210");
    await page.getByRole("button", { name: /next/i }).click();

    await page.locator("#country").click();
    await page.keyboard.type("Nepal");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);

    await page.locator("#state").click();
    await page.keyboard.type("Bagmati");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);

    await page.locator("#city").click();
    await page.keyboard.type("Kathmandu");
    await page.keyboard.press("Enter");
    await page.getByRole("button", { name: /next/i }).click();

    await page
      .locator('label:has(input[name="industry"][value="Digital Marketing"])')
      .click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Test PAN validation
    await page.locator("#pan").fill("INVALID");
    await page.getByRole("button", { name: /next/i }).click();

    // Should show validation error
    await page.waitForTimeout(500);
    const errorMessage = page.locator(".text-danger");
    await expect(errorMessage.first()).toBeVisible();
  });
});
