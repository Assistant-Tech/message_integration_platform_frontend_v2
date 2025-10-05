import { ReactNode } from "react";

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
  transactions: Transaction[];
}

export interface Plan {
  id: string;
  name: string;
  interval: string;
  features: string[];
  [key: string]: any;
}

export interface SubscriptionData {
  id: string;
  status: string;
  startDate: string;
  endDate: string;
  currency: string;
  plan?: Plan;
}

export interface SubscriptionResponse {
  plan: any;
  status: ReactNode;
  startDate: any;
  endDate: any;
  currency: ReactNode;
  success: boolean;
  message: string;
  data: SubscriptionData;
}
