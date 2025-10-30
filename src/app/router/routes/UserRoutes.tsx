import { Route, Navigate, useParams, Routes } from "react-router-dom";
import { lazy } from "react";

const UserLayout = lazy(
  () => import("@/app/components/layout/dashboard-layouts/UserLayout"),
);
const UserDashboardPage = lazy(
  () => import("@/app/features/dashboard/user/pages/dashboard/UserDashboard"),
);
const ProfileSettings = lazy(
  () => import("@/app/features/dashboard/admin/pages/settings/ProfileSettings"),
);

const VerifyRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/" replace />;
  return <Navigate to={`/${slug}/admin/dashboard`} replace />;
};

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/:slug/verify" element={<VerifyRedirect />} />
      <Route path="/:slug/dashboard" element={<UserLayout />}>
        <Route index element={<UserDashboardPage />} />
        <Route path="settings/profile" element={<ProfileSettings />} />
      </Route>
    </Routes>
  );
};
export default UserRoutes;
