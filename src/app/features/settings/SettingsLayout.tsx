import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { useVisibleSettingsNav } from "./hooks/useVisibleSettingsNav";
import SettingsNav from "./components/SettingsNav";

/**
 * Outer shell for every /admin/settings/* route. Renders the role-filtered
 * sidebar and hands the main area to React Router via <Outlet />.
 *
 * Child settings pages keep their existing internals — they just render
 * inside the Outlet.
 */
const SettingsLayout = () => {
  const { groups, active } = useVisibleSettingsNav();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="flex h-full min-h-0 bg-primary-light/10">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-grey-light bg-white md:block">
        <SettingsNav groups={groups} />
      </aside>

      {/* Mobile drawer */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsMobileNavOpen(false)}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-grey-light bg-white transition-transform duration-200 md:hidden",
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-hidden={!isMobileNavOpen}
      >
        <div className="flex items-center justify-between border-b border-grey-light px-4 py-4">
          <h1 className="text-base font-semibold text-grey">Settings</h1>
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(false)}
            className="rounded-md p-1.5 text-grey-medium hover:bg-grey-light hover:text-grey"
            aria-label="Close settings navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <SettingsNav groups={groups} />
      </aside>

      {/* Main area */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex items-center gap-3 border-b border-grey-light bg-white px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(true)}
            className="rounded-md p-1.5 text-grey-medium hover:bg-grey-light hover:text-grey"
            aria-label="Open settings navigation"
          >
            <Menu className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold text-grey">
            {active?.label ?? "Settings"}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SettingsLayout;
