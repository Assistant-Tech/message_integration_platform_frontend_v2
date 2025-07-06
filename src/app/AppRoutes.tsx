import { Suspense } from "react";

import { PublicRoutes } from "@/app/router";
import { Loading } from "@/app/components/common";
import { PublicLayout } from "./components/layout";
import { BannerProvider } from "@/app/context/BannerContext";

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* Public Layout && Routes  */}
      <BannerProvider>
        <PublicLayout>
          <PublicRoutes />
        </PublicLayout>
      </BannerProvider>
    </Suspense>
  );
};

export default AppRoutes;
