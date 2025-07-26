export const APP_ROUTES = {
  // Public routes
  PUBLIC: {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    ABOUT: "/aboutus",
    CONTACT: "/contact",
    UNAUTHORIZED: "/unauthorized",
    PRICING: "/pricing",
    PRODUCTS: "/products",
    SLUG: (slug: string) => `/${slug}`,
    DEMO: "/demo",

    //Checkout Page
    CHECKOUT: "/checkout/:planId",

    // For the ["/product"]
    PRODUCTS_OVERVIEW: "/products",
    CRM: "/products/crm",
    CHATBOT: "/products/chatbot",
    UNIFIED_MESSAGE: "/products/unified-message",
    BULK_MESSAGING: "/products/bulk-message",

    // For the ["/resources"]
    RESOURCES_OVERVIEW: "/resources",
    SUPPORT: "/resources/support",
    BLOG: "/resources/blog",
    VIDEOS: "/resources/videos",
    FAQ: "/resources/faq",

    // ["resources/faq"]
    FAQ_CRM: "/resources/faq/crm",

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
