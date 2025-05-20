import { Suspense } from "react";

import { AdminRoutes, PublicRoutes, UserRoutes } from "@/app/router";
import { Loading } from "@/app/components/common";
import { PublicLayout } from "./components/layout";

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* Public Layout && Routes  */}
      <PublicLayout>
        <PublicRoutes />
      </PublicLayout>
      {/* Admin Routes */}
      <AdminRoutes />
      {/* User Routes  */}
      <UserRoutes />
    </Suspense>
  );
};

export default AppRoutes;
