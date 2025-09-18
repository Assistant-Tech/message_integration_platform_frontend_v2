import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, MessageSquare, Shield, Smartphone, X } from "lucide-react";
import { Button } from "@/app/components/ui";
import { RadioButton, Switch } from "./ui";
import { useMfaStore } from "@/app/store/mfa.store";
import MfaVerifySection from "./mfa/MfaVerifySection";
import RecoveryCodesModal from "./mfa/RecoveryCodesModal";
import { toast } from "sonner";

const MfaSettings = () => {
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

  const [showRecoveryCodes, setShowRecoveryCodes] = useState<boolean>(false);
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const { mfaData, enabled, requestMfa, disableMfa } = useMfaStore();
  const [isCopying, setIsCopying] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    method: keyof (typeof mfaSettings)[0]["authMethods"],
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
            if (!mfaData) {
              requestMfa();
            }
            setDrawerOpen(true);
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
              {/* Header */}
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

              {/* Switch */}
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

              {/* Auth Methods */}
              {(setting.enabled || editingSection === setting.id) &&
                setting.hasAuthMethods && (
                  <motion.div
                    className="px-6 py-4 border-t border-gray-200"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-sm font-medium text-gray-700 mb-4">
                      Choose an authentication method:
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <RadioButton
                          selected={setting.authMethods.sms}
                          onChange={() => toggleAuthMethod(setting.id, "sms")}
                        />
                        <MessageSquare size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">SMS Code</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioButton
                          selected={setting.authMethods.email}
                          onChange={() => toggleAuthMethod(setting.id, "email")}
                        />
                        <Shield size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">
                          Email Code
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioButton
                          selected={setting.authMethods.authenticator}
                          onChange={() =>
                            toggleAuthMethod(setting.id, "authenticator")
                          }
                        />
                        <Smartphone size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">
                          Authenticator App
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

              {/* Save/Cancel */}
              {editingSection === setting.id && (
                <div className="w-full flex justify-end gap-3 pt-4 py-4 px-4">
                  {/* Disable MFA */}
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

      {/* Drawer for Authenticator */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Background overlay */}
            <div
              className="flex-1 bg-black/40"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="w-2xl bg-white shadow-lg p-6 relative overflow-y-auto"
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setDrawerOpen(false)}
              >
                <X size={20} />
              </button>

              <h5 className="h5-bold-16 text-grey">
                Multi-Factor Authentication Setup
              </h5>

              {mfaData ? (
                <div className="flex flex-col items-start mt-6">
                  {/* steps 1 & 2 */}
                  <article className="pb-6">
                    <h1 className="body-semi-bold-16 text-grey mb-2 text-start">
                      Step 1: Get an Authenticator
                    </h1>
                    <p className="body-medium-16 text-grey-medium">
                      Download Google Authenticator, Authy, or Microsoft
                      Authenticator.
                    </p>
                  </article>
                  <article className="pb-6">
                    <h1 className="body-semi-bold-16 text-grey mb-2 text-start">
                      Step 2: Scan the QR Code
                    </h1>
                    <p className="body-medium-16 text-grey-medium">
                      Scan this QR code with your authenticator app or enter the
                      key manually.
                    </p>
                  </article>

                  <div className="w-full flex justify-between items-center p-10">
                    <figure>
                      <img
                        src={mfaData.qrCodeDataURL}
                        alt="MFA QR Code"
                        className="w-48 h-48 border border-gray-300 rounded-lg p-2"
                      />
                    </figure>

                    <div className="flex flex-col items-center">
                      <p className="body-regular-14 text-grey-medium mt-4">
                        Or enter this code manually:
                      </p>
                      <div className="bg-gray-100 p-3 mt-2 rounded-lg break-all text-center">
                        <code className="font-mono text-sm text-gray-800">
                          {mfaData.secret}
                        </code>
                      </div>
                      <Button
                        label={isCopying ? "Copied!" : "Copy Code"}
                        variant="primary"
                        onClick={handleCopy}
                        className={`mt-4 ${
                          isCopying ? "bg-primary text-white" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Step 3: verify */}
                  <article className="pb-6 w-full">
                    <h1 className="body-semi-bold-16 text-grey mb-2 text-start">
                      Step 3: Enter the Verification Code
                    </h1>
                    <p className="body-medium-16 text-grey-medium mb-4">
                      Enter the 6-digit code from your authenticator app to
                      complete setup.
                    </p>

                    <MfaVerifySection
                      onSuccess={() => setShowRecoveryCodes(true)}
                    />
                  </article>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-6 text-center">
                  Generating QR code...
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recovery Codes Modal */}
      {showRecoveryCodes && (
        <RecoveryCodesModal onClose={() => setShowRecoveryCodes(false)} />
      )}
    </>
  );
};

export default MfaSettings;
