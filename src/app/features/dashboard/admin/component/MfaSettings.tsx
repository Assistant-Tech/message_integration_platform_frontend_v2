import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, MessageSquare, Shield, Smartphone } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button, Input } from "@/app/components/ui";
import { Switch } from "./ui";
import { useMfaStore } from "@/app/store/mfa.store";
import MfaVerifySection from "./mfa/MfaVerifySection";
import RecoveryCodesModal from "./mfa/RecoveryCodesModal";
import { toast } from "sonner";
import { formatSecret } from "@/app/utils/helper";
import { mapMfaErrorMessage } from "@/app/utils/mfaerrors";
import RecoveryPhrasesModal from "./mfa/RecoveryCodesModal";

const MfaSettings: React.FC = () => {
  const {
    error,
    mfaData,
    enabled,
    method,
    requestMfa,
    disableMfa,
    fetchStatus,
  } = useMfaStore();

  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false);
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [isCopying, setIsCopying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDisableOpen, setConfirmDisableOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  // Refs for focus management
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const methodOptionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // save last focused element before opening modal, and restore focus after close
  useEffect(() => {
    if (modalOpen || confirmDisableOpen) {
      lastFocusedElementRef.current =
        document.activeElement as HTMLElement | null;
    }
  }, [modalOpen, confirmDisableOpen]);

  const restoreFocus = useCallback(() => {
    try {
      lastFocusedElementRef.current?.focus();
    } catch (e) {
      // no-op
    }
  }, []);

  // copy secret with accessible feedback
  const handleCopy = async () => {
    if (mfaData?.secret) {
      try {
        await navigator.clipboard.writeText(mfaData.secret);
        toast.success("Secret copied to clipboard ✅");
        setIsCopying(true);
        setTimeout(() => setIsCopying(false), 2000);
      } catch (err) {
        toast.error("Copy failed");
      }
    }
  };

  // toggle method programmatically — keeps state in store
  const toggleAuthMethod = (
    selectedMethod: "sms" | "email" | "authenticator",
  ) => {
    if (selectedMethod === "authenticator") {
      if (!mfaData) requestMfa();
      setModalOpen(true);
    } else {
      // If the store exposes a setter for method, call it here. We assume toggleAuthMethod will cause
      // the store's method to change via some action — if not, adapt as needed.
      // For keyboard navigation we still call this to trigger any side-effects.
      // setMethod?.(selectedMethod) // <-- uncomment if available
    }
  };

  // Accessible keyboard navigation for the method list
  const handleMethodKeyDown = (e: React.KeyboardEvent, index: number) => {
    const options = ["sms", "email", "authenticator"]; // order must match rendered buttons
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = (index + 1) % options.length;
      methodOptionRefs.current[next]?.focus();
      // call the action if desired (we don't auto-select on arrow to match typical radio behaviour)
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (index - 1 + options.length) % options.length;
      methodOptionRefs.current[prev]?.focus();
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const selected = options[index] as "sms" | "email" | "authenticator";
      toggleAuthMethod(selected);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key="mfa-content"
          className="w-5xl space-y-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-white rounded-lg border border-grey-light overflow-hidden"
            layout
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border rounded-t-lg border-grey-light bg-base-white">
              <h3 className="body-bold-16 text-grey">
                Multifactor Authentication
              </h3>
              {editingSection !== 1 && (
                <Button
                  label="Edit"
                  variant="none"
                  onClick={() => setEditingSection(1)}
                  IconLeft={<Edit size={16} />}
                  disabled={editingSection !== null}
                  aria-label="Edit multi-factor authentication settings"
                />
              )}
            </div>

            {/* Switch */}
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="body-bold-16 text-grey-medium">
                  Turn on multi-factor authentication
                </span>
                <Switch
                  enabled={enabled}
                  onChange={() => {
                    if (enabled) {
                      setConfirmDisableOpen(true);
                    } else {
                      setEditingSection(1);
                    }
                  }}
                  disabled={editingSection !== null && editingSection !== 1}
                  aria-label={
                    enabled
                      ? "Disable multi-factor authentication"
                      : "Enable multi-factor authentication"
                  }
                />
              </div>
              <p className="body-regular-16 text-grey-medium">
                By turning on multi-factor authentication, you will enable a
                two-step login process.
              </p>
            </div>

            {/* Auth methods */}
            {(enabled || editingSection === 1) && (
              <motion.div
                className="px-6 py-4 border-t border-gray-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-sm font-medium text-grey mb-4">
                  Choose an authentication method:
                </h4>

                <div
                  role="radiogroup"
                  aria-label="Authentication methods"
                  className="space-y-3"
                >
                  {(
                    [
                      { id: "sms", label: "SMS Code", Icon: MessageSquare },
                      { id: "email", label: "Email Code", Icon: Shield },
                      {
                        id: "authenticator",
                        label: "Authenticator App",
                        Icon: Smartphone,
                      },
                    ] as const
                  ).map((opt, idx) => {
                    const isSelected = method === (opt.id as typeof opt.id);
                    const disabledForOption =
                      enabled && opt.id !== "authenticator";

                    return (
                      <div key={opt.id} className="flex items-center gap-3">
                        <button
                          ref={(el: any) =>
                            (methodOptionRefs.current[idx] = el)
                          }
                          role="radio"
                          aria-checked={isSelected}
                          tabIndex={0}
                          aria-disabled={disabledForOption}
                          onKeyDown={(e) => handleMethodKeyDown(e, idx)}
                          onClick={() => {
                            if (!disabledForOption)
                              toggleAuthMethod(opt.id as any);
                          }}
                          className={`flex items-center gap-3 focus:ring-primary focus:ring-2 focus:ring-offset-2 rounded px-2 py-1 ${
                            disabledForOption
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {/* Radio circle */}
                          <span
                            className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? "border-primary bg-primary"
                                : "border-gray-400"
                            }`}
                          >
                            {isSelected && (
                              <span className="h-2 w-2 rounded-full bg-white" />
                            )}
                          </span>

                          {/* Existing icon + label */}
                          <span aria-hidden>
                            <opt.Icon size={16} className="text-grey-medium" />
                          </span>
                          <span className="text-sm text-grey">{opt.label}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Footer buttons */}
            {editingSection === 1 && (
              <div className="w-full flex justify-end gap-3 pt-4 py-4 px-4">
                {enabled && (
                  <Button
                    label="Disable MFA"
                    variant="danger"
                    onClick={() => setConfirmDisableOpen(true)}
                    aria-haspopup="dialog"
                    aria-controls="confirm-disable-dialog"
                  />
                )}
                <Button
                  label="Cancel"
                  variant="none"
                  className="bg-black text-white px-8 py-3"
                  onClick={() => setEditingSection(null)}
                  aria-label="Cancel editing multi-factor authentication settings"
                />
                <Button
                  label="Save Changes"
                  variant="primary"
                  onClick={() => setEditingSection(null)}
                  aria-label="Save changes to multi-factor authentication settings"
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
      {/* Live region for errors and important status (polite) */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {error}
      </div>
      {/* MFA setup dialog */}
      <Dialog.Root
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) restoreFocus();
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay asChild>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </Dialog.Overlay>
          <Dialog.Content asChild>
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              aria-modal="true"
              role="dialog"
            >
              <div
                className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 relative"
                aria-labelledby="mfa-setup-title"
              >
                <Dialog.Title
                  id="mfa-setup-title"
                  className="h5-bold-16 text-grey"
                >
                  Multi-Factor Authentication Setup
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    aria-label="Close multi-factor authentication setup"
                    className="absolute top-4 right-4 text-grey-medium hover:text-grey focus:outline-none focus:ring-2 rounded"
                  >
                    ✕
                  </button>
                </Dialog.Close>

                {mfaData ? (
                  <div className="flex flex-col items-start mt-6">
                    {/* Step 1 */}
                    <article className="pb-4">
                      <h2 className="body-bold-16 text-base-black mb-2 text-start">
                        Step 1: Get an Authenticator
                      </h2>
                      <p className="body-medium-16 text-grey">
                        Download Google Authenticator, Microsoft Authenticator
                        or Authy.
                      </p>
                    </article>

                    {/* Step 2 */}
                    <article className="pb-px">
                      <h2 className="body-bold-16 text-base-black mb-2 text-start">
                        Step 2: Scan the QR Code
                      </h2>
                      <p className="body-medium-16 text-grey">
                        Scan the QR code below with your app or copy the key
                        manually.
                      </p>
                    </article>

                    <div className="w-full flex flex-col md:flex-row justify-between items-center px-8 py-6 md:py-4 gap-6">
                      <figure>
                        <img
                          src={mfaData.qrCodeDataURL}
                          alt="MFA QR Code"
                          className="w-48 h-48 border border-[#5C5C5C] rounded-2xl p-2"
                        />
                      </figure>
                      <div className="flex flex-col items-center">
                        <div className="p-3 mt-2 rounded-lg text-center">
                          <code className="body-semi-bold-16 text-grey whitespace-pre-wrap">
                            {formatSecret(mfaData.secret)
                              .split(" ")
                              .reduce<string[]>((lines, group, i) => {
                                const lineIndex = Math.floor(i / 4);
                                if (!lines[lineIndex]) lines[lineIndex] = group;
                                else lines[lineIndex] += " " + group;
                                return lines;
                              }, [])
                              .join("\n")}
                          </code>
                        </div>
                        <Button
                          label={isCopying ? "Copied!" : "Copy Code"}
                          variant="none"
                          onClick={handleCopy}
                          className={`mt-4 ${isCopying ? "bg-primary text-white px-4" : ""}`}
                          aria-live="polite"
                        />
                      </div>
                    </div>

                    {/* Step 3 */}
                    <article className="pb-4 w-full">
                      <h2 className="body-bold-16 text-base-black mb-2 text-start">
                        Step 3: Enter the Verification Code
                      </h2>
                      <p className="body-medium-16 text-grey mb-4">
                        Enter the 6-digit code generated by your authenticator
                        app.
                      </p>
                      <MfaVerifySection
                        onSuccess={() => {
                          fetchStatus();
                          setModalOpen(false);
                          setShowRecoveryCodes(true);
                          restoreFocus();
                        }}
                        onCancel={() => {
                          setModalOpen(false);
                          restoreFocus();
                        }}
                      />
                    </article>
                  </div>
                ) : (
                  error && (
                    <p
                      className="body-medium-16 text-danger my-12 text-center"
                      role="status"
                    >
                      {mapMfaErrorMessage(error)}
                    </p>
                  )
                )}
              </div>
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {/* Confirmation Dialog for Disable MFA */}
      <Dialog.Root
        open={confirmDisableOpen}
        onOpenChange={(open) => {
          setConfirmDisableOpen(open);
          if (!open) restoreFocus();
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay asChild>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </Dialog.Overlay>
          <Dialog.Content asChild>
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              aria-modal="true"
              role="dialog"
            >
              <div
                id="confirm-disable-dialog"
                className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative"
                aria-labelledby="confirm-disable-title"
              >
                <Dialog.Title
                  id="confirm-disable-title"
                  className="h5-bold-16 text-grey"
                >
                  Disable MFA
                </Dialog.Title>
                <p className="body-medium-16 text-grey mt-4">
                  To disable MFA, please confirm your account password:
                </p>

                {/* Password input */}
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border rounded px-3 py-2 mt-4"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />

                <div className="flex justify-end gap-3 mt-6 w-full">
                  <Button
                    label="Cancel"
                    variant="danger"
                    onClick={() => setConfirmDisableOpen(false)}
                    className="w-full"
                    aria-label="Cancel disabling multi-factor authentication"
                  />
                  <Button
                    label="Yes, Disable"
                    variant="primary"
                    onClick={async () => {
                      if (!passwordInput) {
                        toast.error("Password is required");
                        return;
                      }
                      const res = await disableMfa(passwordInput);
                      if (res) {
                        toast.success(res.message);
                        fetchStatus();
                      } else {
                        toast.error("Failed to disable MFA");
                      }
                      setPasswordInput("");
                      setConfirmDisableOpen(false);
                      restoreFocus();
                    }}
                    className="w-full"
                    aria-label="Confirm disable multi-factor authentication"
                  />
                </div>
              </div>
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {/* Recovery Codes Modal */}
      {showRecoveryCodes && (
        <RecoveryCodesModal
          codes={useMfaStore.getState().recoveryPhrases}
          onClose={() => {
            toast.success("Recovery codes downloaded ✅");
            setShowRecoveryCodes(false);
            restoreFocus();
          }}
        />
      )}

      {/* Recovery Codes Section */}
      {enabled && (
        <motion.div
          className="w-5xl bg-white rounded-lg border border-grey-light mt-6 p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="body-bold-16 text-grey">Recovery Codes</h3>
            <Button
              label="Regenerate"
              variant="primary"
              onClick={async () => {
                const res = await useMfaStore
                  .getState()
                  .regenerateBackupCodes();
                if (res?.success) {
                  toast.success("New recovery codes generated ✅");
                  setShowRecoveryCodes(true);
                } else {
                  toast.error(res?.message || "Failed to regenerate codes");
                }
              }}
            />
          </div>

          <p className="body-regular-16 text-grey mb-4">
            Use these one-time recovery codes if you lose access to your
            authenticator app. Each code can only be used once. You can download
            them below.
          </p>

          <div className="flex justify-end mt-4">
            <Button
              label="Download Codes"
              variant="none"
              onClick={() => {
                const blob = new Blob(
                  [useMfaStore.getState().recoveryPhrases.join("\n")],
                  { type: "text/plain" },
                );
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "recovery-codes.txt";
                a.click();
                URL.revokeObjectURL(url);
                toast.success("Recovery codes downloaded ✅");
              }}
              disabled={useMfaStore.getState().recoveryPhrases.length === 0}
              aria-label="Download recovery codes as a text file"
            />
          </div>
        </motion.div>
      )}
      {showRecoveryCodes && (
        <RecoveryPhrasesModal
          codes={useMfaStore.getState().recoveryPhrases}
          onClose={() => setShowRecoveryCodes(false)}
        />
      )}
    </>
  );
};

export default MfaSettings;
