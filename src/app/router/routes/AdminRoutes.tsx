import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { APP_ROUTES } from "@/app/constants/routes";
import StripeApiSettings from "@/app/features/dashboard/admin/component/integrations/StripeApiSettings";

const AdminLayout = lazy(
  () => import("@/app/components/layout/dashboard-layouts/AdminLayout"),
);
const IntegrationPage = lazy(
  () =>
    import(
      "@/app/features/dashboard/admin/component/integrations/IntegrationPage"
    ),
);
const AdminDashboardPage = lazy(
  () =>
    import("@/app/features/dashboard/admin/pages/dashboard/AdminDashboardPage"),
);

// FOLDER CHANGED TO FEATURE BASED
const InboxPage = lazy(
  () => import("@/app/features/inbox/InboxPage"),
);
const ContactPage = lazy(
  () => import("@/app/features/dashboard/admin/pages/contact/ContactAdminPage"),
);
const ChatbotPage = lazy(
  () => import("@/app/features/dashboard/admin/pages/chatbot/ChatbotPage"),
);
const ChannelPage = lazy(
  () => import("@/app/features/dashboard/admin/pages/channels/ChannelPage"),
);
const ChannelSettingsPage = lazy(
  () =>
    import("@/app/features/dashboard/admin/pages/channels/ChannelSettingsPage"),
);
// const TagsPage = lazy(
//   () => import("@/app/features/dashboard/admin/pages/tags/TagsPage"),
// );
const AnalyticsPage = lazy(
  () => import("@/app/features/dashboard/admin/pages/analytics/AnalyticsPage"),
);
const SettingsPage = lazy(
  () => import("@/app/features/dashboard/admin/pages/settings/SettingsPage"),
);
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
const BillingPage = lazy(
  () =>
    import(
      "@/app/features/dashboard/admin/pages/payments/confirm/Billing.page"
    ),
);
const CheckoutPage = lazy(() => import("@/app/pages/checkout/CheckoutPage"));

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route
          path={APP_ROUTES.ADMIN.DASHBOARD}
          element={<AdminDashboardPage />}
        />
        <Route path={APP_ROUTES.ADMIN.CONVERSATION} element={<InboxPage />} />
        <Route path={APP_ROUTES.ADMIN.CONTACT} element={<ContactPage />} />
        <Route path={APP_ROUTES.ADMIN.CHATBOT} element={<ChatbotPage />} />
        <Route path={APP_ROUTES.ADMIN.CHANNEL} element={<ChannelPage />} />
        <Route
          path={APP_ROUTES.ADMIN.CHANNEL_SETTINGS}
          element={<ChannelSettingsPage />}
        />

        {/*<Route path={APP_ROUTES.ADMIN.TAGS} element={<TagsPage />} />*/}
        <Route path={APP_ROUTES.ADMIN.ANALYTICS} element={<AnalyticsPage />} />
        <Route path={APP_ROUTES.ADMIN.SETTINGS} element={<SettingsPage />} />
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
        <Route
          path={APP_ROUTES.ADMIN.SETTINGS_SUBSCRIPTION_BILLING}
          element={<BillingPage />}
        />

        {/* MVP 1: Orders and products routes are disabled. */}
        {/* <Route path={APP_ROUTES.ADMIN.ORDERS} element={<OrderPage />} /> */}
        {/* <Route path={APP_ROUTES.ADMIN.ORDERS_CREATE} element={<CreateOrderPage />} /> */}
        {/* <Route path={APP_ROUTES.ADMIN.ORDERS_DETAILS} element={<OrderDetailsPage />} /> */}
        {/* <Route path={APP_ROUTES.ADMIN.PRODUCTS} element={<ProductPage />} /> */}
        {/* <Route path={APP_ROUTES.ADMIN.PRODUCTS_ALL} element={<AllProductsPage />} /> */}
        {/* <Route path={APP_ROUTES.ADMIN.PRODUCTS_CATEGORY} element={<ProductCategory />} /> */}
        {/* <Route path={APP_ROUTES.ADMIN.PRODUCTS_VARIANTS} element={<ProductVariants />} /> */}
        {/* <Route path={APP_ROUTES.ADMIN.PRODUCTS_INVENTORY} element={<ProductInventory />} /> */}
        {/* <Route path={APP_ROUTES.ADMIN.PRODUCTS_CREATE} element={<CreateProductPage />} /> */}
        {/* <Route path={APP_ROUTES.ADMIN.PRODUCTS_DETAILS} element={<ProductDetailsPage />} /> */}
        {/* <Route path={APP_ROUTES.ADMIN.PRODUCTS_EDIT} element={<EditProductPage />} /> */}

        <Route path={APP_ROUTES.ADMIN.CHECKOUT} element={<CheckoutPage />} />

        <Route
          path={APP_ROUTES.ADMIN.SETTINGS_INTEGRATION_SETTINGS}
          element={<IntegrationPage />}
        />
        <Route
          path={APP_ROUTES.ADMIN.SETTINGS_STRIPE}
          element={<StripeApiSettings />}
        />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
