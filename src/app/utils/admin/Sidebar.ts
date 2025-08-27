import { APP_ROUTES } from "@/app/constants/routes";
import {
  MessageSquare,
  LayoutDashboard,
  Hash,
  Bot,
  BarChart3,
  Tag,
  ShoppingBag,
  ShoppingCart,
  Settings,
} from "lucide-react";

export const sidebarItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: APP_ROUTES.ADMIN.DASHBOARD,
    active: true,
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: APP_ROUTES.ADMIN.CONVERSATION,
  },
  { label: "Channels", icon: Hash, href: APP_ROUTES.ADMIN.CHANNEL },
  { label: "Chatbot", icon: Bot, href: APP_ROUTES.ADMIN.CHATBOT },
  { label: "Analytics", icon: BarChart3, href: APP_ROUTES.ADMIN.ANALYTICS },
  { label: "Tags", icon: Tag, href: APP_ROUTES.ADMIN.TAGS },
  { label: "Orders", icon: ShoppingBag, href: APP_ROUTES.ADMIN.ORDERS },
  {
    label: "Products",
    icon: ShoppingCart,
    href: APP_ROUTES.ADMIN.PRODUCTS,
    hasSubmenu: true,
    submenu: [
      {
        label: "All Products",
        href: APP_ROUTES.ADMIN.PRODUCTS_ALL,
      },
      {
        label: "Category",
        href: APP_ROUTES.ADMIN.PRODUCTS_CATEGORY,
      },
      {
        label: "Variants",
        href: APP_ROUTES.ADMIN.PRODUCTS_VARIANTS,
      },
      {
        label: "Inventory",
        href: APP_ROUTES.ADMIN.PRODUCTS_INVENTORY,
      },
    ],
  },
  {
    label: "Settings",
    icon: Settings,
    href: APP_ROUTES.ADMIN.SETTINGS,
    hasSubmenu: true,
    submenu: [
      {
        label: "My Profile",
        href: APP_ROUTES.ADMIN.SETTINGS_PROFILE,
      },
      {
        label: "Company Settings",
        href: APP_ROUTES.ADMIN.SETTINGS_COMPANY,
      },
      {
        label: "Role Management",
        href: APP_ROUTES.ADMIN.SETTINGS_ROLE_MANAGEMENT,
      },
      {
        label: "Security Settings",
        href: APP_ROUTES.ADMIN.SETTINGS_SECURITY,
      },
      {
        label: "Chat Settings",
        href: APP_ROUTES.ADMIN.SETTINGS_CHAT_SETTINGS,
      },
      {
        label: "Shipping",
        href: APP_ROUTES.ADMIN.SETTINGS_SHIPPING,
      },
      {
        label: "Subscription",
        href: APP_ROUTES.ADMIN.SETTINGS_SUBSCRIPTION,
      },
    ],
  },
];
