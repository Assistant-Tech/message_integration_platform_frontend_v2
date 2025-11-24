import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/app/services/product.services";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    gcTime: 24 * 60 * 60,
    staleTime: 24 * 60 * 60,
  });
};
