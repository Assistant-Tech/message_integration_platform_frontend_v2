import api from "@/app/services/api/axios";
import {
  CurrentSubscriptionResponse,
  SubscriptionHistoryResponse,
  SubscriptionInitiationData,
  SubscriptionResponse,
  PaymentGatewayResponse,
  InvoiceResponse,
  Invoice,
  CancelSubscriptionProps,
  pauseSubscriptionProps,
  resumeSubscriptionProps,
} from "@/app/types/subscription.types";

/**
 * Initiate subscription -- returns a gateway response
 */
export const initiateSubscription = async (
  data: SubscriptionInitiationData,
): Promise<PaymentGatewayResponse> => {
  const response = await api.post<PaymentGatewayResponse>(
    "/subscription/initiate",
    data,
  );
  return response.data;
};

/**
 * Get current subscription for logged-in tenant
 */
export const getCurrentSubscription = async (): Promise<CurrentSubscriptionResponse> => {
  const response = await api.get<CurrentSubscriptionResponse>(
    "/subscription/current",
  );
  return response.data;
};

/**
 * Get subscription history
 */
export const getSubscriptionHistory = async (): Promise<SubscriptionHistoryResponse> => {
  const response = await api.get<SubscriptionHistoryResponse>(
    "/subscription/history",
  );
  return response.data;
};

/**
 * Complete a subscription after payment
 */
export const completeSubscription = async (
  subscriptionId: string,
  transactionId: string,
) => {
  const response = await api.get<SubscriptionResponse>(
    `/subscription/complete?subscriptionId=${subscriptionId}&transactionId=${transactionId}`,
  );
  return response.data;
};

/**
 * Get invoices for a subscription
 */
export const getSubscriptionInvoices = async (
  subscriptionId: string | undefined,
): Promise<Invoice[]> => {
  const response = await api.get<InvoiceResponse>(
    `/subscription/${subscriptionId}/invoices`,
  );
  return response.data.data;
};

/**
 * Get all subscription invoices
 */
export const getSubscriptionInvoicesAll = async () => {
  const response = await api.get<Record<string, unknown>[]>("/subscription/invoices");
  return response.data;
};

/**
 * Get a single Subscription Invoice by ID
 */
export const getSubscriptionInvoiceById = async (subscriptionId: string): Promise<{ data: Invoice }> => {
  const response = await api.get<{ data: Invoice }>(
    `/subscription/invoices/${subscriptionId}`,
  );
  return response.data;
};

/**
 * subscription cancelation
 */
export const cancelSubscription = async ({
  subscriptionId,
  cancellationReason,
  cancelImmediately,
}: CancelSubscriptionProps) => {
  const response = await api.post(`/subscription/cancel`, {
    subscriptionId,
    cancellationReason,
    cancelImmediately,
  });
  return response.data;
};

/**
 * subscription Resume
 */
export const resumeSubscription = async ({
  subscriptionId,
}: resumeSubscriptionProps) => {
  const response = await api.post(`/subscription/resume`, {
    subscriptionId,
  });
  return response.data;
};

/**
 * subscription Pause
 */
export const pauseSubscription = async ({
  subscriptionId,
  pauseDuration,
}: pauseSubscriptionProps) => {
  const response = await api.post(`/subscription/pause`, {
    subscriptionId,
    pauseDuration,
  });
  return response.data;
};

/**
 * Payment history fetch all
 */
export const getPaymentHistory = async () => {
  const response = await api.get("/payment/history");
  return response.data;
};
