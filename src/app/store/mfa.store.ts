import { create } from "zustand";

/**
 * MFA UI Store
 *
 * Holds only client-side UI state for the MFA settings flow.
 * All server state (enabled, method, recovery codes) is managed
 * by React Query via useMfaQuery hooks.
 */

interface MfaUiState {
  /** Setup modal open */
  setupModalOpen: boolean;
  /** Disable-confirmation modal open */
  confirmDisableOpen: boolean;
  /** Recovery codes modal open */
  recoveryCodesOpen: boolean;
  /** Temporarily displayed recovery codes (from verify or regenerate) */
  displayedRecoveryCodes: string[];
  /** Password input for disable confirmation */
  disablePassword: string;

  // Actions
  openSetupModal: () => void;
  closeSetupModal: () => void;
  openConfirmDisable: () => void;
  closeConfirmDisable: () => void;
  openRecoveryCodes: (codes: string[]) => void;
  closeRecoveryCodes: () => void;
  setDisablePassword: (password: string) => void;
  reset: () => void;
}

const initialState = {
  setupModalOpen: false,
  confirmDisableOpen: false,
  recoveryCodesOpen: false,
  displayedRecoveryCodes: [] as string[],
  disablePassword: "",
};

export const useMfaStore = create<MfaUiState>((set) => ({
  ...initialState,

  openSetupModal: () => set({ setupModalOpen: true }),
  closeSetupModal: () => set({ setupModalOpen: false }),

  openConfirmDisable: () => set({ confirmDisableOpen: true }),
  closeConfirmDisable: () =>
    set({ confirmDisableOpen: false, disablePassword: "" }),

  openRecoveryCodes: (codes) =>
    set({ recoveryCodesOpen: true, displayedRecoveryCodes: codes }),
  closeRecoveryCodes: () =>
    set({ recoveryCodesOpen: false, displayedRecoveryCodes: [] }),

  setDisablePassword: (password) => set({ disablePassword: password }),

  reset: () => set(initialState),
}));
