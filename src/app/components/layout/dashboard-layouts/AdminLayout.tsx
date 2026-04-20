import { useState } from "react";
import { Outlet } from "react-router-dom";
import { TopNavbar } from "@/app/features/dashboard/admin/component/ui";
import LockedSidebar from "@/app/features/dashboard/admin/component/ui/LockedSidebar";
import SubscriptionListener from "@/app/socket/listeners/SubscriptionListener";
import { AnnouncementBanner } from "@/app/components/common";
import { useBanner } from "@/app/context/BannerContext";
import { useNotificationStore } from "@/app/store/notification.store";
import { useGlobalSocket } from "@/app/hooks/useGlobalSocket";
import AppWalkthrough from "@/app/components/common/Walkthrough/AppWalkthrough";

const AdminLayout = () => {
  const { isVisible } = useBanner();
  const { hasUpcomingRenewal } = useNotificationStore();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useGlobalSocket();

  const showBanner =
    hasUpcomingRenewal && isVisible("dashboard_banner_dismissed");

  return (
    <section className="max-h-screen overflow-y-hidden flex flex-col h-screen gap-10">
      {showBanner && (
        <div className="w-full z-[20]">
          <AnnouncementBanner
            message="🚀 Your subscription is about to expire soon in 7 Days. Learn More"
            type="warning"
            storageKey="dashboard_banner_dismissed"
            nonDismissable
          />
        </div>
      )}
      <div className="flex flex-1 min-h-0">
        <LockedSidebar
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopNavbar showProfileMenu={false} />
          <main className="overflow-auto flex-1">
            <SubscriptionListener />
            <Outlet />
          </main>
        </div>
      </div>
      <AppWalkthrough />
    </section>
  );
};

export default AdminLayout;
