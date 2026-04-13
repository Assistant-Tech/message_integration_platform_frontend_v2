import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/app/store/auth.store";
import { useMfaStore } from "@/app/store/mfa.store";
import { Loading } from "@/app/components/common";
import RecoveryPhrasesModal from "../../component/mfa/RecoveryCodesModal";
import DashboardHeader from "./DashboardHeader";
import StatCard from "./StatCard";
import IncomeChart from "./IncomeChart";
import RecentConversations from "./RecentConversations";
import {
  mockStats,
  mockIncomeData,
  mockRecentConversations,
} from "./constants";
import {
  TeamActivityMonitor,
  MOCK_MEMBERS,
  MOCK_ACTIVITY_FEED,
  MOCK_SUMMARY,
} from "./team-activity";
import { Container } from "@/app/components/layout";
import {
  useAnalyticsSummary,
  useAnalyticsMessages,
  useAnalyticsConversations,
  useTeamMembers,
  useTeamSummary,
  useTeamActivities,
} from "@/app/hooks/query/useAnalyticsQuery";
import {
  transformSummaryToStatCards,
  formatRelativeTime,
  formatDuration,
} from "./utils";

const AdminDashboard = () => {
  const { user: profile } = useAuthStore();
  const { displayedRecoveryCodes, closeRecoveryCodes } = useMfaStore();
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);

  // Analytics hooks
  const { data: summaryResponse } = useAnalyticsSummary("today");
  const { data: messagesResponse } = useAnalyticsMessages("month");
  const { data: conversationsResponse } = useAnalyticsConversations();
  const { data: membersResponse } = useTeamMembers();
  const { data: teamSummaryResponse } = useTeamSummary();
  const { data: activitiesResponse } = useTeamActivities();

  // Transform API data to component-friendly format, fallback to mocks
  const stats = useMemo(() => {
    if (summaryResponse?.data) {
      return transformSummaryToStatCards(summaryResponse.data);
    }
    return mockStats;
  }, [summaryResponse]);

  const chartData = useMemo(() => {
    if (messagesResponse?.data) {
      return {
        points: messagesResponse.data.points,
        total: messagesResponse.data.total.toLocaleString(),
        percentChange: messagesResponse.data.percentChange,
      };
    }
    return {
      points: mockIncomeData,
      total: "27,300",
      percentChange: 14.2,
    };
  }, [messagesResponse]);

  const conversations = useMemo(() => {
    if (conversationsResponse?.data) {
      return conversationsResponse.data.map((conv) => ({
        id: conv.id,
        name: conv.contactName,
        channel: conv.channel,
        time: new Date(conv.lastMessageAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        message: conv.lastMessagePreview,
        avatar: conv.contactAvatar ?? undefined,
        status: conv.status,
      }));
    }
    return mockRecentConversations;
  }, [conversationsResponse]);

  const teamMembers = useMemo(() => {
    if (membersResponse?.data) {
      return membersResponse.data.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        role: m.role,
        avatar: m.avatar ?? undefined,
        status: m.status,
        activeMinutesToday: m.activeMinutesToday,
        activeConversations: m.activeConversations,
        resolvedToday: m.resolvedToday,
        avgResponseTime: formatDuration(m.avgResponseTimeSeconds),
        lastActiveAt: formatRelativeTime(m.lastActiveAt),
      }));
    }
    return MOCK_MEMBERS;
  }, [membersResponse]);

  const teamSummary = useMemo(() => {
    if (teamSummaryResponse?.data) {
      const s = teamSummaryResponse.data;
      return {
        totalMembers: s.totalMembers,
        online: s.online,
        away: s.away,
        busy: s.busy,
        offline: s.offline,
        avgResponseTime: formatDuration(s.avgResponseTimeSeconds),
        totalResolved: s.totalResolvedToday,
      };
    }
    return MOCK_SUMMARY;
  }, [teamSummaryResponse]);

  const activityFeed = useMemo(() => {
    if (activitiesResponse?.data) {
      return activitiesResponse.data.map((evt) => ({
        ...evt,
        timestamp: formatRelativeTime(evt.timestamp),
      }));
    }
    return MOCK_ACTIVITY_FEED;
  }, [activitiesResponse]);

  useEffect(() => {
    if (displayedRecoveryCodes?.length > 0) {
      setShowRecoveryModal(true);
    }
  }, [displayedRecoveryCodes]);

  if (!profile) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-white to-grey-light/40 py-4 md:py-6 lg:py-8">
      <Container>
        <div className="space-y-6">
          {/* Greeting Banner */}
          <DashboardHeader userName={profile.name} />

          {/* Stat Cards */}
          <section
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            aria-label="Key metrics"
          >
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </section>

          {/* Charts + Conversations Row */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <IncomeChart
                data={chartData.points}
                totalValue={chartData.total}
                percentChange={chartData.percentChange}
              />
            </div>
            <div className="lg:col-span-2">
              <RecentConversations conversations={conversations} />
            </div>
          </div>

          {/* Team Activity Monitor */}
          <TeamActivityMonitor
            members={teamMembers}
            summary={teamSummary}
            activityFeed={activityFeed}
          />
        </div>
      </Container>

      {showRecoveryModal && (
        <RecoveryPhrasesModal
          codes={displayedRecoveryCodes}
          onClose={() => {
            setShowRecoveryModal(false);
            closeRecoveryCodes();
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
