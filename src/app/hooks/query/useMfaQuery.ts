import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MfaServices } from "@/app/services/mfa.services";
// import { useMfaStore } from "@/app/store/mfa.store";
import { toast } from "sonner";
import type {
  MfaVerifyResponse,
  ResponseRegeneration,
} from "@/app/types/mfa.types";

const MFA_QUERY_KEYS = {
  all: ["mfa"],
  status: ["mfa", "status"],
} as const;

/**
 * Fetch MFA status (enabled/disabled, current method)
 * Cached for 5 minutes
 */
export const useMfaStatus = () => {
  return useQuery({
    queryKey: MFA_QUERY_KEYS.status,
    queryFn: () => MfaServices.getStatus(),
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

/**
 * Request MFA setup (generates QR code, SMS secret, etc.)
 */
export const useRequestMfa = () => {
  return useMutation({
    mutationFn: () => MfaServices.requestMFA(),
    onSuccess: (data) => {
      toast.success("MFA setup initiated");
      // Don't cache the setup data - it's temporary
      return data;
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to request MFA setup");
    },
  });
};

/**
 * Verify MFA token and enable MFA
 */
export const useVerifyMfa = () => {
  const queryClient = useQueryClient();
  // const mfaStore = useMfaStore();

  return useMutation({
    mutationFn: (token: string) => MfaServices.verifyMFA(token),
    onSuccess: (response: MfaVerifyResponse) => {
      // Store recovery codes in modal state (temporary display)
      if (response.data?.recoveryPhrases) {
        // mfaStore.setDisplayRecoveryCodes(response.data.recoveryPhrases);
      }

      // Invalidate MFA status to reflect new state
      queryClient.invalidateQueries({ queryKey: MFA_QUERY_KEYS.status });

      toast.success("MFA verified successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "MFA verification failed");
    },
  });
};

/**
 * Regenerate backup/recovery codes
 */
export const useRegenerateBackupCodes = () => {
  return useMutation({
    mutationFn: () => MfaServices.regenerateBackupCodes(),
    onSuccess: (response: ResponseRegeneration) => {
      if (response.data?.recoveryPhrases) {
        // const mfaStore = useMfaStore();
        // mfaStore.setDisplayRecoveryCodes(response.data.recoveryPhrases);
      }
      toast.success("Recovery codes regenerated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to regenerate codes");
    },
  });
};

/**
 * Disable MFA
 */
export const useDisableMfa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (password: string) => MfaServices.disableMFA(password),
    onSuccess: () => {
      // Invalidate MFA status
      queryClient.invalidateQueries({ queryKey: MFA_QUERY_KEYS.status });
      toast.success("MFA disabled successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to disable MFA");
    },
  });
};
