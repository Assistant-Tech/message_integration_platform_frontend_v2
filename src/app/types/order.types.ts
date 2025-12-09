export interface ShippingDetail {
  customerName: string;
  address: string;
  city?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
}

export interface ShippingResponse {
  orderId: string;
  trackingNumber: string;
  status: string;
  pickupAddress: string;
  createdAt: string;
}

export interface TrackingResponse {
  trackingNumber: string;
  status: string;
  currentLocation?: string;
  estimatedDelivery?: string;
  history?: Array<{
    status: string;
    location: string;
    timestamp: string;
  }>;
}
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
  customerName: string;
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
  status: "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "PENDING" | "PAID";
  metadata: {
    notes: string;
    source: string;
  };
}

// create order payload interface
export interface createOrderPayload {
  channel: string;
  externalId?: string;
  shippingDetail: {
    customerName: string;
    shippingAddress: string;
    contactInfo: {
      email: string;
      phone: string;
    };
  };
  items: Array<{
    productId: string;
    variantId: string;
    quantity: number;
    unitPrice: number;
  }>;
  metadata?: {
    notes?: string;
    source?: string;
  };
}

// update order payload interface
export interface updateOrderPayload {
  status?: string;
  metadata?: {
    updated_reason?: string;
    updated_at?: string;
  };
}
