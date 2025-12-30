import { test, expect } from "@playwright/test";

test("should skip optional steps and submit", async ({ page }) => {
  await page.route("**/auth/onboarding", (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify({ success: true }),
    }),
  );

  await page.goto("/onboarding");

  // Step 1
  await page.fill('input[name="companyName"]', "Chatblix");
  await page.click("text=Next");

  // Step 2
  await page.fill('input[name="country"]', "Nepal");
  await page.click("text=Next");

  // Step 3
  await page.selectOption('select[name="industry"]', "IT");
  await page.click("text=Finish Early");

  await expect(page).toHaveURL("/login");
});
