import api from "@/app/services/api/axios";
import {
  MfaDisableResponse,
  MfaEnrollResponse,
  MfaVerifyResponse,
} from "@/app/types/mfa.types";
import { handleApiError } from "../utils/handlerApiError";

export const MfaServices = {
  // Regenerate mfa backup codes
  async regenerateBackupCodes() {
    try {
      const res = await api.post("/mfa/recovery/regenerate");
      return res.data;
    } catch (error) {
      throw handleApiError(error);  
    }
  },

  //get the status of mfa enable and details or not!
  async getStatus() {
    const res = await api.get("/mfa/status");
    return res.data;
  },

  // request QR + secret
  async requestMFA(): Promise<MfaEnrollResponse> {
    const res = await api.get("/mfa/request");
    return res.data;
  },

  // verify code from authenticator
  async verifyMFA(token: string): Promise<MfaVerifyResponse> {
    const res = await api.post("/mfa/enroll/verify", { token });
    return res.data;
  },

  // disable MFA
  async disableMFA(): Promise<MfaDisableResponse> {
    const res = await api.delete("/mfa/disable", {
      data: { password: "Pa$$w0rd!" },
    });
    return res.data;
  },
};
