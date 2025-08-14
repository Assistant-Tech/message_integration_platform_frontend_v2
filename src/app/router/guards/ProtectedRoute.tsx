import { Loading } from "@/app/components/common";
import { useAuthStore } from "@/app/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isRefreshing = useAuthStore((s) => s.isRefreshing);
  const requiresOnboarding = useAuthStore((s) => s.requiresOnboarding);

  if (isRefreshing) {
    return <Loading />;
  }

  if (requiresOnboarding) {
    return <Navigate to={"/onboardingform"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
