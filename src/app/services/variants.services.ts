import api from "@/app/services/api/axios";
import {
  Variant,
  CreateVariantPayload,
  UpdateVariantPayload,
  ApiResponse,
} from "@/app/types/variants.types";

/* ----------------------------------
   GET all variants by product ID
----------------------------------- */
export const fetchAllVariantsByProductId = async (
  productId: string,
): Promise<Variant[]> => {
  const { data } = await api.get<ApiResponse<Variant[]>>(
    `/products/${productId}/variants`,
  );
  return data.data;
};
  
/* ----------------------------------
   CREATE variant
----------------------------------- */
export const createVariant = async (
  productId: string,
  payload: CreateVariantPayload,
): Promise<Variant> => {
  const { data } = await api.post<ApiResponse<Variant>>(
    `/products/${productId}/variants`,
    payload,
  );
  return data.data;
};

/* ----------------------------------
   GET single variant
----------------------------------- */
export const fetchVariantById = async (
  productId: string,
  variantId: string,
): Promise<Variant> => {
  const { data } = await api.get<ApiResponse<Variant>>(
    `/products/${productId}/variants/${variantId}`,
  );
  return data.data;
};

/* ----------------------------------
   UPDATE variant
----------------------------------- */
export const updateVariant = async (
  productId: string,
  variantId: string,
  payload: UpdateVariantPayload,
): Promise<Variant> => {
  const { data } = await api.patch<ApiResponse<Variant>>(
    `/products/${productId}/variants/${variantId}`,
    payload,
  );
  return data.data;
};

/* ----------------------------------
   DELETE variant
----------------------------------- */
export const deleteVariant = async (
  productId: string,
  variantId: string,
): Promise<void> => {
  await api.delete(`/products/${productId}/variants/${variantId}`);
};
