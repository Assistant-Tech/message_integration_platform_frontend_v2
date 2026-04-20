/* ──────────────────────────────────────────────────────────────────────────
 *  ⚠️  TEMPORARY SHOWCASE MOCK DATA — FOR SCREENSHOTS ONLY  ⚠️
 *
 *  Populates the inbox with demo conversations + messages when the live API
 *  returns nothing, so marketing can capture a populated UI without wiring
 *  real channels.
 *
 *  HOW TO REMOVE (30 seconds):
 *    1.  Set `SHOWCASE_MOCK_ENABLED` below to `false` to instantly kill the
 *        mocks without deleting the file, OR
 *    2.  Delete this file, then strip the two `showcaseMock` imports in:
 *          - src/app/features/inbox/hooks/useInboxPage.ts
 *          - src/app/features/inbox/hooks/useMessage.ts
 *
 *  Mocks only surface when the API returns an empty list — real data always
 *  wins.
 * ──────────────────────────────────────────────────────────────────────── */

import type { Inbox } from "@/app/types/inbox.types";
import type { InboxMessage } from "@/app/types/message.types";

export const SHOWCASE_MOCK_ENABLED = false;

const ago = (minutes: number) =>
  new Date(Date.now() - minutes * 60_000).toISOString();

const AGENT = {
  id: "mock-agent-1",
  name: "Priya (You)",
  avatar: null,
};

const p = (userId: string, name: string) => ({
  userId,
  role: "MEMBER" as const,
  joinedAt: ago(60 * 24 * 30),
  leftAt: null,
  user: { id: userId, name, avatar: null },
});

/* ─── Conversations ────────────────────────────────────────────────────── */

export const MOCK_CONVERSATIONS: Inbox[] = [
  {
    id: "mock-1",
    title: "Priya Sharma",
    type: "CUSTOMER",
    channel: "WHATSAPP",
    isGroup: false,
    status: "OPEN",
    priority: "HIGH",
    assignedTo: null,
    lastMessageContent:
      "Hi! Is the size M still in stock? Need it by Friday 🙏",
    lastMessageAt: ago(2),
    unreadCount: 2,
    createdAt: ago(30),
    contact: {
      id: "mock-c-1",
      name: "Priya Sharma",
      email: "priya@acme.co",
      avatar: undefined,
    },
    assignedUser: null,
    participants: [p("mock-c-1", "Priya Sharma"), p(AGENT.id, AGENT.name)],
    isTyping: true,
  },
  {
    id: "mock-2",
    title: "James Rodriguez",
    type: "CUSTOMER",
    channel: "INSTAGRAM",
    isGroup: false,
    status: "OPEN",
    priority: "NORMAL",
    assignedTo: AGENT.id,
    lastMessageContent: "Thanks for the quick response! You guys rock 🎉",
    lastMessageAt: ago(15),
    unreadCount: 0,
    createdAt: ago(120),
    contact: {
      id: "mock-c-2",
      name: "James Rodriguez",
      email: "james.r@outlook.com",
      avatar: undefined,
    },
    assignedUser: AGENT,
    participants: [p("mock-c-2", "James Rodriguez"), p(AGENT.id, AGENT.name)],
  },
  {
    id: "mock-3",
    title: "Emily Chen",
    type: "CUSTOMER",
    channel: "FACEBOOK",
    isGroup: false,
    status: "OPEN",
    priority: "NORMAL",
    assignedTo: null,
    lastMessageContent: "Can I change my delivery address?",
    lastMessageAt: ago(23),
    unreadCount: 1,
    createdAt: ago(200),
    contact: {
      id: "mock-c-3",
      name: "Emily Chen",
      avatar: undefined,
    },
    assignedUser: null,
    participants: [p("mock-c-3", "Emily Chen"), p(AGENT.id, AGENT.name)],
  },
  {
    id: "mock-4",
    title: "Kai Tanaka",
    type: "CUSTOMER",
    channel: "TIKTOK",
    isGroup: false,
    status: "OPEN",
    priority: "HIGH",
    assignedTo: null,
    lastMessageContent: "Saw your video — do you ship to Japan? 🇯🇵",
    lastMessageAt: ago(45),
    unreadCount: 3,
    createdAt: ago(90),
    contact: {
      id: "mock-c-4",
      name: "Kai Tanaka",
      avatar: undefined,
    },
    assignedUser: null,
    participants: [p("mock-c-4", "Kai Tanaka"), p(AGENT.id, AGENT.name)],
  },
  {
    id: "mock-5",
    title: "Marcus Williams",
    type: "CUSTOMER",
    channel: "WHATSAPP",
    isGroup: false,
    status: "OPEN",
    priority: "LOW",
    assignedTo: AGENT.id,
    lastMessageContent: "Got the package today, loving it 🙌",
    lastMessageAt: ago(62),
    unreadCount: 0,
    createdAt: ago(1440),
    contact: {
      id: "mock-c-5",
      name: "Marcus Williams",
      avatar: undefined,
    },
    assignedUser: AGENT,
    participants: [p("mock-c-5", "Marcus Williams"), p(AGENT.id, AGENT.name)],
  },
  {
    id: "mock-6",
    title: "Sofia Reyes",
    type: "CUSTOMER",
    channel: "INSTAGRAM",
    isGroup: false,
    status: "OPEN",
    priority: "NORMAL",
    assignedTo: null,
    lastMessageContent: "Is this still available in red?",
    lastMessageAt: ago(118),
    unreadCount: 0,
    createdAt: ago(500),
    contact: {
      id: "mock-c-6",
      name: "Sofia Reyes",
      avatar: undefined,
    },
    assignedUser: null,
    participants: [p("mock-c-6", "Sofia Reyes"), p(AGENT.id, AGENT.name)],
  },
  {
    id: "mock-7",
    title: "Ahmed Al-Farsi",
    type: "CUSTOMER",
    channel: "WHATSAPP",
    isGroup: false,
    status: "OPEN",
    priority: "HIGH",
    assignedTo: AGENT.id,
    lastMessageContent: "Can you confirm my order #A-4521?",
    lastMessageAt: ago(190),
    unreadCount: 1,
    createdAt: ago(300),
    contact: {
      id: "mock-c-7",
      name: "Ahmed Al-Farsi",
      avatar: undefined,
    },
    assignedUser: AGENT,
    participants: [p("mock-c-7", "Ahmed Al-Farsi"), p(AGENT.id, AGENT.name)],
  },
  {
    id: "mock-8",
    title: "Leila Moreau",
    type: "CUSTOMER",
    channel: "FACEBOOK",
    isGroup: false,
    status: "CLOSED",
    priority: "LOW",
    assignedTo: AGENT.id,
    lastMessageContent: "Where can I leave a review? Happy to help 🌟",
    lastMessageAt: ago(305),
    unreadCount: 0,
    createdAt: ago(700),
    contact: {
      id: "mock-c-8",
      name: "Leila Moreau",
      avatar: undefined,
    },
    assignedUser: AGENT,
    participants: [p("mock-c-8", "Leila Moreau"), p(AGENT.id, AGENT.name)],
  },
  {
    id: "mock-9",
    title: "Omar Khan",
    type: "CUSTOMER",
    channel: "TIKTOK",
    isGroup: false,
    status: "OPEN",
    priority: "NORMAL",
    assignedTo: null,
    lastMessageContent: "Love the new drop 🔥 when's the next?",
    lastMessageAt: ago(480),
    unreadCount: 2,
    createdAt: ago(900),
    contact: {
      id: "mock-c-9",
      name: "Omar Khan",
      avatar: undefined,
    },
    assignedUser: null,
    participants: [p("mock-c-9", "Omar Khan"), p(AGENT.id, AGENT.name)],
  },
  {
    id: "mock-10",
    title: "Launch huddle",
    type: "INTERNAL",
    channel: "WHATSAPP",
    isGroup: true,
    status: "OPEN",
    priority: "NORMAL",
    assignedTo: AGENT.id,
    lastMessageContent: "David: Checklist looks solid — shipping at 5pm.",
    lastMessageAt: ago(340),
    unreadCount: 0,
    createdAt: ago(2880),
    contact: {
      id: "mock-c-10",
      name: "Launch huddle",
      avatar: undefined,
    },
    assignedUser: AGENT,
    participants: [
      p("mock-agent-2", "David Park"),
      p("mock-agent-3", "Amara Okafor"),
      p(AGENT.id, AGENT.name),
    ],
  },
];

/* ─── Messages — per conversation ──────────────────────────────────────── */

const mkCustomer = (
  id: string,
  conv: Inbox,
  content: string,
  offsetMin: number,
  type: InboxMessage["type"] = "TEXT",
): InboxMessage => ({
  id,
  sender: "customer",
  senderName: "CUSTOMER",
  senderId: conv.contact.id,
  profilePicUrl: conv.contact.avatar ?? null,
  content,
  timestamp: ago(offsetMin),
  type,
  status: "DELIVERED",
  attachments: [],
  replyTo: null,
});

const mkAgent = (
  id: string,
  content: string,
  offsetMin: number,
): InboxMessage => ({
  id,
  sender: "agent",
  senderName: "AGENT",
  senderId: AGENT.id,
  profilePicUrl: null,
  content,
  timestamp: ago(offsetMin),
  type: "TEXT",
  status: "READ",
  attachments: [],
  replyTo: null,
});

export const MOCK_MESSAGES: Record<string, InboxMessage[]> = {
  "mock-1": [
    mkCustomer(
      "m1-1",
      MOCK_CONVERSATIONS[0]!,
      "Hey! Loving the new collection 😍",
      30,
    ),
    mkAgent("m1-2", "Thanks Priya! Anything I can help you find?", 28),
    mkCustomer(
      "m1-3",
      MOCK_CONVERSATIONS[0]!,
      "The olive linen blazer — do you still have size M?",
      10,
    ),
    mkAgent("m1-4", "Checking stock for you now — one sec! 🔎", 8),
    mkCustomer(
      "m1-5",
      MOCK_CONVERSATIONS[0]!,
      "Hi! Is the size M still in stock? Need it by Friday 🙏",
      2,
    ),
  ],
  "mock-2": [
    mkCustomer(
      "m2-1",
      MOCK_CONVERSATIONS[1]!,
      "Yo — order arrived! The packaging is gorgeous.",
      60,
    ),
    mkAgent(
      "m2-2",
      "So glad you love it, James! Tag us if you post — we'll repost ✨",
      55,
    ),
    mkCustomer(
      "m2-3",
      MOCK_CONVERSATIONS[1]!,
      "Thanks for the quick response! You guys rock 🎉",
      15,
    ),
  ],
  "mock-3": [
    mkCustomer(
      "m3-1",
      MOCK_CONVERSATIONS[2]!,
      "Hi! I placed order #B-8821 this morning.",
      60,
    ),
    mkAgent("m3-2", "Got it — what can I help with?", 55),
    mkCustomer(
      "m3-3",
      MOCK_CONVERSATIONS[2]!,
      "Can I change my delivery address?",
      23,
    ),
  ],
  "mock-4": [
    mkCustomer("m4-1", MOCK_CONVERSATIONS[3]!, "Your TikTok is unreal 🤯", 90),
    mkCustomer(
      "m4-2",
      MOCK_CONVERSATIONS[3]!,
      "Gotta ask — how are you shipping so fast?",
      80,
    ),
    mkAgent(
      "m4-3",
      "Hey Kai! We partner with a local 3PL in each region 🚀",
      75,
    ),
    mkCustomer(
      "m4-4",
      MOCK_CONVERSATIONS[3]!,
      "Saw your video — do you ship to Japan? 🇯🇵",
      45,
    ),
  ],
  "mock-5": [
    mkCustomer(
      "m5-1",
      MOCK_CONVERSATIONS[4]!,
      "Got the package today, loving it 🙌",
      62,
    ),
    mkAgent("m5-2", "Thanks Marcus! Enjoy 😄", 60),
  ],
  "mock-6": [
    mkCustomer(
      "m6-1",
      MOCK_CONVERSATIONS[5]!,
      "Is this still available in red?",
      118,
    ),
  ],
  "mock-7": [
    mkCustomer(
      "m7-1",
      MOCK_CONVERSATIONS[6]!,
      "Can you confirm my order #A-4521?",
      190,
    ),
    mkAgent("m7-2", "Let me pull that up for you.", 188),
  ],
  "mock-8": [
    mkCustomer(
      "m8-1",
      MOCK_CONVERSATIONS[7]!,
      "Where can I leave a review? Happy to help 🌟",
      305,
    ),
    mkAgent(
      "m8-2",
      "You're the best, Leila! Here's the link 👉 chatblix.com/review",
      300,
    ),
  ],
  "mock-9": [
    mkCustomer(
      "m9-1",
      MOCK_CONVERSATIONS[8]!,
      "Love the new drop 🔥 when's the next?",
      480,
    ),
    mkCustomer(
      "m9-2",
      MOCK_CONVERSATIONS[8]!,
      "Also — is pre-order a thing?",
      475,
    ),
  ],
  "mock-10": [
    mkAgent("m10-1", "Morning team — quick sync on launch?", 360),
    {
      id: "m10-2",
      sender: "agent",
      senderName: "David Park",
      senderId: "mock-agent-2",
      profilePicUrl: null,
      content: "Checklist looks solid — shipping at 5pm.",
      timestamp: ago(340),
      type: "TEXT",
      status: "READ",
      attachments: [],
      replyTo: null,
    },
  ],
};
