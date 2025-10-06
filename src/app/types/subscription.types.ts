import { ReactNode } from "react";

/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ Initiate Subscription Data (from frontend → backend)
─────────────────────────────────────────────────────────────────────────────
*/
export type SubscriptionInitiationData = {
  planId: string;
  paymentProvider: "stripe" | "khalti" | "esewa";
  billingCycle: "MONTHLY" | "YEARLY";
  currency: string;
  callbackUrl: string;
  paymentType?: "stripe" | "khalti" | "esewa";
  useTrial?: boolean;
  staffCount?: number;
  fullName?: string;
  country?: string;
  promoCode?: string;
};

/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ Subscription Status
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
 🧾 ▶ Transaction details
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
  currency?: "NPR" | "USD";
}

/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ Plan definition
─────────────────────────────────────────────────────────────────────────────
*/
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
 🧾 ▶ Subscription Data
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
 🧾 ▶ Khalti Response
─────────────────────────────────────────────────────────────────────────────
*/
export interface KhaltiResponse {
  message: string;
  success: boolean;
  data: {
    provider: "KHALTI";
    pidx: string;
    paymentUrl: string;
    expiresAt: string;
  };
  timestamp: string;
}

/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ Stripe Response
─────────────────────────────────────────────────────────────────────────────
*/
export interface StripeResponse {
  message: string;
  success: boolean;
  data: {
    provider: "STRIPE";
    sessionId: string;
    paymentUrl: string;
    expiresAt: string;
  };
  timestamp: string;
}

/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ Esewa Response
─────────────────────────────────────────────────────────────────────────────
*/
export interface EsewaResponse {
  message: string;
  success: boolean;
  data: {
    provider: "ESEWA";
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
  };
}

/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ Union of Gateway Responses
─────────────────────────────────────────────────────────────────────────────
*/
export type PaymentGatewayResponse =
  | KhaltiResponse
  | StripeResponse
  | EsewaResponse;

/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ Type Guards (to avoid `as`)
─────────────────────────────────────────────────────────────────────────────
*/
export function isKhaltiResponse(
  res: PaymentGatewayResponse,
): res is KhaltiResponse {
  return res.data.provider === "KHALTI";
}

export function isStripeResponse(
  res: PaymentGatewayResponse,
): res is StripeResponse {
  return res.data.provider === "STRIPE";
}

export function isEsewaResponse(
  res: PaymentGatewayResponse,
): res is EsewaResponse {
  return res.data.provider === "ESEWA";
}

/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ Current Subscription Response
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

export interface SubscriptionHistoryResponse {
  message: string;
  success: boolean;
  data: FetchSubscriptionData;
  timestamp: string;
}
