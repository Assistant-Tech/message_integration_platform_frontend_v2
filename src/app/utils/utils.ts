/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Navbar data utils
 ─────────────────────────────────────────────────────────────────────────────
*/
import {
  MessageSquare,
  Users,
  BookOpen,
  BarChart3,
  FileText,
  FileQuestion,
  LucideIcon,
  Clock,
  Shield,
  Zap,
  Users2,
  Video,
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
        name: "Unified Messaging",
        href: "/products/crm",
        description: "Vestibulum tempus imperdiet",
        icon: Users2,
      },
      {
        name: "Bulk Messaging",
        href: "/products/bulkmessage",
        description: "Vestibulum tempus imperdiet",
        icon: BarChart3,
      },
    ],
  },
  {
    name: "Resources",
    dropdown: [
      {
        name: "Blogs",
        href: "/resources/blogs",
        description: "API docs and guides",
        icon: BookOpen,
      },
      {
        name: "Videos",
        href: "/resources/videos",
        description: "Get support and answers",
        icon: Video,
      },
      {
        name: "FAQs",
        href: "/resources/faq",
        description: "Latest news and insights",
        icon: FileText,
      },
      {
        name: "Support",
        href: "/resources/support",
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
  [x: string]: any;
  name: string;
  src: string;
  href: string;
  color: string;
  size: number;
};

export const SOCIAL_LINKS_CONFIG = [
  {
    name: "Facebook",
    src: FacebookIcon,
    href: "https://facebook.com/yourprofile",
    color: "#1877F2",
    size: 42,
    mobileSize: 30,
    top: "20%",
    left: "85%",
  },
  {
    name: "Instagram",
    src: InstagramIcon,
    href: "https://instagram.com/yourprofile",
    color: "#E4405F",
    size: 36,
    mobileSize: 26,
    top: "35%",
    left: "100%",
  },
  {
    name: "X",
    src: X,
    href: "https://twitter.com/yourusername",
    color: "#000",
    size: 28,
    mobileSize: 20,
    top: "50%",
    left: "75%",
  },
  {
    name: "Telegram",
    src: TelegramIcon,
    href: "https://t.me/yourusername",
    color: "#0088cc",
    size: 42,
    mobileSize: 30,
    top: "50%",
    left: "25%",
  },
  {
    name: "Tiktok",
    src: Tiktok,
    href: "https://tiktok.com",
    color: "#000",
    size: 28,
    mobileSize: 20,
    top: "35%",
    left: "0%",
  },
  {
    name: "Viber",
    src: viber,
    href: "https://viber.com",
    color: "#000",
    size: 28,
    mobileSize: 20,
    top: "20%",
    left: "15%",
  },
  {
    name: "WhatsApp",
    src: WhatsAppIcon,
    href: "https://wa.me/yourphonenumber",
    color: "#25D366",
    size: 44,
    mobileSize: 32,
    top: "65%",
    left: "10%",
  },
];
/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Feature data utils (NO JSX HERE)
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
    icon: MessageSquare,
    iconColor: "#4A6FFF",
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
 📦 ▶ Scale data utils (NO JSX HERE)
─────────────────────────────────────────────────────────────────────────────
*/
export interface ScaleFeature {
  text: string;
  icon: string;
}

export const scaleFeature: ScaleFeature[] = [
  {
    text: "Online store owners who want to reply fast on social media",
    icon: "ShoppingBag",
  },
  {
    text: "Hotels, salons, and service businesses that take bookings in chat",
    icon: "Users",
  },
  {
    text: "Local services like electricians, tutors, and cleaners",
    icon: "Zap",
  },
  {
    text: "Creators and influencers who chat with followers and fans",
    icon: "Heart",
  },
  {
    text: "Small businesses that want to support customers better",
    icon: "TrendingUp",
  },
];

export interface ImageSlide {
  src: string;
  alt: string;
  caption?: string;
}
export const imageSlides: ImageSlide[] = [
  {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
    alt: "Online shopping interface",
    caption: "E-commerce Solutions",
  },
  {
    src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center",
    alt: "Mobile payment interface",
    caption: "Payment Processing",
  },
  {
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&crop=center",
    alt: "Business analytics dashboard",
    caption: "Business Analytics",
  },
];
/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Built Assistant Feature data utils
 ─────────────────────────────────────────────────────────────────────────────
*/
import feature1 from "@/app/assets/images/feature1.png";
import feature2 from "@/app/assets/images/feature2.png";
import feature3 from "@/app/assets/images/feature3.png";

export type BuildFeature = {
  title: string;
  description: string;
  img: string;
  animate: boolean;
};

export const buildFeature: BuildFeature[] = [
  {
    title: "All Messages in One Inbox",
    description: "A clean inbox for all your chats",
    img: feature1,
    animate: true,
  },
  {
    title: "Lightning Fast Responses",
    description: "Easy tools for your team to reply faster",
    img: feature2,
    animate: true,
  },
  {
    title: "Secure & Private",
    description: "Reports to see how you're doing",
    img: feature3,
    animate: true,
  },
];
/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Testimonials data utils
 ─────────────────────────────────────────────────────────────────────────────
*/
export interface Testimonial {
  id: number;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  companyLogos?: string[];
}

export const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    content:
      "Pellentesque suscipit fringilla libero eu ullamcorper. Cras risus eros, faucibus sit amet augue id, tempus pellentesque eros.",
    author: {
      name: "Jane Doe",
      role: "Assistant Manager",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    },
    companyLogos: [
      "https://via.placeholder.com/80x40/333/fff?text=LOGO1",
      "https://via.placeholder.com/80x40/333/fff?text=LOGO2",
      "https://via.placeholder.com/80x40/333/fff?text=LOGO3",
    ],
  },
  {
    id: 2,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: {
      name: "John Smith",
      role: "CEO & Founder",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    },
    companyLogos: [
      "https://via.placeholder.com/80x40/666/fff?text=BRAND",
      "https://via.placeholder.com/80x40/666/fff?text=CORP",
    ],
  },
  {
    id: 3,
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: {
      name: "Sarah Wilson",
      role: "Marketing Director",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    },
  },
];

/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ FAQ data utils
 ─────────────────────────────────────────────────────────────────────────────
*/

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQ[] = [
  {
    id: "item-1",
    question: "What message management features does your platform offer?",
    answer:
      "Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci lorem Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, suscipit porttitor velit elementum non. Fusce nec pellentesque erat, id lobortis nunc. Donec dui leo, ultrices quis turpis nec, sollicitudin sodales",
  },
  {
    id: "item-2",
    question: "How secure is my data?",
    answer:
      "Fusce nec pellentesque erat, id lobortis nunc. Donec dui leo, ultrices quisVestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, suscipit porttitor velit elementum non. Fusce nec pellentesque erat, id lobortis nunc. Donec dui leo, ultrices quis turpis nec, sollicitudin sodales",
  },
  {
    id: "item-3",
    question: "Can I customize user permissions?",
    answer:
      "Donec dui leo, ultrices quis turpis nec, sollicitudin sodales. Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, suscipit porttitor velit elementum non. Fusce nec pellentesque erat, id lobortis nunc. Donec dui leo, ultrices quis turpis nec, sollicitudin sodales",
  },
  {
    id: "item-4",
    question: "Is the platform mobile-friendly?",
    answer:
      "Vivamus pulvinar commodo orci, suscipit porttitor velit elementum non. Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, suscipit porttitor velit elementum non. Fusce nec pellentesque erat, id lobortis nunc. Donec dui leo, ultrices quis turpis nec, sollicitudin sodales",
  },
  {
    id: "item-5",
    question: "What kind of support is available?",
    answer:
      "Vestibulum tempus imperdiet sem ac porttitor. Fusce nec pellentesque erat. Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, suscipit porttitor velit elementum non. Fusce nec pellentesque erat, id lobortis nunc. Donec dui leo, ultrices quis turpis nec, sollicitudin sodales",
  },
];

/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Footer data utils
 ─────────────────────────────────────────────────────────────────────────────
*/
import fbBNW from "@/app/assets/icons/fb1.svg";
import instaBNW from "@/app/assets/icons/in.svg";
import LinkBNW from "@/app/assets/icons/link.svg";
import xBNW from "@/app/assets/icons/xx.svg";

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
