import { Loading } from "@/app/components/common";
import { useAuthStore } from "@/app/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";


//role based routing
const ProtectedRoute = () => {
  const isRefreshing = useAuthStore((s) => s.isRefreshing);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  // 1. Show loader while refreshing token
  if (isRefreshing) return <Loading />;

  // 2. Redirect to login if not authenticated
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // 4. Wait until user profile is loaded
  if (!user) return <Loading />;

  // 5. Everything ok → render child routes
  return <Outlet />;
};

export default ProtectedRoute;
