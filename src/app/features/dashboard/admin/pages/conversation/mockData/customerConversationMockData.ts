// ─── Types ───────────────────────────────────────────────────────────────────

export type Platform = "facebook" | "instagram" | "tiktok" | "whatsapp";
export type ConversationStatus = "unassigned" | "assigned" | "resolved";
export type LeadSource = "ads" | "returning" | "referral";

export interface ConversationMessage {
  _id: string;
  sender: "customer" | "agent";
  senderName: string;
  content: string;
  timestamp: string;
  type?: "text" | "image";
  replyTo?: {
    _id: string;
    senderName: string;
    content: string;
  };
}

export interface CustomerConversation {
  _id: string;
  contactName: string;
  platform: Platform;
  leadSource?: LeadSource;
  lastMessage: string;
  /** If true, the last message was sent by the agent: prefixed with "You: " */
  sentByAgent: boolean;
  timestamp: string;
  unreadCount?: number;
  tags?: string[];
  status: ConversationStatus;
  assignedTo?: string;
  messages: ConversationMessage[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const BASE = new Date("2026-03-10T14:24:00").getTime();

/** Returns an ISO string N minutes before the base time */
const minutesAgo = (n: number) => new Date(BASE - n * 60_000).toISOString();

/** Returns an ISO string N days before the base time */
const daysAgo = (n: number) => new Date(BASE - n * 86_400_000).toISOString();

// ─── Mock Conversations ───────────────────────────────────────────────────────

export const customerConversations: CustomerConversation[] = [
  // ── Instagram ──────────────────────────────────────────────────────────────
  {
    _id: "ig-001",
    contactName: "Jerry Helfer",
    platform: "instagram",
    leadSource: "ads",
    lastMessage: "I loved your product.",
    sentByAgent: false,
    timestamp: daysAgo(659),
    unreadCount: 0,
    tags: ["Bought", "Delivered"],
    status: "assigned",
    assignedTo: "agent-1",
    messages: [
      {
        _id: "ig-001-m1",
        sender: "customer",
        senderName: "Jerry Helfer",
        content: "Hey! I just received my order 🎉",
        timestamp: daysAgo(659),
      },
      {
        _id: "ig-001-m2",
        sender: "agent",
        senderName: "You",
        content: "That's wonderful to hear! How was the delivery experience?",
        timestamp: daysAgo(659),
      },
      {
        _id: "ig-001-m3",
        sender: "customer",
        senderName: "Jerry Helfer",
        content: "I loved your product.",
        timestamp: daysAgo(659),
      },
    ],
  },
  {
    _id: "ig-002",
    contactName: "Anna Smith",
    platform: "instagram",
    leadSource: "ads",
    lastMessage: "Is this still available?",
    sentByAgent: false,
    timestamp: daysAgo(3),
    unreadCount: 1,
    tags: [],
    status: "unassigned",
    messages: [
      {
        _id: "ig-002-m1",
        sender: "customer",
        senderName: "Anna Smith",
        content: "Hi! Saw your latest post — amazing 🔥",
        timestamp: daysAgo(3),
      },
      {
        _id: "ig-002-m2",
        sender: "customer",
        senderName: "Anna Smith",
        content: "Is this still available?",
        timestamp: daysAgo(3),
      },
    ],
  },
  {
    _id: "ig-003",
    contactName: "Liam Torres",
    platform: "instagram",
    // leadSource: "organic",
    lastMessage: "Thank you so much!",
    sentByAgent: false,
    timestamp: daysAgo(1),
    unreadCount: 0,
    // tags: ["Bought"],
    status: "assigned",
    assignedTo: "agent-2",
    messages: [
      {
        _id: "ig-003-m1",
        sender: "customer",
        senderName: "Liam Torres",
        content: "My order arrived today in perfect condition.",
        timestamp: daysAgo(1),
      },
      {
        _id: "ig-003-m2",
        sender: "agent",
        senderName: "You",
        content: "Glad to hear that! Enjoy your purchase 😊",
        timestamp: daysAgo(1),
      },
      {
        _id: "ig-003-m3",
        sender: "customer",
        senderName: "Liam Torres",
        content: "Thank you so much!",
        timestamp: daysAgo(1),
      },
    ],
  },

  // ── Facebook ───────────────────────────────────────────────────────────────
  {
    _id: "fb-001",
    contactName: "Jerry Helfer",
    platform: "facebook",
    leadSource: "ads",
    lastMessage: "Hey. What's the price of this?",
    sentByAgent: false,
    timestamp: minutesAgo(0),
    unreadCount: 2,
    tags: [],
    status: "unassigned",
    messages: [
      {
        _id: "fb-001-m1",
        sender: "customer",
        senderName: "Jerry Helfer",
        content: "Hey. What's the price of this?",
        timestamp: minutesAgo(0),
      },
    ],
  },
  {
    _id: "fb-002",
    contactName: "Maria Johnson",
    platform: "facebook",
    leadSource: "returning",
    lastMessage: "The price of the product you mentioned is $49.99.",
    sentByAgent: true,
    timestamp: daysAgo(659),
    unreadCount: 0,
    tags: ["Bought", "Delivered"],
    status: "assigned",
    assignedTo: "agent-1",
    messages: [
      {
        _id: "fb-002-m1",
        sender: "customer",
        senderName: "Maria Johnson",
        content: "Can you send me details about the black hoodie?",
        timestamp: daysAgo(659),
      },
      {
        _id: "fb-002-m2",
        sender: "agent",
        senderName: "You",
        content: "The price of the product you mentioned is $49.99.",
        timestamp: daysAgo(659),
      },
      {
        _id: "fb-002-m3",
        sender: "customer",
        senderName: "Maria Johnson",
        content: "Perfect, I'll take two!",
        timestamp: daysAgo(659),
      },
    ],
  },
  {
    _id: "fb-003",
    contactName: "Chris Park",
    platform: "facebook",
    leadSource: "referral",
    lastMessage: "When will it be restocked?",
    sentByAgent: false,
    timestamp: daysAgo(2),
    unreadCount: 3,
    tags: [],
    status: "unassigned",
    messages: [
      {
        _id: "fb-003-m1",
        sender: "customer",
        senderName: "Chris Park",
        content: "I've been waiting for the XL size for weeks.",
        timestamp: daysAgo(2),
      },
      {
        _id: "fb-003-m2",
        sender: "customer",
        senderName: "Chris Park",
        content: "When will it be restocked?",
        timestamp: daysAgo(2),
      },
    ],
  },

  // ── TikTok ─────────────────────────────────────────────────────────────────
  {
    _id: "tt-001",
    contactName: "Jerry Helfer",
    platform: "tiktok",
    leadSource: "ads",
    lastMessage: "I loved your product.",
    sentByAgent: false,
    timestamp: daysAgo(659),
    unreadCount: 0,
    tags: ["Bought", "Delivered"],
    status: "assigned",
    assignedTo: "agent-2",
    messages: [
      {
        _id: "tt-001-m1",
        sender: "customer",
        senderName: "Jerry Helfer",
        content: "Saw your product on TikTok — it went viral!",
        timestamp: daysAgo(659),
      },
      {
        _id: "tt-001-m2",
        sender: "customer",
        senderName: "Jerry Helfer",
        content: "I loved your product.",
        timestamp: daysAgo(659),
      },
    ],
  },
  {
    _id: "tt-002",
    contactName: "Sophia Lee",
    platform: "tiktok",
    leadSource: "ads",
    lastMessage: "Do you ship internationally?",
    sentByAgent: false,
    timestamp: daysAgo(1),
    unreadCount: 1,
    tags: [],
    status: "unassigned",
    messages: [
      {
        _id: "tt-002-m1",
        sender: "customer",
        senderName: "Sophia Lee",
        content: "Obsessed with your latest video! 😍",
        timestamp: daysAgo(1),
      },
      {
        _id: "tt-002-m2",
        sender: "customer",
        senderName: "Sophia Lee",
        content: "Do you ship internationally?",
        timestamp: daysAgo(1),
      },
    ],
  },
  {
    _id: "tt-003",
    contactName: "Kyle Bennett",
    platform: "tiktok",
    leadSource: "ads",
    lastMessage: "How long does shipping take?",
    sentByAgent: false,
    timestamp: minutesAgo(45),
    unreadCount: 0,
    tags: [],
    status: "unassigned",
    messages: [
      {
        _id: "tt-003-m1",
        sender: "customer",
        senderName: "Kyle Bennett",
        content: "Just placed my order!",
        timestamp: minutesAgo(45),
      },
      {
        _id: "tt-003-m2",
        sender: "customer",
        senderName: "Kyle Bennett",
        content: "How long does shipping take?",
        timestamp: minutesAgo(45),
      },
    ],
  },

  // ── WhatsApp ───────────────────────────────────────────────────────────────
  {
    _id: "wa-001",
    contactName: "Jerry Helfer",
    platform: "whatsapp",
    leadSource: "ads",
    lastMessage: "The price of the product yo...",
    sentByAgent: true,
    timestamp: daysAgo(659),
    unreadCount: 0,
    tags: ["Bought", "Delivered"],
    status: "assigned",
    assignedTo: "agent-1",
    messages: [
      {
        _id: "wa-001-m1",
        sender: "customer",
        senderName: "Jerry Helfer",
        content: "Hi, what's the price of the grey jacket?",
        timestamp: daysAgo(659),
      },
      {
        _id: "wa-001-m2",
        sender: "agent",
        senderName: "You",
        content: "The price of the product you're asking about is $75.",
        timestamp: daysAgo(659),
      },
      {
        _id: "wa-001-m3",
        sender: "customer",
        senderName: "Jerry Helfer",
        content: "Awesome, placing my order now.",
        timestamp: daysAgo(659),
      },
    ],
  },
  {
    _id: "wa-002",
    contactName: "Noah Wilson",
    platform: "whatsapp",
    leadSource: "returning",
    lastMessage: "Order confirmed! Thank you.",
    sentByAgent: true,
    timestamp: minutesAgo(10),
    unreadCount: 0,
    tags: ["Bought"],
    status: "assigned",
    assignedTo: "agent-1",
    messages: [
      {
        _id: "wa-002-m1",
        sender: "customer",
        senderName: "Noah Wilson",
        content: "I'd like to place an order for item #234.",
        timestamp: minutesAgo(10),
      },
      {
        _id: "wa-002-m2",
        sender: "agent",
        senderName: "You",
        content: "Order confirmed! Thank you.",
        timestamp: minutesAgo(10),
      },
    ],
  },
  {
    _id: "wa-003",
    contactName: "Emma Davis",
    platform: "whatsapp",
    leadSource: "ads",
    lastMessage: "What colors are available?",
    sentByAgent: false,
    timestamp: daysAgo(1),
    unreadCount: 2,
    tags: [],
    status: "unassigned",
    messages: [
      {
        _id: "wa-003-m1",
        sender: "customer",
        senderName: "Emma Davis",
        content: "Hello! I'm interested in the summer collection.",
        timestamp: daysAgo(1),
      },
      {
        _id: "wa-003-m2",
        sender: "customer",
        senderName: "Emma Davis",
        content: "What colors are available?",
        timestamp: daysAgo(1),
      },
    ],
  },
  {
    _id: "wa-004",
    contactName: "Oliver King",
    platform: "whatsapp",
    leadSource: "referral",
    lastMessage: "Can I get a refund?",
    sentByAgent: false,
    timestamp: daysAgo(5),
    unreadCount: 4,
    tags: ["Bought"],
    status: "unassigned",
    messages: [
      {
        _id: "wa-004-m1",
        sender: "customer",
        senderName: "Oliver King",
        content: "I received the wrong size.",
        timestamp: daysAgo(5),
      },
      {
        _id: "wa-004-m2",
        sender: "customer",
        senderName: "Oliver King",
        content: "Can I get a refund?",
        timestamp: daysAgo(5),
      },
    ],
  },
];

// ─── Utility Exports ──────────────────────────────────────────────────────────

export const PLATFORM_GROUPS: Platform[] = [
  "instagram",
  "facebook",
  "tiktok",
  "whatsapp",
];

export const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  whatsapp: "WhatsApp",
};

export const TAG_STYLES: Record<string, string> = {
  Bought: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Refund: "bg-red-100 text-red-700",
};

export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  ads: "Ads",
  // organic: "Organic",
  returning: "Returning",
  referral: "Referral",
};

export const LEAD_SOURCE_STYLES: Record<LeadSource, string> = {
  ads: "border border-[#ffd39a] bg-[#fff1df] text-[#b86500]",
  // organic: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  returning: "border border-blue-200 bg-blue-50 text-blue-700",
  referral: "border border-violet-200 bg-violet-50 text-violet-700",
};
