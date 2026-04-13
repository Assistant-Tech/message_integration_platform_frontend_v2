import { useState, useMemo } from "react";
import { Container } from "@/app/components/layout";
import AnalyticsHeader from "./components/AnalyticsHeader";
import KpiCard from "./components/KpiCard";
import ConversationVolumeChart from "./components/ConversationVolumeChart";
import ChannelBreakdownChart from "./components/ChannelBreakdownChart";
import AgentLeaderboard from "./components/AgentLeaderboard";
import PlatformComparisonChart from "./components/PlatformComparisonChart";
import {
  MOCK_KPIS,
  MOCK_CHANNELS,
  MOCK_HOURLY,
  MOCK_AGENTS,
  MOCK_WEEKLY_TREND,
} from "./constants";
import type { TimeRange, KpiMetric, ChannelBreakdown, HourlyVolume, AgentPerformance } from "./types";
import {
  useAnalyticsSummary,
  useAnalyticsMessages,
  useChannelStats,
  useLeaderboard,
  useResolutionStats,
  useHourlyVolume,
} from "@/app/hooks/query/useAnalyticsQuery";
import { formatDuration } from "../dashboard/utils";

const RANGE_TO_PERIOD: Record<TimeRange, string> = {
  "7d": "week",
  "30d": "month",
  "90d": "quarter",
};

const CHANNEL_COLORS: Record<string, string> = {
  WHATSAPP: "#25D366",
  FACEBOOK: "#0084FF",
  INSTAGRAM: "#E1306C",
  TIKTOK: "#010101",
  INTERNAL: "#2E5E99",
};

const AnalyticsPage = () => {
  const [range, setRange] = useState<TimeRange>("30d");
  const period = RANGE_TO_PERIOD[range] ?? "month";

  // Hooks
  const { data: summaryRes } = useAnalyticsSummary(period === "quarter" ? "month" : (period as "today" | "week" | "month"));
  const { data: messagesRes } = useAnalyticsMessages(period === "quarter" ? "month" : (period as "week" | "month" | "year"), undefined, "day");
  const { data: channelsRes } = useChannelStats(period);
  const { data: leaderboardRes } = useLeaderboard({ period, limit: 5 });
  const { data: resolutionsRes } = useResolutionStats(period);
  const { data: hourlyRes } = useHourlyVolume(period === "quarter" ? "month" : period);

  // Transform: KPI cards
  const kpis: KpiMetric[] = useMemo(() => {
    const summary = summaryRes?.data;
    const resolutions = resolutionsRes?.data;
    if (!summary) return MOCK_KPIS;

    const fallback = (i: number) => MOCK_KPIS[i] ?? MOCK_KPIS[0]!;

    return [
      {
        label: "Total Conversations",
        value: summary.totalConversations.value.toLocaleString(),
        previousValue: "—",
        change: summary.totalConversations.trend,
        sparkline: fallback(0).sparkline,
      },
      {
        label: "Messages Sent",
        value: summary.messagesSent.value.toLocaleString(),
        previousValue: "—",
        change: summary.messagesSent.trend,
        sparkline: fallback(1).sparkline,
      },
      {
        label: "Avg Response Time",
        value: formatDuration(summary.avgResponseTime.valueSeconds),
        previousValue: "—",
        change: summary.avgResponseTime.trend,
        sparkline: fallback(2).sparkline,
      },
      {
        label: "Resolution Rate",
        value: resolutions ? `${resolutions.rate}%` : fallback(3).value,
        previousValue: "—",
        change: resolutions?.trend ?? 0,
        sparkline: fallback(3).sparkline,
      },
      {
        label: "Customer Satisfaction",
        value: fallback(4).value,
        previousValue: fallback(4).previousValue,
        change: fallback(4).change,
        sparkline: fallback(4).sparkline,
      },
    ];
  }, [summaryRes, resolutionsRes]);

  // Transform: Channel breakdown
  const channels: ChannelBreakdown[] = useMemo(() => {
    const data = channelsRes?.data;
    if (!data || !Array.isArray(data) || data.length === 0) return MOCK_CHANNELS;
    return data.map((ch: { channel: string; conversations: number; percentage: number }) => ({
      key: ch.channel.toLowerCase() as ChannelBreakdown["key"],
      channel: ch.channel,
      conversations: ch.conversations,
      percentage: ch.percentage,
      color: CHANNEL_COLORS[ch.channel] ?? "#8B5CF6",
    }));
  }, [channelsRes]);

  // Transform: Hourly volume from dedicated endpoint
  const hourlyData: HourlyVolume[] = useMemo(() => {
    const hours = hourlyRes?.data?.hours;
    if (!hours || !Array.isArray(hours) || hours.length === 0) return MOCK_HOURLY;
    return hours.map((h: { hour: string; incoming: number; outgoing: number }) => ({
      hour: h.hour,
      incoming: h.incoming,
      outgoing: h.outgoing,
    }));
  }, [hourlyRes]);

  // Transform: Weekly trend from messages endpoint
  const weeklyData = useMemo(() => {
    const points = messagesRes?.data?.points;
    if (!points || !Array.isArray(points) || points.length === 0) return MOCK_WEEKLY_TREND;
    return points.map((p: { label: string; value: number }) => ({ label: p.label, value: p.value }));
  }, [messagesRes]);

  // Transform: Agent leaderboard
  const agents: AgentPerformance[] = useMemo(() => {
    const items = leaderboardRes?.data?.items;
    if (!items || !Array.isArray(items) || items.length === 0) return MOCK_AGENTS;
    return items.map((a: { memberId: string; memberName: string; conversationsHandled: number; resolved: number; avgResponseTimeSeconds: number; csatAvg: number }) => ({
      id: a.memberId,
      name: a.memberName,
      conversations: a.conversationsHandled,
      resolved: a.resolved,
      avgResponseTime: formatDuration(a.avgResponseTimeSeconds),
      satisfaction: a.csatAvg || 4.5,
    }));
  }, [leaderboardRes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-white to-grey-light/40 py-4 md:py-6 lg:py-8">
      <Container>
        <div className="space-y-6">
          <AnalyticsHeader activeRange={range} onRangeChange={setRange} />

          {/* KPI Cards */}
          <section
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            aria-label="Key performance indicators"
          >
            {kpis.map((metric, i) => (
              <KpiCard key={metric.label} metric={metric} index={i} />
            ))}
          </section>

          {/* Charts row */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ConversationVolumeChart
                hourlyData={hourlyData}
                weeklyData={weeklyData}
              />
            </div>
            <div className="lg:col-span-2">
              <ChannelBreakdownChart channels={channels} />
            </div>
          </div>

          {/* Leaderboard + Platform Comparison */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AgentLeaderboard agents={agents} />
            <PlatformComparisonChart />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AnalyticsPage;
