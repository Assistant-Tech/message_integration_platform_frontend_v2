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
  BlogPage,
  Product,
  BlogDetailPage,
  VideosPage,
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
      </Route>

      {/* Resources Routes */}
      <Route
        path={APP_ROUTES.PUBLIC.RESOURCES_OVERVIEW}
        element={<ResourceLayout />}
      >
        {/* Blogs */}
        <Route path={APP_ROUTES.PUBLIC.BLOG} element={<BlogPage />} />
        <Route path={APP_ROUTES.PUBLIC.BLOG_ID} element={<BlogDetailPage />} />

        {/* Videos */}
        <Route path={APP_ROUTES.PUBLIC.VIDEOS} element={<VideosPage />} />

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

      {/* 401 - UnAuth Page  */}
      <Route path={APP_ROUTES.PUBLIC.UNAUTHORIZED} element={<Unauthorized />} />

      {/* 404 - Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
