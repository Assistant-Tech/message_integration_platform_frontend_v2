import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PublicLayout } from "./components/layout";
import { Loading } from "@/app/components/common";

import PublicRoutes from "@/app/router/PublicRoutes";

// import { ProtectedRoutes, AdminRoutes, UserRoutes } from "@/app/router/";

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public routes under public layout */}
        <Route path="/*" element={<PublicLayout />}>
          <Route path="*" element={<PublicRoutes />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
