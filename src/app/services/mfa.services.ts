import api from "@/app/services/api/axios";
import {
  MfaDisableResponse,
  MfaEnrollResponse,
  MfaVerifyResponse,
} from "@/app/types/mfa.types";

export const MfaServices = {
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
    const res = await api.delete("/mfa/disable");
    return res.data;
  },
};
