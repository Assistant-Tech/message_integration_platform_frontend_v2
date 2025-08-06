import { Route } from "react-router-dom";

import { APP_ROUTES } from "@/app/constants/routes";
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
} from "@/app/features/dashboard/admin/pages/";

const AdminRoutes = () => {
  return (
    <>
      <Route
        path={APP_ROUTES.ADMIN.DASHBOARD}
        element={<AdminDashboardPage />}
      />
      <Route
        path={APP_ROUTES.ADMIN.CONVERSATION}
        element={<ConversationPage />}
      />
      <Route path={APP_ROUTES.ADMIN.CHATBOT} element={<ChatbotPage />} />
      <Route path={APP_ROUTES.ADMIN.CHANNEL} element={<ChannelPage />} />

      {/* Orders */}
      <Route path={APP_ROUTES.ADMIN.ORDERS} element={<OrderPage />} />
      {/* Create Orders */}
      <Route
        path={APP_ROUTES.ADMIN.ORDERS_CREATE}
        element={<CreateOrderPage />}
      />
      <Route path={APP_ROUTES.ADMIN.TAGS} element={<TagsPage />} />
      <Route path={APP_ROUTES.ADMIN.ANALYTICS} element={<AnalyticsPage />} />
      <Route path={APP_ROUTES.ADMIN.SETTINGS} element={<SettingsPage />} />

      {/* Products */}
      <Route path={APP_ROUTES.ADMIN.PRODUCTS} element={<ProductPage />} />
      {/* SUB Products */}
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

      {/* Create Products */}
      <Route
        path={APP_ROUTES.ADMIN.PRODUCTS_CREATE}
        element={<CreateProductPage />}
      />
    </>
  );
};

export default AdminRoutes;
