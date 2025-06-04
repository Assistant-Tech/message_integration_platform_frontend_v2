/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ CRM data utils
─────────────────────────────────────────────────────────────────────────────
*/
import {
  LucideIcon,
  Zap,
  Shield,
  Target,
  Building2,
  ShieldUser,
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
  icon: LucideIcon;
  title: string;
  description: string;
}
// For benefits
export interface BenefitProps {
  icon: LucideIcon;
  title: string;
  color: string;
}

// Pure data with component references
export const features: FeatureProps[] = [
  {
    icon: ShieldUser,
    title: "Round the Clock Reliability",
    description: "24/7 support and monitoring",
  },
  {
    icon: Zap,
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
import { Users, Share2, Workflow } from "lucide-react";

export const smartCardData = [
  {
    title: "Better Customer Support",
    description:
      "Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, sscipit porttitor velit. Vestibulum tempus imperdiet sem acporta.",
    icon: Users,
  },
  {
    title: "Connecting All Your Teams",
    description:
      "Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, sscipit porttitor velit. Vestibulum tempus imperdiet sem acporta.",
    icon: Share2,
  },
  {
    title: "Smart Sales Workflow",
    description:
      "Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, sscipit porttitor velit. Vestibulum tempus imperdiet sem acporta.",
    icon: Workflow,
  },
];
