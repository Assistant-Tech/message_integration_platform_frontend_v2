import { create } from "zustand";
import {
  InvoiceResponse,
  SubscriptionInitiationData,
  SubscriptionResponse,
} from "@/app/types/subscription.types";

type SubscriptionStore = {
  initiationData: SubscriptionInitiationData;
  subscription: SubscriptionResponse | null;
  response: SubscriptionResponse | null;
  invoices: InvoiceResponse[] | null;
  loading: boolean;
  error: string | null;
  setInitiationData: (data: SubscriptionInitiationData) => void;
  setResponse: (response: SubscriptionResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSubscription: (sub: SubscriptionResponse) => void;
  setInvoices: (invoices: InvoiceResponse[]) => void;
};

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
  initiationData: {} as SubscriptionInitiationData,
  subscription: null,
  response: null,
  loading: false,
  invoices: null,
  error: null,
  setInitiationData: (data) => set({ initiationData: data }),
  setResponse: (response) => set({ response }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSubscription: (subscription) => set({ subscription }),
  setInvoices: (invoices) => set({ invoices }),
}));
