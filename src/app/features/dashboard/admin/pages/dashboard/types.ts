import type { LucideIcon } from "lucide-react";

export type StatColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "information"
  | "secondary";

export interface StatCard {
  icon: LucideIcon;
  label: string;
  value: string;
  subValue: string;
  trend: number;
  color: StatColor;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface RecentConversation {
  id: string;
  name: string;
  channel: string;
  time: string;
  message: string;
  avatar?: string;
  status: "active" | "waiting" | "resolved";
}

  completed: boolean;
  priority: "low" | "medium" | "high";
}

export type DashboardGreeting = (hour: number) => {
  greeting: string;
  emoji: string;
};
