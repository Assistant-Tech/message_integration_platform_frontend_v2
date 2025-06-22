import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PublicLayout } from "./components/layout";
import { Loading } from "@/app/components/common";

import PublicRoutes from "@/app/router/PublicRoutes";
import AdminRoutes from "@/app/router/guards/AdminRoutes";
import UserRoutes from "@/app/router/guards/UserRoutes";

import { AdminLayout, UserLayout } from "./components/layout";

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public routes under public layout */}
        <Route path="/*" element={<PublicLayout />}>
          <Route path="*" element={<PublicRoutes />} />
        </Route>

        {/* Admin routes under admin layout */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="*" element={<AdminRoutes />} />
        </Route>

        {/* User routes under user layout */}
        <Route path="/user/*" element={<UserLayout />}>
          <Route path="*" element={<UserRoutes />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
