import type { ReactNode } from "react";

/* ─── Public component props ──────────────────────────────────────────────── */

export interface TopNavbarProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  showSearch?: boolean;
  showHelp?: boolean;
  showNotifications?: boolean;
  showProfileMenu?: boolean;
  className?: string;
}

/* ─── Search destinations ─────────────────────────────────────────────────── */

export interface SearchDestination {
  label: string;
  description: string;
  href: string;
  keywords: string[];
  section: string;
}

/* ─── User role (subset used by this module) ──────────────────────────────── */

export type UserRoleType = "MEMBER" | "ADMIN" | string | null | undefined;
