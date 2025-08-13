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
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset/:userId/:token",

    // Onboarding [[/onboarding]]
    ONBOARDING_FORM: "/onboardingform",
    // Steps 1,2,3,4,5
    ONBOARDING_FORM_STEP_1: "step-1",
    ONBOARDING_FORM_STEP_2: "step-2",
    ONBOARDING_FORM_STEP_3: "step-3",
    ONBOARDING_FORM_STEP_4: "step-4",
    ONBOARDING_FORM_STEP_5: "step-5",

    // For the ["/product"]
    PRODUCTS_OVERVIEW: "/products",
    CRM: "/products/crm",
    ERP: "/products/erp",
    HRMS: "/products/hrms",

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

  // Auth routes (migrated from PUBLIC)
  AUTH: {
    VERIFY_EMAIL: "/verify/:token",
    CHECK_EMAIL: "/auth/check-email",
    LOGIN_OTP: "/auth/login-otp",
  },

  // Admin routes
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    CONVERSATION: "/admin/conversation",
    CHATBOT: "/admin/chatbot",
    CHANNEL: "/admin/channel",
    TAGS: "/admin/tags",
    ANALYTICS: "/admin/analytics",
    ORDERS: "/admin/orders",
    ORDERS_CREATE: "/admin/orders/createOrder",

    // Sub Settings
    SETTINGS: "/admin/settings",

    // Sub Products
    PRODUCTS: "/admin/product",
    PRODUCTS_ALL: "/admin/product_all",
    PRODUCTS_CATEGORY: "/admin/category",
    PRODUCTS_VARIANTS: "/admin/variants",
    PRODUCTS_INVENTORY: "/admin/inventory",
    PRODUCTS_CREATE: "/admin/product_all/createProducts",
  },

  // User routes
  USER: {
    DASHBOARD: "/dashboard",
  },
} as const;

export type RouteKeys = keyof typeof APP_ROUTES;
export type RouteValues = (typeof APP_ROUTES)[RouteKeys];
