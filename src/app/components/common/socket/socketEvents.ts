export const CUSTOM_EVENTS = {
  SUBSCRIPTION_EVENT: "subscription_notification",
  CONNECT: "connect",
  DISCONNECT: "disconnect",

  // ACTIVATED = 'subscription.activated',
  // UPCOMING_RENEWAL = 'subscription.upcoming_renewal',
  // RENEWED = 'subscription.renewed',
  // EXPIRED = 'subscription.expired',
  // CANCELLED = 'subscription.cancelled',
  // PAUSED = 'subscription.paused',
  // PAYMENT_FAILED = 'subscription.payment_failed',
  // PAYMENT_SUCCEEDED = 'subscription.payment_succeeded',
  // PLAN_CHANGED = 'subscription.plan_changed',
  // TRIAL_EXPIRING = 'subscription.trial_expiring',
  // TRIAL_EXPIRED = 'subscription.trial_expired',

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
