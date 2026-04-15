import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "@/app/components/common";
import ProtectedRoute from "@/app/router/guards/ProtectedRoute";
import OnboardingGuard from "@/app/router/guards/OnboardingGurad";
import RoleBasedRoute from "@/app/router/guards/RoleBasedRoutes";

const PublicRoutes = lazy(() => import("@/app/router/routes/PublicRoutes"));
const AdminRoutes = lazy(() => import("@/app/router/routes/AdminRoutes"));
const UserRoutes = lazy(() => import("@/app/router/routes/UserRoutes"));
const OAuthSuccessPage = lazy(
  () => import("@/app/features/channels/OAuthSuccessPage"),
);
const OAuthErrorPage = lazy(
  () => import("@/app/features/channels/OAuthErrorPage"),
);

const SubscriptionConfirmation = lazy(
  () =>
    import(
      "@/app/features/dashboard/admin/pages/payments/confirm/SubscriptionConfirmation"
    ),
);

const PaymentVerify = lazy(
  () =>
    import(
      "@/app/features/dashboard/admin/pages/payments/confirm/PaymentVerify.page"
    ),
);

const PaymentSuccessPage = lazy(
  () =>
    import("@/app/features/dashboard/admin/pages/payments/PaymentSuccess.page"),
);

const EntryRedirect = lazy(() => import("@/app/router/guards/EntryPoint"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* ✅ PUBLIC ROUTES */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* ✅ OAUTH ROUTE  */}
        <Route path="/oauth/success" element={<OAuthSuccessPage />} />
        <Route path="/oauth/error" element={<OAuthErrorPage />} />

        {/* ✅ PAYMENT ROUTES */}
        <Route path="/payments/verify" element={<PaymentVerify />} />
        <Route path="/payments/success" element={<PaymentSuccessPage />} />
        <Route
          path="/app/:slug/subscription/confirmation"
          element={<SubscriptionConfirmation />}
        />

        {/* ✅ PROTECTED APP ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route element={<OnboardingGuard />}>
            {/* Entry redirect */}
            <Route path="/app/*" element={<EntryRedirect />} />

            {/* Admin */}
            <Route element={<RoleBasedRoute allowedRoles={["TENANT_ADMIN"]} />}>
              <Route path="/app/:slug/admin/*" element={<AdminRoutes />} />
            </Route>

            {/* User */}
            <Route path="/app/:slug/dashboard/*" element={<UserRoutes />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
