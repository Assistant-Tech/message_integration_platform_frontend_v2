import {
  MessageSquare,
  MessagesSquare,
  Send,
  CheckCircle2,
  Zap,
} from "lucide-react";
import type {
  StatCard,
  StatColor,
  ChartDataPoint,
  RecentConversation,
  DashboardGreeting,
} from "./types";

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

export const mockStats: StatCard[] = [
  {
    icon: MessagesSquare,
    label: "Total Conversations",
    value: "1,248",
    subValue: "/ 1,500",
    trend: 12.5,
    color: "primary",
  },
  {
    icon: MessageSquare,
    label: "Active Chats",
    value: "84",
    subValue: "live now",
    trend: 8.2,
    color: "success",
  },
  {
    icon: Send,
    label: "Messages Sent",
    value: "5,620",
    subValue: "this week",
    trend: -3.1,
    color: "information",
  },
  {
    icon: CheckCircle2,
    label: "Resolved Today",
    value: "42",
    subValue: "/ 50",
    trend: 15.0,
    color: "warning",
  },
  {
    icon: Zap,
    label: "Avg Response Time",
    value: "2.4m",
    subValue: "median",
    trend: -18.0,
    color: "secondary",
  },
];

export const mockIncomeData: ChartDataPoint[] = [
  { label: "Jan", value: 3200 },
  { label: "Feb", value: 4100 },
  { label: "Mar", value: 3800 },
  { label: "Apr", value: 5200 },
  { label: "May", value: 4900 },
  { label: "Jun", value: 6100 },
];

export const mockRecentConversations: RecentConversation[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    channel: "WhatsApp",
    time: "14:30",
    message: "Hi, I need help with my recent order #4521",
    status: "active",
  },
  {
    id: "2",
    name: "James Rodriguez",
    channel: "Messenger",
    time: "14:15",
    message: "When will the new feature be available?",
    status: "active",
  },
  {
    id: "3",
    name: "Emily Chen",
    channel: "Instagram",
    time: "13:45",
    message: "Thanks for the quick response! Really appreciate it.",
    status: "resolved",
  },
  {
    id: "4",
    name: "Michael Brown",
    channel: "Email",
    time: "13:20",
    message: "I've been waiting for 2 days for a response...",
    status: "waiting",
  },
];
