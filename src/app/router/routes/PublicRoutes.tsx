import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { APP_ROUTES } from "@/app/constants/routes";
import {
  PublicLayout,
  ProductLayout,
  ResourceLayout,
} from "@/app/components/layout";

/* public imports */
const Landing = lazy(() => import("@/app/pages/Landing"));
const Demo = lazy(() => import("@/app/pages/DemoPage"));
const CRM = lazy(() => import("@/app/pages/products/crm/CRM"));
const Product = lazy(() => import("@/app/pages/products/Product"));
const Policy = lazy(() => import("@/app/pages/resources/support/Policy"));
const TermsCondition = lazy(
  () => import("@/app/pages/resources/support/TermsCondition"),
);
const Updates = lazy(() => import("@/app/pages/resources/support/Updates"));
const AboutUs = lazy(() => import("@/app/pages/aboutus/AboutUs"));
const PricingPage = lazy(() => import("@/app/pages/pricing/PricingPage"));
const FAQPage = lazy(() => import("@/app/pages/faq/FAQPage"));
const BlogPage = lazy(() => import("@/app/pages/blog/BlogPage"));
const BlogDetailPage = lazy(() => import("@/app/pages/blog/BlogDetails"));
const VideosPage = lazy(() => import("@/app/pages/videos/VideosPage"));
const Support = lazy(() => import("@/app/pages/resources/support/Support"));
const Onboarding = lazy(
  () => import("@/app/pages/resources/support/OnBoarding"),
);
const Forbidden = lazy(() => import("@/app/pages/Forbidden"));
const NotFound = lazy(() => import("@/app/pages/NotFound"));

// auth imports
const LoginPage = lazy(() => import("@/app/features/auth/pages/LoginPage"));
const RegisterPage = lazy(
  () => import("@/app/features/auth/pages/RegisterPage"),
);
const ForgetPassword = lazy(
  () => import("@/app/features/auth/pages/ForgetPassword"),
);
const ResetPassword = lazy(
  () => import("@/app/features/auth/pages/ResetPassword"),
);
const VerifyEmail = lazy(() => import("@/app/features/auth/pages/VerifyEmail"));
const AcceptInvitation = lazy(
  () => import("@/app/features/auth/pages/Accept_Invitation"),
);
const CheckEmail = lazy(() => import("@/app/features/auth/pages/CheckEmail"));
const OnboardingForm = lazy(
  () => import("@/app/features/auth/pages/onboarding/steps/OnboardingForm"),
);

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Landing />} />
        <Route path={APP_ROUTES.PUBLIC.DEMO} element={<Demo />} />
        <Route
          path={APP_ROUTES.PUBLIC.PRODUCTS_OVERVIEW}
          element={<ProductLayout />}
        >
          <Route index element={<Product />} />
          <Route path={APP_ROUTES.PUBLIC.CRM} element={<CRM />} />
        </Route>

        <Route
          path={APP_ROUTES.PUBLIC.RESOURCES_OVERVIEW}
          element={<ResourceLayout />}
        >
          <Route path={APP_ROUTES.PUBLIC.FAQ} element={<FAQPage />} />
          <Route path={APP_ROUTES.PUBLIC.BLOG} element={<BlogPage />} />
          <Route
            path={APP_ROUTES.PUBLIC.BLOG_ID}
            element={<BlogDetailPage />}
          />
          <Route path={APP_ROUTES.PUBLIC.VIDEOS} element={<VideosPage />} />
          <Route path={APP_ROUTES.PUBLIC.SUPPORT} element={<Support />} />
          <Route path={APP_ROUTES.PUBLIC.ONBOARDING} element={<Onboarding />} />
          <Route
            path={APP_ROUTES.PUBLIC.TERMSCONDITION}
            element={<TermsCondition />}
          />
          <Route path={APP_ROUTES.PUBLIC.POLICY} element={<Policy />} />
          <Route path={APP_ROUTES.PUBLIC.UPDATES} element={<Updates />} />
        </Route>

        <Route path={APP_ROUTES.PUBLIC.ABOUT} element={<AboutUs />} />
        <Route path={APP_ROUTES.PUBLIC.PRICING} element={<PricingPage />} />
        <Route path={APP_ROUTES.PUBLIC.UNAUTHORIZED} element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />

        <Route>
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
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route
            path={APP_ROUTES.PUBLIC.ACCEPT_INVITATION}
            element={<AcceptInvitation />}
          />
          <Route
            path={APP_ROUTES.PUBLIC.ONBOARDING_FORM}
            element={<OnboardingForm />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
