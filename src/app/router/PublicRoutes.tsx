import { Routes, Route } from "react-router-dom";
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
import { APP_ROUTES } from "@/app/constants/routes";
import { ProductLayout, ResourceLayout } from "@/app/components/layout";
// Feature Login
import {
  ForgetPassword,
  LoginPage,
  RegisterPage,
  ResetPassword,
  OnboardingForm,
} from "@/app/features/auth";
import {
  OnboardingStep1,
  OnboardingStep2,
  OnboardingStep3,
  OnboardingStep4,
  OnboardingStep5,
} from "@/app/features/auth/pages/onboarding/steps";
import VerifyEmail from "../features/auth/pages/VerifyEmail";

const PublicRoutes = () => {
  return (
    <Routes>
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

      {/* Onboarding Routes */}
      <Route
        path={APP_ROUTES.PUBLIC.ONBOARDING_FORM}
        element={<OnboardingForm />}
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
        {/* Blogs */}

        {/* Videos */}

        {/* FAQ's */}
        <Route path={APP_ROUTES.PUBLIC.FAQ} element={<FAQPage />} />

        {/* Support */}
        <Route path={APP_ROUTES.PUBLIC.SUPPORT} element={<Support />} />
        {/* Resources/Support/Routes */}
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

      {/* Verify Email */}
      <Route path="/verify/:token" element={<VerifyEmail />} />

      {/* 401 - UnAuth Page  */}
      <Route path={APP_ROUTES.PUBLIC.UNAUTHORIZED} element={<Unauthorized />} />

      {/* 404 - Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
