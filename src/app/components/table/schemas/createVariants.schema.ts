import { z } from "zod";

export const VariantAttributeSchema = z.object({
  color: z.string().min(1, "Color is required"),
  size: z.string().min(1, "Size is required"),
});

export type VariantAttribute = z.infer<typeof VariantAttributeSchema>;

export const VariantInventorySchema = z.object({
  stock: z.number().int().nonnegative("Stock must be 0 or more"),
  lowStock: z.boolean().optional(),
});

export type VariantInventory = z.infer<typeof VariantInventorySchema>;

export const VariantSchema = z.object({
  id: z.string().uuid("Invalid variant id"),
  productId: z.string().uuid("Invalid product id"),
  title: z.string().min(1, "Title is required"),
  sku: z.string().min(1, "SKU is required"),
  price: z.number().positive("Price must be greater than 0"),
  attributes: VariantAttributeSchema,
  inventory: VariantInventorySchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  visibility: z.boolean().optional(),
});

export type Variant = z.infer<typeof VariantSchema>;

export const CreateVariantPayloadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price must be greater than 0"),
  attributes: VariantAttributeSchema,
  inventory: VariantInventorySchema,
});

export type CreateVariantPayload = z.infer<typeof CreateVariantPayloadSchema>;

export const UpdateVariantPayloadSchema = z
  .object({
    sku: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    compareAtPrice: z.number().positive().optional(),
    attributes: VariantAttributeSchema.optional(),
  })
  .strict();

export type UpdateVariantPayload = z.infer<typeof UpdateVariantPayloadSchema>;

export const UpdateVariantInventoryPayloadSchema = z.object({
  quantity: z.number().int(),
  lowStockThreshold: z.number().int().positive().optional(),
});

export type UpdateVariantInventoryPayload = z.infer<
  typeof UpdateVariantInventoryPayloadSchema
>;

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: dataSchema,
  });

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};
