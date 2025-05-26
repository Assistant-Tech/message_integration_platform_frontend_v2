import { Routes, Route } from "react-router-dom";
import { Landing, Unauthorized, NotFound } from "@/app/pages";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* 401 - UnAuth Page  */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* 404 - Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
