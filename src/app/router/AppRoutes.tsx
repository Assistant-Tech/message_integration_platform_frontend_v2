import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "@/app/components/common";
import ProtectedRoute from "@/app/router/guards/ProtectedRoute";
import OnboardingGuard from "@/app/router/guards/OnboardingGurad";
import RoleBasedRoute from "@/app/router/guards/RoleBasedRoutes";

const PublicRoutes = lazy(() => import("@/app/router/routes/PublicRoutes"));
const AdminRoutes = lazy(() => import("@/app/router/routes/AdminRoutes"));
const UserRoutes = lazy(() => import("@/app/router/routes/UserRoutes"));

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

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* -------- Payment routes -------- */}
        <Route path="/payments/verify" element={<PaymentVerify />} />
        <Route path="/payments/success" element={<PaymentSuccessPage />} />
        <Route
          path="/:slug/subscription/confirmation"
          element={<SubscriptionConfirmation />}
        />

        {/* -------- Protected routes -------- */}
        <Route element={<ProtectedRoute />}>
          <Route element={<OnboardingGuard />}>
            {/* Admin routes */}
            <Route element={<RoleBasedRoute allowedRoles={["TENANT_ADMIN"]} />}>
              <Route path="/:slug/admin/*" element={<AdminRoutes />} />
            </Route>

            {/* User routes */}
            <Route path="/:slug/dashboard/*" element={<UserRoutes />} />
          </Route>
        </Route>

        {/* -------- Public and Auth routes -------- */}
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
