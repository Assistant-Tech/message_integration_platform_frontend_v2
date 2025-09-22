import { create } from "zustand";
import { MfaServices } from "@/app/services/mfa.services";
import {
  MfaData,
  MfaDisableResponse,
  MfaVerifyResponse,
} from "@/app/types/mfa.types";

interface MfaState {
  mfaData: MfaData | null;
  recoveryPhrases: string[];
  enabled: boolean;
  method: "sms" | "email" | "authenticator" | null;
  loading: boolean;
  error: string | null;

  setMfaData: (data: MfaData) => void;
  clearMfaData: () => void;

  fetchStatus: () => Promise<void>;
  requestMfa: () => Promise<void>;
  verifyMfa: (token: string) => Promise<MfaVerifyResponse | null>;
  disableMfa: () => Promise<MfaDisableResponse | null>;
}

export const useMfaStore = create<MfaState>((set) => ({
  mfaData: null,
  recoveryPhrases: [],
  enabled: false,
  method: null,
  loading: false,
  error: null,

  setMfaData: (data) => set({ mfaData: data }),
  clearMfaData: () =>
    set({ mfaData: null, recoveryPhrases: [], enabled: false, method: null }),

  fetchStatus: async () => {
    set({ loading: true, error: null });
    try {
      const res = await MfaServices.getStatus();
      set({
        enabled: res.data.enabled,
        method: res.data.method || "authenticator",
        loading: false,
      });
    } catch (err) {
      set({ error: "Failed to fetch MFA status", loading: false });
    }
  },

  requestMfa: async () => {
    set({ loading: true, error: null });
    try {
      const response = await MfaServices.requestMFA();
      if (response.success && response.data) {
        set({ mfaData: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (error) {
      console.error("🚀 ~ requestMfa error:", error);
      set({ error: "Failed to request MFA", mfaData: null, loading: false });
    }
  },

  verifyMfa: async (token: string) => {
    set({ loading: true, error: null });
    try {
      const response = await MfaServices.verifyMFA(token);
      if (response.success) {
        set({
          recoveryPhrases: response.data.recoveryPhrases,
          enabled: response.data.enabled,
          method: "authenticator",
          mfaData: null,
          loading: false,
        });
        return response;
      } else {
        set({ error: response.message, loading: false });
        return null;
      }
    } catch (error) {
      set({ error: "Failed to verify MFA", loading: false });
      return null;
    }
  },

  disableMfa: async () => {
    set({ loading: true, error: null });
    try {
      const response = await MfaServices.disableMFA();
      if (response.success) {
        set({
          enabled: false,
          method: null,
          mfaData: null,
          recoveryPhrases: [],
          loading: false,
        });
        return response;
      }
      set({ error: response.message, loading: false });
      return null;
    } catch (error) {
      console.error("🚀 ~ disableMfa error:", error);
      set({ error: "Failed to disable MFA", loading: false });
      return null;
    }
  },
}));
