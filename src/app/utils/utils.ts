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
  LucideIcon,
  Clock,
  Shield,
  Zap,
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
    name: "X",
    src: X,
    href: "https://t.me/yourusername",
    color: "#000",
    size: 28,
  },
  {
    name: "Telegram",
    src: TelegramIcon,
    href: "https://t.me/yourusername",
    color: "#0088cc",
    size: 42,
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
  {
    name: "WhatsApp",
    src: WhatsAppIcon,
    href: "https://wa.me/yourphonenumber",
    color: "#25D366",
    size: 44,
  },
];
/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Hero data utils (NO JSX HERE)
─────────────────────────────────────────────────────────────────────────────
*/

export type FeatureCard = {
  title: string;
  description: string;
  iconColor: string;
  icon: LucideIcon; // <— store the icon component, not JSX
  animate: boolean;
};

export const featureCards: FeatureCard[] = [
  {
    title: "All Messages in One Inbox",
    description:
      "No more switching between apps! Brings all your messages together in one place, so you can reply faster and stay organized.",
    iconColor: "#26AA91",
    icon: MessageSquare,
    animate: true,
  },
  {
    title: "Lightning Fast Responses",
    description:
      "Respond to customers instantly with smart templates and automated workflows that save time.",
    iconColor: "#4A6FFF",
    icon: Zap,
    animate: true,
  },
  {
    title: "Secure & Private",
    description:
      "Enterprise-grade security ensures your conversations and data remain protected at all times.",
    iconColor: "#FF6B6B",
    icon: Shield,
    animate: true,
  },
  {
    title: "Team Collaboration",
    description:
      "Work seamlessly with your team members to provide the best customer support experience.",
    iconColor: "#9B59B6",
    icon: Users,
    animate: true,
  },
  {
    title: "Analytics & Insights",
    description:
      "Track performance metrics and gain valuable insights to improve your customer communication.",
    iconColor: "#F39C12",
    icon: BarChart3,
    animate: true,
  },
  {
    title: "24/7 Availability",
    description:
      "Never miss a customer message with round-the-clock monitoring and instant notifications.",
    iconColor: "#1ABC9C",
    icon: Clock,
    animate: true,
  },
];

/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Footer data utils
 ─────────────────────────────────────────────────────────────────────────────
*/
import fbBNW from "@/app/assets/icons/fbn-bnw.svg";
import instaBNW from "@/app/assets/icons/insta-bnw.svg";
import LinkBNW from "@/app/assets/icons/link.svg";
import xBNW from "@/app/assets/icons/x-bnw.svg";
import { ReactElement } from "react";

export type Footer = {
  name: string;
  src: string;
  href: string;
  color: string;
  size: number;
};
interface product {
  name: string;
  url: string;
}
export type FooterLinks = {
  products: product[];
};

export const SocialFooter: SocialLink[] = [
  {
    name: "Facebook",
    src: fbBNW,
    href: "https://wa.me/yourphonenumber",
    color: "#25D366",
    size: 44,
  },
  {
    name: "Instagram",
    src: instaBNW,
    href: "https://wa.me/yourphonenumber",
    color: "#25D366",
    size: 44,
  },
  {
    name: "LinkedIn",
    src: LinkBNW,
    href: "https://wa.me/yourphonenumber",
    color: "#25D366",
    size: 44,
  },
  {
    name: "X",
    src: xBNW,
    href: "https://wa.me/yourphonenumber",
    color: "#25D366",
    size: 44,
  },
];

export const footerLinks = {
  products: [
    { name: "Products One", url: "#" },
    { name: "Products Two", url: "#" },
    { name: "Products Three", url: "#" },
    { name: "Products Four", url: "#" },
  ],
  resources: [
    { name: "FAQs", url: "#" },
    { name: "Support", url: "#" },
    { name: "Blogs", url: "#" },
    { name: "Videos", url: "#" },
  ],
  pricing: [
    { name: "Starter Plan", url: "#" },
    { name: "Growth Plan", url: "#" },
    { name: "Pro Plan", url: "#" },
  ],
  contact: [
    {
      name: "assistant@gmail.com",
      url: "mailto:assistant@gmail.com",
      icon: "✉️",
    },
    { name: "+977-9810000000", url: "tel:+9779810000000", icon: "📞" },
    { name: "123 Main Street, Anytown", url: "#", icon: "📍" },
  ],
};
