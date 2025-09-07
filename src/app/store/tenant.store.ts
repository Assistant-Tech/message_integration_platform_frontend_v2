import { create } from "zustand";
import {
  InviteMemberPayload,
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

  inviteLoading: boolean;
  inviteError: string | null;
  inviteSuccess: string | null;
  inviteMember: (payload: InviteMemberPayload) => Promise<void>;
}

export const useTenantStore = create<TenantState>((set) => ({
  loading: false,
  error: null,
  members: [],
  meta: null,

  inviteLoading: false,
  inviteError: null,
  inviteSuccess: null,

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

  inviteMember: async (payload) => {
    set({ inviteLoading: true, inviteError: null, inviteSuccess: null });
    try {
      const res = await tenantServices.inviteMember(payload);
      set({
        inviteSuccess: res.message,
        inviteLoading: false,
      });
    } catch (err: any) {
      set({
        inviteError: err.message || "Failed to invite member",
        inviteLoading: false,
      });
    }
  },
}));
