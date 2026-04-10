import { motion } from "framer-motion";
import { Switch } from "@/app/features/dashboard/admin/component/ui";
import { useNotificationStore } from "@/app/store/notification.store";
import { useAuthStore } from "@/app/store/auth.store";
import { useTenantDetails } from "@/app/hooks/query/useTenantQuery";
import {
  ProfileHeroCard,
  PersonalDetailsCard,
  ChangePasswordCard,
  CompanyDetailsCard,
} from "@/app/features/dashboard/admin/component/profile";

/**
 * ProfileSettings — thin orchestrator.
 *
 * Each visual section is a focused component:
 *   ProfileHeroCard     — avatar + name + badges
 *   PersonalDetailsCard — name / email / phone / role (editable)
 *   ChangePasswordCard  — password change with strength meter
 *   CompanyDetailsCard  — read-only tenant / team info
 */
const ProfileSettings = () => {
  const { user } = useAuthStore();
  const { showToasts, toggleToasts } = useNotificationStore();
  const { data: tenantResponse, isLoading: isTenantLoading } =
    useTenantDetails();
  const tenant = tenantResponse?.data;

  if (!user) return null;

  const displayName = user.name || user.email.split("@")[0] || "";

  return (
    <motion.section
      className="max-w-full flex flex-col px-4 md:px-6 py-6 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="h4-bold-24 text-grey">Settings</h1>
        <p className="label-semi-bold-14 text-primary mt-0.5">My Profile</p>
      </div>

      {/* Profile Hero */}
      <div className="mb-5">
        <ProfileHeroCard
          name={displayName}
          email={user.email}
          avatar={user.avatar}
          roleType={user.roleType}
          userStatus={user.userStatus}
          isVerified={user.isVerified}
        />
      </div>

      {/* Notification Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-grey-light rounded-xl px-5 py-4 sm:px-6 mb-5 flex items-center justify-between"
      >
        <div>
          <p className="label-semi-bold-14 text-grey">Toast Notifications</p>
          <p className="caption-medium-12 text-grey-medium mt-0.5">
            Show in-app toast alerts
          </p>
        </div>
        <Switch checked={showToasts} onCheckedChange={toggleToasts} />
      </motion.div>

      {/* 2-column grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 xl:items-stretch">
        {/* Left: Personal + Password */}
        <div className="flex flex-col gap-5">
          <PersonalDetailsCard
            initialName={displayName}
            initialEmail={user.email}
            roleType={user.roleType}
          />
          <ChangePasswordCard />
        </div>

        {/* Right: Company */}
        <CompanyDetailsCard tenant={tenant} isLoading={isTenantLoading} />
      </div>
    </motion.section>
  );
};

export default ProfileSettings;
