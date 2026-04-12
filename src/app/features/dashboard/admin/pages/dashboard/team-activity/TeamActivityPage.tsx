import { Container } from "@/app/components/layout";
import { TeamActivityMonitor } from "./index";
import { MOCK_MEMBERS, MOCK_ACTIVITY_FEED, MOCK_SUMMARY } from "./constants";

const TeamActivityPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-base-white to-grey-light/40 py-4 md:py-6 lg:py-8">
    <Container>
      <TeamActivityMonitor
        members={MOCK_MEMBERS}
        summary={MOCK_SUMMARY}
        activityFeed={MOCK_ACTIVITY_FEED}
      />
    </Container>
  </div>
);

export default TeamActivityPage;
