import { useState } from "react";
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
import type { TimeRange } from "./types";

const AnalyticsPage = () => {
  const [range, setRange] = useState<TimeRange>("30d");

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
            {MOCK_KPIS.map((metric, i) => (
              <KpiCard key={metric.label} metric={metric} index={i} />
            ))}
          </section>

          {/* Charts row */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ConversationVolumeChart
                hourlyData={MOCK_HOURLY}
                weeklyData={MOCK_WEEKLY_TREND}
              />
            </div>
            <div className="lg:col-span-2">
              <ChannelBreakdownChart channels={MOCK_CHANNELS} />
            </div>
          </div>

          {/* Leaderboard + Platform Comparison */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AgentLeaderboard agents={MOCK_AGENTS} />
            <PlatformComparisonChart />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AnalyticsPage;
