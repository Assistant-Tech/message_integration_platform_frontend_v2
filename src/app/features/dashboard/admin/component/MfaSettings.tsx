import React, { useState } from "react";
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
  const { mfaData, enabled, requestMfa, disableMfa } = useMfaStore();

  const [mfaSettings, setMfaSettings] = useState([
    {
      id: 1,
      title: "Multifactor Authentication",
      description:
        "By turning on multi-factor authentication, you will enable a two-step login process.",
      enabled: false,
      hasAuthMethods: true,
      authMethods: { sms: false, email: false, authenticator: false },
    },
  ]);

  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false);
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [isCopying, setIsCopying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  const handleEdit = (id: number) => {
    setEditingSection(id);
  };

  const toggleMFA = (id: number) => {
    setMfaSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  };

  const toggleAuthMethod = (
    id: number,
    method: "sms" | "email" | "authenticator",
  ) => {
    setMfaSettings((prev) => {
      const updatedSettings = prev.map((s) => {
        if (s.id === id) {
          const newAuthMethods = {
            sms: false,
            email: false,
            authenticator: false,
            [method]: true,
          };

          if (method === "authenticator") {
            if (!mfaData) requestMfa();
            setModalOpen(true);
          }

          return { ...s, authMethods: newAuthMethods };
        }
        return s;
      });
      return updatedSettings;
    });
  };

  const handleCopy = () => {
    if (mfaData?.secret) {
      navigator.clipboard.writeText(mfaData.secret).then(() => {
        setIsCopying(true);
        setTimeout(() => setIsCopying(false), 2000);
      });
    }
  };

  const handleDisable = async () => {
    const res = await disableMfa();
    if (res) {
      toast.success(res.message);
    } else {
      toast.error("Cannot disable currently!!");
    }
  };

  // new handler for dialog open/close
  const handleDialogChange = (open: boolean) => {
    setModalOpen(open);
    if (!open && verifiedSuccess) {
      setShowRecoveryCodes(true);
      setVerifiedSuccess(false); // reset
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
          {mfaSettings.map((setting) => (
            <motion.div
              key={setting.id}
              className="bg-white rounded-lg border border-grey-light overflow-hidden"
              layout
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between px-6 py-4 border rounded-t-lg border-grey-light bg-base-white">
                <h3 className="body-bold-16 text-grey">{setting.title}</h3>
                {editingSection !== setting.id && (
                  <Button
                    label="Edit"
                    variant="none"
                    onClick={() => handleEdit(setting.id)}
                    IconLeft={<Edit size={16} />}
                    disabled={editingSection !== null}
                  />
                )}
              </div>

              <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="body-bold-16 text-grey-medium">
                    Turn on multi-factor authentication
                  </span>
                  <Switch
                    enabled={setting.enabled}
                    onChange={() => toggleMFA(setting.id)}
                    disabled={
                      editingSection !== null && editingSection !== setting.id
                    }
                  />
                </div>
                <p className="body-regular-16 text-grey-medium">
                  {setting.description}
                </p>
              </div>

              {(setting.enabled || editingSection === setting.id) &&
                setting.hasAuthMethods && (
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
                          selected={setting.authMethods.sms}
                          onChange={() => toggleAuthMethod(setting.id, "sms")}
                        />
                        <MessageSquare size={16} className="text-grey-medium" />
                        <span className="text-sm text-grey">SMS Code</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioButton
                          selected={setting.authMethods.email}
                          onChange={() => toggleAuthMethod(setting.id, "email")}
                        />
                        <Shield size={16} className="text-grey-medium" />
                        <span className="text-sm text-grey">Email Code</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioButton
                          selected={setting.authMethods.authenticator}
                          onChange={() =>
                            toggleAuthMethod(setting.id, "authenticator")
                          }
                        />
                        <Smartphone size={16} className="text-grey-medium" />
                        <span className="text-sm text-grey">
                          Authenticator App
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

              {editingSection === setting.id && (
                <div className="w-full flex justify-end gap-3 pt-4 py-4 px-4">
                  {enabled && (
                    <Button
                      label="Disable MFA"
                      variant="danger"
                      onClick={handleDisable}
                    />
                  )}
                  <Button
                    label="Cancel"
                    variant="none"
                    className="bg-black text-white px-8 py-3"
                    onClick={() => setEditingSection(null)}
                  />
                  <Button label={"Save Changes"} variant="primary" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <Dialog.Root open={modalOpen} onOpenChange={handleDialogChange}>
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
                    <article className="pb-4">
                      <h1 className="body-bold-16 text-base-black mb-2 text-start">
                        Step 1: Get an Authenticator
                      </h1>
                      <p className="body-medium-16 text-grey">
                        App Download the Google Authenticator app from the
                        Google Play Store (for Android) or the Apple App Store
                        (for iOS). You can also use other apps like Microsoft
                        Authenticator or Authy.
                      </p>
                    </article>
                    <article className="pb-px">
                      <h1 className="body-bold-16 text-base-black mb-2 text-start">
                        Step 2: Scan the QR Code
                      </h1>
                      <p className="body-medium-16 text-grey">
                        On your computer, a QR code will be displayed. Open your
                        authenticator app, tap the + icon, and select "Scan a QR
                        code." Use your phone's camera to scan the code shown on
                        the screen or copy the key and paste it in the
                        authenticator app.
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
                        />
                      </div>
                    </div>

                    <article className="pb-4 w-full">
                      <h1 className="body-bold-16 text-base-black mb-2 text-start">
                        Step 3: Enter the Verification Code
                      </h1>
                      <p className="body-medium-16 text-grey mb-4">
                        Your app will now generate a temporary 6-digit code.
                        Enter this code into the field provided on your computer
                        to complete the setup.
                      </p>
                      <MfaVerifySection
                        onSuccess={() => {
                          setVerifiedSuccess(true);
                          setModalOpen(false);
                        }}
                        onCancel={() => setModalOpen(false)}
                      />
                    </article>
                  </div>
                ) : (
                  <p className="text-sm text-grey-medium mt-6 text-center">
                    Generating QR code...
                  </p>
                )}
              </div>
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Recovery Codes Modal */}
      {showRecoveryCodes && (
        <RecoveryCodesModal onClose={() => setShowRecoveryCodes(false)} />
      )}
    </>
  );
};

export default MfaSettings;
