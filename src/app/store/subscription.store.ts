import { create } from "zustand";
import {
  CurrentSubscriptionResponse,
  InvoiceResponse,
  SubscriptionHistoryResponse,
  SubscriptionInitiationData,
  SubscriptionResponse,
  PaymentGatewayResponse,
} from "@/app/types/subscription.types";

type SubscriptionStore = {
  initiationData: SubscriptionInitiationData | null;
  subscription: SubscriptionResponse | null;
  response: PaymentGatewayResponse | null; 
  currentSubscriptionResponse: CurrentSubscriptionResponse | null;
  historyResponse: SubscriptionHistoryResponse | null;
  invoices: InvoiceResponse[] | null;
  loading: boolean;
  error: string | null;
  setInitiationData: (data: SubscriptionInitiationData) => void;
  setResponse: (response: PaymentGatewayResponse) => void; // 👈 FIXED
  setCurrentResponse: (response: CurrentSubscriptionResponse) => void;
  setHistoryResponse: (response: SubscriptionHistoryResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSubscription: (sub: SubscriptionResponse) => void;
  setInvoices: (invoices: InvoiceResponse[]) => void;
};

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
  initiationData: null,
  subscription: null,
  historyResponse: null,
  response: null,
  currentSubscriptionResponse: null,
  loading: false,
  invoices: null,
  error: null,

  setInitiationData: (data) => set({ initiationData: data }),
  setResponse: (response) => set({ response }),
  setCurrentResponse: (currentSubscriptionResponse) =>
    set({ currentSubscriptionResponse }),
  setHistoryResponse: (historyResponse) => set({ historyResponse }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSubscription: (subscription) => set({ subscription }),
  setInvoices: (invoices) => set({ invoices }),
}));
