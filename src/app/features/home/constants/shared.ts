import type { DashboardGreeting, StatColor } from "../types";

/**
 * Role-agnostic constants used by both Admin and Member dashboards.
 * Role-specific mock data lives in ./admin.ts and ./user.ts.
 */

export const STAT_COLOR_MAP: Record<StatColor, { bg: string; text: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary" },
  success: { bg: "bg-success-light", text: "text-success" },
  warning: { bg: "bg-warning-light", text: "text-warning-dark" },
  danger: { bg: "bg-danger-light", text: "text-danger" },
  information: { bg: "bg-information-light", text: "text-information" },
  secondary: { bg: "bg-secondary-light", text: "text-secondary-dark" },
};

export const CHART_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] as const;

export const getGreeting: DashboardGreeting = (hour) => {
  if (hour < 12) return { greeting: "Good morning", emoji: "sunrise" };
  if (hour < 17) return { greeting: "Good afternoon", emoji: "sun" };
  return { greeting: "Good evening", emoji: "moon" };
};
