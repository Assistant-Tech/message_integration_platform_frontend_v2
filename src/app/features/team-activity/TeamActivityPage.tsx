import { useMemo } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import PageShell from "@/app/components/layout/PageShell";
import { TeamActivityMonitor } from "./index";
import {
  useTeamMembers,
  useTeamSummary,
  useTeamActivities,
} from "@/app/hooks/query/useAnalyticsQuery";
import {
  formatDuration,
  formatRelativeTime,
} from "@/app/features/home/lib/utils";

const TeamActivityPage = () => {
  const {
    data: membersResponse,
    isLoading: membersLoading,
    isError: membersError,
    refetch: refetchMembers,
  } = useTeamMembers();
  const {
    data: teamSummaryResponse,
    isLoading: summaryLoading,
    isError: summaryError,
    refetch: refetchSummary,
  } = useTeamSummary();
  const {
    data: activitiesResponse,
    isLoading: activitiesLoading,
    isError: activitiesError,
    refetch: refetchActivities,
  } = useTeamActivities();

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

  const isLoading = membersLoading || summaryLoading || activitiesLoading;
  const isError = membersError || summaryError || activitiesError;

  const retry = () => {
    refetchMembers();
    refetchSummary();
    refetchActivities();
  };

  if (isLoading) {
    return (
      <PageShell>
        <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-2xl border border-grey-light/60 bg-white text-grey-medium">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="body-medium-16">Loading team activity...</p>
        </div>
      </PageShell>
    );
  }

  if (isError) {
    return (
      <PageShell>
        <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-2xl border border-danger-light bg-danger-light/20 text-center">
          <AlertCircle className="h-7 w-7 text-danger" />
          <p className="body-medium-16 text-danger">
            Could not load team activity
          </p>
          <button
            type="button"
            onClick={retry}
            className="label-semi-bold-14 text-primary hover:underline"
          >
            Retry
          </button>
        </div>
      </PageShell>
    );
  }

  if (!teamSummary) {
    return (
      <PageShell>
        <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-2xl border border-grey-light/60 bg-white text-center">
          <AlertCircle className="h-7 w-7 text-grey-medium/50" />
          <p className="body-medium-16 text-grey-medium">No records to show</p>
          <p className="caption-medium-12 text-grey-medium/60">
            Team data will populate once members are active
          </p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <TeamActivityMonitor
        members={teamMembers}
        summary={teamSummary}
        activityFeed={activityFeed}
      />
    </PageShell>
  );
};

export default TeamActivityPage;
