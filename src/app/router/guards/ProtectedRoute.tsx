import { Loading } from "@/app/components/common";
import { useAuthStore } from "@/app/store/auth.store";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const isRefreshing = useAuthStore((s) => s.isRefreshing);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const tenantSlug = useAuthStore((s) => s.tenantSlug);
  const accessToken = useAuthStore((s) => s.accessToken);
  const requiresOnboarding = useAuthStore((s) => s.requiresOnboarding);
  const fetchCurrentUserProfile = useAuthStore(
    (s) => s.fetchCurrentUserProfile,
  );
  const refreshAccessToken = useAuthStore((s) => s.refreshAccessToken);
  const resetAuth = useAuthStore((s) => s.resetAuth);

  const location = useLocation();

  useEffect(() => {
    const initAuth = async () => {
      if (!isAuthenticated) return;

      try {
        if (!accessToken) {
          const newToken = await refreshAccessToken();
          if (!newToken) {
            resetAuth();
            return;
          }
        }

        if (!user) {
          await fetchCurrentUserProfile();
        }
      } catch (err) {
        console.error("[ProtectedRoute] Auth init failed:", err);
        resetAuth();
      }
    };

    initAuth();
  }, [
    isAuthenticated,
    accessToken,
    user,
    refreshAccessToken,
    fetchCurrentUserProfile,
    resetAuth,
  ]);

  if (isRefreshing) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!user) return <Loading />;

  if (!tenantSlug && !requiresOnboarding) return <Loading />;

  // Redirect to tenant path only if tenantSlug exists
  if (tenantSlug) {
    const [, firstSegment, ...rest] = location.pathname.split("/");
    if (firstSegment !== tenantSlug) {
      return <Navigate to={`/${tenantSlug}/${rest.join("/")}`} replace />;
    }
  }

  const userRole = user.roleType;
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={APP_ROUTES.PUBLIC.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
