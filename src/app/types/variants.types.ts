export type VariantAttribute = {
  color: string;
  size: string;
};

export type VariantInventory = {
  stock: number;
  lowStock?: boolean;
};

// Details Variants
export type Variant = {
  id: string;
  productId: string;
  title: string;
  sku: string;
  price: number;
  attributes: VariantAttribute;
  inventory: VariantInventory;
  createdAt: string;
  updatedAt: string;
  visibility?: boolean;
};

// Create Variant Payload
export type CreateVariantPayload = {
  title: string;
  price: number;
  attributes: VariantAttribute;
  inventory: VariantInventory;
};

export type UpdateVariantPayload = Partial<{
  sku: string;
  price: number;
  compareAtPrice: number;
  attributes: VariantAttribute;
}>;

export type UpdateVariantInventoryPayload = {
  quantity: number;
  lowStockThreshold?: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};
