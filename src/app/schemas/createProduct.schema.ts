import { z } from "zod";

const productVariantSchema = z.object({
  title: z.string().nonempty("Variant title is required"),

  price: z
    .number({
      required_error: "Variant price is required",
      invalid_type_error: "Variant price must be a number",
    })
    .nonnegative("Price cannot be negative"),

  attributes: z.object({
    color: z.string().nonempty("Color is required"),
    size: z.string().nonempty("Size is required"),
  }),

  inventory: z.object({
    stock: z
      .number({
        required_error: "Stock value is required",
        invalid_type_error: "Stock must be a number",
      })
      .int("Stock must be an integer")
      .nonnegative("Stock cannot be negative"),

    lowStock: z.boolean(),
  }),
});

export const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  categoryId: z.string().nonempty("Category is required"),
  sku: z.string().nonempty("SKU is required"),

  weight: z.string().regex(/^\d+(\.\d+)?$/, "Weight must be a valid number"),
  weightUnit: z.string(),

  quantity: z.string().regex(/^\d+$/, "Quantity must be a valid number"),

  price: z.string().regex(/^\d+(\.\d+)?$/, "Price must be a valid number"),
  currency: z.enum(["Rupees", "USD", "EUR", "GBP"]),

  discountPercentage: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Discount percentage must be a valid number")
    .optional(),

  discountAmount: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Discount amount must be a valid number")
    .optional(),

  description: z.string().min(10, "Description must be at least 10 characters long"),

  visibility: z.enum(["publish", "schedule", "draft"]),
  publishDate: z.string().optional(),

  variants: z.array(productVariantSchema),

  images: z.array(z.instanceof(File)).optional(),
});
