import {
  MessagesSquare,
  MessageSquare,
  Send,
  CheckCircle2,
  Zap,
} from "lucide-react";
import type { StatCard } from "./types";
import type { AnalyticsSummaryData } from "@/app/types/analytics.types";

/**
 * Formats a duration in seconds to a human-readable string.
 * Examples: 45 -> "45s", 144 -> "2.4m", 3600 -> "1.0h"
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${(seconds / 60).toFixed(1)}m`;
  return `${(seconds / 3600).toFixed(1)}h`;
}

/**
 * Formats an ISO 8601 timestamp to a relative time string.
 * Examples: "Just now", "2 min ago", "3 hours ago", "1d ago"
 */
export function formatRelativeTime(isoString: string): string {
  const now = new Date();
  const date = new Date(isoString);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
  }

  return `${Math.floor(diffHours / 24)}d ago`;
}

/**
 * Transforms the API summary response into the StatCard[] shape
 * expected by the StatCard component. Icons are static mappings
 * (not provided by the API).
 */
export function transformSummaryToStatCards(
  data: AnalyticsSummaryData,
): StatCard[] {
  return [
    {
      icon: MessagesSquare,
      label: "Total Conversations",
      value: data.totalConversations.value.toLocaleString(),
      subValue: data.totalConversations.limit
        ? `/ ${data.totalConversations.limit.toLocaleString()}`
        : "",
      trend: data.totalConversations.trend,
      color: "primary",
    },
    {
      icon: MessageSquare,
      label: "Active Chats",
      value: data.activeChats.value.toLocaleString(),
      subValue: "live now",
      trend: data.activeChats.trend,
      color: "success",
    },
    {
      icon: Send,
      label: "Messages Sent",
      value: data.messagesSent.value.toLocaleString(),
      subValue: `this ${data.messagesSent.period}`,
      trend: data.messagesSent.trend,
      color: "information",
    },
    {
      icon: CheckCircle2,
      label: "Resolved Today",
      value: data.resolvedToday.value.toLocaleString(),
      subValue: data.resolvedToday.target
        ? `/ ${data.resolvedToday.target}`
        : "",
      trend: data.resolvedToday.trend,
      color: "warning",
    },
    {
      icon: Zap,
      label: "Avg Response Time",
      value: formatDuration(data.avgResponseTime.valueSeconds),
      subValue: data.avgResponseTime.median ? "median" : "average",
      trend: data.avgResponseTime.trend,
      color: "secondary",
    },
  ];
}
