import { create } from "zustand";
import {
  InviteMemberPayload,
  MemberLoginActivity,
  LoginActivityMeta,
} from "@/app/types/tenant.types";
import { tenantServices } from "@/app/services/tenant.services";

interface TenantMembersState {
  members: MemberLoginActivity[];
  tenantUsers: any[];
  meta: LoginActivityMeta | null;
  loading: boolean;
  error: string | null;

  // Invite Members
  inviteLoading: boolean;
  inviteError: string | null;
  inviteSuccess: string | null;
  inviteMember: (payload: InviteMemberPayload) => Promise<void>;

  // Fetch
  fetchTenantUsers: () => Promise<void>;
  fetchLoginActivity: (page?: number, limit?: number) => Promise<void>;
}

export const useTenantMembersStore = create<TenantMembersState>((set) => ({
  members: [],
  tenantUsers: [],
  meta: null,
  loading: false,
  error: null,

  inviteLoading: false,
  inviteError: null,
  inviteSuccess: null,

  // Fetch login activity
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

  // Fetch tenant users
  fetchTenantUsers: async () => {
    set({ loading: true });
    try {
      const res = await tenantServices.getTenantUsers();
      set({
        tenantUsers: res.data,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Invite member
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
