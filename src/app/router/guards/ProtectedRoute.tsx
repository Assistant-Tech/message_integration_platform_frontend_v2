import { Loading } from "@/app/components/common";
import { useAuthStore } from "@/app/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isRefreshing = useAuthStore((s) => s.isRefreshing);
  const accessToken = useAuthStore((s) => s.accessToken);

  if (isRefreshing) {
    return <Loading />;
  }

  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
