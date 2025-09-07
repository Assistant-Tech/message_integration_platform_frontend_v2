import { Loading } from "@/app/components/common";
import { useAuthStore } from "@/app/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isRefreshing = useAuthStore((s) => s.isRefreshing);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  // While refreshing, don't decide yet → show loader
  if (isRefreshing) {
    return <Loading />;
  }

  // If refresh finished and still not authenticated → redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Optional: if you require user profile
  if (!user) {
    return <Loading />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
