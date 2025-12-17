import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchVariantInventory,
  updateVariantInventory,
//   fetchAllInventoriesByProductId,
} from "@/app/services/inventory.services";
import { UpdateVariantInventoryPayload } from "@/app/types/variants.types";
import { toast } from "sonner";

// Fetch single variant inventory
export const useVariantInventory = (productId: string, variantId: string) => {
  return useQuery({
    queryKey: ["inventory", productId, variantId],
    queryFn: () => fetchVariantInventory(productId, variantId),
    enabled: !!productId && !!variantId,
  });
};

// Fetch all inventories for a product
// export const useProductInventories = (productId: string) => {
//   return useQuery({
//     queryKey: ["inventories", productId],
//     queryFn: () => fetchAllInventoriesByProductId(productId),
//     enabled: !!productId,
//   });
// };

// Update variant inventory
export const useUpdateVariantInventory = (
  productId: string,
  variantId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateVariantInventoryPayload) =>
      updateVariantInventory(productId, variantId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventory", productId, variantId],
      });
      queryClient.invalidateQueries({
        queryKey: ["inventories", productId],
      });
      queryClient.invalidateQueries({
        queryKey: ["variants", productId],
      });
      toast.success("Inventory updated successfully");
    },
    onError: (error) => {
      console.error("Update inventory error:", error);
      toast.error("Failed to update inventory");
    },
  });
};