export const CUSTOM_EVENTS = {
  SUBSCRIPTION_EVENT: "subscription_notification",
  CONNECT: "connect",
  DISCONNECT: "disconnect",

  // Payment Success / Failure
  PAYMENT_SUCCESS: "subscription.payment_succeeded",
  PAYMENT_FAILED: "subscription.payment_failed",
  CANCELLED: "subscription.cancelled",

  // Subscription Activation
  SUBSCRIPTION_ACTIVATION: "subscription.activated",
  EXPIRED: "subscription.expired",
  RENEWED: "subscription.renewed",
  UPCOMING_RENEWAL: "subscription.upcoming_renewal",
  UPGRADED: "subscription.upgraded",
  DOWNGRADED: "subscription.downgraded",
  NEW_PLAN: "subscription.new_plan",
  CHANGE_PLAN: "subscription.plan_changed",
} as const;
