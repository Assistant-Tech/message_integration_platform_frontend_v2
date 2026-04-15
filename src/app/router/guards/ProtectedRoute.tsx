import { Loading } from "@/app/components/common";
import { useAuthStore } from "@/app/store/auth.store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";
import { useEffect } from "react";
import { useCurrentUser } from "@/app/hooks/query/useAuthQuery";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const {
    isAuthenticated,
    tenantSlug,
    requiresOnboarding,
    setUser,
    setTenantSlug,
  } = useAuthStore();

  // console.log("tests :", isAuthenticated, tenantSlug, requiresOnboarding);
  const location = useLocation();

  const {
    data: profile,
    isLoading: isUserLoading,
    isError: userError,
  } = useCurrentUser();

  // Sync profile → store
  useEffect(() => {
    if (profile) {
      setUser(profile);
      if (profile.tenant?.slug) {
        setTenantSlug(profile.tenant.slug);
      }
    }
  }, [profile, setUser, setTenantSlug]);

  // Not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Wait for user profile
  if (isUserLoading) {
    return <Loading />;
  }

  // Profile fetch failed → force re-login
  if (userError || !profile) {
    return <Navigate to="/login" replace />;
  }

  // Onboarding flow handled elsewhere
  if (requiresOnboarding) {
    return <Outlet />;
  }

  // Ensure tenant slug in URL under /app/:slug
  if (tenantSlug) {
    const segments = location.pathname.split("/").filter(Boolean);
    const firstSegment = segments[0];
    const currentSlug = firstSegment === "app" ? segments[1] : firstSegment;

    if (firstSegment !== "app" || currentSlug !== tenantSlug) {
      const tailSegments =
        firstSegment === "app" ? segments.slice(2) : segments.slice(1);
      const tailPath = tailSegments.join("/");
      const nextPath = tailPath
        ? `/app/${tenantSlug}/${tailPath}`
        : `/app/${tenantSlug}`;

      return <Navigate to={nextPath} replace />;
    }
  }

  // Role-based access control
  if (allowedRoles && !allowedRoles.includes(profile.roleType)) {
    return <Navigate to={APP_ROUTES.PUBLIC.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
