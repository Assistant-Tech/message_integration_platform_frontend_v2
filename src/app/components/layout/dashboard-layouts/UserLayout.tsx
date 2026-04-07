import { Outlet } from "react-router-dom";
import {
  CollapseSidebar,
  TopNavbar,
} from "@/app/features/dashboard/admin/component/ui";
import { useGlobalSocket } from "@/app/hooks/useGlobalSocket";

const UserLayout = () => {
  // Message Socket connection
  useGlobalSocket();
  return (
    <section className="max-h-screen overflow-y-hidden flex flex-col h-screen gap-10">
      <div className="flex flex-1 min-h-0">
        <CollapseSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopNavbar />
          <main className="overflow-auto flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </section>
  );
};

export default UserLayout;
