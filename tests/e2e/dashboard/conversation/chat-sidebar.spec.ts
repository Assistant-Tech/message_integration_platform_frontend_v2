import { test, expect } from "@playwright/test";

test.describe("ChatSidebar", () => {
  test.beforeEach(async ({ page }) => {
    // Mock conversations list
    await page.route("**/internal-conversations*", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          data: [
            {
              _id: "conv-1",
              title: "Test Conversation",
              type: "INTERNAL",
              status: "open",
              priority: "normal",
              updatedAt: new Date().toISOString(),
            },
          ],
        }),
      });
    });

    // Mock create conversation
    await page.route("**/internal-conversations", async (route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({
          status: 201,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              _id: "conv-2",
              title: "New Test Conversation",
              type: "INTERNAL",
              status: "open",
              priority: "normal",
              updatedAt: new Date().toISOString(),
            },
            message: "Conversation created",
          }),
        });
      }
    });

    // Mock delete conversation
    await page.route("**/internal-conversations/*", async (route) => {
      if (route.request().method() === "DELETE") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ message: "Deleted" }),
        });
      }
    });

    await page.goto(
      "http://localhost:5173/tenant-example-1/admin/conversation",
    );

    // Wait for the page to be ready
    await page.waitForLoadState("networkidle");
  });

  test("loads and displays conversations", async ({ page }) => {
    // Just check if any conversation-like element is visible
    await expect(page.locator('text="Test Conversation"').first()).toBeVisible({
      timeout: 10000,
    });
  });

  test("opens create form when clicking new button", async ({ page }) => {
    // Look for any button with "new" or "create" text (case insensitive)
    const newButton = page
      .locator("button")
      .filter({ hasText: /new|create|add/i })
      .first();
    await newButton.click();

    // Check if a title input appears
    await expect(
      page
        .locator('input[name="title"], input[placeholder*="title" i]')
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });

  test("filters conversations with search", async ({ page }) => {
    // Wait for conversation to load first
    await expect(
      page.locator('text="Test Conversation"').first(),
    ).toBeVisible();

    // Find search input
    const searchInput = page
      .locator('input[placeholder*="search" i], input[type="search"]')
      .first();
    await searchInput.fill("nonexistent");
    await page.waitForTimeout(500); // Wait for filter to apply

    // The conversation should not be visible
    await expect(page.locator('text="Test Conversation"')).not.toBeVisible();
  });

  test("shows refresh button", async ({ page }) => {
    // Just verify a refresh-like button exists
    await expect(
      page
        .locator("button")
        .filter({ hasText: /refresh|reload/i })
        .first(),
    ).toBeVisible();
  });
});
