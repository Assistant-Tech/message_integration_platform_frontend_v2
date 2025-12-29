import { test, expect } from "@playwright/test";

test.describe("Register Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/register");
  });

  /*
  test('should display registration form', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Full Name' }).click();
    await page.getByRole('textbox', { name: 'Full Name' }).fill('Milap Ramauli Magar');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('milap12@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Password123!');
    await page.getByRole('button', { name: 'Show password' }).click();
    await page.getByRole('textbox', { name: 'Confirm Password' }).click();
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill('Password123!');
    await page.getByRole('button', { name: 'Hide password' }).click();
    await page.getByRole('button', { name: 'Create Account' }).click();
  });
  */

  test("should display registration form", async ({ page }) => {
    await expect(page.getByLabel("Full Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await page
      .getByRole("button", { name: "Create Account", exact: true })
      .click();
  });

  test("should show error on invalid credentials", async ({ page }) => {
    await page.getByLabel("Full Name").fill("Test User");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password").fill("short");
    await page.getByLabel("Confirm Password").fill("short");
    await page
      .getByRole("button", { name: "Create Account", exact: true })
      .click();
    await expect(
      page.getByText("Password must be at least 6 characters long."),
    ).toBeVisible();
  });

  test("should registration successfully with valid credentials", async ({
    page,
  }) => {
    await page.getByLabel("Full Name").fill("Admin User");
    await page.getByLabel("Email").fill("admin@example.com");
    await page.getByLabel("Password").fill("Password123!");
    await page.getByLabel("Confirm Password").fill("Password123!");
    await page
      .getByRole("button", { name: "Create Account", exact: true })
      .click();
    await expect(page).toHaveURL("http://localhost:5173/check-email");
  });
});
