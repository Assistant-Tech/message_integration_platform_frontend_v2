import { Loading } from "@/app/components/common";
import { useAuthStore } from "@/app/store/auth.store";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const isRefreshing = useAuthStore((s) => s.isRefreshing);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const tenantSlug = useAuthStore((s) => s.tenantSlug);
  const accessToken = useAuthStore((s) => s.accessToken);
  const fetchCurrentUserProfile = useAuthStore(
    (s) => s.fetchCurrentUserProfile,
  );
  const refreshAccessToken = useAuthStore((s) => s.refreshAccessToken);
  const resetAuth = useAuthStore((s) => s.resetAuth);

  useEffect(() => {
    const initAuth = async () => {
      if (!isAuthenticated) {
        console.log("[ProtectedRoute] Not authenticated → skipping init");
        return;
      }

      try {
        if (!accessToken) {
          console.log("[ProtectedRoute] No accessToken → calling refresh...");
          const newToken = await refreshAccessToken();

          if (!newToken) {
            console.warn("[ProtectedRoute] Refresh failed → resetting auth");
            resetAuth();
            return;
          }

          console.log("[ProtectedRoute] Refresh success");
        }

        if (!user) {
          console.log("[ProtectedRoute] User missing → fetching profile...");
          await fetchCurrentUserProfile();
          console.log("[ProtectedRoute] Profile fetched successfully");
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

  // ------------------- Render -------------------
  if (isRefreshing) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user || !tenantSlug) {
    console.log("[ProtectedRoute] Still waiting → user or tenantSlug missing");
    return <Loading />;
  }

  const userRole = user.roleType;
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.log("[ProtectedRoute] Unauthorized role:", userRole);
    return <Navigate to={APP_ROUTES.PUBLIC.UNAUTHORIZED} replace />;
  }

  console.log("[ProtectedRoute] Access granted → rendering Outlet");
  return <Outlet />;
};

export default ProtectedRoute;
