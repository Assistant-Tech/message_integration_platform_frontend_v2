import { useAuthStore } from "@/app/store/auth.store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";

const OnboardingGuard = () => {
  const requiresOnboarding = useAuthStore((s) => s.requiresOnboarding);
  const location = useLocation();

  if (!requiresOnboarding) return <Outlet />;

  if (location.pathname === APP_ROUTES.PUBLIC.ONBOARDING_FORM)
    return <Outlet />;

  return <Navigate to={APP_ROUTES.PUBLIC.ONBOARDING_FORM} replace />;
};

export default OnboardingGuard;
