import { Suspense } from "react";

import { PublicRoutes } from "@/app/router";
import { Loading } from "@/app/components/common";
import { PublicLayout } from "./components/layout";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/public/Landing";

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* Public Layout && Routes  */}
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      <PublicLayout>
        <PublicRoutes />
      </PublicLayout>
      {/* Admin Routes */}
      {/* <AdminRoutes /> */}
      {/* User Routes  */}
      {/* <UserRoutes /> */}
    </Suspense>
  );
};

export default AppRoutes;
