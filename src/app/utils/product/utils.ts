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
