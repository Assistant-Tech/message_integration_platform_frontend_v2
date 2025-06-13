/*
─────────────────────────────────────────────────────────────────────────────
 📦 ▶ Pricing Type
─────────────────────────────────────────────────────────────────────────────
*/
export type Currency = "USD" | "NPR";
export type APIDuration = "MONTHLY" | "YEARLY";

export type Duration = "monthly" | "yearly"; //UI

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
