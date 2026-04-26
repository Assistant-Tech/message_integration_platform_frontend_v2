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

// import crm from "@/app/assets/white-icons/crm.svg";
// import chat from "@/app/assets/white-icons/chat.svg";
// import unified from "@/app/assets/white-icons/unifiedmsg.svg";
// import bulk from "@/app/assets/white-icons/bulk.svg";
import blog from "@/app/assets/white-icons/blog.svg";
import video from "@/app/assets/white-icons/videos.svg";
import faq from "@/app/assets/white-icons/faq.svg";
import support from "@/app/assets/white-icons/support.svg";

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
  // {
  //   id: 1,
  //   name: "Products",
  //   description:
  //     "Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, suscipit porttitor velit elementum non.",
  //   dropdown: [
  //     {
  //       name: "CRM",
  //       href: APP_ROUTES.PUBLIC.CRM,
  //       description: "Customer relationship management",
  //       icon: crm,
  //     },
  //     {
  //       name: "Automation",
  //       href: APP_ROUTES.PUBLIC.CHATBOT,
  //       description: "AI-powered customer support",
  //       icon: chat,
  //     },
  //     {
  //       name: "Unified Messaging",
  //       href: APP_ROUTES.PUBLIC.UNIFIED_MESSAGE,
  //       description: "Vestibulum tempus imperdiet",
  //       icon: unified,
  //     },
  //     {
  //       name: "Bulk Messaging",
  //       href: APP_ROUTES.PUBLIC.BULK_MESSAGING,
  //       description: "Vestibulum tempus imperdiet",
  //       icon: bulk,
  //     },
  //   ],
  // },
  {
    id: 2,
    name: "Resources",
    description:
      "Guides, walkthroughs, and answers to help your team get more out of Chatblix.",
    dropdown: [
      {
        name: "Blogs",
        href: "/resources/blogs",
        description: "Tips on AI messaging, automation, and customer support",
        icon: blog,
      },
      {
        name: "Videos",
        href: "/resources/videos",
        description: "Product demos and short tutorials",
        icon: video,
      },
      {
        name: "FAQs",
        href: "/resources/faq",
        description: "Quick answers to the most common questions",
        icon: faq,
      },
      {
        name: "Support",
        href: "/resources/support",
        description: "Talk to our team — we usually reply within an hour",
        icon: support,
      },
    ],
  },
  { id: 3, name: "About Us", href: "/aboutus" },
  { id: 4, name: "Pricing", href: "/pricing" },
  { id: 5, name: "Contact", href: APP_ROUTES.PUBLIC.CONTACT },
];

/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Hero data utils
 ─────────────────────────────────────────────────────────────────────────────
 */
import X from "@/app/assets/icons/x.svg";
import Tiktok from "@/app/assets/icons/tiktok.svg";
import viber from "@/app/assets/icons/viber.svg";

export const SOCIAL_LINKS_CONFIG = [
  {
    name: "Facebook",
    href: "https://facebook.com/yourprofile",
    color: "#1877F2",
    size: 42,
    mobileSize: 30,
    top: "46%",
    left: "85%",
  },
  {
    name: "Instagram",
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
    iconColor: "#2E5E99",
    animate: true,
  },
  {
    title: "Team Work Made Easy",
    description:
      "Have a team? Assign chats to the right person so customers always get a fast reply. No more missed messages or double replies.",
    iconColor: "#2E5E99",
    icon: Zap,
    animate: true,
  },
  {
    title: "You Know What`s Working",
    description:
      "Get simple reports showing how many messages you’ve handled, how quickly you’re replying, and how your team is doing.",
    iconColor: "#2E5E99",
    icon: Shield,
    animate: true,
  },
  {
    title: "Your Data is Safe",
    description:
      "Chatblix uses strong security measures to keep your conversations private and protected. You’re in control.",
    iconColor: "#2E5E99",
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
    iconColor: "#2E5E99",
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
      name: "info@chatblix.com",
      url: "info@chatblix.com",
      icon: Mail,
    },
    {
      name: "+977-9712039062",
      url: "tel:+9779712039062",
      icon: Phone,
    },
    {
      name: "TD TECH PVT LTD, Rabibhawan, Kathmandu ",
      url: "#",
      icon: MapPin,
    },
  ],
};

import whatsappIcon from "@/app/assets/dashboard-icons/whatsapp.svg";
import instaIcon from "@/app/assets/dashboard-icons/insta.svg";
import fbIcon from "@/app/assets/dashboard-icons/fb.svg";
import linkIcon from "@/app/assets/dashboard-icons/link.svg";
import tiktokIcon from "@/app/assets/dashboard-icons/tiktok.svg";

export const SocialFooter: SocialLink[] = [
  {
    name: "Facebook",
    src: fbIcon,
    href: "https://wa.me/9712039062",
    color: "#25D366",
    size: 44,
  },
  {
    name: "Instagram",
    src: instaIcon,
    href: "https://www.instagram.com/chatblix?igsh=MWI2dmN2dzV0OXA3Mw%3D%3D&utm_source=qr",
    color: "#25D366",
    size: 44,
  },
  {
    name: "LinkedIn",
    src: linkIcon,
    href: "https://www.linkedin.com/company/chatblix/",
    color: "#25D366",
    size: 44,
  },
  {
    name: "Tiktok",
    src: tiktokIcon,
    href: "https://www.tiktok.com/@chatblix?_r=1&_t=ZS-92MQ98V9xkS",
    color: "#25D366",
    size: 44,
  },
  {
    name: "WhatsApp",
    src: whatsappIcon,
    href: "https://wa.me/9712039062",
    color: "#25D366",
    size: 44,
  },
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
    name: "Ram Kumar",
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
