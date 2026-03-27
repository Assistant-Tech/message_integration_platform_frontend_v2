import { Loading } from "@/app/components/common";
import { useAuthStore } from "@/app/store/auth.store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";
import { useEffect } from "react";
import { useCurrentUser } from "@/app/hooks/query/useAuthQuery";
import {
  isAuthBypassEnabled,
  createMockUser,
  createMockAuthState,
} from "@/app/utils/dev/mockAuth";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const tenantSlug = useAuthStore((s) => s.tenantSlug);
  const requiresOnboarding = useAuthStore((s) => s.requiresOnboarding);
  const setUser = useAuthStore((s) => s.setUser);
  const setTenantSlug = useAuthStore((s) => s.setTenantSlug);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setCsrfToken = useAuthStore((s) => s.setCsrfToken);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const setRequiresOnboarding = useAuthStore((s) => s.setRequiresOnboarding);
  const setTokenExpiresAt = useAuthStore((s) => s.setTokenExpiresAt);

  const location = useLocation();

  const {
    data: profile,
    isLoading: isUserLoading,
    isError: userError,
  } = useCurrentUser();

  // Development bypass logic
  useEffect(() => {
    if (isAuthBypassEnabled() && !isAuthenticated) {
      console.log(
        "🔧 AUTH BYPASS: Setting up mock authentication for development",
      );
      const mockAuth = createMockAuthState();
      const mockUser = createMockUser();

      // Set mock auth state
      setAccessToken(mockAuth.accessToken);
      setCsrfToken(mockAuth.csrfToken);
      setTenantSlug(mockAuth.tenantSlug);
      setAuthenticated(mockAuth.isAuthenticated);
      setRequiresOnboarding(mockAuth.requiresOnboarding);
      setTokenExpiresAt(mockAuth.tokenExpiresAt);

      // Set mock user
      setUser(mockUser);
    }
  }, [
    isAuthenticated,
    setAccessToken,
    setCsrfToken,
    setTenantSlug,
    setAuthenticated,
    setRequiresOnboarding,
    setTokenExpiresAt,
    setUser,
  ]);

  useEffect(() => {
    if (profile) {
      setUser(profile);
      if (profile.tenant?.slug) {
        setTenantSlug(profile.tenant.slug);
      }
    }
  }, [profile, setUser, setTenantSlug]);

  // Not logged in → redirect to login (unless bypass is enabled)
  if (!isAuthenticated && !isAuthBypassEnabled()) {
    return <Navigate to="/login" replace />;
  }

  // In bypass mode, skip user loading and error checks
  if (isAuthBypassEnabled()) {
    const mockUser = createMockUser();

    // Ensure URL starts with tenant slug
    if (mockUser.tenant?.slug) {
      const [, firstSegment, ...rest] = location.pathname.split("/");
      if (firstSegment !== mockUser.tenant.slug) {
        return (
          <Navigate to={`/${mockUser.tenant.slug}/${rest.join("/")}`} replace />
        );
      }
    }

    // Role check (using mock user data)
    if (allowedRoles && !allowedRoles.includes(mockUser.roleType)) {
      return <Navigate to={APP_ROUTES.PUBLIC.UNAUTHORIZED} replace />;
    }

    return <Outlet />;
  }

  // Normal authentication flow when not in bypass mode
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
