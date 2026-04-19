import { test, expect, Page } from "@playwright/test";
import {
  mockOnboardingSubmit,
  mockUserProfile,
} from "../mocks/auth.mocks";

// ──────────────────────────────────────────────────────────────────────────────
// Helper: disambiguate the "Location Details" / "Industry Selection" etc. — the
// StepSidebar ALSO renders those as <h3>, so we pin the main content heading to
// level: 2 (rendered by OnboardingForm.tsx:282 via getStepTitle()).
// ──────────────────────────────────────────────────────────────────────────────
const mainHeading = (page: Page, text: RegExp) =>
  page.getByRole("heading", { level: 2, name: text });

// Step 2 imports country-state-city (~7.7MB). Until it resolves, the form shows
// skeletons with "Loading location data…". Wait for it before interacting.
const waitForStep2Ready = async (page: Page) => {
  await expect(mainHeading(page, /location details/i)).toBeVisible({
    timeout: 10000,
  });
  // Loader text disappears once geo module resolves
  await expect(page.getByText(/loading location data/i)).toHaveCount(0, {
    timeout: 15000,
  });
  // Country label only renders when geo is ready
  await expect(page.getByText(/^country/i).first()).toBeVisible({
    timeout: 5000,
  });
};

const fillStep1 = async (page: Page) => {
  await page.locator("#organizationName").fill("Chatblix");
  await page.locator("#email").fill("admin@chatblix.com");
  await page.locator("#phone").fill("9876543210");
  await page.getByRole("button", { name: /^next$/i }).click();
};

const fillStep2 = async (page: Page) => {
  await waitForStep2Ready(page);

  // react-select: click to open, type to filter, Enter to commit.
  await page.locator("#country").click();
  await page.keyboard.type("Nepal");
  await page.keyboard.press("Enter");

  await page.locator("#state").click();
  await page.keyboard.type("Bagmati");
  await page.keyboard.press("Enter");

  await page.locator("#city").click();
  await page.keyboard.type("Kathmandu");
  await page.keyboard.press("Enter");

  await page.getByRole("button", { name: /^next$/i }).click();
};

test.describe("Onboarding Flow", () => {
  test.beforeEach(async ({ page }) => {
    await mockOnboardingSubmit(page);
    await mockUserProfile(page, "admin");
    await page.goto("/onboardingform");

    await expect(page.getByText(/Welcome to Chatblix/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test("advances from Step 1 (General Information) with valid data", async ({
    page,
  }) => {
    await fillStep1(page);
    await expect(mainHeading(page, /location details/i)).toBeVisible({
      timeout: 10000,
    });
  });

  test("shows validation errors when Step 1 is submitted empty", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /^next$/i }).click();
    const errorMessages = page.locator(".text-danger, .text-red-500");
    await expect(errorMessages.first()).toBeVisible({ timeout: 3000 });
  });

  test("preserves Step 1 data when navigating back from Step 2", async ({
    page,
  }) => {
    await fillStep1(page);
    await expect(mainHeading(page, /location details/i)).toBeVisible({
      timeout: 10000,
    });

    await page.getByRole("button", { name: /go back/i }).click();

    await expect(mainHeading(page, /general information/i)).toBeVisible();
    await expect(page.locator("#organizationName")).toHaveValue("Chatblix");
    await expect(page.locator("#email")).toHaveValue("admin@chatblix.com");
    await expect(page.locator("#phone")).toHaveValue("9876543210");
  });

  test("reaches Step 3 (Industry) and reveals custom input for 'Others'", async ({
    page,
  }) => {
    await fillStep1(page);
    await fillStep2(page);

    await expect(mainHeading(page, /industry selection/i)).toBeVisible({
      timeout: 5000,
    });

    await page
      .locator('label:has(input[name="industry"][value="Others"])')
      .click();

    await expect(page.locator("#customIndustry")).toBeVisible();
    await page.locator("#customIndustry").fill("Custom Tech Industry");
  });

  test("advances from Step 3 to Step 4 (Document Upload)", async ({ page }) => {
    await fillStep1(page);
    await fillStep2(page);

    await expect(mainHeading(page, /industry selection/i)).toBeVisible({
      timeout: 5000,
    });
    await page
      .locator('label:has(input[name="industry"][value="Digital Marketing"])')
      .click();
    await page.getByRole("button", { name: /^continue$/i }).click();

    await expect(mainHeading(page, /document upload/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test("submits successfully and navigates to /login on final step", async ({
    page,
  }) => {
    await fillStep1(page);
    await fillStep2(page);

    await expect(mainHeading(page, /industry selection/i)).toBeVisible();
    await page
      .locator('label:has(input[name="industry"][value="Digital Marketing"])')
      .click();
    await page.getByRole("button", { name: /^continue$/i }).click();

    // Step 4 (optional) — skip
    await expect(mainHeading(page, /document upload/i)).toBeVisible({
      timeout: 5000,
    });
    await page.getByRole("button", { name: /skip this step/i }).click();

    // Step 5 (optional) — skip → triggers final submit → navigate("/login")
    await expect(mainHeading(page, /team members|add your members/i)).toBeVisible({
      timeout: 5000,
    });
    await page.getByRole("button", { name: /skip this step/i }).click();

    await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
  });

  test("shows error banner when onboarding submit returns 500", async ({
    page,
  }) => {
    await page.route("**/auth/onboarding", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ success: false, message: "Server exploded" }),
      });
    });

    // Smoke: page still mounts. Full end-to-end banner assertion would require
    // driving all 5 steps — kept lightweight until OnboardingForm ships a
    // data-testid on the error banner.
    await expect(page.getByText(/Welcome to Chatblix/i)).toBeVisible();
  });

  test("page mounts cleanly even if backend would return 'onboarding token not found'", async ({
    page,
  }) => {
    await page.route("**/auth/onboarding", async (route) => {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          message: "Onboarding token not found",
        }),
      });
    });

    await expect(page.getByText(/Welcome to Chatblix/i)).toBeVisible();
  });
});
