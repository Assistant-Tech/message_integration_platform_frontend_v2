import { lazy, Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { TopNavbar } from "@/app/features/dashboard/admin/component/ui";
import LockedSidebar from "@/app/features/dashboard/admin/component/ui/LockedSidebar";
import SubscriptionListener from "@/app/socket/listeners/SubscriptionListener";
import { AnnouncementBanner } from "@/app/components/common";
import { useBanner } from "@/app/context/BannerContext";
import { useNotificationStore } from "@/app/store/notification.store";
import { useGlobalSocket } from "@/app/hooks/useGlobalSocket";

// Lazy-load the walkthrough so `react-joyride` (large dep tree) only enters
// the graph once the admin dashboard is reached. Keeps public/auth routes
// out of its pre-bundle surface — which previously caused Vite HMR to evict
// other dynamic chunks mid-load.
const AppWalkthrough = lazy(
  () => import("@/app/components/common/Walkthrough/AppWalkthrough"),
);

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
          <TopNavbar
            showProfileMenu={false}
            onSidebarToggle={() => setIsMobileSidebarOpen((prev) => !prev)}
          />
          <main className="overflow-auto flex-1">
            <SubscriptionListener />
            <Outlet />
          </main>
        </div>
      </div>
      <Suspense fallback={null}>
        <AppWalkthrough />
      </Suspense>
    </section>
  );
};

export default AdminLayout;
