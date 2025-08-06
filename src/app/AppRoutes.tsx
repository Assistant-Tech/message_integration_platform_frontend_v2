import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PublicLayout } from "./components/layout";
import { Loading } from "@/app/components/common";

import { PublicRoutes, AdminRoutes, UserRoutes } from "@/app/router/";
import DashboardLayout from "./features/dashboard/admin/component/DashboardLayout";

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public routes under public layout */}
        <Route path="/*" element={<PublicLayout />}>
          <Route path="*" element={<PublicRoutes />} />
        </Route>

        {/* Admin routes under admin layout */}
        <Route path="/admin" element={<DashboardLayout />}>
          {AdminRoutes()}
        </Route>

        {/* User routes under user layout */}
        <Route path="/user/*" element={<DashboardLayout />}>
          <Route path="*" element={<UserRoutes />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
