import { Platform } from "../features/dashboard/admin/pages/conversation/mockData/customerConversationMockData";

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
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "tiktok", label: "TikTok" },
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
