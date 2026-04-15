import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAuthStore } from "@/app/store/auth.store";
import { Loading } from "@/app/components/common";
import { ReactNode } from "react";

interface RoleBasedRouteProps {
  allowedRoles: string[];
  children?: ReactNode;
}

const RoleBasedRoute = ({ allowedRoles, children }: RoleBasedRouteProps) => {
  const isRefreshing = useAuthStore((s) => s.isRefreshing);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const { slug } = useParams();
  const activeUser = user;

  if (isRefreshing) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!activeUser) return <Loading />;

  if (!allowedRoles.includes(activeUser.roleType)) {
    switch (activeUser.roleType) {
      case "TENANT_ADMIN":
        return <Navigate to={`/app/${slug}/admin/dashboard`} replace />;
      case "MEMBER":
        return <Navigate to={`/app/${slug}/dashboard`} replace />;
      default:
        return <Navigate to="/unauthorized" replace />;
    }
  }

  return children ? <>{children}</> : <Outlet />;
};

export default RoleBasedRoute;
