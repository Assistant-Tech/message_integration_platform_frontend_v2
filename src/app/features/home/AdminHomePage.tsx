import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { useAuthStore } from "@/app/store/auth.store";
import { useMfaStore } from "@/app/store/mfa.store";
import { Loading } from "@/app/components/common";
import RecoveryPhrasesModal from "@/app/features/dashboard/admin/component/mfa/RecoveryCodesModal";
import DashboardHeader from "./components/DashboardHeader";
import StatCard from "./components/StatCard";
import IncomeChart from "./components/IncomeChart";
import RecentConversations from "./components/RecentConversations";
import { TeamActivityMonitor } from "@/app/features/team-activity";
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
} from "./lib/utils";
import PageShell from "@/app/components/layout/PageShell";

const SectionSkeleton = ({ height = "h-40" }: { height?: string }) => (
  <div
    className={`flex w-full items-center justify-center rounded-2xl border border-grey-light/60 bg-white ${height}`}
  >
    <Loader2 className="h-5 w-5 animate-spin text-grey-medium" />
  </div>
);

const SectionError = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) => (
  <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-danger-light bg-danger-light/20 p-6 text-center">
    <AlertCircle className="h-6 w-6 text-danger" strokeWidth={1.8} />
    <p className="body-medium-16 text-danger">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="label-semi-bold-14 text-primary hover:underline"
      >
        Retry
      </button>
    )}
  </div>
);

const AdminDashboard = () => {
  const { user: profile } = useAuthStore();
  const { displayedRecoveryCodes, closeRecoveryCodes } = useMfaStore();
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);

  const {
    data: summaryResponse,
    isLoading: summaryLoading,
    isError: summaryError,
    refetch: refetchSummary,
  } = useAnalyticsSummary("today");
  const {
    data: messagesResponse,
    isLoading: messagesLoading,
    isError: messagesError,
    refetch: refetchMessages,
  } = useAnalyticsMessages("month");
  const {
    data: conversationsResponse,
    isLoading: conversationsLoading,
    isError: conversationsError,
    refetch: refetchConversations,
  } = useAnalyticsConversations();
  const {
    data: membersResponse,
    isLoading: membersLoading,
    isError: membersError,
    refetch: refetchMembers,
  } = useTeamMembers();
  const {
    data: teamSummaryResponse,
    isLoading: teamSummaryLoading,
    isError: teamSummaryError,
    refetch: refetchTeamSummary,
  } = useTeamSummary();
  const {
    data: activitiesResponse,
    isLoading: activitiesLoading,
    isError: activitiesError,
    refetch: refetchActivities,
  } = useTeamActivities();

  const stats = useMemo(
    () =>
      summaryResponse?.data
        ? transformSummaryToStatCards(summaryResponse.data)
        : [],
    [summaryResponse],
  );

  const chartData = useMemo(() => {
    if (!messagesResponse?.data) return null;
    return {
      points: messagesResponse.data.points,
      total: messagesResponse.data.total.toLocaleString(),
      percentChange: messagesResponse.data.percentChange,
    };
  }, [messagesResponse]);

  const conversations = useMemo(() => {
    if (!conversationsResponse?.data) return [];
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
  }, [conversationsResponse]);

  const teamMembers = useMemo(() => {
    if (!membersResponse?.data) return [];
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
  }, [membersResponse]);

  const teamSummary = useMemo(() => {
    if (!teamSummaryResponse?.data) return null;
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
  }, [teamSummaryResponse]);

  const activityFeed = useMemo(() => {
    if (!activitiesResponse?.data) return [];
    return activitiesResponse.data.map((evt) => ({
      ...evt,
      timestamp: formatRelativeTime(evt.timestamp),
    }));
  }, [activitiesResponse]);

  useEffect(() => {
    if (displayedRecoveryCodes?.length > 0) {
      setShowRecoveryModal(true);
    }
  }, [displayedRecoveryCodes]);

  if (!profile) return <Loading />;

  const teamMonitorLoading =
    membersLoading || teamSummaryLoading || activitiesLoading;
  const teamMonitorError =
    membersError || teamSummaryError || activitiesError;
  const retryTeamMonitor = () => {
    refetchMembers();
    refetchTeamSummary();
    refetchActivities();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-white to-grey-light/40 py-4 md:py-6 lg:py-8">
      <PageShell>
        <div className="space-y-6">
          <DashboardHeader userName={profile.name} />

          <section
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            aria-label="Key metrics"
          >
            {summaryLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <SectionSkeleton key={i} height="h-36" />
              ))
            ) : summaryError ? (
              <div className="xl:col-span-5">
                <SectionError
                  message="Could not load metrics"
                  onRetry={() => refetchSummary()}
                />
              </div>
            ) : stats.length > 0 ? (
              stats.map((stat, index) => (
                <StatCard key={stat.label} stat={stat} index={index} />
              ))
            ) : (
              <div className="xl:col-span-5">
                <SectionError message="No records to show" />
              </div>
            )}
          </section>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              {messagesLoading ? (
                <SectionSkeleton height="h-[26rem]" />
              ) : messagesError ? (
                <SectionError
                  message="Could not load messages chart"
                  onRetry={() => refetchMessages()}
                />
              ) : chartData ? (
                <IncomeChart
                  data={chartData.points}
                  totalValue={chartData.total}
                  percentChange={chartData.percentChange}
                />
              ) : (
                <SectionError message="No records to show" />
              )}
            </div>
            <div className="lg:col-span-2">
              {conversationsLoading ? (
                <SectionSkeleton height="h-[26rem]" />
              ) : conversationsError ? (
                <SectionError
                  message="Could not load conversations"
                  onRetry={() => refetchConversations()}
                />
              ) : (
                <RecentConversations conversations={conversations} />
              )}
            </div>
          </div>

          {teamMonitorLoading ? (
            <SectionSkeleton height="h-96" />
          ) : teamMonitorError ? (
            <SectionError
              message="Could not load team activity"
              onRetry={retryTeamMonitor}
            />
          ) : teamSummary ? (
            <TeamActivityMonitor
              members={teamMembers}
              summary={teamSummary}
              activityFeed={activityFeed}
            />
          ) : (
            <SectionError message="No records to show" />
          )}
        </div>
      </PageShell>

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
