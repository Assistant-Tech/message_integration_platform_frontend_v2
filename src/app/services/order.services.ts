import api from "@/app/services/api/axios";

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
      status: params?.status,
    },
  });

  return response.data;
};

// ==========================
// GET ORDER BY ID
// ==========================
export const getOrderById = async (id: string) => {
  const response = await api.get(`/orders/${id}`);
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
export const deleteOrder = async (id: string) => {
  const res = await api.delete(`/orders/${id}`);
  return res.data;
};

// ==========================
// UPDATE ORDER
// ==========================
export const updateOrder = async (id: string, payload: any) => {
  const res = await api.put(`/orders/${id}`, payload);
  return res.data;
};

// =========================
// ORDER NOTES
// /orders/{{orderId}}/notes
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
