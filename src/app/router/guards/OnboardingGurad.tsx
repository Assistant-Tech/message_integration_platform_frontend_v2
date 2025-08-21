import { useAuthStore } from "@/app/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";

const OnboardingGuard = () => {
  const requiresOnboarding = useAuthStore((s) => s.requiresOnboarding);

  if (requiresOnboarding) {
    return <Navigate to="/onboardingform" replace />;
  }

  return <Outlet />;
};

export default OnboardingGuard;
