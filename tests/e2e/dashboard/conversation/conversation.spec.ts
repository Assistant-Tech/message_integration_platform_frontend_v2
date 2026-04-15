// import { test, expect } from "@playwright/test";

// const BASE_URL = "http://localhost:5173/tenant-example-1/admin/conversation";

// test.describe("Internal Conversation Page (E2E)", () => {
//   test.beforeEach(async ({ page }) => {
//     /* ---------------- MOCK: GET ALL CONVERSATIONS ---------------- */
//     await page.route("**/internal-conversations?**", async (route) => {
//       if (route.request().method() === "GET") {
//         await route.fulfill({
//           status: 200,
//           contentType: "application/json",
//           body: JSON.stringify({
//             data: [
//               {
//                 _id: "conv-1",
//                 title: "Support Chat",
//                 priority: "normal",
//                 updatedAt: new Date().toISOString(),
//                 lastMessage: "Hello",
//               },
//             ],
//           }),
//         });
//       }
//     });

//     /* ---------------- MOCK: GET CONVERSATION BY ID ---------------- */
//     await page.route("**/internal-conversations/conv-1", async (route) => {
//       if (route.request().method() === "GET") {
//         await route.fulfill({
//           status: 200,
//           contentType: "application/json",
//           body: JSON.stringify({
//             data: {
//               _id: "conv-1",
//               title: "Support Chat",
//               priority: "normal",
//             },
//           }),
//         });
//       }

//       if (route.request().method() === "PUT") {
//         await route.fulfill({
//           status: 200,
//           contentType: "application/json",
//           body: JSON.stringify({
//             data: {
//               _id: "conv-1",
//               title: "Updated Chat",
//               priority: "high",
//             },
//           }),
//         });
//       }

//       if (route.request().method() === "DELETE") {
//         await route.fulfill({
//           status: 200,
//           body: JSON.stringify({ success: true }),
//         });
//       }
//     });

//     /* ---------------- MOCK: GET MEMBERS ---------------- */
//     await page.route(
//       "**/internal-conversations/conv-1/members",
//       async (route) => {
//         await route.fulfill({
//           status: 200,
//           contentType: "application/json",
//           body: JSON.stringify({
//             data: [
//               {
//                 _id: "user-1",
//                 name: "John Doe",
//               },
//             ],
//           }),
//         });
//       },
//     );

//     /* ---------------- MOCK: CREATE CONVERSATION ---------------- */
//     await page.route("**/internal-conversations", async (route) => {
//       if (route.request().method() === "POST") {
//         const body = await route.request().postDataJSON();

//         await route.fulfill({
//           status: 201,
//           contentType: "application/json",
//           body: JSON.stringify({
//             data: {
//               _id: "conv-2",
//               title: body.title,
//               priority: body.priority,
//             },
//             message: "Conversation created",
//           }),
//         });
//       }
//     });

//     await page.goto(BASE_URL);
//   });

//   /* ----------------------------------------------------- */
//   /* 🧪 TESTS */
//   /* ----------------------------------------------------- */

//   test("loads conversation list", async ({ page }) => {
//     await expect(page.getByText("Support Chat")).toBeVisible();
//   });

//   test("selects a conversation and opens chat panel", async ({ page }) => {
//     await page.getByText("Support Chat").click();

//     await expect(
//       page.getByRole("heading", { name: "Support Chat" }),
//     ).toBeVisible();
//   });

//   test("sends a message (optimistic UI)", async ({ page }) => {
//     await page.getByText("Support Chat").click();

//     const input = page.getByPlaceholder(/type a message/i);
//     await input.fill("Hello from Playwright");

//     await page.getByRole("button", { name: /send/i }).click();

//     await expect(page.getByText("Hello from Playwright")).toBeVisible();
//   });

//   test("opens conversation details panel", async ({ page }) => {
//     await page.getByText("Support Chat").click();

//     await page.getByRole("button", { name: /details/i }).click();

//     await expect(page.getByText(/conversation details/i)).toBeVisible();
//   });

//   test("updates conversation title", async ({ page }) => {
//     await page.getByText("Support Chat").click();

//     await page.getByRole("button", { name: /edit/i }).click();

//     const titleInput = page.getByPlaceholder(/title/i);
//     await titleInput.fill("Updated Chat");

//     await page.getByRole("button", { name: /update/i }).click();

//     await expect(page.getByText("Updated Chat")).toBeVisible();
//   });

//   test("creates a new conversation from sidebar", async ({ page }) => {
//     await page.getByRole("button", { name: /new/i }).click();

//     await page.getByPlaceholder(/title/i).fill("New Conversation");
//     await page.getByRole("button", { name: /create/i }).click();

//     await expect(page.getByText("New Conversation")).toBeVisible();
//   });

//   test("search filters conversations", async ({ page }) => {
//     await page.getByPlaceholder(/search/i).fill("nothing");

//     await expect(page.getByText("Support Chat")).not.toBeVisible();
//   });

//   test("enters delete mode and deletes conversation", async ({ page }) => {
//     await page.getByRole("button", { name: /delete/i }).click();

//     await page.getByText("Support Chat").click();
//     await page.getByRole("button", { name: /confirm/i }).click();

//     await expect(page.getByText("Support Chat")).not.toBeVisible();
//   });
// });
