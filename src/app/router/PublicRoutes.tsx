import { Routes, Route } from "react-router-dom";
import Landing from "@/app/pages/public/Landing";

// import { Login, Regitser } from "@/app/pages/auth";
import Unauthorized from "@/app/pages/Unauthorized";
import NotFound from "@/app/pages/NotFound";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      {/* 404 - Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
