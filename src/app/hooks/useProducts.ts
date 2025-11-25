import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  EditProductById,
  fetchProducts,
  fetchProductsById,
} from "@/app/services/product.services";
import { CreateProductData } from "@/app/types/product.types";
import { toast } from "sonner";

// Fetch Product
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    gcTime: 24 * 60 * 60,
    staleTime: 24 * 60 * 60,
  });
};

// Create Product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProductData) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
    },
    onError: (error) => {
      console.error("Create error:", error);
      toast.error("Failed to create product");
    },
  });
};

// Update Product Hook
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, data }: { productId: string; data: any }) => {
      console.log("🚀 ~ useUpdateProduct ~ data:", data);
      return EditProductById({ productId, data });
    },
    onSuccess: (updatedProduct) => {
      queryClient.invalidateQueries({
        queryKey: ["product", updatedProduct.data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Product updated successfully");
    },
    onError: (error) => {
      console.error("Update error:", error);
      toast.error("Failed to update product");
    },
  });
};

// Fetch Single Product Hook
export const useProductById = (productId: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductsById(productId),
    enabled: !!productId,
  });
};

// Delete product buy id
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      console.error("Delete error:", error);
      toast.error("Failed to delete product");
    },
  });
};
