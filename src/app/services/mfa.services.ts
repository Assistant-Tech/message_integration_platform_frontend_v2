import api from "@/app/services/api/axios";
import type {
  MfaDisableResponse,
  MfaEnrollResponse,
  MfaStatusResponse,
  MfaVerifyResponse,
  ResponseRegeneration,
} from "@/app/types/mfa.types";
import { handleApiError } from "../utils/handlerApiError";

export const MfaServices = {
  async regenerateBackupCodes(): Promise<ResponseRegeneration> {
    try {
      const res = await api.post("/mfa/recovery/regenerate");
      return res.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getStatus(): Promise<MfaStatusResponse> {
    try {
      const res = await api.get("/mfa/status");
      return res.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async requestMFA(): Promise<MfaEnrollResponse> {
    try {
      const res = await api.get("/mfa/request");
      return res.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async verifyMFA(token: string): Promise<MfaVerifyResponse> {
    try {
      const res = await api.post("/mfa/enroll/verify", { token });
      return res.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async disableMFA(password: string): Promise<MfaDisableResponse> {
    try {
      const res = await api.delete("/mfa/disable", { data: { password } });
      return res.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
