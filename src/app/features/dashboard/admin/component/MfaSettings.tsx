import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, MessageSquare, Shield, Smartphone } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/app/components/ui";
import { RadioButton, Switch } from "./ui";
import { useMfaStore } from "@/app/store/mfa.store";
import MfaVerifySection from "./mfa/MfaVerifySection";
import RecoveryCodesModal from "./mfa/RecoveryCodesModal";
import { toast } from "sonner";
import { formatSecret } from "@/app/utils/helper";

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
  const [confirmDisableOpen, setConfirmDisableOpen] = useState(false); // 👈 confirmation dialog state

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handleCopy = () => {
    if (mfaData?.secret) {
      navigator.clipboard.writeText(mfaData.secret).then(() => {
        toast.success("Secret copied to clipboard ✅");
        setIsCopying(true);
        setTimeout(() => setIsCopying(false), 2000);
      });
    }
  };

  const handleDisable = async () => {
    const res = await disableMfa();
    if (res) {
      toast.success(res.message);
      fetchStatus();
      setEditingSection(null);
    } else {
      toast.error("Cannot disable currently!!");
    }
  };

  const toggleAuthMethod = (
    selectedMethod: "sms" | "email" | "authenticator",
  ) => {
    if (selectedMethod === "authenticator") {
      if (!mfaData) requestMfa();
      setModalOpen(true);
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
                      setConfirmDisableOpen(true); // 👈 ask confirmation first
                    } else {
                      setEditingSection(1);
                    }
                  }}
                  disabled={editingSection !== null && editingSection !== 1}
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
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <RadioButton
                      selected={method === "sms"}
                      onChange={() => toggleAuthMethod("sms")}
                      disabled={enabled}
                    />
                    <MessageSquare size={16} className="text-grey-medium" />
                    <span className="text-sm text-grey">SMS Code</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioButton
                      selected={method === "email"}
                      onChange={() => toggleAuthMethod("email")}
                      disabled={enabled}
                    />
                    <Shield size={16} className="text-grey-medium" />
                    <span className="text-sm text-grey">Email Code</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioButton
                      selected={method === "authenticator"}
                      onChange={() => toggleAuthMethod("authenticator")}
                      disabled={enabled && method !== "authenticator"}
                    />
                    <Smartphone size={16} className="text-grey-medium" />
                    <span className="text-sm text-grey">Authenticator App</span>
                  </div>
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
                    onClick={() => setConfirmDisableOpen(true)} // 👈 confirm here too
                  />
                )}
                <Button
                  label="Cancel"
                  variant="none"
                  className="bg-black text-white px-8 py-3"
                  onClick={() => setEditingSection(null)}
                />
                <Button
                  label="Save Changes"
                  variant="primary"
                  onClick={() => setEditingSection(null)}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* MFA setup dialog */}
      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
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
            >
              <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 relative">
                <Dialog.Title className="h5-bold-16 text-grey">
                  Multi-Factor Authentication Setup
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    aria-label="Close"
                    className="absolute top-4 right-4 text-grey-medium hover:text-grey"
                  >
                    ✕
                  </button>
                </Dialog.Close>

                {mfaData ? (
                  <div className="flex flex-col items-start mt-6">
                    {/* Step 1 */}
                    <article className="pb-4">
                      <h1 className="body-bold-16 text-base-black mb-2 text-start">
                        Step 1: Get an Authenticator
                      </h1>
                      <p className="body-medium-16 text-grey">
                        Download Google Authenticator, Microsoft Authenticator
                        or Authy.
                      </p>
                    </article>

                    {/* Step 2 */}
                    <article className="pb-px">
                      <h1 className="body-bold-16 text-base-black mb-2 text-start">
                        Step 2: Scan the QR Code
                      </h1>
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
                          className={`mt-4 ${
                            isCopying ? "bg-primary text-white px-4" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* Step 3 */}
                    <article className="pb-4 w-full">
                      <h1 className="body-bold-16 text-base-black mb-2 text-start">
                        Step 3: Enter the Verification Code
                      </h1>
                      <p className="body-medium-16 text-grey mb-4">
                        Enter the 6-digit code generated by your authenticator
                        app.
                      </p>
                      <MfaVerifySection
                        onSuccess={() => {
                          fetchStatus();
                          setModalOpen(false);
                          setShowRecoveryCodes(true);
                        }}
                        onCancel={() => setModalOpen(false)}
                      />
                    </article>
                  </div>
                ) : (
                  error && (
                    <p className="body-medium-16 text-danger my-12 text-center">
                      {error}
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
        onOpenChange={setConfirmDisableOpen}
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
            >
              <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
                <Dialog.Title className="h5-bold-16 text-grey">
                  Disable MFA
                </Dialog.Title>
                <p className="body-medium-16 text-grey mt-4">
                  Are you sure you want to disable Multi-Factor Authentication
                  on your account?
                </p>
                <div className="flex justify-end gap-3 mt-6 w-full">
                  <Button
                    label="Cancel"
                    variant="danger"
                    onClick={() => setConfirmDisableOpen(false)}
                    className="w-full"
                  />
                  <Button
                    label="Yes, Disable"
                    variant="primary"
                    onClick={async () => {
                      await handleDisable();
                      setConfirmDisableOpen(false);
                    }}
                    className="w-full"
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
          }}
        />
      )}
    </>
  );
};

export default MfaSettings;
