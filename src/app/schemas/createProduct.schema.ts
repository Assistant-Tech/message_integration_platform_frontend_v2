import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  categoryId: z.string().nonempty("Category is required"),
  sku: z.string().nonempty("SKU is required"),
  weight: z.string().regex(/^\d+(\.\d+)?$/, "Weight must be a valid number"),
  weightUnit: z.string(),
  quantity: z.string().regex(/^\d+$/, "Quantity must be a valid number"),
  price: z.string().regex(/^\d+(\.\d+)?$/, "Price must be a valid number"),
  currency: z.enum(["Rupees", "USD", "EUR"]),
  discountPercentage: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Discount percentage must be a valid number"),
  discountAmount: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Discount amount must be a valid number"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  visibility: z.enum(["publish", "schedule", "draft"]),
  publishDate: z.string().optional(),
  variants: z.array(
    z.object({
      variantName: z.string().nonempty("Variant name is required"),
      variantPrice: z
        .string()
        .regex(/^\d+(\.\d+)?$/, "Variant price must be a valid number"),
    }),
  ),
  images: z.array(z.string()).optional(),
});

export type productFormData = z.infer<typeof productSchema>;
