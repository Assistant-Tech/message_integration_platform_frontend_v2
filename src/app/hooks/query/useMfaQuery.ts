import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MfaServices } from "@/app/services/mfa.services";
import { toast } from "sonner";
import type {
  MfaVerifyResponse,
  ResponseRegeneration,
} from "@/app/types/mfa.types";

export const MFA_QUERY_KEYS = {
  all: ["mfa"] as const,
  status: ["mfa", "status"] as const,
};

/**
 * Fetch MFA status (enabled/disabled, current method).
 * Cached for 5 minutes.
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
 * Request MFA setup — generates QR code + secret.
 */
export const useRequestMfa = () => {
  return useMutation({
    mutationFn: () => MfaServices.requestMFA(),
    onError: (error: any) => {
      toast.error(error?.message || "Failed to request MFA setup");
    },
  });
};

/**
 * Verify MFA token and enable MFA.
 * On success invalidates the status query so the UI reflects the new state.
 */
export const useVerifyMfa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => MfaServices.verifyMFA(token),
    onSuccess: (_response: MfaVerifyResponse) => {
      queryClient.invalidateQueries({ queryKey: MFA_QUERY_KEYS.status });
      toast.success("MFA verified successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "MFA verification failed");
    },
  });
};

/**
 * Regenerate backup/recovery codes.
 */
export const useRegenerateBackupCodes = () => {
  return useMutation({
    mutationFn: () => MfaServices.regenerateBackupCodes(),
    onSuccess: (_response: ResponseRegeneration) => {
      toast.success("Recovery codes regenerated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to regenerate codes");
    },
  });
};

/**
 * Disable MFA with password confirmation.
 * On success invalidates the status query.
 */
export const useDisableMfa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (password: string) => MfaServices.disableMFA(password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MFA_QUERY_KEYS.status });
      toast.success("MFA disabled successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to disable MFA");
    },
  });
};
