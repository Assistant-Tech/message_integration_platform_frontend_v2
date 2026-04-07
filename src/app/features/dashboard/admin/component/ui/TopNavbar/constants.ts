import { APP_ROUTES } from "@/app/constants/routes";
import type { SearchDestination, UserRoleType } from "./types";

/* ─── Search shortcut display ─────────────────────────────────────────────── */

/**
 * Returns the platform-appropriate label for the global search shortcut.
 * Defaults to Ctrl during SSR / when navigator is undefined.
 */
export const getSearchShortcutLabel = (): string => {
  if (typeof navigator === "undefined") return "Ctrl K";
  return navigator.platform.includes("Mac") ? "⌘ K" : "Ctrl K";
};

/* ─── Search destinations factory ─────────────────────────────────────────── */

/**
 * Builds the global search destination list for the given workspace + role.
 *
 * Pure function — no React, no side effects. Memoise at the call-site if
 * the inputs are stable.
 *
 * @param slug      Workspace slug from the URL. If absent, returns an empty list.
 * @param roleType  User role; MEMBER receives a slimmed-down list.
 */
export function buildSearchDestinations(
  slug: string | undefined,
  roleType: UserRoleType,
): SearchDestination[] {
  if (!slug) return [];

  if (roleType === "MEMBER") {
    return [
      {
        label: "Dashboard",
        description: "Overview of your personal workspace activity",
        href: `/app/${slug}/dashboard`,
        keywords: ["home", "overview", "workspace"],
        section: "Workspace",
      },
      {
        label: "Profile Settings",
        description: "Manage your account details and preferences",
        href: `/app/${slug}/dashboard/settings/profile`,
        keywords: ["profile", "settings", "account"],
        section: "Settings",
      },
    ];
  }

  return [
    {
      label: "Dashboard",
      description: "Overview of workspace activity and account health",
      href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.DASHBOARD}`,
      keywords: ["home", "overview", "workspace"],
      section: "Workspace",
    },
    {
      label: "Conversations",
      description: "Monitor inbound customer conversations",
      href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.CONVERSATION}`,
      keywords: ["inbox", "messages", "chat"],
      section: "Workspace",
    },
    {
      label: "Channels",
      description: "Coordinate internal and external channel discussions",
      href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.CHANNEL}`,
      keywords: ["teams", "discussion", "internal"],
      section: "Workspace",
    },
    {
      label: "Contact",
      description: "View and manage your contact directory",
      href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.CONTACT}`,
      keywords: ["contacts", "people", "directory"],
      section: "Workspace",
    },
    {
      label: "Automation",
      description: "Configure automated replies and bot flows",
      href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.CHATBOT}`,
      keywords: ["automation", "bot", "assistant"],
      section: "Workspace",
    },
    // MVP 1: Orders and Products are intentionally excluded.
    {
      label: "Tags",
      description: "Organize conversations with reusable tags",
      href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.TAGS}`,
      keywords: ["labels", "categorize", "segment"],
      section: "Workspace",
    },
    {
      label: "Analytics",
      description: "Review conversation and business performance",
      href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.ANALYTICS}`,
      keywords: ["reports", "insights", "metrics"],
      section: "Insights",
    },
    {
      label: "Profile Settings",
      description: "Manage your account details and preferences",
      href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_PROFILE}`,
      keywords: ["profile", "settings", "account"],
      section: "Settings",
    },
    {
      label: "Company Settings",
      description: "Update company and workspace information",
      href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_COMPANY}`,
      keywords: ["business", "tenant", "company"],
      section: "Settings",
    },
    {
      label: "Security Settings",
      description: "Control authentication and security settings",
      href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_SECURITY}`,
      keywords: ["mfa", "password", "security"],
      section: "Settings",
    },
    {
      label: "Notification Settings",
      description: "Choose how notifications are delivered",
      href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_NOTIFICATIONS}`,
      keywords: ["alerts", "email", "notifications"],
      section: "Settings",
    },
    {
      label: "Role Management",
      description: "Assign permissions and manage workspace access",
      href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_ROLE_MANAGEMENT}`,
      keywords: ["permissions", "roles", "members"],
      section: "Settings",
    },
    {
      label: "Chat Settings",
      description: "Adjust chat defaults and routing behavior",
      href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_CHAT_SETTINGS}`,
      keywords: ["chat", "routing", "settings"],
      section: "Settings",
    },
    {
      label: "Shipping Settings",
      description: "Configure delivery and fulfilment options",
      href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_SHIPPING}`,
      keywords: ["shipping", "delivery", "logistics"],
      section: "Settings",
    },
    {
      label: "Subscription",
      description: "Review plan, billing, and renewals",
      href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_SUBSCRIPTION}`,
      keywords: ["billing", "plan", "subscription"],
      section: "Settings",
    },
    {
      label: "Integrations",
      description: "Connect external services and APIs",
      href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_INTEGRATION_SETTINGS}`,
      keywords: ["integrations", "api", "connections"],
      section: "Settings",
    },
  ];
}

/* ─── Search filter ──────────────────────────────────────────────────────── */

/**
 * Filters destinations against a free-text query.
 * Pure function — easy to unit test.
 */
export function filterSearchDestinations(
  destinations: SearchDestination[],
  query: string,
): SearchDestination[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return destinations;

  return destinations.filter((destination) => {
    const haystack = [
      destination.label,
      destination.description,
      destination.section,
      ...destination.keywords,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}

/* ─── Profile route resolver ─────────────────────────────────────────────── */

/**
 * Resolves the profile settings route for the given workspace + role.
 * Falls back to the admin profile route when no slug is available.
 */
export function resolveProfileRoute(
  slug: string | undefined,
  roleType: UserRoleType,
): string {
  if (!slug) return APP_ROUTES.ADMIN.SETTINGS_PROFILE;
  if (roleType === "MEMBER") return `/app/${slug}/dashboard/settings/profile`;
  return `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_PROFILE}`;
}
