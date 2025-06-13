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

// For breadcrumbs (for links and other])
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
