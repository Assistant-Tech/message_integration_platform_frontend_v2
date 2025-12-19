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

    onSuccess: (updatedInventory) => {
      // 1️⃣ Update single variant inventory
      queryClient.setQueryData(
        ["inventory", productId, variantId],
        updatedInventory,
      );

      // 2️⃣ Update variants list (THIS FIXES YOUR TABLE)
      queryClient.setQueryData(
        ["variants", productId],
        (oldVariants: any[] | undefined) => {
          if (!oldVariants) return oldVariants;

          return oldVariants.map((variant) =>
            variant.id === variantId
              ? {
                  ...variant,
                  inventory: {
                    ...variant.inventory,
                    stock: updatedInventory.stock,
                    lowStock: updatedInventory.lowStock,
                  },
                }
              : variant,
          );
        },
      );

      toast.success("Inventory updated successfully");
    },

    onError: () => {
      toast.error("Failed to update inventory");
    },
  });
};
