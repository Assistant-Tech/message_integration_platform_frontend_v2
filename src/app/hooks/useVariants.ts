import { useQuery } from "@tanstack/react-query";
import { fetchAllVariantsByProductId } from "@/app/services/variants.services";

export const useVariant = (ProductId: string) => {
  return useQuery({
    queryKey: ["variant"],
    queryFn: () => fetchAllVariantsByProductId(ProductId),
    gcTime: 24 * 60 * 60,
    staleTime: 24 * 60 * 60,
  });
};
