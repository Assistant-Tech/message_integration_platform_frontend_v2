import { create } from "zustand";

interface PaymentState {
  provider?: string;
  sessionId?: string;
  subscriptionId?: string;
  transactionId?: string;
  setPaymentData: (data: Partial<PaymentState>) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  setPaymentData: (data) => set(data),
}));
