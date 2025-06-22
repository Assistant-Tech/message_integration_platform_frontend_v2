import { Route, Routes } from "react-router-dom";
import AdminDashboard from "@/app/features/dashboard/admin/AdminDashboard";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      {/* fallback */}
      <Route path="*" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AdminRoutes;
