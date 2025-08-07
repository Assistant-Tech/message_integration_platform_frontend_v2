import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./guards/ProtectedRoutes";
import { APP_ROUTES } from "@/app/constants/routes";
import {
  Landing,
  Unauthorized,
  NotFound,
  CRM,
  Support,
  Onboarding,
  Policy,
  TermsCondition,
  Updates,
  Demo,
  AboutUs,
  PricingPage,
  FAQPage,
  Product,
} from "@/app/pages";
import { ProductLayout, ResourceLayout } from "@/app/components/layout";
// Feature Login
import {
  ForgetPassword,
  LoginPage,
  RegisterPage,
  ResetPassword,
} from "@/app/features/auth";
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

const CombinedRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={APP_ROUTES.PUBLIC.HOME} element={<Landing />} />
      <Route path={APP_ROUTES.PUBLIC.DEMO} element={<Demo />} />
      {/* Login & Registration Page Routes */}
      <Route path={APP_ROUTES.PUBLIC.LOGIN} element={<LoginPage />} />
      <Route path={APP_ROUTES.PUBLIC.REGISTER} element={<RegisterPage />} />
      <Route
        path={APP_ROUTES.PUBLIC.FORGOT_PASSWORD}
        element={<ForgetPassword />}
      />
      <Route
        path={APP_ROUTES.PUBLIC.RESET_PASSWORD}
        element={<ResetPassword />}
      />
      {/* Product Routes */}
      <Route
        path={APP_ROUTES.PUBLIC.PRODUCTS_OVERVIEW}
        element={<ProductLayout />}
      >
        <Route
          path={APP_ROUTES.PUBLIC.PRODUCTS_OVERVIEW}
          element={<Product />}
        />
        <Route path={APP_ROUTES.PUBLIC.CRM} element={<CRM />} />
      </Route>
      {/* Resources Routes */}
      <Route
        path={APP_ROUTES.PUBLIC.RESOURCES_OVERVIEW}
        element={<ResourceLayout />}
      >
        <Route path={APP_ROUTES.PUBLIC.FAQ} element={<FAQPage />} />
        <Route path={APP_ROUTES.PUBLIC.SUPPORT} element={<Support />} />
        <Route path={APP_ROUTES.PUBLIC.ONBOARDING} element={<Onboarding />} />
        <Route
          path={APP_ROUTES.PUBLIC.TERMSCONDITION}
          element={<TermsCondition />}
        />
        <Route path={APP_ROUTES.PUBLIC.POLICY} element={<Policy />} />
        <Route path={APP_ROUTES.PUBLIC.UPDATES} element={<Updates />} />
      </Route>
      {/* About Us Routes */}
      <Route path={APP_ROUTES.PUBLIC.ABOUT} element={<AboutUs />} />
      {/* Pricing Routes */}
      <Route path={APP_ROUTES.PUBLIC.PRICING} element={<PricingPage />} />
      /*
      ─────────────────────────────────────────────────────────────────────────────
      📦 ▶ PROTECTED ROUTES
      ─────────────────────────────────────────────────────────────────────────────
      */
      {/* Protected Routes */}
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
          <ProtectedRoute requireOnboarding={true}>
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
      {/* 401 - UnAuth Page  */}
      <Route path={APP_ROUTES.PUBLIC.UNAUTHORIZED} element={<Unauthorized />} />
      {/* 404 - Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CombinedRoutes;
