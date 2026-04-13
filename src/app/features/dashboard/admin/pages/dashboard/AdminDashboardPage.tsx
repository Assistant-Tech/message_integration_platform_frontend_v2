import { useEffect, useState } from "react";
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

const AdminDashboard = () => {
  const { user: profile } = useAuthStore();
  const { displayedRecoveryCodes, closeRecoveryCodes } = useMfaStore();
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);

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
            {mockStats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </section>

          {/* Charts + Conversations Row */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <IncomeChart
                data={mockIncomeData}
                totalValue="27,300"
                percentChange={14.2}
              />
            </div>
            <div className="lg:col-span-2">
              <RecentConversations conversations={mockRecentConversations} />
            </div>
          </div>

          {/* Team Activity Monitor */}
          <TeamActivityMonitor
            members={MOCK_MEMBERS}
            summary={MOCK_SUMMARY}
            activityFeed={MOCK_ACTIVITY_FEED}
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
