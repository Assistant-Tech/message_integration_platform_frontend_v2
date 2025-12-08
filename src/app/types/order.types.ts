/**
 * Interface for the detailed information of a single item within an order.
 */
export interface OrderItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  unitPrice: number;
  // ... other potential item fields like name, SKU, etc.
}

/**
 * Interface for the shipping contact details.
 */
export interface ContactInfo {
  email: string;
  phone: string;
}

/**
 * Interface for the nested shipping details object.
 */
export interface ShippingDetail {
  id: string;
  customerName: string; // The customer's name as used in the table
  shippingAddress: string;
  contactInfo: ContactInfo;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interface for the core Order object.
 */
export interface Order {
  id: string;
  trackingNumber: string;
  tenantId: string;
  channel: string;
  externalId: string | null;
  shippingDetail: ShippingDetail;
  payments: Array<any>;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  total: number;
  subtotal: number;
  tax: number;
  discount: number;
  status: string;
  metadata: {
    notes: string;
    source: string;
  };
}
