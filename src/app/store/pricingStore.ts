import { create } from "zustand";
import { Currency, APIDuration } from "@/app/types/plan";

interface PricingState {
  currency: Currency;
  duration: APIDuration;
  setCurrency: (c: Currency) => void;
  setDuration: (d: APIDuration) => void;
}

export const usePricingStore = create<PricingState>((set) => ({
  currency: "NPR",
  duration: "YEARLY",
  setCurrency: (currency) => set({ currency }),
  setDuration: (duration) => set({ duration }),
}));
