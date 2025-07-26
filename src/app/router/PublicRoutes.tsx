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
  Product,
  Demo,
  AboutUs,
  PricingPage,
  FAQPage,
  ChatbotPage,
  UnifiedMessagePage,
  BulkMessagingPage,
  CheckoutPage,
} from "@/app/pages";
import { APP_ROUTES } from "@/app/constants/routes";
import { ProductLayout, ResourceLayout } from "@/app/components/layout";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path={APP_ROUTES.PUBLIC.HOME} element={<Landing />} />
      <Route path={APP_ROUTES.PUBLIC.DEMO} element={<Demo />} />

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
        <Route path={APP_ROUTES.PUBLIC.CHATBOT} element={<ChatbotPage />} />
        <Route
          path={APP_ROUTES.PUBLIC.UNIFIED_MESSAGE}
          element={<UnifiedMessagePage />}
        />
        <Route
          path={APP_ROUTES.PUBLIC.BULK_MESSAGING}
          element={<BulkMessagingPage />}
        />
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

      {/* Checkout Routes */}
      <Route path={APP_ROUTES.PUBLIC.CHECKOUT} element={<CheckoutPage />} />

      {/* 401 - UnAuth Page  */}
      <Route path={APP_ROUTES.PUBLIC.UNAUTHORIZED} element={<Unauthorized />} />

      {/* 404 - Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
