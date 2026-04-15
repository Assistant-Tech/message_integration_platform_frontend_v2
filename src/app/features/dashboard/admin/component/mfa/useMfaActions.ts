import { useRef, useCallback } from "react";
import { toast } from "sonner";
import { useMfaStore } from "@/app/store/mfa.store";
import {
  useMfaStatus,
  useRequestMfa,
  useDisableMfa,
  useRegenerateBackupCodes,
} from "@/app/hooks/query/useMfaQuery";

/**
 * Encapsulates all MFA server + UI actions.
 * Single Responsibility: orchestrate mutations and UI state transitions.
 */
export const useMfaActions = () => {
  const { data: statusData, isLoading: statusLoading } = useMfaStatus();
  const requestMfaMutation = useRequestMfa();
  const disableMfaMutation = useDisableMfa();
  const regenerateMutation = useRegenerateBackupCodes();

  const enabled = statusData?.data?.enabled ?? false;
  const mfaData = requestMfaMutation.data?.data ?? null;
  const requestError = requestMfaMutation.error;

  const {
    setupModalOpen,
    confirmDisableOpen,
    recoveryCodesOpen,
    displayedRecoveryCodes,
    disablePassword,
    openSetupModal,
    closeSetupModal,
    openConfirmDisable,
    closeConfirmDisable,
    openRecoveryCodes,
    closeRecoveryCodes,
    setDisablePassword,
  } = useMfaStore();

  // Focus management
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const saveFocus = useCallback(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
  }, []);

  const restoreFocus = useCallback(() => {
    lastFocusedRef.current?.focus();
  }, []);

  const handleSetup = useCallback(() => {
    saveFocus();
    if (!mfaData) requestMfaMutation.mutate();
    openSetupModal();
  }, [mfaData, requestMfaMutation, openSetupModal, saveFocus]);

  const handleDisable = useCallback(() => {
    if (!disablePassword) {
      toast.error("Password is required");
      return;
    }
    disableMfaMutation.mutate(disablePassword, {
      onSuccess: () => {
        closeConfirmDisable();
        restoreFocus();
      },
    });
  }, [disablePassword, disableMfaMutation, closeConfirmDisable, restoreFocus]);

  const handleRegenerate = useCallback(() => {
    regenerateMutation.mutate(undefined, {
      onSuccess: (res) => {
        if (res?.data?.recoveryPhrases) {
          openRecoveryCodes(res.data.recoveryPhrases);
        }
      },
    });
  }, [regenerateMutation, openRecoveryCodes]);

  const handleDownloadCodes = useCallback((codes: string[]) => {
    if (!codes.length) return;
    const blob = new Blob([codes.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recovery-codes.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Recovery codes downloaded");
  }, []);

  return {
    // Server state
    enabled,
    statusLoading,
    mfaData,
    requestError,
    requestIsPending: requestMfaMutation.isPending,
    disableIsPending: disableMfaMutation.isPending,
    regenerateIsPending: regenerateMutation.isPending,

    // UI state
    setupModalOpen,
    confirmDisableOpen,
    recoveryCodesOpen,
    displayedRecoveryCodes,
    disablePassword,

    // UI actions
    openConfirmDisable,
    closeConfirmDisable,
    closeSetupModal,
    closeRecoveryCodes,
    setDisablePassword,
    openRecoveryCodes,

    // Handlers
    saveFocus,
    restoreFocus,
    handleSetup,
    handleDisable,
    handleRegenerate,
    handleDownloadCodes,
  };
};
