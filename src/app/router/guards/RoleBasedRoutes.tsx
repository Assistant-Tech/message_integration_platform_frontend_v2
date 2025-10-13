import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAuthStore } from "@/app/store/auth.store";
import { Loading } from "@/app/components/common";

const RoleBasedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const isRefreshing = useAuthStore((s) => s.isRefreshing);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const { slug } = useParams();

  if (isRefreshing) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user) return <Loading />;

  if (!allowedRoles.includes(user.roleType)) {
    return <Navigate to={`/${slug}/admin/dashboard`} replace />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
