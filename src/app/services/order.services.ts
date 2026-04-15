import api from "@/app/services/api/axios";
import { updateOrderPayload } from "@/app/types/order.types";

// ==========================
// GET ALL ORDERS
// ==========================
export const getOrders = async (params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  status?: string;
}) => {
  const response = await api.get("/orders", {
    params: {
      page: params?.page || 1,
      limit: params?.limit || 10,
      sortBy: params?.sortBy || "createdAt",
      order: params?.order || "desc",
      // status: params?.status,
    },
  });

  return response.data;
};
// ==========================
// GET ORDER BY ID
// ==========================
export const getOrderById = async (orderId: string) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

// ==========================
// CREATE NEW ORDER
// ==========================
export const createOrder = async (payload: any) => {
  const res = await api.post("/orders", payload);
  return res.data;
};

// ==========================
// DELETE ORDER
export const deleteOrder = async (orderId: string) => {
  const res = await api.delete(`/orders/${orderId}`);
  return res.data;
};

// ==========================
// UPDATE ORDER
// ==========================
export const updateOrder = async (
  orderId: string,
  payload: updateOrderPayload,
) => {
  const res = await api.put(`/orders/${orderId}`, payload);
  return res.data;
};

// =========================
// ORDER NOTES
// =========================
export const addOrderNote = async (orderId: string, note: string) => {
  const res = await api.post(`/orders/${orderId}/notes`, { note });
  return res.data;
};
// ==========================
// FETCH ORDER STATISTICS
// ==========================
export const getOrderStatistics = async (orderId: string) => {
  const response = await api.get(
    `/orders/${orderId}/notes?includeInternal=false`,
  );
  return response.data;
};

// ==========================
// UPDATE PAYMENT STATUS
// ==========================
export const updatePaymentStatus = async (orderId: string) => {
  const response = await api.get(`/orders/${orderId}/payment`);
  return response.data;
};

export const cancelOrder = async (
  orderId: string,
  reason: string,
  refundAmount: number,
) => {
  try {
    const response = await api.post(`/orders/${orderId}/cancel`, {
      reason,
      refundAmount,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to cancel order:", error);
    throw error;
  }
};

// Generate Shipping Label
export const generateShippingLabel = async (
  orderId: string,
  pickupAddress: string,
) => {
  try {
    const response = await api.post(`/shipping`, {
      orderId,
      pickupAddress,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to generate shipping label:", error);
    throw error;
  }
};

// Track Shipping
export const trackShipping = async (trackingNumber: string) => {
  try {
    const response = await api.get(`/shipping/track`, {
      params: { trackingNumber },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to track shipping:", error);
    throw error;
  }
};
