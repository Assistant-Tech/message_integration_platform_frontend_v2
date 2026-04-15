import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/app/constants/queryKeys";
import {
  fetchAnalyticsSummary,
  fetchAnalyticsMessages,
  fetchAnalyticsConversations,
  fetchTeamMembers,
  fetchTeamSummary,
  fetchTeamActivities,
  fetchChannelStats,
  fetchLeaderboard,
  fetchResolutionStats,
  fetchCsatRatings,
  fetchTrafficPatterns,
  fetchHourlyVolume,
} from "@/app/services/analytics.services";
import type {
  AnalyticsPeriod,
  MessagesPeriod,
  MessagesGroupBy,
  TeamMembersQueryParams,
  TeamActivitiesQueryParams,
} from "@/app/types/analytics.types";

/*
 * Dashboard summary stat cards
 * staleTime: 30s — near real-time
 */
export const useAnalyticsSummary = (period: AnalyticsPeriod = "today") => {
  return useQuery({
    queryKey: QUERY_KEYS.ANALYTICS_SUMMARY(period),
    queryFn: () => fetchAnalyticsSummary(period),
    staleTime: 30_000,
  });
};

/*
 * Messages line chart data
 * staleTime: 5min — chart data changes slowly
 */
export const useAnalyticsMessages = (
  period: MessagesPeriod = "month",
  channel?: string,
  groupBy?: MessagesGroupBy,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.ANALYTICS_MESSAGES(period, channel, groupBy),
    queryFn: () => fetchAnalyticsMessages({ period, channel, groupBy }),
    staleTime: 300_000,
  });
};

/*
 * Recent conversations list
 * staleTime: 15s — active conversations shift fast
 */
export const useAnalyticsConversations = (
  status?: "active" | "waiting" | "resolved",
  limit?: number,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.ANALYTICS_CONVERSATIONS(status, limit),
    queryFn: () => fetchAnalyticsConversations({ status, limit }),
    staleTime: 15_000,
  });
};

/*
 * Team member list with individual stats
 * staleTime: 10s — status changes frequently
 */
export const useTeamMembers = (params?: TeamMembersQueryParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.TEAM_MEMBERS(params),
    queryFn: () => fetchTeamMembers(params),
    staleTime: 10_000,
  });
};

/*
 * Team aggregate summary (status bar)
 * staleTime: 10s — derived from members
 */
export const useTeamSummary = () => {
  return useQuery({
    queryKey: QUERY_KEYS.TEAM_SUMMARY,
    queryFn: () => fetchTeamSummary(),
    staleTime: 10_000,
  });
};

/*
 * Live activity feed — no cache (real-time)
 * staleTime: 0 — always refetch
 */
export const useTeamActivities = (params?: TeamActivitiesQueryParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.TEAM_ACTIVITIES(params),
    queryFn: () => fetchTeamActivities(params),
    staleTime: 0,
  });
};

/*
 * Channel breakdown stats
 */
export const useChannelStats = (period = "month") => {
  return useQuery({
    queryKey: ["analytics", "channels", period] as const,
    queryFn: () => fetchChannelStats(period),
    staleTime: 300_000,
  });
};

/*
 * Agent leaderboard
 */
export const useLeaderboard = (params?: { period?: string; limit?: number }) => {
  return useQuery({
    queryKey: ["analytics", "leaderboard", params] as const,
    queryFn: () => fetchLeaderboard(params),
    staleTime: 300_000,
  });
};

/*
 * Resolution stats
 */
export const useResolutionStats = (period = "month") => {
  return useQuery({
    queryKey: ["analytics", "resolutions", period] as const,
    queryFn: () => fetchResolutionStats(period),
    staleTime: 300_000,
  });
};

/*
 * CSAT ratings
 */
export const useCsatRatings = (period = "month") => {
  return useQuery({
    queryKey: ["analytics", "csat", period] as const,
    queryFn: () => fetchCsatRatings(period),
    staleTime: 900_000,
  });
};

/*
 * Traffic patterns (hourly heatmap)
 */
export const useTrafficPatterns = (period = "week") => {
  return useQuery({
    queryKey: ["analytics", "traffic", period] as const,
    queryFn: () => fetchTrafficPatterns(period),
    staleTime: 1_800_000,
  });
};

/*
 * Hourly message volume (incoming vs outgoing)
 */
export const useHourlyVolume = (period = "week") => {
  return useQuery({
    queryKey: ["analytics", "hourly-volume", period] as const,
    queryFn: () => fetchHourlyVolume(period),
    staleTime: 300_000,
  });
};
