import { APP_ROUTES } from "@/app/constants/routes";
import {
  LayoutDashboard,
  Bot,
  BarChart3,
  Tag,
  ShoppingBag,
  ShoppingCart,
  LucideIcon,
} from "lucide-react";

// SVG icon imports (used as <img> src on the dark sidebar)
import conversationsIconUrl from "@/app/assets/dashboard-icons/Conversations Icon.svg";
import connectionsIconUrl from "@/app/assets/dashboard-icons/Connections Icon.svg";
import settingsIconUrl from "@/app/assets/dashboard-icons/Settings Icon.svg";

export interface SidebarSubItem {
  label: string;
  href: string;
  roles?: string[];
}

export interface SidebarItem {
  label: string;
  /** A Lucide component OR an SVG URL string imported via Vite */
  icon: LucideIcon | string;
  href: string;
  hasSubmenu?: boolean;
  roles?: string[];
  submenu?: SidebarSubItem[];
}

export const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: APP_ROUTES.ADMIN.DASHBOARD,
    roles: ["TENANT_ADMIN", "MEMBER", "CUSTOM"],
  },
  {
    label: "Conversation",
    icon: conversationsIconUrl,
    href: APP_ROUTES.ADMIN.CONVERSATION,
    roles: ["TENANT_ADMIN", "MEMBER"],
  },
  {
    label: "Channels",
    icon: connectionsIconUrl,
    href: APP_ROUTES.ADMIN.CHANNEL,
    roles: ["TENANT_ADMIN"],
  },
  {
    label: "Chatbot",
    icon: Bot,
    href: APP_ROUTES.ADMIN.CHATBOT,
    roles: ["TENANT_ADMIN"],
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: APP_ROUTES.ADMIN.ANALYTICS,
    roles: ["TENANT_ADMIN"],
  },
  {
    label: "Tags",
    icon: Tag,
    href: APP_ROUTES.ADMIN.TAGS,
    roles: ["TENANT_ADMIN"],
  },
  {
    label: "Orders",
    icon: ShoppingBag,
    href: APP_ROUTES.ADMIN.ORDERS,
    roles: ["TENANT_ADMIN"],
  },
  {
    label: "Products",
    icon: ShoppingCart,
    href: APP_ROUTES.ADMIN.PRODUCTS,
    hasSubmenu: true,
    roles: ["TENANT_ADMIN"],
    submenu: [
      {
        label: "All Products",
        href: APP_ROUTES.ADMIN.PRODUCTS_ALL,
        roles: ["TENANT_ADMIN"],
      },
      {
        label: "Category",
        href: APP_ROUTES.ADMIN.PRODUCTS_CATEGORY,
        roles: ["TENANT_ADMIN"],
      },
      {
        label: "Variants",
        href: APP_ROUTES.ADMIN.PRODUCTS_VARIANTS,
        roles: ["TENANT_ADMIN"],
      },
      {
        label: "Inventory",
        href: APP_ROUTES.ADMIN.PRODUCTS_INVENTORY,
        roles: ["TENANT_ADMIN"],
      },
    ],
  },
  {
    label: "Settings",
    icon: settingsIconUrl,
    href: APP_ROUTES.ADMIN.SETTINGS,
    hasSubmenu: true,
    roles: ["TENANT_ADMIN", "MEMBER"],
    submenu: [
      {
        label: "My Profile",
        href: APP_ROUTES.ADMIN.SETTINGS_PROFILE,
        roles: ["TENANT_ADMIN", "MEMBER"],
      },
      {
        label: "Company Settings",
        href: APP_ROUTES.ADMIN.SETTINGS_COMPANY,
        roles: ["TENANT_ADMIN"],
      },
      {
        label: "Integration Settings",
        href: APP_ROUTES.ADMIN.SETTINGS_INTEGRATION_SETTINGS,
        roles: ["TENANT_ADMIN"],
      },
      {
        label: "Role Management",
        href: APP_ROUTES.ADMIN.SETTINGS_ROLE_MANAGEMENT,
        roles: ["TENANT_ADMIN"],
      },
      {
        label: "Security Settings",
        href: APP_ROUTES.ADMIN.SETTINGS_SECURITY,
        roles: ["TENANT_ADMIN"],
      },
      {
        label: "Chat Settings",
        href: APP_ROUTES.ADMIN.SETTINGS_CHAT_SETTINGS,
        roles: ["TENANT_ADMIN"],
      },
      {
        label: "Shipping",
        href: APP_ROUTES.ADMIN.SETTINGS_SHIPPING,
        roles: ["TENANT_ADMIN"],
      },
      {
        label: "Subscription",
        href: APP_ROUTES.ADMIN.SETTINGS_SUBSCRIPTION,
        roles: ["TENANT_ADMIN"],
      },
    ],
  },
];
