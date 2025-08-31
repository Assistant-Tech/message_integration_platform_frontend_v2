import { Outlet } from "react-router-dom";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";

const SettingsPage = () => {
  return (
    <div className="flex">
      {/* Sidebar (optional) */}
      <aside className="w-64 border-r p-4">
        <p className="font-semibold">Settings Menu</p>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-6 py-4">
        <Heading title="Settings" align="left" className="text-base-black" />
        <Outlet />
      </main>
    </div>
  );
};

export default SettingsPage;
