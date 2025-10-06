import { ReactNode } from "react";

/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ Inititate Subscription 
─────────────────────────────────────────────────────────────────────────────
*/
export type SubscriptionInitiationData = {
  planId: string;
  paymentProvider: "stripe" | "khalti" | "esewa";
  billingCycle: "MONTHLY" | "YEARLY";
  currency: string;
  callbackUrl: string;
  // Optional from the frontend section sent datasets
  paymentType?: "stripe" | "khalti" | "esewa";
  useTrial?: boolean;
  staffCount?: number;
  fullName?: string;
  country?: string;
  promoCode?: string;
};
/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ Type of Status for SUBSCRIPTION
─────────────────────────────────────────────────────────────────────────────
*/
export type SubscriptionStatus =
  | "TRIALING"
  | "ACTIVE"
  | "CANCELLED"
  | "PAUSED"
  | "EXPIRED"
  | "INCOMPLETE"
  | "INCOMPLETE_EXPIRED"
  | "PAST_DUE"
  | "UNPAID";

/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ Transction details
─────────────────────────────────────────────────────────────────────────────
*/
export interface Transaction {
  id: string;
  tenantId: string;
  paymentMethodId: string;
  subscriptionId: string;
  amount: string;
  currency: string;
  status: string;
  type: string;
  providerTransactionId: string;
  providerReferenceId: string | null;
  processingFee: string | null;
  netAmount: string | null;
  gatewayResponse: string | null;
  createdAt: string;
  updatedAt: string;
  invoiceId: string;
}
/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ Invoice Response 
─────────────────────────────────────────────────────────────────────────────
*/
export interface InvoiceResponse {
  id: string;
  tenantId: string;
  subscriptionId: string;
  invoiceNumber: string;
  status: string;
  subTotal: string;
  tax: string;
  total: string;
  dueDate: string;
  paidAt: string | null;
  voidedAt: string | null;
  createdAt: string;
  transactions?: Transaction[];
}

/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ Subscription Datasets
─────────────────────────────────────────────────────────────────────────────
*/
export interface SubscriptionData {
  id: string;
  status: string;
  startDate: string;
  endDate: string;
  currency: string;
  plan?: Plan;
}

/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ Global Response
─────────────────────────────────────────────────────────────────────────────
*/
export interface SubscriptionResponse {
  plan: Plan;
  status: ReactNode;
  startDate: string;
  endDate: string;
  currency: ReactNode;
  success: boolean;
  message: string;
  data: SubscriptionData;
}
/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ khalti Response
─────────────────────────────────────────────────────────────────────────────
*/
export interface KhaltiResponse {
  message: string;
  success: boolean;
  data: KhaltiData;
  timestamp: string;
}

export interface KhaltiData {
  provider: "KHALTI";
  pidx: string;
  paymentUrl: string;
  expiresAt: string;
}
/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ Stripe Response
─────────────────────────────────────────────────────────────────────────────
*/
export interface StripeResponse {
  message: string;
  success: boolean;
  data: StripeData;
  timestamp: string;
}

export interface StripeData {
  provider: "STRIPE";
  sessionId: string;
  paymentUrl: string;
  expiresAt: string;
}

/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ Esewa Response
─────────────────────────────────────────────────────────────────────────────
*/
export interface EsewaResponse {
  message: string;
  success: boolean;
  data: EsewaData;
}
export interface EsewaData {
  provider: string;
  paymentUrl: string;
  fields: {
    amount: string;
    total_amount: any;
    tax_amount: number;
    transaction_uuid: string;
    product_code: string;
    product_service_charge: string;
    product_delivery_charge: string;
    success_url: string;
    failure_url: string;
    signed_field_names: string;
    signature: string;
  };
}
export interface Plan {
  id: string;
  name: string;
  description: string;
  baseAmount: string;
  currency: string;
  interval: string;
  discountedRate: string;
  discountedAmount: string;
  taxRate: string;
  taxAmount: string;
  totalAmount: string;
  durationInDays: number;
  features: string[];
  isActive: boolean;
  isPopular: boolean;
  createdAt: string;
  updatedAt: string;
}

/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ Subscription Datasets for current Fetch
─────────────────────────────────────────────────────────────────────────────
*/
export interface FetchSubscriptionData {
  id: string;
  tenantId: string;
  planId: string;
  externalId: string;
  status: string;
  startDate: string;
  endDate: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  nextBillingDate: string;
  billingCycleAnchor: string | null;
  trialStartDate: string | null;
  trialEndDate: string | null;
  hasUsedTrial: boolean;
  isAutoRenew: boolean;
  pausedUntil: string | null;
  cancelledAt: string | null;
  cancellationReason: string | null;
  renewdFromId: string | null;
  baseAmount: string;
  discountAmount: string;
  taxRate: string;
  totalAmount: string;
  currency: string;
  failedPaymentCount: number;
  lastFailedPaymentAt: string | null;
  gracePeriodEndDate: string | null;
  createdAt: string;
  updatedAt: string;
  plan: Plan;
  Invoice: InvoiceResponse[];
}

export interface CurrentSubscriptionResponse {
  message: string;
  success: boolean;
  data: FetchSubscriptionData;
  timestamp: string;
}
