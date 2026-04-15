import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { APP_ROUTES } from "@/app/constants/routes";
import StripeApiSettings from "@/app/features/integrations/StripeApiSettings";

const AdminLayout = lazy(
  () => import("@/app/components/layout/dashboard-layouts/AdminLayout"),
);
const IntegrationPage = lazy(
  () => import("@/app/features/integrations/IntegrationPage"),
);
const AdminDashboardPage = lazy(
  () =>
    import("@/app/features/home/AdminHomePage"),
);

// FOLDER CHANGED TO FEATURE BASED
const InboxPage = lazy(() => import("@/app/features/inbox/InboxPage"));
const BulkMessagingPage = lazy(
  () => import("@/app/features/bulk-messaging/BulkMessagingPage"),
);
const CreateBroadcastPage = lazy(
  () => import("@/app/features/bulk-messaging/CreateBroadcastPage"),
);
const SettingsLayout = lazy(
  () => import("@/app/features/settings/SettingsLayout"),
);
const SettingsIndexPage = lazy(
  () => import("@/app/features/settings/SettingsIndexPage"),
);
const ContactPage = lazy(
  () => import("@/app/features/contacts/ContactAdminPage"),
);
const ChatbotPage = lazy(
  () => import("@/app/features/dashboard/admin/pages/chatbot/ChatbotPage"),
);
const ChannelPage = lazy(
  () => import("@/app/features/channels/ChannelPage"),
);
const ChannelSettingsPage = lazy(
  () =>
    import("@/app/features/channels/ChannelSettingsPage"),
);
const AnalyticsPage = lazy(
  () => import("@/app/features/analytics/AnalyticsPage"),
);
const TeamActivityPage = lazy(
  () => import("@/app/features/team-activity/TeamActivityPage"),
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

        <Route
          path={APP_ROUTES.ADMIN.BULK_MESSAGING_CREATE}
          element={<CreateBroadcastPage />}
        />
        <Route
          path={APP_ROUTES.ADMIN.BULK_MESSAGING}
          element={<BulkMessagingPage />}
        />
        <Route path={APP_ROUTES.ADMIN.ANALYTICS} element={<AnalyticsPage />} />
        <Route
          path={APP_ROUTES.ADMIN.TEAM_ACTIVITY}
          element={<TeamActivityPage />}
        />
        <Route element={<SettingsLayout />}>
          <Route
            path={APP_ROUTES.ADMIN.SETTINGS}
            element={<SettingsIndexPage />}
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
          <Route
            path={APP_ROUTES.ADMIN.SETTINGS_SUBSCRIPTION_BILLING}
            element={<BillingPage />}
          />
          <Route
            path={APP_ROUTES.ADMIN.SETTINGS_INTEGRATION_SETTINGS}
            element={<IntegrationPage />}
          />
          <Route
            path={APP_ROUTES.ADMIN.SETTINGS_STRIPE}
            element={<StripeApiSettings />}
          />
        </Route>

        <Route path={APP_ROUTES.ADMIN.CHECKOUT} element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
