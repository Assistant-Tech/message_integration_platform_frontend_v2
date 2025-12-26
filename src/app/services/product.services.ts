import api from "@/app/services/api/axios";
import {
  CreateProductData,
  UpdateProductDetailsProps,
} from "@/app/types/product.types";

// Fetch All the products
export const fetchProducts = async () => {
  const res = await api.get("/products");
  return res.data.data;
};

// Search Products by datasets like: title, sku, color, size
export const fetchProductsBySearch = async (searchQuery: string) => {
  const res = await api.get(`/products/search`, {
    params: { q: searchQuery },
  });
  console.log("Products fetched by search ", res.data);
  return res.data.data;
};

// Fetch Product Details by Id
export const fetchProductsById = async (productId: string) => {
  const res = await api.get(`/products/${productId}`);
  console.log("Product fetched by id ", res.data);
  return res.data.data;
};

// Create Product
export const createProduct = async (data: CreateProductData) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key !== "images" && key !== "variants") {
      formData.append(key, value as any);
    }
  });

  if (Array.isArray(data.images)) {
    data.images.forEach((file: File) => formData.append("images", file));
  } else if (data.images) {
    formData.append("images", data.images);
  }

  const normalizedVariants = data.variants.map((v) => ({
    title: v.title,
    price: Number(v.price),
    attributes: {
      color: v.attributes.color,
      size: v.attributes.size,
    },
    inventory: {
      stock: Number(v.inventory.stock),
      lowStock:
        typeof v.inventory.lowStock === "string"
          ? v.inventory.lowStock === "true"
          : Boolean(v.inventory.lowStock),
    },
  }));

  formData.append("variants", JSON.stringify(normalizedVariants));

  return api.post(`/products`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update Product by Id for title & description
export const EditProductById = async ({
  productId,
  data,
}: UpdateProductDetailsProps) => {
  const res = await api.patch(`/products/${productId}`, data);
  console.log("updated data: ", res.data);
  return res.data;
};

// Update product images by productId
export const EditProductForImages = async (
  productId: string,
  newImages: File[],
) => {
  const formData = new FormData();
  newImages.forEach((file) => {
    formData.append("images", file);
  });

  const res = await api.patch(`/products/${productId}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Delete product images by productId
export const DeleteProductByImages = async (
  productId: string,
  imagesId: string,
) => {
  const res = await api.delete(`/products/${productId}/images/${imagesId}`);
  return res.data;
};

// Delete Product by Id
export const deleteProduct = async (productId: string) => {
  const res = await api.delete(`/products/${productId}`);
  console.log("Product deleted: ", res.data);
  return res.data;
};
