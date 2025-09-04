/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Pricing Type
─────────────────────────────────────────────────────────────────────────────
*/
export type Currency = "USD" | "NPR";
export type APIDuration = "MONTHLY" | "YEARLY";
export type Duration = "monthly" | "yearly";

export interface Plan {
  id: string;
  name: string;
  description: string;
  amount: number;
  interval: APIDuration;
  durationInDays: number;
  features: Record<string, any>;
  isActive: boolean;
  isPopular: boolean;
  currency: Currency;
}

export type CheckoutFormData = {
  fullName: string;
  country: string;
  staffCount: number;
  paymentType: string;
  paymentOption: string;
  promoCode?: string;
};

export type PlanType = {
  basePrice: any;
  discountAmount: number;
  originalAmount: number;
  taxAmount: number;
  taxRate: number;
  id: string;
  name: string;
  description: string;
  amount: number;
  durationInDays: number;
  interval: string;
  currency: string;
  isPopular: boolean;
  features: Record<string, string | number | boolean>;
};
