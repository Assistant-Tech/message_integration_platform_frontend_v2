import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./guards/ProtectedRoutes";
import { APP_ROUTES } from "@/app/constants/routes";
import CheckEmail from "@/app/features/auth/pages/CheckEmail";
import LoginOTP from "@/app/features/auth/pages/LoginOTP";
import OnboardingForm from "@/app/features/auth/pages/onboarding/OnboardingForm";
import {
  OnboardingStep1,
  OnboardingStep2,
  OnboardingStep3,
  OnboardingStep4,
  OnboardingStep5,
} from "@/app/features/auth/pages/onboarding/steps";
import VerifyEmail from "@/app/features/auth/pages/VerifyEmail";

const ProtectedRoutes = () => {
  return (
    <Routes>
      {/* Protected Auth Routes */}
      <Route
        path="check-email"
        element={
          <ProtectedRoute>
            <CheckEmail />
          </ProtectedRoute>
        }
      />
      <Route
        path="login-otp"
        element={
          <ProtectedRoute>
            <LoginOTP />
          </ProtectedRoute>
        }
      />

      {/* Protected Onboarding Routes */}
      <Route
        path={APP_ROUTES.PUBLIC.ONBOARDING_FORM}
        element={
          <ProtectedRoute>
            <OnboardingForm />
          </ProtectedRoute>
        }
      >
        <Route
          path={APP_ROUTES.PUBLIC.ONBOARDING_FORM_STEP_1}
          element={<OnboardingStep1 />}
        />
        <Route
          path={APP_ROUTES.PUBLIC.ONBOARDING_FORM_STEP_2}
          element={<OnboardingStep2 />}
        />
        <Route
          path={APP_ROUTES.PUBLIC.ONBOARDING_FORM_STEP_3}
          element={<OnboardingStep3 />}
        />
        <Route
          path={APP_ROUTES.PUBLIC.ONBOARDING_FORM_STEP_4}
          element={<OnboardingStep4 />}
        />
        <Route
          path={APP_ROUTES.PUBLIC.ONBOARDING_FORM_STEP_5}
          element={<OnboardingStep5 />}
        />
      </Route>

      {/* Protected Verify Email Route */}
      <Route
        path="/verify/:token"
        element={
          <ProtectedRoute>
            <VerifyEmail />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default ProtectedRoutes; 