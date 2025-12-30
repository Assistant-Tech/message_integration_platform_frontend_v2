import { test, expect } from "@playwright/test";

test("should show error if onboarding API fails", async ({ page }) => {
  await page.route("**/auth/onboarding", (route) =>
    route.fulfill({
      status: 500,
      body: JSON.stringify({ message: "Server error" }),
    }),
  );

  await page.goto("/onboarding");

  // Fill minimal required steps
  await page.fill('input[name="companyName"]', "Chatblix");
  await page.click("text=Next");

  await page.fill('input[name="country"]', "Nepal");
  await page.click("text=Next");

  await page.selectOption('select[name="industry"]', "IT");
  await page.click("text=Finish");

  await expect(page.getByText("Failed to submit onboarding")).toBeVisible();
});
