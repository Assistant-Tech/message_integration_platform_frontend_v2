export const APP_ROUTES = {
  // Public routes
  PUBLIC: {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    ACCEPT_INVITATION: "/accept-invitation/:token",
    ABOUT: "/aboutus",
    CONTACT: "/contact",
    UNAUTHORIZED: "/unauthorized",
    PRICING: "/pricing",
    PRODUCTS: "/products",
    SLUG: (slug: string) => `/${slug}`,
    DEMO: "/demo",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password/:userId/:token",
    PAYMENT_CALLBACK: "/payment/callback",
    // Onboarding
    ONBOARDING_FORM: "/onboardingform",
    ONBOARDING_FORM_STEP_1: "step-1",
    ONBOARDING_FORM_STEP_2: "step-2",
    ONBOARDING_FORM_STEP_3: "step-3",
    ONBOARDING_FORM_STEP_4: "step-4",
    ONBOARDING_FORM_STEP_5: "step-5",
    // Products
    PRODUCTS_OVERVIEW: "/products",
    CRM: "/products/crm",
    CHATBOT: "/products/chatbot",
    UNIFIED_MESSAGE: "/products/unified-message",
    BULK_MESSAGING: "/products/bulk-message",
    // Resources
    RESOURCES_OVERVIEW: "/resources",
    SUPPORT: "/resources/support",
    BLOG: "/resources/blogs",
    BLOG_ID: "/resources/blogs/:id",
    VIDEOS: "/resources/videos",
    FAQ: "/resources/faq",
    FAQ_CRM: "/resources/faq/crm",
    ONBOARDING: "/resources/support/onboarding",
    SUBSCRIPTIONS: "/resources/subscription",
    TERMSCONDITION: "/resources/support/terms&condition",
    POLICY: "/resources/support/policy",
    UPDATES: "/resources/support/updates",
  },
  // Auth routes
  AUTH: {
    VERIFY_EMAIL: "/verify/:token",
    CHECK_EMAIL: "/check-email",
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
    ORDERS_DETAILS: "orders/details/:id",

    // Settings
    SETTINGS: "settings",
    SETTINGS_PROFILE: "settings/profile",
    SETTINGS_COMPANY: "settings/company",
    SETTINGS_SECURITY: "settings/security",
    SETTINGS_ROLE_MANAGEMENT: "settings/role-management",
    SETTINGS_NOTIFICATIONS: "settings/notifications",
    SETTINGS_CHAT_SETTINGS: "settings/chat_settings",
    SETTINGS_SHIPPING: "settings/shipping",
    SETTINGS_SUBSCRIPTION: "settings/subscription",
    SETTINGS_SUBSCRIPTION_BILLING: "settings/subscription/billing",
    SETTINGS_INTEGRATION_SETTINGS: "settings/integration",
    SETTINGS_STRIPE: "settings/integration/stripe",

    // Products
    PRODUCTS: "products",
    PRODUCTS_ALL: "products/all",
    PRODUCTS_CATEGORY: "products/category",
    PRODUCTS_VARIANTS: "products/variants",
    PRODUCTS_INVENTORY: "products/inventory",
    PRODUCTS_CREATE: "products/all/createProducts",
    PRODUCTS_DETAILS: "products/all/details/:id",
    PRODUCTS_EDIT: "products/edit/:id",

    CHECKOUT: "checkout",
  },
  // User routes
  USER: {
    DASHBOARD: "/user/dashboard",
  },
};

export const buildBillingUrl = (
  orgSlug: string,
  planId: string,
  interval: string,
  currency: string,
) => {
  return `/${orgSlug}/admin/${APP_ROUTES.ADMIN.SETTINGS_SUBSCRIPTION_BILLING}?planId=${planId}&interval=${interval}&currency=${currency}`;
};

export type RouteKeys = keyof typeof APP_ROUTES;
export type RouteValues = (typeof APP_ROUTES)[RouteKeys];
