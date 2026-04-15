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
    DEMO: "/demo",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password/:userId/:token",
    PAYMENT_CALLBACK: "/payment/callback",

    PRODUCTS_OVERVIEW: "/products",
    CRM: "/products/crm",
    CHATBOT: "/products/chatbot",
    UNIFIED_MESSAGE: "/products/unified-message",
    BULK_MESSAGING: "/products/bulk-message",

    RESOURCES_OVERVIEW: "/resources",
    ONBOARDING: "/resources/onboarding",
    SUPPORT: "/resources/support",
    BLOG: "/resources/blogs",
    BLOG_ID: "/resources/blogs/:id",
    VIDEOS: "/resources/videos",
    FAQ: "/resources/faq",

    TERMSCONDITION: "/resources/support/terms&condition",
    POLICY: "/resources/support/policy",
    UPDATES: "/resources/support/updates",
  },

  // Auth routes
  AUTH: {
    VERIFY_EMAIL: "/verify/:token",
    CHECK_EMAIL: "/check-email",
    LOGIN_OTP: "/auth/login-otp",
    ONBOARDING_FORM: "/onboardingform",
  },

  // ✅ APP BASE (NEW)
  APP: {
    ROOT: (slug: string) => `/app/${slug}`,
  },

  // Admin routes (relative to /app/:slug/admin)
  ADMIN: {
    ROOT: (slug: string) => `/app/${slug}/admin`,

    DASHBOARD: "dashboard",
    CONVERSATION: "conversation",
    CONTACT: "contact",
    INBOX: "inbox",
    CUSTOMER_CONVERSATION: "messages",
    CHATBOT: "chatbot",
    CHANNEL: "channel",
    CHANNEL_SETTINGS: "channel/settings/:providerId",
    TAGS: "tags",
    ANALYTICS: "analytics",
    TEAM_ACTIVITY: "team-activity",

    ORDERS: "orders",
    ORDERS_CREATE: "orders/createOrder",
    ORDERS_DETAILS: "orders/details/:id",

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

  // User routes (relative to /app/:slug/dashboard)
  USER: {
    ROOT: (slug: string) => `/app/${slug}/dashboard`,
    DASHBOARD: "dashboard",
  },
};

export const buildBillingUrl = (
  orgSlug: string,
  planId: string,
  interval: string,
  currency: string,
) => {
  return `/app/${orgSlug}/admin/${APP_ROUTES.ADMIN.SETTINGS_SUBSCRIPTION_BILLING}?planId=${planId}&interval=${interval}&currency=${currency}`;
};

export type RouteKeys = keyof typeof APP_ROUTES;
export type RouteValues = (typeof APP_ROUTES)[RouteKeys];
