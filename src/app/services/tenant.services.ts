import {
  CreateTenantRolePayload,
  InviteMemberPayload,
  InviteMemberResponse,
  LoginActivityResponse,
  TenantCreateResponse,
  TenantUserResponse,
  TenantDetailsResponse,
  TenantDetails,
} from "@/app/types/tenant.types";
import api from "@/app/services/api/axios";

export const tenantServices = {
  /**
   * Get Login Activity.
   */
  async getLoginActivity(page = 1, limit = 10): Promise<LoginActivityResponse> {
    const res = await api.get(
      `/tenant/members/login-activity?page=${page}&limit=${limit}`,
    );
    return res.data;
  },

  /**
   * Invite Member.
   */
  async inviteMember(
    payload: InviteMemberPayload,
  ): Promise<InviteMemberResponse> {
    const res = await api.post<InviteMemberResponse>(
      "/tenant/invite-member",
      payload,
    );
    return res.data;
  },

  /**
   * Get Tenant Users.
   */
  async getTenantUsers(): Promise<TenantUserResponse> {
    const res = await api.get("/tenant/tenant-users");
    return res.data;
  },

  /**
   * Get Tenant Roles.
   */
  async getTenantRoles(): Promise<any> {
    const res = await api.get("/tenant/roles");
    return res.data;
  },

  /**
   * Create tenant role.
   */
  // tenant.services.ts
  async createTenantRoles(
    payload: CreateTenantRolePayload,
  ): Promise<TenantCreateResponse> {
    const res = await api.post<TenantCreateResponse>("/tenant/roles", payload);
    return res.data; // correct
  },
  /**
   * Update tenant role (add/remove permissions).
   */
  async updateTenantRole(
    roleId: string | number,
    payload: { addPermissions?: string[]; removePermissions?: string[] },
  ): Promise<TenantCreateResponse> {
    const res = await api.put<TenantCreateResponse>(
      `/tenant/roles/${roleId}`,
      payload,
    );
    return res.data;
  },

  /**
   * Assign tenant role.
   */
  async assignRole(userId: string, payload: { roleId: string }) {
    const res = await api.patch(`/tenant/${userId}/assign-role`, payload);
    return res.data;
  },

  /**
   * Get tenant details.
   */
  async getTenantDetails(): Promise<TenantDetailsResponse> {
    const res = await api.get("/tenant/details");
    return res.data;
  },

  /**
   * Update tenant details.
   */
  async updateTenantDetails(
    payload: Partial<TenantDetails>,
  ): Promise<TenantDetailsResponse> {
    const res = await api.patch<TenantDetailsResponse>(
      "/tenant/details",
      payload,
    );
    return res.data;
  },
};
