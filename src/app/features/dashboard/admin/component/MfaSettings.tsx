import { AnimatePresence } from "framer-motion";
import {
  MfaStatusCard,
  MfaSetupDialog,
  MfaDisableDialog,
  MfaRecoveryCard,
  RecoveryCodesModal,
  useMfaActions,
} from "./mfa";

/**
 * MfaSettings — thin orchestrator.
 *
 * Each visual section is a focused component:
 *   MfaStatusCard   — toggle + setup CTA / active badge
 *   MfaSetupDialog  — QR code + OTP verification
 *   MfaDisableDialog — password confirmation
 *   MfaRecoveryCard — regenerate + download codes
 *
 * All logic lives in useMfaActions (hook).
 */
const MfaSettings = () => {
  const mfa = useMfaActions();

  if (mfa.statusLoading) {
    return (
      <div className="w-full max-w-5xl animate-pulse space-y-4">
        <div className="h-48 rounded-xl bg-grey-light" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-5xl space-y-5">
        <MfaStatusCard
          enabled={mfa.enabled}
          onSetup={mfa.handleSetup}
          onDisable={() => {
            mfa.saveFocus();
            mfa.openConfirmDisable();
          }}
        />

        <AnimatePresence>
          {mfa.enabled && (
            <MfaRecoveryCard
              onRegenerate={mfa.handleRegenerate}
              onDownload={() =>
                mfa.handleDownloadCodes(mfa.displayedRecoveryCodes)
              }
              regenerateIsPending={mfa.regenerateIsPending}
              hasDownloadableCodes={mfa.displayedRecoveryCodes.length > 0}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Screen reader live region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {mfa.requestError instanceof Error ? mfa.requestError.message : ""}
      </div>

      <MfaSetupDialog
        open={mfa.setupModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            mfa.closeSetupModal();
            mfa.restoreFocus();
          }
        }}
        mfaData={mfa.mfaData}
        isPending={mfa.requestIsPending}
        error={mfa.requestError}
        onVerifySuccess={(codes) => {
          mfa.closeSetupModal();
          mfa.openRecoveryCodes(codes);
          mfa.restoreFocus();
        }}
        onCancel={() => {
          mfa.closeSetupModal();
          mfa.restoreFocus();
        }}
      />

      <MfaDisableDialog
        open={mfa.confirmDisableOpen}
        onOpenChange={(open) => {
          if (!open) {
            mfa.closeConfirmDisable();
            mfa.restoreFocus();
          }
        }}
        password={mfa.disablePassword}
        onPasswordChange={mfa.setDisablePassword}
        onConfirm={mfa.handleDisable}
        onCancel={() => {
          mfa.closeConfirmDisable();
          mfa.restoreFocus();
        }}
        isPending={mfa.disableIsPending}
      />

      {mfa.recoveryCodesOpen && mfa.displayedRecoveryCodes.length > 0 && (
        <RecoveryCodesModal
          codes={mfa.displayedRecoveryCodes}
          onClose={mfa.closeRecoveryCodes}
        />
      )}
    </>
  );
};

export default MfaSettings;
