import api from "@/app/services/api/axios";
import { CreateProductData } from "@/app/types/product.types";

// Fetch All the product
export const fetchProducts = async () => {
  const res = await api.get("/products");
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
