import { Outlet } from "react-router-dom";
import {
  CollapseSidebar,
  TopNavbar,
} from "@/app/features/dashboard/admin/component/ui";
import SubscriptionListener from "@/app/components/common/socket/SubscriptionListener";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <CollapseSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <main className="overflow-auto flex-1">
          <SubscriptionListener />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
