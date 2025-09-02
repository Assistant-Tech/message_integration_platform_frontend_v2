/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ CRM data utils
─────────────────────────────────────────────────────────────────────────────
*/
import { LucideIcon, Shield, Target, Building2 } from "lucide-react";

export interface crm {
  label: string;
  href?: string;
}
export const CrmBreadCrumb: crm[] = [
  { label: "Products", href: "/products" },
  { label: "CRM" },
];

// For features
export interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}
// For benefits
export interface BenefitProps {
  icon: LucideIcon;
  title: string;
  color: string;
}

// import images
import clock from "@/app/assets/greenIcons/clock.svg";
import essentials from "@/app/assets/greenIcons/essentials.svg";

// Pure data with component references
export const features: FeatureProps[] = [
  {
    icon: clock,
    title: "Round the Clock Reliability",
    description: "24/7 support and monitoring",
  },
  {
    icon: essentials,
    title: "All Essential Solutions",
    description: "Complete CRM toolkit in one platform",
  },
];

export const benefits: BenefitProps[] = [
  {
    icon: Shield,
    title: "Better Support",
    color: "bg-secondary",
  },
  {
    icon: Target,
    title: "Built Smart",
    color: "bg-information",
  },
  {
    icon: Building2,
    title: "All Industries",
    color: "bg-primary",
  },
];

/*
─────────────────────────────────────────────────────────────────────────────
📦 ▶ CARD data utils
─────────────────────────────────────────────────────────────────────────────
*/
import {
  OnboardingIcon,
  SubscriptionIcon,
  UpdatesIcon,
} from "@/app/components/icons";


export const smartCardData = [
  {
    title: "Better Customer Support",
    description:
      "Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, sscipit porttitor velit. Vestibulum tempus imperdiet sem acporta.",
    Icon: OnboardingIcon,
    redirectTo: "/support",
  },
  {
    title: "Connecting All Your Teams",
    description:
      "Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, sscipit porttitor velit. Vestibulum tempus imperdiet sem acporta.",
    Icon: SubscriptionIcon,
    redirectTo: "/teams",
  },
  {
    title: "Smart Sales Workflow",
    description:
      "Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, sscipit porttitor velit. Vestibulum tempus imperdiet sem acporta.",
    Icon: UpdatesIcon,
    redirectTo: "/workflow",
  },
];

import { Users, FileText, BarChart3, Globe } from "lucide-react";
import type { ServiceItem } from "@/app/types/product.types";
import { PRODUCT_IMAGE_URL } from "@/app/constants/image-cloudinary";

export const services: ServiceItem[] = [
  {
    id: 1,
    icon: FileText,
    title: "Literature",
    description:
      "Chatblix’s CRM software helps you respond to your customer inquiries instantly and efficiently. It streamlines your company’s workflow, helps with customer retention and simultaneously reduces marketing costs.",
    img: PRODUCT_IMAGE_URL,
  },
  {
    id: 2,
    icon: Users,
    title: "CRM",
    description:
      "Chatblix’s CRM software helps you respond to your customer inquiries instantly and efficiently. It streamlines your company’s workflow, helps with customer retention and simultaneously reduces marketing costs.",
    img: PRODUCT_IMAGE_URL,
  },
  {
    id: 3,
    icon: BarChart3,
    title: "Self Sourcing",
    description:
      "Chatblix’s CRM software helps you respond to your customer inquiries instantly and efficiently. It streamlines your company’s workflow, helps with customer retention and simultaneously reduces marketing costs.",
    img: PRODUCT_IMAGE_URL,
  },
  {
    id: 4,
    icon: Globe,
    title: "Business",
    description:
      "Chatblix’s CRM software helps you respond to your customer inquiries instantly and efficiently. It streamlines your company’s workflow, helps with customer retention and simultaneously reduces marketing costs.",
    img: PRODUCT_IMAGE_URL,
  },
  {
    id: 5,
    icon: Globe,
    title: "Business",
    description:
      "Chatblix’s CRM software helps you respond to your customer inquiries instantly and efficiently. It streamlines your company’s workflow, helps with customer retention and simultaneously reduces marketing costs.",
    img: PRODUCT_IMAGE_URL,
  },
  {
    id: 6,
    icon: Globe,
    title: "Business",
    description:
      "Chatblix’s CRM software helps you respond to your customer inquiries instantly and efficiently. It streamlines your company’s workflow, helps with customer retention and simultaneously reduces marketing costs.",
    img: PRODUCT_IMAGE_URL,
  },
  {
    id: 7,
    icon: Globe,
    title: "Business",
    description:
      "Chatblix’s CRM software helps you respond to your customer inquiries instantly and efficiently. It streamlines your company’s workflow, helps with customer retention and simultaneously reduces marketing costs.",
    img: PRODUCT_IMAGE_URL,
  },
  {
    id: 8,
    icon: Globe,
    title: "Business",
    description:
      "Chatblix’s CRM software helps you respond to your customer inquiries instantly and efficiently. It streamlines your company’s workflow, helps with customer retention and simultaneously reduces marketing costs.",
    img: PRODUCT_IMAGE_URL,
  },
  {
    id: 9,
    icon: Globe,
    title: "Business",
    description:
      "Chatblix’s CRM software helps you respond to your customer inquiries instantly and efficiently. It streamlines your company’s workflow, helps with customer retention and simultaneously reduces marketing costs.",
    img: PRODUCT_IMAGE_URL,
  },
];
