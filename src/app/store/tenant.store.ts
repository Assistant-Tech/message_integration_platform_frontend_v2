import { create } from "zustand";
import {
  LoginActivityMeta,
  MemberLoginActivity,
} from "@/app/types/tenant.types";
import { tenantServices } from "../services/tenant.services";

interface TenantState {
  loading: boolean;
  error: string | null;
  members: MemberLoginActivity[];
  meta: LoginActivityMeta | null;
  fetchLoginActivity: (page?: number, limit?: number) => Promise<void>;
}

export const useTenantStore = create<TenantState>((set) => ({
  loading: false,
  error: null,
  members: [],
  meta: null,

  fetchLoginActivity: async (page = 1, limit = 10) => {
    set({ loading: true });
    try {
      const res = await tenantServices.getLoginActivity(page, limit);
      set({
        members: res.data,
        meta: res.meta,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
