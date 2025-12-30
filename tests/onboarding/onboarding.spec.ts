import { test, expect } from "@playwright/test";
import path from "path";

test.describe("Onboarding - Full Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/auth/onboarding", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/onboarding");
  });

  test("should complete all 5 steps and submit", async ({ page }) => {
    // STEP 1
    await page.fill('input[name="companyName"]', "Chatblix");
    await page.fill('input[name="email"]', "admin@chatblix.com");
    await page.click("text=Next");

    // STEP 2
    await page.fill('input[name="country"]', "Nepal");
    await page.fill('input[name="city"]', "Kathmandu");
    await page.click("text=Next");

    // STEP 3
    await page.selectOption('select[name="industry"]', "IT");
    await page.click("text=Next");

    // STEP 4 (file upload)
    const filePath = path.resolve(__dirname, "../fixtures/pan-card.png");
    await page.setInputFiles('input[type="file"]', filePath);
    await page.click("text=Next");

    // STEP 5
    await page.fill('input[name="memberEmail"]', "member@chatblix.com");
    await page.click("text=Finish");

    await expect(page).toHaveURL("/login");
    await expect(
      page.getByText("Onboarding completed successfully"),
    ).toBeVisible();
  });
});
