import api from "@/app/services/api/axios";

/**
 * Payment Transaction
 */
export const getTranscation = async () => {
  const response = await api.get("/payment/transactions");
  return response.data;
};

/**
 * Payment Transaction Details By Id
 */
export const getTranscationById = async (transactionId: string) => {
  const response = await api.get(`/payment/transactions/${transactionId}`);
  return response.data;
};
