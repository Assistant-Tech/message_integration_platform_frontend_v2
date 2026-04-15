import { Page } from "@playwright/test";

export const mockInternalConversationApis = async (page: Page) => {
  await page.route("**/internal-conversations?**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: [
          {
            _id: "conv1",
            title: "Test Conversation 1",
            priority: "normal",
            status: "open",
            updatedAt: new Date().toISOString(),
          },
          {
            _id: "conv2",
            title: "Test Conversation 2",
            priority: "high",
            status: "closed",
            updatedAt: new Date().toISOString(),
          },
        ],
      }),
    });
  });

  await page.route("**/internal-conversations/*/members", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: [{ id: "user1", name: "John Doe", email: "john@test.com" }],
      }),
    });
  });

  await page.route("**/internal-conversations/*", async (route) => {
    if (route.request().method() === "DELETE") {
      await route.fulfill({ status: 200 });
      return;
    }
    await route.continue();
  });
};
