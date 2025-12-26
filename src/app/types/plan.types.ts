/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Pricing Type
─────────────────────────────────────────────────────────────────────────────
*/

export type Currency = "USD" | "NPR";
export type APIDuration = "MONTHLY" | "YEARLY";
export type Duration = "monthly" | "yearly";

/*
─────────────────────────────────────────────────────────────────────────────
 🌐 ▶ Raw API Plan (as received from backend)
─────────────────────────────────────────────────────────────────────────────
*/
export interface APIPlan {
  id: string;
  name: string;
  description: string;

  // All amounts come as strings in paisa/cents from the API
  baseAmount: string;
  discountedRate: string;
  discountedAmount: string;
  taxRate: string;
  taxAmount: string;
  totalAmount: string;

  interval: APIDuration;
  durationInDays: number;
  features: string[];
  isActive: boolean;
  isPopular: boolean;
  currency: Currency;
  createdAt?: string;
  updatedAt?: string;
}

/*
─────────────────────────────────────────────────────────────────────────────
 💰 ▶ Normalized Plan (after dividing by 100 for UI)
─────────────────────────────────────────────────────────────────────────────
*/
export interface Plan {
  id: string;
  name: string;
  description: string;

  baseAmount: number;
  discountedRate: number;
  discountedAmount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;

  interval: APIDuration;
  durationInDays: number;
  features: string[];
  isActive: boolean;
  isPopular: boolean;
  currency: Currency;
  createdAt?: string;
  updatedAt?: string;
}

/*
─────────────────────────────────────────────────────────────────────────────
 🧾 ▶ Detailed Plan (used in Invoice / Payment)
─────────────────────────────────────────────────────────────────────────────
*/
export interface PlanType {
  id: string;
  name: string;
  description: string;

  // Normalized amounts in rupees/dollars
  basePrice: number;
  discountAmount: number;
  originalAmount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;

  interval: APIDuration;
  durationInDays: number;
  currency: Currency;
  isPopular: boolean;
  features: Record<string, string | number | boolean>;
  displayPrice?: string;
}

/*
─────────────────────────────────────────────────────────────────────────────
 🧍 ▶ Checkout Form Data
─────────────────────────────────────────────────────────────────────────────
*/
export type CheckoutFormData = {
  fullName: string;
  country: string;
  paymentType: string;
  paymentOption: "stripe" | "khalti" | "esewa";
  staffCount: number;
  useTrial: boolean;
  promoCode?: string;
};
