import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { APP_ROUTES } from "@/app/constants/routes";

const AdminLayout = lazy(
  () => import("@/app/components/layout/dashboard-layouts/AdminLayout"),
);
const AdminDashboardPage = lazy(
  () =>
    import("@/app/features/dashboard/admin/pages/dashboard/AdminDashboardPage"),
);
const InboxPage = lazy(
  () => import("@/app/features/inbox/InboxPage"),
);
const ContactPage = lazy(
  () => import("@/app/features/dashboard/admin/pages/contact/ContactAdminPage"),
);
const ProfileSettings = lazy(
  () => import("@/app/features/dashboard/admin/pages/settings/ProfileSettings"),
);
const SecuritySettings = lazy(
  () =>
    import("@/app/features/dashboard/admin/pages/settings/SecuritySettings"),
);
const NotificationSettings = lazy(
  () =>
    import(
      "@/app/features/dashboard/admin/pages/settings/NotificationSettings"
    ),
);

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route
          path={APP_ROUTES.ADMIN.DASHBOARD}
          element={<AdminDashboardPage />}
        />
        <Route path={APP_ROUTES.ADMIN.CONVERSATION} element={<InboxPage />} />
        <Route path={APP_ROUTES.ADMIN.CONTACT} element={<ContactPage />} />
        <Route
          path={APP_ROUTES.ADMIN.SETTINGS_PROFILE}
          element={<ProfileSettings />}
        />
        <Route
          path={APP_ROUTES.ADMIN.SETTINGS_SECURITY}
          element={<SecuritySettings />}
        />
        <Route
          path={APP_ROUTES.ADMIN.SETTINGS_NOTIFICATIONS}
          element={<NotificationSettings />}
        />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
