import { Outlet } from "react-router-dom";
import {
  CollapseSidebar,
  TopNavbar,
} from "@/app/features/dashboard/admin/component/ui";
import SubscriptionListener from "@/app/Socket/listeners/SubscriptionListener";
import { AnnouncementBanner } from "@/app/components/common";
import { useBanner } from "@/app/context/BannerContext";
import { useNotificationStore } from "@/app/store/notification.store";

const AdminLayout = () => {
  const { isVisible } = useBanner();
  const { hasUpcomingRenewal } = useNotificationStore();

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
        <CollapseSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopNavbar />
          <main className="overflow-auto flex-1">
            <SubscriptionListener />
            <Outlet />
          </main>
        </div>
      </div>
    </section>
  );
};

export default AdminLayout;
