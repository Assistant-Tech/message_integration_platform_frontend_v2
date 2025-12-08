import api from "@/app/services/api/axios";
import { CreateCategoryProps } from "../types/category.types";

// Fetch all the categories
export const fetchCategories = async (query: any) => {
  try {
    const res = await api.get(`/categories?${query || ""}`);
    return res.data.data || res.data;
  } catch (err: any) {
    console.error("Error while fetching category: ", err);
    throw err;
  }
};

// Fetch all the products by categoryId
export const fetchProductByCategoryId = async (categoryId: string) => {
  try {
    const res = await api.get(`/categories/${categoryId}/products`);
    return res.data.data || res.data;
  } catch (err: any) {
    console.error("Error while fetching category: ", err);
    throw err;
  }
};

// Create new category
export const createCategory = async ({
  title,
  description,
  parentId,
}: CreateCategoryProps) => {
  try {
    const payload: any = { title };

    // Only include optional fields if they have values
    if (description) payload.description = description;
    if (parentId) payload.parentId = parentId;

    const res = await api.post("/categories", payload);
    // Return the created category data
    return res.data.data || res.data;
  } catch (err: any) {
    console.error("Error while creating category: ", err);
    throw err;
  }
};

// Fetch Category via Id
export const getCategoryById = async (categoryId: string) => {
  try {
    if (!categoryId) {
      throw new Error("categoryId is required");
    }
    const res = await api.get(`/categories/${categoryId}`);
    return res.data.data || res.data;
  } catch (err: any) {
    console.error("Error while fetching category By Id: ", err);
    throw err;
  }
};

// Update Caegory by Id
export const updateCategoryById = async (
  categoryId: string,
  payload: { title?: string; description?: string },
) => {
  try {
    if (!categoryId) {
      throw new Error("categoryId is required");
    }
    const res = await api.patch(`/categories/${categoryId}`, payload);
    return res.data;
  } catch (error: any) {
    console.error("Error while updating title & description", error);
  }
};

// Delete Category by Id
export const deleteCategoryById = async (categoryId: string) => {
  try {
    if (!categoryId) {
      throw new Error("categoryId is required");
    }
    const res = await api.delete(`/categories/${categoryId}`);
    return res.data.data || res.data;
  } catch (err: any) {
    console.error("Error while deleting category: ", err);
    throw err;
  }
};
