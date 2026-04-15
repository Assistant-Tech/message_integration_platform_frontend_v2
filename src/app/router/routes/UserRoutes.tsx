import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { APP_ROUTES } from "@/app/constants/routes";

const UserLayout = lazy(
  () => import("@/app/components/layout/dashboard-layouts/UserLayout"),
);
const UserDashboardPage = lazy(
  () => import("@/app/features/home/UserHomePage"),
);
const InboxPage = lazy(() => import("@/app/features/inbox/InboxPage"));
const SettingsLayout = lazy(
  () => import("@/app/features/settings/SettingsLayout"),
);
const SettingsIndexPage = lazy(
  () => import("@/app/features/settings/SettingsIndexPage"),
);
const ProfileSettings = lazy(
  () => import("@/app/features/dashboard/admin/pages/settings/ProfileSettings"),
);
const NotificationSettings = lazy(
  () =>
    import(
      "@/app/features/dashboard/admin/pages/settings/NotificationSettings"
    ),
);

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route index element={<UserDashboardPage />} />
        <Route
          path={APP_ROUTES.ADMIN.DASHBOARD}
          element={<UserDashboardPage />}
        />
        <Route path={APP_ROUTES.ADMIN.CONVERSATION} element={<InboxPage />} />

        <Route element={<SettingsLayout />}>
          <Route
            path={APP_ROUTES.ADMIN.SETTINGS}
            element={<SettingsIndexPage />}
          />
          <Route
            path={APP_ROUTES.ADMIN.SETTINGS_PROFILE}
            element={<ProfileSettings />}
          />
          <Route
            path={APP_ROUTES.ADMIN.SETTINGS_NOTIFICATIONS}
            element={<NotificationSettings />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default UserRoutes;
