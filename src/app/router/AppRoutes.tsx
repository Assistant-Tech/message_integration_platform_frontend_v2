import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Loading } from "@/app/components/common";
import {
  PublicLayout,
  ProductLayout,
  ResourceLayout,
} from "@/app/components/layout";
import { APP_ROUTES } from "@/app/constants/routes";
import { BannerProvider } from "@/app/context/BannerContext";

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
  NotFound,
  BlogPage,
  BlogDetailPage,
  VideosPage,
  CheckoutPage,
  Forbidden,
} from "@/app/pages";

import {
  Accept_Invitation,
  ForgetPassword,
  LoginPage,
  RegisterPage,
  ResetPassword,
  VerifyEmail,
} from "@/app/features/auth";

import CheckEmail from "@/app/features/auth/pages/CheckEmail";
import { OnboardingForm } from "@/app/features/auth/pages/onboarding/steps";

/* ------------------ Guards ------------------ */
import ProtectedRoute from "@/app/router/guards/ProtectedRoute";
import OnboardingGuard from "@/app/router/guards/OnboardingGurad";
<<<<<<< HEAD
import RoleBasedRoute from "@/app/router/guards/RoleBasedRoutes";

/* ------------------ Lazy User Module ------------------ */
const UserDashboardPage = lazy(
  () => import("@/app/features/dashboard/user/pages/dashboard/UserDashboard"),
);

/* ------------------ Lazy Admin Module ------------------ */
=======

/* ------------------ Lazy Admin Module ------------------ */
// Lazy load the entire Admin Dashboard layout & pages
>>>>>>> 33d6893374a6f61ab532b62320d4b44b28f2e1d5
const DashboardLayout = lazy(
  () => import("@/app/features/dashboard/admin/component/DashboardLayout"),
);

const AdminDashboardPage = lazy(
  () =>
    import("@/app/features/dashboard/admin/pages/dashboard/AdminDashboardPage"),
);
const ConversationPage = lazy(
  () =>
    import(
      "@/app/features/dashboard/admin/pages/conversation/ConversationPage"
    ),
);
const ChatbotPage = lazy(
  () => import("@/app/features/dashboard/admin/pages/chatbot/ChatbotPage"),
);
const ChannelPage = lazy(
  () => import("@/app/features/dashboard/admin/pages/channels/ChannelPage"),
);
const OrderPage = lazy(
  () => import("@/app/features/dashboard/admin/pages/orders/OrderPage"),
);
const CreateOrderPage = lazy(
  () => import("@/app/features/dashboard/admin/pages/orders/CreateOrderPage"),
);
const TagsPage = lazy(
  () => import("@/app/features/dashboard/admin/pages/tags/TagsPage"),
);
const AnalyticsPage = lazy(
  () => import("@/app/features/dashboard/admin/pages/analytics/AnalyticsPage"),
);
const SettingsPage = lazy(
  () => import("@/app/features/dashboard/admin/pages/settings/SettingsPage"),
);
const ProductPage = lazy(
  () => import("@/app/features/dashboard/admin/pages/products/ProductPage"),
);
const AllProductsPage = lazy(
  () => import("@/app/features/dashboard/admin/pages/products/AllProductsPage"),
);
const ProductCategory = lazy(
  () => import("@/app/features/dashboard/admin/pages/products/ProductCategory"),
);
const ProductVariants = lazy(
  () => import("@/app/features/dashboard/admin/pages/products/ProductVariants"),
);
const ProductInventory = lazy(
  () =>
    import("@/app/features/dashboard/admin/pages/products/ProductInventory"),
);
const CreateProductPage = lazy(
  () =>
    import("@/app/features/dashboard/admin/pages/products/CreateProductPage"),
);

/* ------------------ Lazy Settings Pages ------------------ */
const ProfileSettings = lazy(
  () => import("@/app/features/dashboard/admin/pages/settings/ProfileSettings"),
);
const CompanySettings = lazy(
  () => import("@/app/features/dashboard/admin/pages/settings/CompanySettings"),
);
const SecuritySettings = lazy(
  () =>
    import("@/app/features/dashboard/admin/pages/settings/SecuritySettings"),
);
const NotificationSettings = lazy(
  () =>
    import(
      "@/app/features/dashboard/admin/pages/settings/NotificationSettings"
    ),
);
const RoleManagement = lazy(
  () => import("@/app/features/dashboard/admin/pages/settings/RoleManagement"),
);
const ChatSettings = lazy(
  () => import("@/app/features/dashboard/admin/pages/settings/ChatSettings"),
);
const ShippingSettings = lazy(
  () =>
    import("@/app/features/dashboard/admin/pages/settings/ShippingSettings"),
);
const SubscriptionSettings = lazy(
  () =>
    import(
      "@/app/features/dashboard/admin/pages/settings/SubscriptionSettings"
    ),
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BannerProvider>
        <Routes>
          {/* ---------------- Public Layout ---------------- */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Landing />} />
            <Route path={APP_ROUTES.PUBLIC.DEMO} element={<Demo />} />
            <Route path={APP_ROUTES.PUBLIC.LOGIN} element={<LoginPage />} />
            <Route
              path={APP_ROUTES.PUBLIC.REGISTER}
              element={<RegisterPage />}
            />
            <Route
              path={APP_ROUTES.PUBLIC.ACCEPT_INVITATION}
              element={<Accept_Invitation />}
            />
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
              <Route path={APP_ROUTES.PUBLIC.BLOG} element={<BlogPage />} />
              <Route path={APP_ROUTES.PUBLIC.VIDEOS} element={<VideosPage />} />
              <Route
                path={APP_ROUTES.PUBLIC.BLOG_ID}
                element={<BlogDetailPage />}
              />
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

            {/* Checkout */}
            <Route
              path={APP_ROUTES.PUBLIC.CHECKOUT}
              element={<CheckoutPage />}
            />

            {/* Auth semi-protected */}
            <Route path="/check-email" element={<CheckEmail />} />
            <Route path="/verify/:token" element={<VerifyEmail />} />

            {/* Error Pages */}
<<<<<<< HEAD
            <Route path="*" element={<NotFound />} />
=======

            <Route
              path={APP_ROUTES.PUBLIC.UNAUTHORIZED}
              element={<NotFound />}
            />
>>>>>>> 33d6893374a6f61ab532b62320d4b44b28f2e1d5
            <Route
              path={APP_ROUTES.PUBLIC.UNAUTHORIZED}
              element={<Forbidden />}
            />
          </Route>

<<<<<<< HEAD
          {/* ---------------- Protected Routes ---------------- */}
=======
          {/* Protected Routes */}
>>>>>>> 33d6893374a6f61ab532b62320d4b44b28f2e1d5
          <Route element={<ProtectedRoute />}>
            <Route
              path={APP_ROUTES.PUBLIC.ONBOARDING_FORM}
              element={<OnboardingForm />}
            />

            <Route element={<OnboardingGuard />}>
<<<<<<< HEAD
              {/* Admin Dashboard (TENANT_ADMIN only) */}
              <Route
                element={<RoleBasedRoute allowedRoles={["TENANT_ADMIN"]} />}
              >
                <Route path="/:slug/admin" element={<DashboardLayout />}>
                  <Route index element={<AdminDashboardPage />} />
                  <Route
                    path={APP_ROUTES.ADMIN.DASHBOARD}
                    element={<AdminDashboardPage />}
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
                  <Route
                    path={APP_ROUTES.ADMIN.ORDERS}
                    element={<OrderPage />}
                  />
                  <Route
                    path={APP_ROUTES.ADMIN.ORDERS_CREATE}
                    element={<CreateOrderPage />}
                  />
                  <Route path={APP_ROUTES.ADMIN.TAGS} element={<TagsPage />} />
                  <Route
                    path={APP_ROUTES.ADMIN.ANALYTICS}
                    element={<AnalyticsPage />}
                  />

                  {/* Settings */}
                  <Route
                    path={APP_ROUTES.ADMIN.SETTINGS}
                    element={<SettingsPage />}
                  />
                  <Route
                    path={APP_ROUTES.ADMIN.SETTINGS_PROFILE}
                    element={<ProfileSettings />}
                  />
                  <Route
                    path={APP_ROUTES.ADMIN.SETTINGS_COMPANY}
                    element={<CompanySettings />}
                  />
                  <Route
                    path={APP_ROUTES.ADMIN.SETTINGS_SECURITY}
                    element={<SecuritySettings />}
                  />
                  <Route
                    path={APP_ROUTES.ADMIN.SETTINGS_NOTIFICATIONS}
                    element={<NotificationSettings />}
                  />
                  <Route
                    path={APP_ROUTES.ADMIN.SETTINGS_ROLE_MANAGEMENT}
                    element={<RoleManagement />}
                  />
                  <Route
                    path={APP_ROUTES.ADMIN.SETTINGS_CHAT_SETTINGS}
                    element={<ChatSettings />}
                  />
                  <Route
                    path={APP_ROUTES.ADMIN.SETTINGS_SHIPPING}
                    element={<ShippingSettings />}
                  />
                  <Route
                    path={APP_ROUTES.ADMIN.SETTINGS_SUBSCRIPTION}
                    element={<SubscriptionSettings />}
                  />

                  {/* Products */}
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

              {/* Tenant User Dashboard (default for non-admin roles) */}
              <Route path="/:slug/dashboard" element={<DashboardLayout />}>
                <Route index element={<UserDashboardPage />} />
                <Route
                  path={"settings/profile"}
                  element={<ProfileSettings />}
                />
              </Route>
            </Route>
=======
              {/* Admin Dashboard */}
              <Route path="/:slug/admin" element={<DashboardLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route
                  path={APP_ROUTES.ADMIN.DASHBOARD}
                  element={<AdminDashboardPage />}
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

                {/* Settings */}
                <Route
                  path={APP_ROUTES.ADMIN.SETTINGS}
                  element={<SettingsPage />}
                />
                <Route
                  path={APP_ROUTES.ADMIN.SETTINGS_PROFILE}
                  element={<ProfileSettings />}
                />
                <Route
                  path={APP_ROUTES.ADMIN.SETTINGS_COMPANY}
                  element={<CompanySettings />}
                />
                <Route
                  path={APP_ROUTES.ADMIN.SETTINGS_SECURITY}
                  element={<SecuritySettings />}
                />
                <Route
                  path={APP_ROUTES.ADMIN.SETTINGS_NOTIFICATIONS}
                  element={<NotificationSettings />}
                />
                <Route
                  path={APP_ROUTES.ADMIN.SETTINGS_ROLE_MANAGEMENT}
                  element={<RoleManagement />}
                />
                <Route
                  path={APP_ROUTES.ADMIN.SETTINGS_CHAT_SETTINGS}
                  element={<ChatSettings />}
                />
                <Route
                  path={APP_ROUTES.ADMIN.SETTINGS_SHIPPING}
                  element={<ShippingSettings />}
                />
                <Route
                  path={APP_ROUTES.ADMIN.SETTINGS_SUBSCRIPTION}
                  element={<SubscriptionSettings />}
                />

                {/* Products */}
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

            {/* User Dashboard (future) */}
            <Route path="/user" element={<DashboardLayout />} />
>>>>>>> 33d6893374a6f61ab532b62320d4b44b28f2e1d5
          </Route>
        </Routes>
      </BannerProvider>
    </Suspense>
  );
};

export default AppRoutes;
