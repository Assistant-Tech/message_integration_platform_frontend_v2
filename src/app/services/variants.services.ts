// {{baseUrl}}/products/{{productId}}/variants

import api from "@/app/services/api/axios";

export const fetchAllVariantsByProductId = async (productId: string) => {
  const response = await api.get(`/products/${productId}/variants`);
  return response.data;
};
