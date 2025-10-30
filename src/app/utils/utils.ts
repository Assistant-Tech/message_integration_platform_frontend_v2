/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Navbar data utils
 ─────────────────────────────────────────────────────────────────────────────
*/
import {
  MessageSquare,
  Users,
  BarChart3,
  LucideIcon,
  Clock,
  Shield,
  Zap,
} from "lucide-react";

import crm from "@/app/assets/greenIcons/crm.svg";
import bot from "@/app/assets/greenIcons/bot.svg";
import unified from "@/app/assets/greenIcons/unified.svg";
import bulk from "@/app/assets/greenIcons/bulk.svg";
import blog from "@/app/assets/greenIcons/blogs.svg";
import video from "@/app/assets/greenIcons/videos.svg";
import faq from "@/app/assets/greenIcons/faq.svg";
import support from "@/app/assets/greenIcons/support.svg";

export interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  icon?: string;
}
export interface NavigationItem {
  id: number;
  name: string;
  description?: string;
  href?: string;
  dropdown?: DropdownItem[];
  icon?: string;
}

export const navigation: NavigationItem[] = [
  {
    id: 1,
    name: "Products",
    description:
      "Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, suscipit porttitor velit elementum non.",
    dropdown: [
      {
        name: "CRM",
        href: APP_ROUTES.PUBLIC.CRM,
        description: "Customer relationship management",
        icon: crm,
      },
      {
        name: "Chatbot",
        href: APP_ROUTES.PUBLIC.CHATBOT,
        description: "AI-powered customer support",
        icon: bot,
      },
      {
        name: "Unified Messaging",
        href: APP_ROUTES.PUBLIC.UNIFIED_MESSAGE,
        description: "Vestibulum tempus imperdiet",
        icon: unified,
      },
      {
        name: "Bulk Messaging",
        href: APP_ROUTES.PUBLIC.BULK_MESSAGING,
        description: "Vestibulum tempus imperdiet",
        icon: bulk,
      },
    ],
  },
  {
    id: 2,
    name: "Resources",
    description:
      "Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, suscipit porttitor velit elementum non.",
    dropdown: [
      {
        name: "Blogs",
        href: "/resources/blogs",
        description: "API docs and guides",
        icon: blog,
      },
      {
        name: "Videos",
        href: "/resources/videos",
        description: "Get support and answers",
        icon: video,
      },
      {
        name: "FAQs",
        href: "/resources/faq",
        description: "Latest news and insights",
        icon: faq,
      },
      {
        name: "Support",
        href: "/resources/support",
        description: "For more questionaires",
        icon: support,
      },
    ],
  },
  { id: 3, name: "About Us", href: "/aboutus" },
  { id: 4, name: "Pricing", href: "/pricing" },
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

export const SOCIAL_LINKS_CONFIG = [
  {
    name: "Facebook",
    src: FacebookIcon,
    href: "https://facebook.com/yourprofile",
    color: "#1877F2",
    size: 42,
    mobileSize: 30,
    top: "46%",
    left: "85%",
  },
  {
    name: "Instagram",
    src: InstagramIcon,
    href: "https://instagram.com/yourprofile",
    color: "#E4405F",
    size: 36,
    mobileSize: 26,
    top: "15%",
    left: "90%",
  },
  {
    name: "X",
    src: X,
    href: "https://twitter.com/yourusername",
    color: "#000",
    size: 28,
    mobileSize: 20,
    top: "58%",
    left: "75%",
  },
  {
    name: "Telegram",
    src: TelegramIcon,
    href: "https://t.me/yourusername",
    color: "#0088cc",
    size: 42,
    mobileSize: 30,
    top: "38%",
    left: "21%",
  },
  {
    name: "Tiktok",
    src: Tiktok,
    href: "https://tiktok.com",
    color: "#000",
    size: 28,
    mobileSize: 20,
    top: "19%",
    left: "10%",
  },
  {
    name: "Viber",
    src: viber,
    href: "https://viber.com",
    color: "#000",
    size: 28,
    mobileSize: 20,
    top: "75%",
    left: "29%",
  },
  {
    name: "WhatsApp",
    src: WhatsAppIcon,
    href: "https://wa.me/yourphonenumber",
    color: "#25D366",
    size: 44,
    mobileSize: 32,
    top: "65%",
    left: "5%",
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
  icon: LucideIcon;
  animate: boolean;
};

export const featureCards: FeatureCard[] = [
  {
    title: "All Messages in One Inbox",
    description:
      "No more switching between apps! Brings all your messages together in one place, so you can reply faster and stay organized.",
    icon: MessageSquare,
    iconColor: "#1cb496",
    animate: true,
  },
  {
    title: "Team Work Made Easy",
    description:
      "Have a team? Assign chats to the right person so customers always get a fast reply. No more missed messages or double replies.",
    iconColor: "#1cb496",
    icon: Zap,
    animate: true,
  },
  {
    title: "You Know What`s Working",
    description:
      "Get simple reports showing how many messages you’ve handled, how quickly you’re replying, and how your team is doing.",
    iconColor: "#1cb496",
    icon: Shield,
    animate: true,
  },
  {
    title: "Your Data is Safe",
    description:
      "Assistant uses strong security measures to keep your conversations private and protected. You’re in control.",
    iconColor: "#1cb496",
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
    img: "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920904/feature1_msvw3f.png",
    animate: true,
  },
  {
    title: "Lightning Fast Responses",
    description: "Easy tools for your team to reply faster",
    img: "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920904/feature2_qcnqm3.png",
    animate: true,
  },
  {
    title: "Secure & Private",
    description: "Reports to see how you're doing over time",
    img: "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920904/feature3_lfvett.png",
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
import { Mail, Phone, MapPin } from "lucide-react";
import fbBNW from "@/app/assets/icons/fb1.svg";
import instaBNW from "@/app/assets/icons/in.svg";
import LinkBNW from "@/app/assets/icons/link.svg";
import xBNW from "@/app/assets/icons/xx.svg";
import { APP_ROUTES } from "@/app/constants/routes";

export type FooterLink = {
  name: string;
  url: string;
};

export type FooterContact = {
  name: string;
  url: string;
  icon: LucideIcon;
};

export type FooterLinks = {
  products: FooterLink[];
  resources: FooterLink[];
  pricing: FooterLink[];
  contact: FooterContact[];
};

export type SocialLink = {
  name: string;
  src: string;
  href: string;
  color: string;
  size: number;
};

export const footerLinks: FooterLinks = {
  products: [
    { name: "CRM", url: APP_ROUTES.PUBLIC.CRM },
    { name: "Unified Inbox", url: APP_ROUTES.PUBLIC.CRM },
    { name: "Chatbots", url: APP_ROUTES.PUBLIC.CRM },
    { name: "Bulk Messaging", url: APP_ROUTES.PUBLIC.CRM },
  ],
  resources: [
    { name: "FAQs", url: APP_ROUTES.PUBLIC.FAQ },
    { name: "Support", url: APP_ROUTES.PUBLIC.SUPPORT },
    { name: "Blogs", url: APP_ROUTES.PUBLIC.BLOG },
    { name: "Videos", url: APP_ROUTES.PUBLIC.VIDEOS },
  ],
  pricing: [
    { name: "Starter Plan", url: APP_ROUTES.PUBLIC.PRICING },
    { name: "Growth Plan", url: APP_ROUTES.PUBLIC.PRICING },
    { name: "Pro Plan", url: APP_ROUTES.PUBLIC.PRICING },
  ],
  contact: [
    {
      name: "assistant@gmail.com",
      url: "mailto:assistant@gmail.com",
      icon: Mail,
    },
    {
      name: "+977-9810000000",
      url: "tel:+9779810000000",
      icon: Phone,
    },
    {
      name: "123 Main Street, Anytown",
      url: "#",
      icon: MapPin,
    },
  ],
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
/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ ABout US data utils
─────────────────────────────────────────────────────────────────────────────
*/
export const features: string[] = [
  "Online store owners who want to reply fast on social media",
  "Small businesses that want to support customers better",
  "Big enterprises looking for efficiency, control and long-term value.",
];
export const companies: string[] = [
  "TechCorp Solutions",
  "Digital Dynamics",
  "Innovation Labs",
  "Future Systems",
  "Cloud Ventures",
];

/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ ABout US TEAM data utils
─────────────────────────────────────────────────────────────────────────────
*/

export interface cardLink {
  platform: "linkedin" | "instagram" | "facebook";
  url: string;
}

export interface TeamMember {
  name: string;
  title: string;
  imageUrl: string;
  socialLinks?: cardLink[];
  className?: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Rhonda Rhodes",
    title: "CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com/sarahjohnson" },
      { platform: "instagram", url: "https://instagram.com/sarahjohnson" },
      { platform: "linkedin", url: "https://linkedin.com/in/sarahjohnson" },
    ],
  },
  {
    name: "John Smith",
    title: "CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com/sarahjohnson" },
      { platform: "instagram", url: "https://instagram.com/sarahjohnson" },
      { platform: "linkedin", url: "https://linkedin.com/in/sarahjohnson" },
    ],
  },
  {
    name: "Sarah Johnson",
    title: "MD",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com/sarahjohnson" },
      { platform: "instagram", url: "https://instagram.com/sarahjohnson" },
      { platform: "linkedin", url: "https://linkedin.com/in/sarahjohnson" },
    ],
  },
  {
    name: "Michael Lee",
    title: "Product Manager",
    imageUrl:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com/sarahjohnson" },
      { platform: "instagram", url: "https://instagram.com/sarahjohnson" },
      { platform: "linkedin", url: "https://linkedin.com/in/sarahjohnson" },
    ],
  },
  {
    name: "Emily Davis",
    title: "UX Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com/sarahjohnson" },
      { platform: "instagram", url: "https://instagram.com/sarahjohnson" },
      { platform: "linkedin", url: "https://linkedin.com/in/sarahjohnson" },
    ],
  },
  {
    name: "David Kim",
    title: "Lead Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com/sarahjohnson" },
      { platform: "instagram", url: "https://instagram.com/sarahjohnson" },
      { platform: "linkedin", url: "https://linkedin.com/in/sarahjohnson" },
    ],
  },
  {
    name: "Sophia Martinez",
    title: "Content Strategist",
    imageUrl:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com/sarahjohnson" },
      { platform: "instagram", url: "https://instagram.com/sarahjohnson" },
      { platform: "linkedin", url: "https://linkedin.com/in/sarahjohnson" },
    ],
  },
  {
    name: "James Wilson",
    title: "QA Engineer",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com/sarahjohnson" },
      { platform: "instagram", url: "https://instagram.com/sarahjohnson" },
      { platform: "linkedin", url: "https://linkedin.com/in/sarahjohnson" },
    ],
  },
  {
    name: "Ava Thompson",
    title: "Community Manager",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com/sarahjohnson" },
      { platform: "instagram", url: "https://instagram.com/sarahjohnson" },
      { platform: "linkedin", url: "https://linkedin.com/in/sarahjohnson" },
    ],
  },
];


