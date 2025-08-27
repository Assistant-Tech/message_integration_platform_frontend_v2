import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loading } from "@/app/components/common";
import {
  PublicLayout,
  ProductLayout,
  ResourceLayout,
} from "@/app/components/layout";
import DashboardLayout from "@/app/features/dashboard/admin/component/DashboardLayout";
import { APP_ROUTES } from "@/app/constants/routes";

/* ------------------ Public Pages ------------------ */
import {
  Landing,
  Demo,
  CRM,
  Support,
  Onboarding,
  Policy,
  TermsCondition,
  Updates,
  AboutUs,
  PricingPage,
  FAQPage,
  Product,
  Unauthorized,
  NotFound,
} from "@/app/pages";
import {
  Dashboard,
  ForgetPassword,
  LoginPage,
  RegisterPage,
  ResetPassword,
  VerifyEmail,
} from "@/app/features/auth";
import CheckEmail from "@/app/features/auth/pages/CheckEmail";

/* ------------------ Admin Pages ------------------ */
import {
  AdminDashboardPage,
  ConversationPage,
  ChatbotPage,
  ChannelPage,
  OrderPage,
  TagsPage,
  AnalyticsPage,
  SettingsPage,
  ProductPage,
  CreateOrderPage,
  AllProductsPage,
  ProductCategory,
  ProductVariants,
  ProductInventory,
  CreateProductPage,
} from "@/app/features/dashboard/admin/pages";
import { OnboardingForm } from "@/app/features/auth/pages/onboarding/steps";
import ProtectedRoute from "@/app/router/guards/ProtectedRoute";
import OnboardingGuard from "@/app/router/guards/OnboardingGurad";

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public Layout: Routes accessible to all users */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Landing />} />
          <Route path={APP_ROUTES.PUBLIC.DEMO} element={<Demo />} />
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

          {/* Product Pages */}
          <Route
            path={APP_ROUTES.PUBLIC.PRODUCTS_OVERVIEW}
            element={<ProductLayout />}
          >
            <Route index element={<Product />} />
            <Route path={APP_ROUTES.PUBLIC.CRM} element={<CRM />} />
          </Route>

          {/* Resource Pages */}
          <Route
            path={APP_ROUTES.PUBLIC.RESOURCES_OVERVIEW}
            element={<ResourceLayout />}
          >
            <Route path={APP_ROUTES.PUBLIC.FAQ} element={<FAQPage />} />
            <Route path={APP_ROUTES.PUBLIC.SUPPORT} element={<Support />} />
            <Route
              path={APP_ROUTES.PUBLIC.ONBOARDING}
              element={<Onboarding />}
            />
            <Route
              path={APP_ROUTES.PUBLIC.TERMSCONDITION}
              element={<TermsCondition />}
            />
            <Route path={APP_ROUTES.PUBLIC.POLICY} element={<Policy />} />
            <Route path={APP_ROUTES.PUBLIC.UPDATES} element={<Updates />} />
          </Route>

          {/* About & Pricing */}
          <Route path={APP_ROUTES.PUBLIC.ABOUT} element={<AboutUs />} />
          <Route path={APP_ROUTES.PUBLIC.PRICING} element={<PricingPage />} />

          {/* Semi-protected routes that are part of the auth flow, but don't need a ProtectedRoute guard */}
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />

          {/* Error pages are public */}
          <Route
            path={APP_ROUTES.PUBLIC.UNAUTHORIZED}
            element={<Unauthorized />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Protected Routes: All routes nested here require authentication */}
        <Route element={<ProtectedRoute />}>
          {/* Onboarding page only parent component implementation*/}
          <Route
            path={APP_ROUTES.PUBLIC.ONBOARDING_FORM}
            element={<OnboardingForm />}
          />

          <Route element={<OnboardingGuard />}>
            {/* Admin Dashboard Routes */}
            <Route path="/:slug/admin" element={<DashboardLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route
                path={APP_ROUTES.ADMIN.DASHBOARD}
                element={<Dashboard />}
              />
              <Route
                path={APP_ROUTES.ADMIN.CONVERSATION}
                element={<ConversationPage />}
              />
              <Route
                path={APP_ROUTES.ADMIN.CHATBOT}
                element={<ChatbotPage />}
              />
              <Route
                path={APP_ROUTES.ADMIN.CHANNEL}
                element={<ChannelPage />}
              />
              <Route path={APP_ROUTES.ADMIN.ORDERS} element={<OrderPage />} />
              <Route
                path={APP_ROUTES.ADMIN.ORDERS_CREATE}
                element={<CreateOrderPage />}
              />
              <Route path={APP_ROUTES.ADMIN.TAGS} element={<TagsPage />} />
              <Route
                path={APP_ROUTES.ADMIN.ANALYTICS}
                element={<AnalyticsPage />}
              />
              <Route
                path={APP_ROUTES.ADMIN.SETTINGS}
                element={<SettingsPage />}
              />
              <Route
                path={APP_ROUTES.ADMIN.PRODUCTS}
                element={<ProductPage />}
              />
              <Route
                path={APP_ROUTES.ADMIN.PRODUCTS_ALL}
                element={<AllProductsPage />}
              />
              <Route
                path={APP_ROUTES.ADMIN.PRODUCTS_CATEGORY}
                element={<ProductCategory />}
              />
              <Route
                path={APP_ROUTES.ADMIN.PRODUCTS_VARIANTS}
                element={<ProductVariants />}
              />
              <Route
                path={APP_ROUTES.ADMIN.PRODUCTS_INVENTORY}
                element={<ProductInventory />}
              />
              <Route
                path={APP_ROUTES.ADMIN.PRODUCTS_CREATE}
                element={<CreateProductPage />}
              />
            </Route>
          </Route>

          {/* User Dashboard Routes (if any) */}
          <Route path="/user" element={<DashboardLayout />}>
            {/* Future User Routes */}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
