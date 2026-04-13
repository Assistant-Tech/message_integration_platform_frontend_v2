import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/auth.store";
import { useMfaStore } from "@/app/store/mfa.store";
import { Loading } from "@/app/components/common";
import RecoveryPhrasesModal from "@/app/features/dashboard/admin/component/mfa/RecoveryCodesModal";
import DashboardHeader from "@/app/features/dashboard/admin/pages/dashboard/DashboardHeader";
import StatCard from "@/app/features/dashboard/admin/pages/dashboard/StatCard";
import RecentConversations from "@/app/features/dashboard/admin/pages/dashboard/RecentConversations";
import { Container } from "@/app/components/layout";
import { memberStats, memberRecentConversations } from "./constants";
import QuickActions from "./QuickActions";

const UserDashboard = () => {
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

          {/* Stat Cards — member-relevant subset */}
          <section
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Your metrics"
          >
            {memberStats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </section>

          {/* Quick Actions + Recent Conversations */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <QuickActions />
            </div>
            <div className="lg:col-span-3">
              <RecentConversations
                conversations={memberRecentConversations}
              />
            </div>
          </div>
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

export default UserDashboard;
