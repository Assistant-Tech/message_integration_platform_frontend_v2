import { LucideIcon } from "lucide-react";

// product update payload
export interface UpdateProductDetailsProps {
  productId: string;
  data: {
    title: string;
    description: string;
  };
}
/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ All-product Type utils
 ─────────────────────────────────────────────────────────────────────────────
*/
export interface ServiceItem {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  img?: string;
}

export enum Status {
  pending = "Pending",
  success = "Success",
  failed = "Failed",
  inprogress = "In Progress",
  draft = "Draft",
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  images: ProductImages[];
  price: number;
  sku: string;
  variants: ProductVariant[];
  visibility: boolean;
  status: Status;
  color: string;
  action: string;
}

export interface ProductTableProps {
  data: Product[];
}
export interface ProductImages {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}
export interface ProductDetails {
  data: {
    id: string;
    title: string;
    description: string;
    sku: string;
    productCategory: string[];
    images: ProductImages[];
    variants: ProductVariant[];
  };
}
/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Category Type utils
 ─────────────────────────────────────────────────────────────────────────────
*/
export interface Category {
  id: string;
  name: string;
  products: number;
  visibility: boolean;
  action: string;
}
export interface CategoryTableProps {
  data: Category[];
}

/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Variant Type utils
 ─────────────────────────────────────────────────────────────────────────────
*/
export interface Variant {
  name: string;
  visibility: boolean;
  action: string;
}
export interface VariantTableProps {
  data: Variant[];
}
/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Inventory Type utils
 ─────────────────────────────────────────────────────────────────────────────
*/
export interface Name {
  productImage: string;
  productName: string;
  productSubName?: string;
}
export enum Size {
  small = "Small",
  medium = "Medium",
  large = "Large",
  extralarge = "XL",
  doublexl = "2XL",
}

export interface Inventory {
  name: Name;
  color: string;
  size: Size;
  quantity: number;
  price: number;
  stock: boolean;
}

export interface InventoryTableProps {
  data: Inventory[];
}
/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Product Form Type utils
 ─────────────────────────────────────────────────────────────────────────────
*/
export interface ProductVariant {
  id?: string;
  title: string;
  sku?: string;
  price: number;
  attributes: {
    color: string;
    size: string;
  };
  inventory?: {
    stock: number;
    lowStock: boolean;
  };
}

export interface CreateProductForm {
  payload: CreateProductData[];
}
export interface CreateProductData {
  title: string;
  categoryId: string;
  sku: string;

  weight: string;
  weightUnit: string;

  quantity: string;

  price: string;
  currency: "Rupees" | "USD" | "EUR" | "GBP";

  discountPercentage?: string;
  discountAmount?: string;

  description: string;

  visibility: "publish" | "schedule" | "draft";
  publishDate?: string;

  variants: {
    title: string;
    price: number;
    attributes: {
      color: string;
      size: string;
    };
    inventory: {
      stock: number;
      lowStock: boolean;
    };
  }[];

  images?: File[];
}

// Sorting datasets
export type SortOption = {
  label: string;
  value: string;
};
// Filter options
export type FilterOption = {
  label: string;
  value: string;
};

export type FilterConfig = {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
};
