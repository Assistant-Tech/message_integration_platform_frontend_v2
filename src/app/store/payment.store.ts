import { create } from "zustand";

interface PaymentState {
  status?: boolean;
  provider?: string;
  sessionId?: string;
  subscriptionId?: string;
  transactionId?: string;
  invoiceData?: any;
  providerReferenceId?: number;
  setPaymentData: (data: Partial<PaymentState>) => void;
  setInvoiceData: (data: any) => void;
  setSubscriptionId: (subscriptionId: string) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  setPaymentData: (data) => set(data),
  setInvoiceData: (data) => set({ invoiceData: data }),
  setSubscriptionId: (subscriptionId: string) => {
    set({ subscriptionId });
    localStorage.setItem("subscriptionId", subscriptionId);
  },
}));

// Get the subscriptionId from localStorage on store initialization
const savedSubscriptionId = localStorage.getItem("subscriptionId");
if (savedSubscriptionId) {
  usePaymentStore.getState().setSubscriptionId(savedSubscriptionId); // Restore from localStorage
}
