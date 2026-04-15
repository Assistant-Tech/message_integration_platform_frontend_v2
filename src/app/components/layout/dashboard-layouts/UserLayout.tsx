import { useState } from "react";
import { Outlet } from "react-router-dom";
import LockedSidebar from "@/app/features/dashboard/admin/component/ui/LockedSidebar";
import { TopNavbar } from "@/app/features/dashboard/admin/component/ui";
import { useGlobalSocket } from "@/app/hooks/useGlobalSocket";

const UserLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useGlobalSocket();

  return (
    <section className="max-h-screen overflow-y-hidden flex flex-col h-screen gap-10">
      <div className="flex flex-1 min-h-0">
        <LockedSidebar
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopNavbar
            onMobileSidebarOpen={() => setIsMobileSidebarOpen(true)}
          />
          <main className="overflow-auto flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </section>
  );
};

export default UserLayout;
