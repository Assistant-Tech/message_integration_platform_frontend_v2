/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Pricing Type
─────────────────────────────────────────────────────────────────────────────
*/
export type Currency = "USD" | "NPR";
export type Duration = "monthly" | "yearly";

export interface Plan {
  title: string;
  subtitle: string;
  price: string;
  originalPrice: string | null;
  features: string[];
  buttonText: string;
  isPopular: boolean;
}

export type PricingData = {
  [key in Currency]: {
    [key in Duration]: Plan[];
  };
};
