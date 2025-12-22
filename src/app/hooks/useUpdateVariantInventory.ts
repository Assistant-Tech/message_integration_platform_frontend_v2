import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchVariantInventory,
  updateVariantInventory,
} from "@/app/services/inventory.services";
import { UpdateVariantInventoryPayload } from "@/app/types/variants.types";
import { toast } from "sonner";

export const useVariantInventory = (productId: string, variantId: string) => {
  return useQuery({
    queryKey: ["inventory", productId, variantId],
    queryFn: () => fetchVariantInventory(productId, variantId),
    enabled: !!productId && !!variantId,
  });
};

export const useUpdateVariantInventory = (
  productId: string,
  variantId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateVariantInventoryPayload) =>
      updateVariantInventory(productId, variantId, payload),

    onSuccess: async () => {
      // 🔄 Refetch fresh data from backend
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["variants", productId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["inventory", productId, variantId],
        }),
      ]);

      toast.success("Inventory updated successfully");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to update inventory");
    },
  });
};
