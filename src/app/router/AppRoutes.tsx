import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "@/app/components/common";
import ProtectedRoute from "@/app/router/guards/ProtectedRoute";
import OnboardingGuard from "@/app/router/guards/OnboardingGurad";
import RoleBasedRoute from "@/app/router/guards/RoleBasedRoutes";

import PublicRoutes from "@/app/router/routes/PublicRoutes";
import AuthRoutes from "@/app/router/routes/AuthRoutes";
import AdminRoutes from "@/app/router/routes/AdminRoutes";
import UserRoutes from "@/app/router/routes/UserRoutes";

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* -------- Public and Auth routes -------- */}
        {PublicRoutes}
        {AuthRoutes}

        {/* -------- Protected routes -------- */}
        <Route element={<ProtectedRoute />}>
          <Route element={<OnboardingGuard />}>
            {/* Admin routes */}
            <Route element={<RoleBasedRoute allowedRoles={["TENANT_ADMIN"]} />}>
              {AdminRoutes}
            </Route>

            {/* User routes */}
            {UserRoutes}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
