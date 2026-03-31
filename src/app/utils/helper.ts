import { Platform } from "../features/inbox/mocks/mockData/customerConversationMockData";

/**
 * Extracts and formats features from a plan's features object into a readable array
 */
export const extractFeatures = (
  features: Record<string, any> | string[],
): string[] => {
  const featuresList: string[] = [];

  // Case 1: When features are an array of strings
  if (Array.isArray(features)) {
    return features.map((feature: string) =>
      feature
        .split(" ")
        .map((word: string, index: number) =>
          index === 0
            ? word.charAt(0).toUpperCase() + word.slice(1)
            : word.toLowerCase(),
        )
        .join(" "),
    );
  }

  // Case 2: When features are an object with keys and values
  Object.entries(features).forEach(([key, value]) => {
    if (key === "includes") {
      featuresList.push(`Includes all ${value} features`);
    } else if (key === "channels" && Array.isArray(value)) {
      featuresList.push(
        `${value.length} Channels: ${value.map((ch) => ch.charAt(0).toUpperCase() + ch.slice(1)).join(", ")}`,
      );
    } else if (key === "chatAgents") {
      featuresList.push(`${value} Chat Agent${value > 1 ? "s" : ""}`);
    } else if (key === "integrations") {
      featuresList.push(`${value} Integration${value > 1 ? "s" : ""}`);
    } else if (typeof value === "boolean" && value) {
      // Convert camelCase to readable format
      const readableKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .replace(/Api/g, "API")
        .replace(/Ai/g, "AI");
      featuresList.push(readableKey);
    } else if (typeof value === "number" && value > 0) {
      const readableKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
      featuresList.push(`${readableKey}: ${value}`);
    }
  });

  return featuresList;
};

/**
 * Format secret code into suitable double liner
 */
export const formatSecret = (secret: string) => {
  return (
    secret
      .toUpperCase()
      .match(/.{1,4}/g)
      ?.join(" ") ?? ""
  );
};

export const formatCurrency = (amount: number, currency: "NPR" | "USD") => {
  const normalized = amount / 100;
  return currency === "NPR"
    ? `रु${normalized.toFixed(2)}`
    : `$${normalized.toFixed(2)}`;
};

// Channel Helpers
export const buildInviteCode = (channelId: string, title: string) => {
  const sanitizedTitle = title.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  const titlePart = sanitizedTitle.slice(0, 6).padEnd(6, "X");
  const idPart = channelId
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(-6)
    .toUpperCase();

  return `${titlePart}-${idPart || "SERVER"}`;
};

export const mapRole = (roleType?: string) => {
  if (roleType === "TENANT_ADMIN") {
    return "admin" as const;
  }

  if (roleType?.includes("MOD")) {
    return "moderator" as const;
  }

  return "member" as const;
};

export const mapStatus = (status?: string) => {
  if (status === "ONLINE") {
    return "online" as const;
  }

  return "offline" as const;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

type TabId = "all" | Platform;

export const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "FACEBOOK", label: "Facebook" },
  { id: "INSTAGRAM", label: "Instagram" },
  { id: "WHATSAPP", label: "WhatsApp" },
  { id: "TIKTOK", label: "TikTok" },
];

export const formatTimestamp = (iso: string): string => {
  const date = new Date(iso);
  const now = new Date("2026-03-10T14:24:00");
  const diff = now.getTime() - date.getTime();
  const ONE_DAY = 86_400_000;

  if (diff < ONE_DAY) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
};

// TOPNAV
export const getRouteMeta = (pathname: string) => {
  const routes = [
    {
      match: /\/admin\/dashboard$/,
      title: "Dashboard",
      subtitle: "Overview of your workspace and activity",
    },
    {
      match: /\/conversation$/,
      title: "Inbox",
      subtitle: "Manage inbound customer messages across channels",
    },
    {
      match: /\/contact$/,
      title: "Contact",
      subtitle: "Manage contact records and account details",
    },
    {
      match: /\/channel$/,
      title: "Channels",
      subtitle: "Coordinate internal and external channel discussions",
    },
    {
      match: /\/channel\/settings\/.+$/,
      title: "Channel Settings",
      subtitle: "Review and manage connected pages for this channel",
    },
    {
      match: /\/chatbot$/,
      title: "Automation",
      subtitle: "Configure automated replies and bot experiences",
    },
    {
      match: /\/orders$/,
      title: "Orders",
      subtitle: "Track and manage customer orders",
    },
    {
      match: /\/tags$/,
      title: "Tags",
      subtitle: "Organize conversations with reusable labels",
    },
    {
      match: /\/analytics$/,
      title: "Analytics",
      subtitle: "Review performance and engagement trends",
    },
    {
      match: /\/settings\/profile$/,
      title: "Profile Settings",
      subtitle: "Manage account details and preferences",
    },
    {
      match: /\/settings\/company$/,
      title: "Company Settings",
      subtitle: "Update workspace and business information",
    },
    {
      match: /\/settings\/security$/,
      title: "Security Settings",
      subtitle: "Control authentication and access safeguards",
    },
    {
      match: /\/settings\/notifications$/,
      title: "Notification Settings",
      subtitle: "Choose when and how alerts are delivered",
    },
    {
      match: /\/settings\/role-management$/,
      title: "Role Management",
      subtitle: "Assign permissions and manage workspace access",
    },
    {
      match: /\/settings\/chat_settings$/,
      title: "Chat Settings",
      subtitle: "Adjust conversation defaults and chat behavior",
    },
    {
      match: /\/settings\/shipping$/,
      title: "Shipping Settings",
      subtitle: "Configure delivery options and fulfilment rules",
    },
    {
      match: /\/settings\/subscription/,
      title: "Subscription",
      subtitle: "Review billing, plans, and renewals",
    },
    {
      match: /\/settings\/integration/,
      title: "Integrations",
      subtitle: "Connect external services and APIs",
    },
    {
      match: /\/products/,
      title: "Products",
      subtitle: "Manage catalog items, variants, and inventory",
    },
    {
      match: /\/checkout$/,
      title: "Checkout",
      subtitle: "Review payment and order completion details",
    },
    {
      match: /\/dashboard\/settings\/profile$/,
      title: "Profile Settings",
      subtitle: "Manage account details and preferences",
    },
    {
      match: /\/dashboard$/,
      title: "Dashboard",
      subtitle: "Overview of your workspace and activity",
    },
  ];

  return (
    routes.find((route) => route.match.test(pathname)) ?? {
      title: "Workspace",
      subtitle: "Manage your day-to-day operations",
    }
  );
};

// Channel Helpers
export const getActiveCardClass = (provider: string): string => {
  if (provider === "facebook") {
    return "bg-gradient-to-br from-base-white via-information-light to-primary-light border-information";
  }

  if (provider === "instagram") {
    return "bg-gradient-to-br from-base-white via-warning-light to-danger-light border-warning";
  }

  if (provider === "tiktok") {
    return "bg-gradient-to-br from-grey via-grey to-danger border-grey";
  }

  return "bg-gradient-to-br from-base-white via-success-light to-primary-light border-success";
};

export const getActiveContentClass = (provider: string): string => {
  return provider === "tiktok" ? "text-base-white" : "text-grey";
};

export const getActiveMutedClass = (provider: string): string => {
  return provider === "tiktok" ? "text-grey-light" : "text-grey-medium";
};
