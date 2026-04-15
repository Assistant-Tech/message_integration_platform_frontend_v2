import api from "@/app/services/api/axios";
import { handleApiError } from "@/app/utils/handlerApiError";
import type {
  AnalyticsPeriod,
  AnalyticsSummaryData,
  MessagesChartData,
  AnalyticsConversation,
  AnalyticsTeamMember,
  AnalyticsTeamSummary,
  AnalyticsActivityEvent,
  MessagesQueryParams,
  ConversationsQueryParams,
  TeamMembersQueryParams,
  TeamActivitiesQueryParams,
  ApiEnvelope,
  CursorPaginatedEnvelope,
} from "@/app/types/analytics.types";

/*
 * GET /analytics/summary
 * Returns the 5 stat cards displayed at the top of the dashboard.
 */
export const fetchAnalyticsSummary = async (
  period: AnalyticsPeriod = "today",
): Promise<ApiEnvelope<AnalyticsSummaryData>> => {
  try {
    const res = await api.get<ApiEnvelope<AnalyticsSummaryData>>(
      "/analytics/summary",
      { params: { period } },
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/*
 * GET /analytics/messages
 * Powers the line chart with period toggle (Week/Month/Year).
 */
export const fetchAnalyticsMessages = async (
  params: MessagesQueryParams = {},
): Promise<ApiEnvelope<MessagesChartData>> => {
  try {
    const res = await api.get<ApiEnvelope<MessagesChartData>>(
      "/analytics/messages",
      { params },
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/*
 * GET /analytics/conversations
 * Returns recent conversations sorted by last message time.
 */
export const fetchAnalyticsConversations = async (
  params: ConversationsQueryParams = {},
): Promise<CursorPaginatedEnvelope<AnalyticsConversation>> => {
  try {
    const res = await api.get<CursorPaginatedEnvelope<AnalyticsConversation>>(
      "/analytics/conversations",
      { params },
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/*
 * GET /analytics/team/members
 * Returns team member list with individual stats.
 */
export const fetchTeamMembers = async (
  params: TeamMembersQueryParams = {},
): Promise<CursorPaginatedEnvelope<AnalyticsTeamMember>> => {
  try {
    const res = await api.get<CursorPaginatedEnvelope<AnalyticsTeamMember>>(
      "/analytics/team/members",
      { params },
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/*
 * GET /analytics/team/summary
 * Returns aggregate team status bar data.
 */
export const fetchTeamSummary = async (): Promise<
  ApiEnvelope<AnalyticsTeamSummary>
> => {
  try {
    const res = await api.get<ApiEnvelope<AnalyticsTeamSummary>>(
      "/analytics/team/summary",
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/*
 * GET /analytics/team/activities
 * Returns the live activity feed (cursor-paginated, no cache).
 */
export const fetchTeamActivities = async (
  params: TeamActivitiesQueryParams = {},
): Promise<CursorPaginatedEnvelope<AnalyticsActivityEvent>> => {
  try {
    const res = await api.get<CursorPaginatedEnvelope<AnalyticsActivityEvent>>(
      "/analytics/team/activities",
      { params },
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/*
 * GET /analytics/channels
 */
export const fetchChannelStats = async (period = "month") => {
  try {
    const res = await api.get("/analytics/channels", { params: { period } });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/*
 * GET /analytics/team/leaderboard
 */
export const fetchLeaderboard = async (params: { period?: string; limit?: number } = {}) => {
  try {
    const res = await api.get("/analytics/team/leaderboard", { params });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/*
 * GET /analytics/resolutions
 */
export const fetchResolutionStats = async (period = "month") => {
  try {
    const res = await api.get("/analytics/resolutions", { params: { period } });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/*
 * GET /analytics/csat-ratings
 */
export const fetchCsatRatings = async (period = "month") => {
  try {
    const res = await api.get("/analytics/csat-ratings", { params: { period } });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/*
 * GET /analytics/traffic
 */
export const fetchTrafficPatterns = async (period = "week") => {
  try {
    const res = await api.get("/analytics/traffic", { params: { period } });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/*
 * GET /analytics/hourly-volume
 * Incoming vs outgoing message counts per hour.
 */
export const fetchHourlyVolume = async (period = "week") => {
  try {
    const res = await api.get("/analytics/hourly-volume", { params: { period } });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
