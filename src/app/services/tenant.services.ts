import { LoginActivityResponse } from "@/app/types/tenant.types";
import api from "@/app/services/api/axios";

export const tenantServices = {
  async getLoginActivity(page = 1, limit = 10): Promise<LoginActivityResponse> {
    const res = await api.get(`/tenant/members/login-activity?page=${page}&limit=${limit}`);
    return res.data;
  },
};
