import {
  InviteMemberPayload,
  InviteMemberResponse,
  LoginActivityResponse,
} from "@/app/types/tenant.types";
import api from "@/app/services/api/axios";

export const tenantServices = {
  async getLoginActivity(page = 1, limit = 10): Promise<LoginActivityResponse> {
    const res = await api.get(
      `/tenant/members/login-activity?page=${page}&limit=${limit}`,
    );
    return res.data;
  },

  async inviteMember(
    payload: InviteMemberPayload,
  ): Promise<InviteMemberResponse> {
    const res = await api.post<InviteMemberResponse>(
      "/tenant/invite-member",
      payload,
    );
    return res.data;
  },
};
