import api from "@/app/services/api/axios";
import {
  InvoiceResponse,
  SubscriptionInitiationData,
  SubscriptionResponse,
} from "@/app/types/subscription.types";
import { useSubscriptionStore } from "@/app/store/subscription.store";

/**
 * Initiate subscription only if none exists or status is inactive/cancelled
 */
export const initiateSubscription = async (
  data: SubscriptionInitiationData,
) => {
  const { setLoading, setResponse, setError } = useSubscriptionStore.getState();
  setLoading(true);

  try {
    const response = await api.post<SubscriptionResponse>(
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
  const response = await api.get<SubscriptionResponse>("/subscription/current");
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
export const getSubscriptionInvoices = async (subscriptionId: string) => {
  const response = await api.get<InvoiceResponse[]>(
    `/subscription/${subscriptionId}/invoices`,
  );
  return response.data;
};
