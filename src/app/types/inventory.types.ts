export interface InventoryWithVariant {
  inventoryId: string;
  variantId: string;
  productId: string;
  stock: number;
  lowStock: boolean;
  createdAt: string;
  updatedAt: string;
  // Variant details
  variantTitle: string;
  variantPrice: number;
  variantSku?: string;
  attributes: {
    color?: string;
    size?: string;
  };
  productName: string;
  productImage?: string;
}

export interface UpdateVariantInventoryPayload {
  quantity: number;
  lowStockThreshold?: number;
}

export type VariantInventory = {
  id: string;
  stock: number;
  lowStock: boolean;
  createdAt: string;
  updatedAt: string;
};
