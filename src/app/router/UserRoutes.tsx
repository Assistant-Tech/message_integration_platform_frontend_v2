import { Routes, Route } from "react-router-dom";
import { UserDashboard } from "@/app/pages/user";
// import { lazy } from "react";

// Lazy load user components --> Advance component handling
// const UserDashboard = lazy(() => import("@/app/pages/user/"));

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<UserDashboard />} />
    </Routes>
  );
};

export default AdminRoutes;
