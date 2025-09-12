import {
  CreateTenantRolePayload,
  InviteMemberPayload,
  InviteMemberResponse,
  LoginActivityResponse,
  TenantCreateResponse,
  TenantUserResponse,
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
   * Create tenant roles.
   */
  async createTenantRoles(
    payload: CreateTenantRolePayload,
  ): Promise<TenantCreateResponse> {
    const res = await api.post<TenantCreateResponse>("/tenant/roles", payload);
    return res.data;
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
};
