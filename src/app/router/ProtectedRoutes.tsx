import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/app/hooks/useAuth";
import { UserRole } from "@/app/types/auth";
import { Loading } from "@/app/components/common/";
import { Suspense, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: UserRole[];
  requireAuth?: boolean;
}

const ProtectedRoute = ({
  children,
  roles,
  requireAuth = true,
}: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading while checking authentication
  if (isLoading) {
    return <Loading />;
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but doesn't have the required role
  if (isAuthenticated && user && roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If not requiring auth and user is already authenticated,
  // redirect to appropriate dashboard
  if (!requireAuth && isAuthenticated && user) {
    if (location.pathname === "/login" || location.pathname === "/register") {
      const dashboardPath =
        user.role === "admin" ? "/admin/dashboard" : "/dashboard";
      return <Navigate to={dashboardPath} replace />;
    }
  }

  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default ProtectedRoute;
