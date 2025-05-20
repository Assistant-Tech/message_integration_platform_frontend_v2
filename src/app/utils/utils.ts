/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Navbar data utils
 ─────────────────────────────────────────────────────────────────────────────
*/
import {
  MessageSquare,
  Database,
  Users,
  BookOpen,
  HelpCircle,
  BarChart3,
  FileText,
  FileQuestion,
} from "lucide-react";
export interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}
export interface NavigationItem {
  name: string;
  href?: string;
  dropdown?: DropdownItem[];
}
export const navigation: NavigationItem[] = [
  {
    name: "Products",
    dropdown: [
      {
        name: "CRM",
        href: "/products/crm",
        description: "Customer relationship management",
        icon: Users,
      },
      {
        name: "Chatbot",
        href: "/products/chatbot",
        description: "AI-powered customer support",
        icon: MessageSquare,
      },
      {
        name: "CRM-1",
        href: "/products/crm",
        description: "Customer relationship management",
        icon: Users,
      },
      {
        name: "Analytics",
        href: "/products/analytics",
        description: "Business intelligence platform",
        icon: BarChart3,
      },
      {
        name: "Database",
        href: "/products/database",
        description: "Secure data management",
        icon: Database,
      },
      {
        name: "CRM-2",
        href: "/products/crm",
        description: "Customer relationship management",
        icon: Users,
      },
    ],
  },
  {
    name: "Resources",
    dropdown: [
      {
        name: "Documentation",
        href: "/resources/docs",
        description: "API docs and guides",
        icon: BookOpen,
      },
      {
        name: "Help Center",
        href: "/resources/help",
        description: "Get support and answers",
        icon: HelpCircle,
      },
      {
        name: "Blog",
        href: "/resources/blog",
        description: "Latest news and insights",
        icon: FileText,
      },
      {
        name: "FAQ",
        href: "/resources/faq",
        description: "For more questionaires",
        icon: FileQuestion,
      },
    ],
  },
  { name: "Contact", href: "/contact" },
  { name: "Pricing", href: "/pricing" },
];

/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Hero data utils
 ─────────────────────────────────────────────────────────────────────────────
*/
import WhatsAppIcon from "@/app/assets/icons/whatsapp.svg";
import FacebookIcon from "@/app/assets/icons/fb.svg";
import InstagramIcon from "@/app/assets/icons/insta.svg";
import TelegramIcon from "@/app/assets/icons/telegram.svg";
import X from "@/app/assets/icons/x.svg";
import Tiktok from "@/app/assets/icons/tiktok.svg";
import viber from "@/app/assets/icons/viber.svg";

export type SocialLink = {
  name: string;
  src: string;
  href: string;
  color: string;
  size: number;
};

export const SOCIAL_LINKS_CONFIG: SocialLink[] = [
  {
    name: "WhatsApp",
    src: WhatsAppIcon,
    href: "https://wa.me/yourphonenumber",
    color: "#25D366",
    size: 44,
  },
  {
    name: "Facebook",
    src: FacebookIcon,
    href: "https://facebook.com/yourprofile",
    color: "#1877F2",
    size: 42,
  },
  {
    name: "Instagram",
    src: InstagramIcon,
    href: "https://instagram.com/yourprofile",
    color: "#E4405F",
    size: 36,
  },
  {
    name: "Telegram",
    src: TelegramIcon,
    href: "https://t.me/yourusername",
    color: "#0088cc",
    size: 42,
  },
  {
    name: "X",
    src: X,
    href: "https://t.me/yourusername",
    color: "#000",
    size: 28,
  },
  {
    name: "Tiktok",
    src: Tiktok,
    href: "https://tiktok.com",
    color: "#000",
    size: 28,
  },
  {
    name: "Viber",
    src: viber,
    href: "https://viber.com",
    color: "#000",
    size: 28,
  },
];
