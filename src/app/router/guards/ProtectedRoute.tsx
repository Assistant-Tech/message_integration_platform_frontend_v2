import { Loading } from "@/app/components/common";
import { useAuthStore } from "@/app/store/auth.store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";
import { useEffect } from "react";
import { useCurrentUser } from "@/app/hooks/query/useAuthQuery";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const tenantSlug = useAuthStore((s) => s.tenantSlug);
  const requiresOnboarding = useAuthStore((s) => s.requiresOnboarding);
  const setUser = useAuthStore((s) => s.setUser);
  const setTenantSlug = useAuthStore((s) => s.setTenantSlug);

  const location = useLocation();

  const {
    data: profile,
    isLoading: isUserLoading,
    isError: userError,
  } = useCurrentUser();

  useEffect(() => {
    if (profile) {
      setUser(profile);
      if (profile.tenant?.slug) {
        setTenantSlug(profile.tenant.slug);
      }
    }
  }, [profile, setUser, setTenantSlug]);

  // Not logged in → redirect to login
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Waiting for profile fetch
  if (isUserLoading) return <Loading />;

  // Profile fetch failed (401 interceptor couldn't recover) → back to login
  if (userError || !profile) return <Navigate to="/login" replace />;

  // Onboarding required — let the OnboardingGuard handle the redirect
  if (requiresOnboarding) return <Outlet />;

  // Ensure URL starts with tenant slug
  if (tenantSlug) {
    const [, firstSegment, ...rest] = location.pathname.split("/");
    if (firstSegment !== tenantSlug) {
      return <Navigate to={`/${tenantSlug}/${rest.join("/")}`} replace />;
    }
  }

  // Role check
  if (allowedRoles && !allowedRoles.includes(profile.roleType)) {
    return <Navigate to={APP_ROUTES.PUBLIC.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
