import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/login");
  });

  test("should display login form", async ({ page }) => {
    await expect(page.getByLabel("Email / Phone Number")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await page.getByRole("button", { name: "Sign In", exact: true }).click();
  });

  test("should show error on invalid credentials", async ({ page }) => {
    await page.getByLabel("Email / Phone Number").fill("test@example.com");
    await page.getByLabel("Password").fill("short");
    await page.getByRole("button", { name: "Sign In", exact: true }).click();

    await expect(
      page.getByText("Password must be at least 6 characters long."),
    ).toBeVisible();
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    await page.getByLabel("Email / Phone Number").fill("admin@example.com");
    await page.getByLabel("Password").fill("Password123!");
    await page.getByRole("button", { name: "Sign In", exact: true }).click();

    await expect(page).toHaveURL(/\/[^/]+\/admin\/dashboard$/);

    const url = page.url();
    const slugMatch = url.match(/\/([^/]+)\/admin\/dashboard$/);
    expect(slugMatch).not.toBeNull();
    const slug = slugMatch![1];
    console.log("Logged in tenant slug:", slug);

    await expect(page.getByText("Welcome")).toBeVisible();
  });
});
