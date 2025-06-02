import { Routes, Route } from "react-router-dom";
import { Landing, Unauthorized, NotFound, CRM } from "@/app/pages";
import { APP_ROUTES } from "@/app/constants/routes";
import { ProductLayout } from "@/app/components/layout";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path={APP_ROUTES.PUBLIC.HOME} element={<Landing />} />

      {/* Product Routes */}
      <Route
        path={APP_ROUTES.PUBLIC.PRODUCTS_OVERVIEW}
        element={<ProductLayout />}
      >
        <Route path="crm" element={<CRM />} />
      </Route>

      {/* 401 - UnAuth Page  */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* 404 - Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
