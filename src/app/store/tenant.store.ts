import { create } from "zustand";
import {
  InviteMemberPayload,
  LoginActivityMeta,
  MemberLoginActivity,
  CreateTenantRolePayload,
  TenantRole,
} from "@/app/types/tenant.types";
import { tenantServices } from "@/app/services/tenant.services";

interface TenantState {
  loading: boolean;
  error: string | null;
  members: MemberLoginActivity[];
  tenantUsers: any[];
  meta: LoginActivityMeta | null;
  fetchLoginActivity: (page?: number, limit?: number) => Promise<void>;

  // Invite Memebers
  inviteLoading: boolean;
  inviteError: string | null;
  inviteSuccess: string | null;
  inviteMember: (payload: InviteMemberPayload) => Promise<void>;
  fetchTenantUsers: () => Promise<void>;

  // Role Creation
  roleLoading: boolean;
  roleError: string | null;
  roleSuccess: string | null;
  createdRole: TenantRole | null;
  createTenantRole: (payload: CreateTenantRolePayload) => Promise<void>;

  updateTenantRole: (
    roleId: string | number,
    payload: { addPermissions?: string[]; removePermissions?: string[] },
  ) => Promise<void>;
}

export const useTenantStore = create<TenantState>((set) => ({
  loading: false,
  error: null,
  members: [],
  tenantUsers: [],
  meta: null,

  inviteLoading: false,
  inviteError: null,
  inviteSuccess: null,

  roleLoading: false,
  roleError: null,
  roleSuccess: null,
  createdRole: null,

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

  createTenantRole: async (payload) => {
    set({
      roleLoading: true,
      roleError: null,
      roleSuccess: null,
      createdRole: null,
    });
    try {
      const res = await tenantServices.createTenantRoles(payload);
      set({
        createdRole: res.data,
        roleSuccess: res.message,
        roleLoading: false,
      });
    } catch (err: any) {
      set({
        roleError: err.message || "Failed to create role",
        roleLoading: false,
      });
    }
  },
  updateTenantRole: async (roleId, payload) => {
    set({ roleLoading: true, roleError: null, roleSuccess: null });
    try {
      const res = await tenantServices.updateTenantRole(roleId, payload);
      set({
        createdRole: res.data,
        roleSuccess: res.message || "Role updated successfully",
        roleLoading: false,
      });
    } catch (err: any) {
      set({
        roleError: err.message || "Failed to update role",
        roleLoading: false,
      });
    }
  },
}));
