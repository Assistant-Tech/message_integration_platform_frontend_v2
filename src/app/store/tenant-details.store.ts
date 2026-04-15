import { create } from "zustand";
import { TenantDetailsResponse } from "@/app/types/tenant.types";
import { tenantServices } from "@/app/services/tenant.services";

interface TenantDetailsState {
  tenantDetails: TenantDetailsResponse["data"] | null;
  loading: boolean;
  error: string | null;
  updateLoading: boolean;

  getTenantDetails: () => Promise<void>;
  updateTenantDetails: (
    payload: Partial<TenantDetailsResponse["data"]>,
  ) => Promise<void>;
}

export const useTenantDetailsStore = create<TenantDetailsState>((set) => ({
  tenantDetails: null,
  loading: false,
  error: null,
  updateLoading: false,

  // Fetch tenant details
  getTenantDetails: async () => {
    set({ loading: true, error: null });
    try {
      const res = await tenantServices.getTenantDetails();
      set({
        tenantDetails: res.data,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch tenant details",
        loading: false,
      });
    }
  },

  // Update tenant details
  updateTenantDetails: async (payload) => {
    set({ updateLoading: true });
    try {
      const res = await tenantServices.updateTenantDetails(payload);
      set({ tenantDetails: res.data, updateLoading: false });
    } catch (err: any) {
      set({
        error: err.message || "Failed to update tenant details",
        updateLoading: false,
      });
    }
  },
}));
