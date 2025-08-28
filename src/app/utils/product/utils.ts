/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ CRM data utils
─────────────────────────────────────────────────────────────────────────────
*/
import {
  LucideIcon,
  Shield,
  Target,
  Building2,
} from "lucide-react";

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

import onboarding from "@/app/assets/greenIcons/onboarding.svg";
import subscription from "@/app/assets/greenIcons/unified.svg";
import updates from "@/app/assets/greenIcons/updates.svg";

export const smartCardData = [
  {
    title: "Better Customer Support",
    description:
      "Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, sscipit porttitor velit. Vestibulum tempus imperdiet sem acporta.",
    icon: onboarding,
  },
  {
    title: "Connecting All Your Teams",
    description:
      "Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, sscipit porttitor velit. Vestibulum tempus imperdiet sem acporta.",
    icon: subscription,
  },
  {
    title: "Smart Sales Workflow",
    description:
      "Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, sscipit porttitor velit. Vestibulum tempus imperdiet sem acporta.",
    icon: updates,
  },
];

import { Users, FileText, BarChart3, Globe } from "lucide-react";
import crm from "@/app/assets/images/crm.webp";
import type { ServiceItem } from "@/app/types/product.types";

export const services: ServiceItem[] = [
  {
    id: 1,
    icon: FileText,
    title: "Literature",
    description:
      "Chatblix’s CRM software helps you respond to your customer inquiries instantly and efficiently. It streamlines your company’s workflow, helps with customer retention and simultaneously reduces marketing costs.",
    img: crm,
  },
  {
    id: 2,
    icon: Users,
    title: "CRM",
    description:
      "Chatblix’s CRM software helps you respond to your customer inquiries instantly and efficiently. It streamlines your company’s workflow, helps with customer retention and simultaneously reduces marketing costs.",
    img: crm,
  },
  {
    id: 3,
    icon: BarChart3,
    title: "Self Sourcing",
    description:
      "Chatblix’s CRM software helps you respond to your customer inquiries instantly and efficiently. It streamlines your company’s workflow, helps with customer retention and simultaneously reduces marketing costs.",
    img: crm,
  },
  {
    id: 4,
    icon: Globe,
    title: "Business",
    description:
      "Chatblix’s CRM software helps you respond to your customer inquiries instantly and efficiently. It streamlines your company’s workflow, helps with customer retention and simultaneously reduces marketing costs.",
    img: crm,
  },
  {
    id: 5,
    icon: Globe,
    title: "Business",
    description:
      "Chatblix’s CRM software helps you respond to your customer inquiries instantly and efficiently. It streamlines your company’s workflow, helps with customer retention and simultaneously reduces marketing costs.",
    img: crm,
  },
  {
    id: 6,
    icon: Globe,
    title: "Business",
    description:
      "Chatblix’s CRM software helps you respond to your customer inquiries instantly and efficiently. It streamlines your company’s workflow, helps with customer retention and simultaneously reduces marketing costs.",
    img: crm,
  },
  {
    id: 7,
    icon: Globe,
    title: "Business",
    description:
      "Chatblix’s CRM software helps you respond to your customer inquiries instantly and efficiently. It streamlines your company’s workflow, helps with customer retention and simultaneously reduces marketing costs.",
    img: crm,
  },
  {
    id: 8,
    icon: Globe,
    title: "Business",
    description:
      "Chatblix’s CRM software helps you respond to your customer inquiries instantly and efficiently. It streamlines your company’s workflow, helps with customer retention and simultaneously reduces marketing costs.",
    img: crm,
  },
  {
    id: 9,
    icon: Globe,
    title: "Business",
    description:
      "Chatblix’s CRM software helps you respond to your customer inquiries instantly and efficiently. It streamlines your company’s workflow, helps with customer retention and simultaneously reduces marketing costs.",
    img: crm,
  },
];
