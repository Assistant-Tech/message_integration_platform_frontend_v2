/**
 * Tenant store barrel file.
 *
 * The monolithic store has been split into three focused stores:
 *   - useTenantRolesStore   (role management)        -- this file
 *   - useTenantMembersStore (members, invites)        -- ./tenant-members.store
 *   - useTenantDetailsStore (tenant details, updates) -- ./tenant-details.store
 *
 * useTenantStore is kept for backwards compatibility. New code should import
 * from the focused store that matches the concern.
 */

import { create } from "zustand";
import {
  InviteMemberPayload,
  LoginActivityMeta,
  MemberLoginActivity,
  CreateTenantRolePayload,
  TenantRole,
  TenantDetailsResponse,
} from "@/app/types/tenant.types";
import { tenantServices } from "@/app/services/tenant.services";

// Re-export focused stores
export { useTenantMembersStore } from "./tenant-members.store";
export { useTenantDetailsStore } from "./tenant-details.store";

/* ─── Role Management Store (focused) ───────────────────────────────────── */

interface TenantRolesState {
  roles: TenantRole[];
  roleLoading: boolean;
  roleError: string | null;
  roleSuccess: string | null;
  createdRole: TenantRole | null;

  fetchTenantRoles: () => Promise<void>;
  createTenantRole: (payload: CreateTenantRolePayload) => Promise<void>;
  updateTenantRole: (
    roleId: string | number,
    payload: { addPermissions?: string[]; removePermissions?: string[] },
  ) => Promise<void>;
  assignRole: (userId: string, roleId: string) => Promise<void>;
}

export const useTenantRolesStore = create<TenantRolesState>((set) => ({
  roles: [],
  roleLoading: false,
  roleError: null,
  roleSuccess: null,
  createdRole: null,

  fetchTenantRoles: async () => {
    set({ roleLoading: true, roleError: null, roleSuccess: null });
    try {
      const res = await tenantServices.getTenantRoles();
      set({
        roles: res.data,
        roleSuccess: res.message || "Roles fetched successfully",
        roleLoading: false,
      });
    } catch (err: any) {
      set({
        roleError: err.message || "Failed to fetch roles",
        roleLoading: false,
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
      set((state) => ({
        createdRole: res.data,
        roles: [...state.roles, res.data],
        roleSuccess: res.message || "Role successfully created",
        roleLoading: false,
      }));
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
      set((state) => ({
        roles: state.roles.map((r) => (r.id === roleId ? res.data : r)),
        createdRole: res.data,
        roleSuccess: res.message || "Role updated successfully",
        roleLoading: false,
      }));
    } catch (err: any) {
      set({
        roleError: err.message || "Failed to update role",
        roleLoading: false,
      });
    }
  },

  assignRole: async (userId, roleId) => {
    set({ roleLoading: true, roleError: null, roleSuccess: null });
    try {
      const res = await tenantServices.assignRole(userId, { roleId });
      set({
        roleSuccess: res.message || "Role assigned successfully",
        roleLoading: false,
      });
    } catch (err: any) {
      set({
        roleError: err.message || "Failed to assign role",
        roleLoading: false,
      });
    }
  },
}));

/* ─── Legacy Combined Store (backwards compatibility) ───────────────────── */

/**
 * @deprecated Use useTenantRolesStore, useTenantMembersStore, or useTenantDetailsStore directly.
 */
interface TenantState {
  roles: TenantRole[];
  loading: boolean;
  error: string | null;
  members: MemberLoginActivity[];
  tenantUsers: any[];
  meta: LoginActivityMeta | null;

  tenantDetails: TenantDetailsResponse["data"] | null;

  inviteLoading: boolean;
  inviteError: string | null;
  inviteSuccess: string | null;
  inviteMember: (payload: InviteMemberPayload) => Promise<void>;

  fetchTenantUsers: () => Promise<void>;
  fetchTenantRoles: () => Promise<void>;
  fetchLoginActivity: (page?: number, limit?: number) => Promise<void>;

  roleLoading: boolean;
  roleError: string | null;
  roleSuccess: string | null;
  createdRole: TenantRole | null;
  createTenantRole: (payload: CreateTenantRolePayload) => Promise<void>;
  updateTenantRole: (
    roleId: string | number,
    payload: { addPermissions?: string[]; removePermissions?: string[] },
  ) => Promise<void>;
  assignRole: (userId: string, roleId: string) => Promise<void>;

  updateLoading: boolean;
  getTenantDetails: () => Promise<void>;
  updateTenantDetails: (
    payload: Partial<TenantDetailsResponse["data"]>,
  ) => Promise<void>;
}

export const useTenantStore = create<TenantState>((set) => ({
  roles: [],
  loading: false,
  error: null,
  members: [],
  tenantUsers: [],
  meta: null,
  tenantDetails: null,

  inviteLoading: false,
  inviteError: null,
  inviteSuccess: null,

  roleLoading: false,
  roleError: null,
  roleSuccess: null,
  createdRole: null,

  updateLoading: false,

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

  fetchTenantRoles: async () => {
    set({ roleLoading: true, roleError: null, roleSuccess: null });
    try {
      const res = await tenantServices.getTenantRoles();
      set({
        roles: res.data,
        roleSuccess: res.message || "Roles fetched successfully",
        roleLoading: false,
      });
    } catch (err: any) {
      set({
        roleError: err.message || "Failed to fetch roles",
        roleLoading: false,
      });
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
      set((state) => ({
        createdRole: res.data,
        roles: [...state.roles, res.data],
        roleSuccess: res.message || "Role successfully created",
        roleLoading: false,
      }));
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
      set((state) => ({
        roles: state.roles.map((r) => (r.id === roleId ? res.data : r)),
        createdRole: res.data,
        roleSuccess: res.message || "Role updated successfully",
        roleLoading: false,
      }));
    } catch (err: any) {
      set({
        roleError: err.message || "Failed to update role",
        roleLoading: false,
      });
    }
  },

  assignRole: async (userId, roleId) => {
    set({ roleLoading: true, roleError: null, roleSuccess: null });
    try {
      const res = await tenantServices.assignRole(userId, { roleId });
      set({
        roleSuccess: res.message || "Role assigned successfully",
        roleLoading: false,
      });
    } catch (err: any) {
      set({
        roleError: err.message || "Failed to assign role",
        roleLoading: false,
      });
    }
  },

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
