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
import { useSubscriptionStore } from "@/app/store/subscription.store";

/**
 * Initiate subscription → returns a gateway response
 */
export const initiateSubscription = async (
  data: SubscriptionInitiationData,
) => {
  const { setLoading, setResponse, setError } = useSubscriptionStore.getState();
  setLoading(true);

  try {
    const response = await api.post<PaymentGatewayResponse>(
      "/subscription/initiate",
      data,
    );

    setResponse(response.data);
    setLoading(false);
    return response.data;
  } catch (error: any) {
    setError(
      error?.message || "An error occurred while initiating subscription.",
    );
    setLoading(false);
    throw error;
  }
};

/**
 * Get current subscription for logged-in tenant
 */
export const getCurrentSubscription = async () => {
  const { setLoading, setCurrentResponse, setError } =
    useSubscriptionStore.getState();

  setLoading(true);
  try {
    const response = await api.get<CurrentSubscriptionResponse>(
      "/subscription/current",
    );
    setCurrentResponse(response.data);
    setLoading(false);
    return response.data;
  } catch (error: any) {
    setError(error?.message || "Failed to fetch current subscription");
    setLoading(false);
    throw error;
  }
};

/**
 * Get subscription history
 */
export const getSubscriptionHistory = async () => {
  const { setLoading, setHistoryResponse, setError } =
    useSubscriptionStore.getState();

  setLoading(true);
  try {
    const response = await api.get<SubscriptionHistoryResponse>(
      "/subscription/history",
    );
    setHistoryResponse(response.data);
    setLoading(false);
    return response.data;
  } catch (error: any) {
    setError(error?.message || "Failed to fetch subscription history");
    setLoading(false);
    throw error;
  }
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

  console.log("🚀 ~ getSubscriptionInvoices ~ response.data:", response.data);

  return response.data.data;
};

/**
 * Get Subscription Invoices
 */
export const getSubscriptionInvoicesAll = async () => {
  const { setLoading, setError } = useSubscriptionStore.getState();

  setLoading(true);
  try {
    const response = await api.get<any[]>("/subscription/invoices");
    setLoading(false);
    console.log(
      "🚀 ~ getSubscriptionInvoicesAll ~ return response.data response.data",
    );
    return response.data;
  } catch (error: any) {
    setError(error?.message || "Failed to fetch subscription history");
    setLoading(false);
    throw error;
  }
};

/**
 * Get a single Subscription Invoice by ID
 */
export const getSubscriptionInvoiceById = async (subscriptionId: string) => {
  const { setLoading, setError } = useSubscriptionStore.getState();

  setLoading(true);
  try {
    const response = await api.get<any>(
      `/subscription/invoices/${subscriptionId}`,
    );
    setLoading(false);
    console.log(
      "🚀 ~ getSubscriptionInvoiceById ~ response.data:",
      response.data,
    );
    return response.data;
  } catch (error: any) {
    setError(error?.message || "Failed to fetch invoice detail");
    setLoading(false);
    throw error;
  }
};

/**
 * subscription cancelation
 */
export const cancelSubscription = async ({
  subscriptionId,
  cancellationReason,
  cancelImmediately,
}: CancelSubscriptionProps) => {
  try {
    const response = await api.post(`/subscription/cancel`, {
      subscriptionId,
      cancellationReason,
      cancelImmediately,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * subscription Resume
 */
export const resumeSubscription = async ({
  subscriptionId,
}: resumeSubscriptionProps) => {
  try {
    const response = await api.post(`/subscription/resume`, {
      subscriptionId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * subscription Pause
 */
export const pauseSubscription = async ({
  subscriptionId,
  pauseDuration,
}: pauseSubscriptionProps) => {
  try {
    const response = await api.post(`/subscription/pause`, {
      subscriptionId,
      pauseDuration,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
/**
 * Payment history fetch all
 */
export const getPaymentHistory = async () => {
  const response = await api.get("/payment/history");
  return response.data;
};
