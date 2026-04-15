import {
  UserCircle2,
  Bell,
  ShieldCheck,
  Building2,
  UsersRound,
  Plug,
  MessagesSquare,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import { APP_ROUTES } from "@/app/constants/routes";

/**
 * Source of truth for the Settings sidebar.
 *
 * Open/closed: add a new section by pushing an item here — no component
 * edits needed. Role visibility is data, not conditionals in JSX.
 */

export type SettingsRole = "TENANT_ADMIN" | "MEMBER" | "CUSTOM";

export interface SettingsNavItem {
  id: string;
  label: string;
  description?: string;
  href: string;
  Icon: LucideIcon;
  /** Roles that can see this item. Empty = visible to everyone. */
  roles: SettingsRole[];
}

export interface SettingsNavGroup {
  id: string;
  label: string;
  items: SettingsNavItem[];
}

const ADMIN: SettingsRole[] = ["TENANT_ADMIN"];
const ADMIN_AND_MEMBER: SettingsRole[] = ["TENANT_ADMIN", "MEMBER"];

export const SETTINGS_NAV_GROUPS: SettingsNavGroup[] = [
  {
    id: "account",
    label: "Account",
    items: [
      {
        id: "profile",
        label: "Profile",
        description: "Your name, avatar, and personal info",
        href: APP_ROUTES.ADMIN.SETTINGS_PROFILE,
        Icon: UserCircle2,
        roles: ADMIN_AND_MEMBER,
      },
      {
        id: "notifications",
        label: "Notifications",
        description: "Email, push, and in-app alerts",
        href: APP_ROUTES.ADMIN.SETTINGS_NOTIFICATIONS,
        Icon: Bell,
        roles: ADMIN_AND_MEMBER,
      },
      {
        id: "security",
        label: "Security",
        description: "Password, 2FA, sessions",
        href: APP_ROUTES.ADMIN.SETTINGS_SECURITY,
        Icon: ShieldCheck,
        roles: ADMIN,
      },
    ],
  },
  {
    id: "workspace",
    label: "Workspace",
    items: [
      {
        id: "company",
        label: "Company",
        description: "Organization details",
        href: APP_ROUTES.ADMIN.SETTINGS_COMPANY,
        Icon: Building2,
        roles: ADMIN,
      },
      {
        id: "roles",
        label: "Team & roles",
        description: "Members, roles, and permissions",
        href: APP_ROUTES.ADMIN.SETTINGS_ROLE_MANAGEMENT,
        Icon: UsersRound,
        roles: ADMIN,
      },
      {
        id: "chat",
        label: "Chat settings",
        description: "Message defaults and automations",
        href: APP_ROUTES.ADMIN.SETTINGS_CHAT_SETTINGS,
        Icon: MessagesSquare,
        roles: ADMIN,
      },
      {
        id: "integrations",
        label: "Integrations",
        description: "Connected apps and APIs",
        href: APP_ROUTES.ADMIN.SETTINGS_INTEGRATION_SETTINGS,
        Icon: Plug,
        roles: ADMIN,
      },
    ],
  },
  {
    id: "billing",
    label: "Billing",
    items: [
      {
        id: "subscription",
        label: "Subscription & billing",
        description: "Plan, invoices, payment method",
        href: APP_ROUTES.ADMIN.SETTINGS_SUBSCRIPTION,
        Icon: CreditCard,
        roles: ADMIN,
      },
    ],
  },
];
