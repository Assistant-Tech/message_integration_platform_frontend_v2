import { Routes, Route } from "react-router-dom";
import { Landing, Unauthorized, NotFound } from "@/app/pages";
import { APP_ROUTES } from "@/app/constants/routes";
// import { DemoPage } from "@/app/features/auth";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path={APP_ROUTES.PUBLIC.HOME} element={<Landing />} />

      {/* 401 - UnAuth Page  */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* 404 - Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
