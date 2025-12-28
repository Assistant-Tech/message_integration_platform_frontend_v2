import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllVariantsByProductId,
  createVariant,
  updateVariant,
  deleteVariant,
} from "@/app/services/variants.services";
import {
  CreateVariantPayload,
  UpdateVariantPayload,
} from "@/app/types/variants.types";
import { toast } from "sonner";

// Fetch all variants by product ID
export const useVariant = (productId: string) => {
  return useQuery({
    queryKey: ["variants", productId],
    queryFn: () => fetchAllVariantsByProductId(productId),
    enabled: !!productId,
    gcTime: 24 * 60 * 60,
    staleTime: 24 * 60 * 60,
  });
};

// Create variant
export const useCreateVariant = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateVariantPayload) =>
      createVariant(productId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["variants", productId] });
      toast.success("Variant created successfully");
    },
    onError: (error) => {
      console.error("Create variant error:", error);
      toast.error("Failed to create variant");
    },
  });
};

// Update variant
export const useUpdateVariant = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      variantId,
      payload,
    }: {
      variantId: string;
      payload: UpdateVariantPayload;
    }) => updateVariant(productId, variantId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["variants", productId] });
      toast.success("Variant updated successfully");
    },

    onError: (error) => {
      console.error("Update variant error:", error);
      toast.error("Failed to update variant");
    },
  });
};

// Delete variant
export const useDeleteVariant = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variantId: string) => deleteVariant(productId, variantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["variants", productId] });
      toast.success("Variant deleted successfully");
    },
    onError: (error) => {
      console.error("Delete variant error:", error);
      toast.error("Failed to delete variant");
    },
  });
};
