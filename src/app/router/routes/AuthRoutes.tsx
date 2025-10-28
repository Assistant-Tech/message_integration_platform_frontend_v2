import { Route } from "react-router-dom";
import { lazy } from "react";
import { APP_ROUTES } from "@/app/constants/routes";

const LoginPage = lazy(() => import("@/app/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/app/features/auth/pages/RegisterPage"));
const ForgetPassword = lazy(() => import("@/app/features/auth/pages/ForgetPassword"));
const ResetPassword = lazy(() => import("@/app/features/auth/pages/ResetPassword"));
const VerifyEmail = lazy(() => import("@/app/features/auth/pages/VerifyEmail"));
const AcceptInvitation = lazy(() => import("@/app/features/auth/pages/Accept_Invitation"));
const CheckEmail = lazy(() => import("@/app/features/auth/pages/CheckEmail"));
const OnboardingForm = lazy(() => import("@/app/features/auth/pages/onboarding/steps/OnboardingForm"));

const AuthRoutes = (
  <>
    <Route path={APP_ROUTES.PUBLIC.LOGIN} element={<LoginPage />} />
    <Route path={APP_ROUTES.PUBLIC.REGISTER} element={<RegisterPage />} />
    <Route path={APP_ROUTES.PUBLIC.FORGOT_PASSWORD} element={<ForgetPassword />} />
    <Route path={APP_ROUTES.PUBLIC.RESET_PASSWORD} element={<ResetPassword />} />
    <Route path="/verify/:token" element={<VerifyEmail />} />
    <Route path="/check-email" element={<CheckEmail />} />
    <Route path={APP_ROUTES.PUBLIC.ACCEPT_INVITATION} element={<AcceptInvitation />} />
    <Route path={APP_ROUTES.PUBLIC.ONBOARDING_FORM} element={<OnboardingForm />} />
  </>
);

export default AuthRoutes;
