import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/auth.store";
import { useMfaStore } from "@/app/store/mfa.store";
import { Loading } from "@/app/components/common";
import RecoveryPhrasesModal from "@/app/features/dashboard/admin/component/mfa/RecoveryCodesModal";
import DashboardHeader from "./components/DashboardHeader";
import StatCard from "./components/StatCard";
import RecentConversations from "./components/RecentConversations";
import QuickActions from "./components/UserQuickActions";
import PageShell from "@/app/components/layout/PageShell";
import { memberStats, memberRecentConversations } from "./constants/user";

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
    <>
      <PageShell>
        <div className="space-y-6">
          <DashboardHeader userName={profile.name} />

          <section
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Your metrics"
          >
            {memberStats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </section>

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
    </>
  );
};

export default UserDashboard;
