export const APP_ROUTES = {
  // Public routes
  PUBLIC: {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    ABOUT: "/about",
    CONTACT: "/contact",
    UNAUTHORIZED: "/unauthorized",
    PRICING: "/pricing",
    PRODUCTS: "/products",
    DEMO: "/demo",

    // For the ["/product"]
    PRODUCTS_OVERVIEW: "/products",
    CRM: "/products/crm",
    ERP: "/products/erp",
    HRMS: "/products/hrms",

    // For the ["/resources"]
    RESOURCES_OVERVIEW: "/resources",
    SUPPORT: "/resources/support",
    // ["resources/support"]
    ONBOARDING: "/resources/support/onboarding",
    SUBSCRIPTIONS: "/resources/subscription",
    TERMSCONDITION: "/resources/support/terms&condition",
    POLICY: "/resources/support/policy",
    UPDATES: "/resources/support/updates",
  },

  // Admin routes
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
  },

  // User routes
  USER: {
    DASHBOARD: "/dashboard",
  },
} as const;

export type RouteKeys = keyof typeof APP_ROUTES;
export type RouteValues = (typeof APP_ROUTES)[RouteKeys];

// Helper function to build dynamic routes
export const buildRoute = (
  route: string,
  params: Record<string, string | number>,
) => {
  let builtRoute = route;
  Object.entries(params).forEach(([key, value]) => {
    builtRoute = builtRoute.replace(`:${key}`, String(value));
  });
  return builtRoute;
};
