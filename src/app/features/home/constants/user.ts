import { MessageSquare, CheckCircle2, Zap } from "lucide-react";
import type { StatCard, RecentConversation } from "@/app/features/home/types";

/** Member sees only their own performance metrics — no org-wide totals. */
export const memberStats: StatCard[] = [
  {
    icon: MessageSquare,
    label: "My Active Chats",
    value: "12",
    subValue: "assigned",
    trend: 4.5,
    color: "success",
  },
  {
    icon: CheckCircle2,
    label: "Resolved Today",
    value: "8",
    subValue: "/ 12",
    trend: 20.0,
    color: "warning",
  },
  {
    icon: Zap,
    label: "Avg Response Time",
    value: "1.8m",
    subValue: "median",
    trend: -12.0,
    color: "secondary",
  },
];

/** Recent conversations assigned to the current member. */
export const memberRecentConversations: RecentConversation[] = [
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
