import { test, expect } from "@playwright/test";

test.describe("ChatPanel", () => {
  test.beforeEach(async ({ page }) => {
    // Mock conversations list
    await page.route("**/internal-conversations*", async (route) => {
      if (route.request().url().includes("members")) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ data: [] }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: [
              {
                _id: "conv-1",
                title: "Test Chat",
                type: "INTERNAL",
                status: "open",
                priority: "normal",
                updatedAt: new Date().toISOString(),
              },
            ],
          }),
        });
      }
    });

    // Mock specific conversation details
    await page.route("**/internal-conversations/conv-1", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          data: {
            _id: "conv-1",
            title: "Test Chat",
            type: "INTERNAL",
            status: "open",
            priority: "normal",
            updatedAt: new Date().toISOString(),
          },
        }),
      });
    });

    // Mock tenant users
    await page.route("**/tenant/users*", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ data: [] }),
      });
    });

    await page.goto(
      "http://localhost:5173/tenant-example-1/admin/conversation",
    );
    await page.waitForLoadState("networkidle");
  });

  test("allows typing and sending message", async ({ page }) => {
    // Select conversation
    const conversation = page.locator('text="Test Chat"').first();
    if (await conversation.isVisible({ timeout: 5000 })) {
      await conversation.click();
      await page.waitForTimeout(1000);
    }

    // Find message input
    const input = page
      .locator(
        'textarea, input[placeholder*="message" i], input[placeholder*="type" i]',
      )
      .first();
    await input.waitFor({ state: "visible", timeout: 10000 });

    // Type message
    await input.fill("Test message");

    // Find and click send button
    const sendButton = page
      .locator("button")
      .filter({ hasText: /send/i })
      .first();
    await sendButton.click();

    // Verify message appears in chat
    await expect(page.locator('text="Test message"')).toBeVisible({
      timeout: 5000,
    });
  });

  test("chat header is visible with conversation title", async ({ page }) => {
    // Select conversation
    const conversation = page.locator('text="Test Chat"').first();
    if (await conversation.isVisible({ timeout: 5000 })) {
      await conversation.click();
      await page.waitForTimeout(1000);
    }

    // Check if title appears in header (could be h1, h2, or any heading)
    await expect(
      page.locator("h1, h2, h3, h4").filter({ hasText: "Test Chat" }).first(),
    ).toBeVisible({ timeout: 10000 });
  });
});
