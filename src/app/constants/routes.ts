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
    RESET_PASSWORD: "/reset-password",

    // Onboarding [[/onboarding]]
    ONBOARDING_FORM: "/onboardingform",
    // Steps 1,2,3,4,5
    ONBOARDING_FORM_STEP_1: "step-1",
    ONBOARDING_FORM_STEP_2: "step-2",
    ONBOARDING_FORM_STEP_3: "step-3",
    ONBOARDING_FORM_STEP_4: "step-4",
    ONBOARDING_FORM_STEP_5: "step-5",

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
    BLOG: "/resources/blogs",
    BLOG_ID: "/resources/blogs/:id",
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
    DASHBOARD: "dashboard",
    CONVERSATION: "conversation",
    CHATBOT: "chatbot",
    CHANNEL: "channel",
    TAGS: "tags",
    ANALYTICS: "analytics",
    ORDERS: "orders",
    ORDERS_CREATE: "orders/createOrder",

    // Sub Settings
    SETTINGS: "settings",

    // Sub Products
    PRODUCTS: "product",
    PRODUCTS_ALL: "product_all",
    PRODUCTS_CATEGORY: "category",
    PRODUCTS_VARIANTS: "variants",
    PRODUCTS_INVENTORY: "inventory",
    PRODUCTS_CREATE: "product_all/createProducts",
  },

  // User routes
  USER: {
    DASHBOARD: "dashboard",
  },
} as const;

export type RouteKeys = keyof typeof APP_ROUTES;
export type RouteValues = (typeof APP_ROUTES)[RouteKeys];
