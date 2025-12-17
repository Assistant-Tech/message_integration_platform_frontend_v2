import {
  ApiResponse,
  UpdateVariantInventoryPayload,
  VariantInventory,
} from "@/app/types/variants.types";
import api from "@/app/services/api/axios";

/* ----------------------------------
   GET variant inventory
----------------------------------- */
export const fetchVariantInventory = async (
  productId: string,
  variantId: string,
): Promise<VariantInventory> => {
  const { data } = await api.get<ApiResponse<VariantInventory>>(
    `/products/${productId}/variants/${variantId}/inventory`,
  );
  return data.data;
};

/* ----------------------------------
   UPDATE variant inventory
----------------------------------- */
export const updateVariantInventory = async (
  productId: string,
  variantId: string,
  payload: UpdateVariantInventoryPayload,
): Promise<VariantInventory> => {
  const { data } = await api.patch<ApiResponse<VariantInventory>>(
    `/products/${productId}/variants/${variantId}/inventory`,
    payload,
  );
  return data.data;
};
