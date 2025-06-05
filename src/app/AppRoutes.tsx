import { Suspense } from "react";

import { PublicRoutes } from "@/app/router";
import { Loading } from "@/app/components/common";
import { PublicLayout } from "./components/layout";

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* Public Layout && Routes  */}
      <PublicLayout>
        <PublicRoutes />
      </PublicLayout>
    </Suspense>
  );
};

export default AppRoutes;
