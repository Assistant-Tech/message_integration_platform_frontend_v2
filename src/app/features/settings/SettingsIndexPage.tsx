import { Navigate } from "react-router-dom";
import { Settings2 } from "lucide-react";
import { useVisibleSettingsNav } from "./hooks/useVisibleSettingsNav";

/**
 * Lands at /admin/settings. If the user has any visible section, redirect
 * to the first one. If not (empty role allowlist — shouldn't happen today
 * but defensive), show an honest empty state rather than a blank page.
 */
const SettingsIndexPage = () => {
  const { firstVisible } = useVisibleSettingsNav();

  if (firstVisible) {
    return <Navigate to={firstVisible.absoluteHref} replace />;
  }

  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="max-w-sm text-center">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary">
          <Settings2 className="h-6 w-6" strokeWidth={1.8} />
        </span>
        <h2 className="text-base font-semibold text-grey">
          No settings available
        </h2>
        <p className="mt-2 text-sm text-grey-medium">
          Your role doesn't have access to any settings sections. Contact your
          workspace admin if you believe this is a mistake.
        </p>
      </div>
    </div>
  );
};

export default SettingsIndexPage;
