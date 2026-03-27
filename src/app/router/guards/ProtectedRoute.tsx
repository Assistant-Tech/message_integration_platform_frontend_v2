import { Loading } from "@/app/components/common";
import { useAuthStore } from "@/app/store/auth.store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";
import { useEffect } from "react";
import { useCurrentUserQuery } from "@/app/hooks/useCurrentUserQuery";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const {
    isRefreshing,
    isAuthenticated,
    accessToken,
    refreshAccessToken,
    resetAuth,
    tenantSlug,
    requiresOnboarding,
  } = useAuthStore();

  const location = useLocation();

  useEffect(() => {
    const ensureToken = async () => {
      if (!isAuthenticated) return;
      if (!accessToken) {
        try {
          const newToken = await refreshAccessToken();
          if (!newToken) resetAuth();
        } catch (err) {
          console.error("[ProtectedRoute] Token refresh failed:", err);
          resetAuth();
        }
      }
    };
    ensureToken();
  }, [isAuthenticated, accessToken, refreshAccessToken, resetAuth]);

  const {
    data: profile,
    isLoading: isUserLoading,
    isError: userError,
  } = useCurrentUserQuery();

  useEffect(() => {
    if (userError) {
      console.warn("[ProtectedRoute] User fetch error — resetting auth");
      resetAuth();
    }
  }, [userError, resetAuth]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (isRefreshing || isUserLoading || !profile) return <Loading />;

  if (!tenantSlug && !requiresOnboarding) return <Loading />;

  if (tenantSlug) {
    const [, firstSegment, ...rest] = location.pathname.split("/");
    if (firstSegment !== tenantSlug) {
      return <Navigate to={`/${tenantSlug}/${rest.join("/")}`} replace />;
    }
  }

  const userRole = profile.roleType;
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={APP_ROUTES.PUBLIC.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
