import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/app/hooks/useAuth";
import { UserRole } from "@/app/types/auth";
import { Loading } from "@/app/components/common";
import { Suspense, type ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: UserRole[]; // Optional: restrict access to specific roles
  requireAuth?: boolean; // Default is true (only logged-in users allowed)
  requireOnboarding?: boolean; // Default is false (only for onboarding routes)
}

const ProtectedRoute = ({
  children,
  roles,
  requireAuth = true,
  requireOnboarding = false,
}: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading, isOnboardingCompleted } = useAuth();
  const location = useLocation();

  // ⏳ Still verifying auth state
  if (isLoading) {
    return <Loading />;
  }

  // 🔐 Not authenticated, but auth is required
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🚫 Authenticated but lacks required role
  if (isAuthenticated && user && roles?.length && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 📋 Onboarding flow logic
  if (isAuthenticated && user) {
    // If user is trying to access onboarding but has already completed it
    if (requireOnboarding && isOnboardingCompleted) {
      const dashboardPath = user.role === "admin" ? "/admin/dashboard" : "/dashboard";
      return <Navigate to={dashboardPath} replace />;
    }

    // If user is trying to access dashboard but hasn't completed onboarding
    if (!requireOnboarding && !isOnboardingCompleted && !location.pathname.includes("/onboarding")) {
      return <Navigate to="/onboardingform/step-1" replace />;
    }
  }

  // ⚠️ Public route (like /login) but user is already logged in
  if (!requireAuth && isAuthenticated && user) {
    const dashboardPath =
      user.role === "admin" ? "/admin/dashboard" : "/dashboard";

    // If on a public page like login/register, redirect to dashboard
    if (["/login", "/register"].includes(location.pathname)) {
      return <Navigate to={dashboardPath} replace />;
    }
  }

  // ✅ All checks passed, render children
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default ProtectedRoute;
