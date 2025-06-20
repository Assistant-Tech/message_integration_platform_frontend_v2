import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/store/useOnboardingStore";

const Onboarding = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { completedSteps } = useOnboardingStore();

  useEffect(() => {
    const currentStep = parseInt(location.pathname.split("step-")[1] || "1");

    if (currentStep > completedSteps + 1) {
      navigate(`/onboardingform/step-${completedSteps + 1}`);
    }
  }, [location.pathname, completedSteps, navigate]);

  return (
    <div className="onboarding-container">
      <Outlet />
    </div>
  );
};

export default Onboarding;
