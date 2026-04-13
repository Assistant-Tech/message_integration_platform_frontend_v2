import { useMemo } from "react";
import { Container } from "@/app/components/layout";
import { TeamActivityMonitor } from "./index";
import { MOCK_MEMBERS, MOCK_ACTIVITY_FEED, MOCK_SUMMARY } from "./constants";
import {
  useTeamMembers,
  useTeamSummary,
  useTeamActivities,
} from "@/app/hooks/query/useAnalyticsQuery";
import { formatDuration, formatRelativeTime } from "../utils";

const TeamActivityPage = () => {
  const { data: membersResponse } = useTeamMembers();
  const { data: teamSummaryResponse } = useTeamSummary();
  const { data: activitiesResponse } = useTeamActivities();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-white to-grey-light/40 py-4 md:py-6 lg:py-8">
      <Container>
        <TeamActivityMonitor
          members={teamMembers}
          summary={teamSummary}
          activityFeed={activityFeed}
        />
      </Container>
    </div>
  );
};

export default TeamActivityPage;
