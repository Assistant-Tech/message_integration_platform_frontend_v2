import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAuthStore } from "@/app/store/auth.store";
import { Loading } from "@/app/components/common";
import { ReactNode } from "react";
import { createMockUser, isAuthBypassEnabled } from "@/app/utils/dev/mockAuth";

interface RoleBasedRouteProps {
  allowedRoles: string[];
  children?: ReactNode;
}

const RoleBasedRoute = ({ allowedRoles, children }: RoleBasedRouteProps) => {
  const bypassEnabled = isAuthBypassEnabled();
  const isRefreshing = useAuthStore((s) => s.isRefreshing);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const { slug } = useParams();
  const activeUser = bypassEnabled ? createMockUser() : user;

  if (!bypassEnabled && isRefreshing) return <Loading />;
  if (!bypassEnabled && !isAuthenticated)
    return <Navigate to="/login" replace />;
  if (!activeUser) return <Loading />;

  if (!allowedRoles.includes(activeUser.roleType)) {
    return <Navigate to={`/${slug}/admin/dashboard`} replace />;
  }

  // ✅ if children passed, render them — otherwise use <Outlet /> for nested <Route>
  return children ? <>{children}</> : <Outlet />;
};

export default RoleBasedRoute;
