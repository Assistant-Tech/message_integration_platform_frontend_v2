import api from "@/app/services/api/axios";
import {
  CurrentSubscriptionResponse,
  InvoiceResponse,
  SubscriptionHistoryResponse,
  SubscriptionInitiationData,
  SubscriptionResponse,
  PaymentGatewayResponse,
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
export const getSubscriptionInvoices = async (subscriptionId: string) => {
  const response = await api.get<InvoiceResponse[]>(
    `/subscription/${subscriptionId}/invoices`,
  );
  return response.data;
};
