import api from "@/app/services/api/axios";

/**
 * Payment Transaction
 */
export const getTranscation = async () => {
  try {
    const response = await api.get("/payment/transactions");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Payment Transaction Details By Id
 */
export const getTranscationById = async (transactionId: string) => {
  try {
    const response = await api.get(`/payment/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
