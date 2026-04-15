/* ─── Analytics Dashboard API Types ──────────────────────────────────────── */

/**
 * GET /analytics/summary — stat cards at the top of the dashboard
 */
export interface AnalyticsSummaryData {
  totalConversations: { value: number; limit: number | null; trend: number };
  activeChats: { value: number; trend: number };
  messagesSent: { value: number; period: string; trend: number };
  resolvedToday: { value: number; target: number | null; trend: number };
  avgResponseTime: { valueSeconds: number; median: boolean; trend: number };
}

/**
 * GET /analytics/messages — line chart data with period toggle
 */
export interface MessagesChartData {
  points: Array<{ label: string; value: number }>;
  total: number;
  percentChange: number;
  period: string;
  groupBy: string;
}

/**
 * GET /analytics/conversations — recent conversations list
 */
export interface AnalyticsConversation {
  id: string;
  contactName: string;
  channel: string;
  lastMessageAt: string;
  lastMessagePreview: string;
  status: "active" | "waiting" | "resolved";
  contactAvatar: string | null;
  assignedTo: string | null;
}

/**
 * GET /analytics/team/members — individual team member stats
 */
export interface AnalyticsTeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  status: "online" | "away" | "busy" | "offline";
  activeMinutesToday: number;
  activeConversations: number;
  resolvedToday: number;
  avgResponseTimeSeconds: number;
  lastActiveAt: string;
}

/**
 * GET /analytics/team/summary — aggregate team status bar
 */
export interface AnalyticsTeamSummary {
  totalMembers: number;
  online: number;
  away: number;
  busy: number;
  offline: number;
  avgResponseTimeSeconds: number;
  totalResolvedToday: number;
}

/**
 * GET /analytics/team/activities — live activity feed events
 */
export interface AnalyticsActivityEvent {
  id: string;
  memberId: string;
  memberName: string;
  action:
    | "replied"
    | "resolved"
    | "assigned"
    | "tagged"
    | "transferred"
    | "noted";
  target: string;
  channel: string;
  timestamp: string;
}

/* ─── API Response Envelopes ─────────────────────────────────────────────── */

export interface ApiEnvelope<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

export interface CursorPaginatedEnvelope<T> {
  data: T[];
  meta?: {
    total: number;
    hasMore: boolean;
    nextCursor?: string;
  };
}

/* ─── Query Parameter Types ──────────────────────────────────────────────── */

export type AnalyticsPeriod = "today" | "week" | "month";

export type MessagesPeriod = "week" | "month" | "year";

export type MessagesGroupBy = "day" | "week" | "month";

export interface MessagesQueryParams {
  period?: MessagesPeriod;
  channel?: string;
  groupBy?: MessagesGroupBy;
}

export interface ConversationsQueryParams {
  sort?: string;
  status?: "active" | "waiting" | "resolved";
  limit?: number;
  cursor?: string;
}

export interface TeamMembersQueryParams {
  status?: "online" | "away" | "busy" | "offline";
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface TeamActivitiesQueryParams {
  limit?: number;
  cursor?: string;
  memberId?: string;
}
