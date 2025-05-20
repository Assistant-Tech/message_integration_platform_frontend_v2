import { Routes, Route } from "react-router-dom";
import { AdminDashboard } from "@/app/pages/admin";
// import { lazy } from "react";

// Lazy load admin components --> Advance component handling
// const AdminDashboard = lazy(() => import("@/app/pages/admin/"));

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AdminRoutes;
