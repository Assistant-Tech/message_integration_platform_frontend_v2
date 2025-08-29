import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, MessageSquare, Shield, Smartphone } from "lucide-react";
import { Button } from "@/app/components/ui"; // assume you have these
import { RadioButton, Switch } from "./ui";

const MfaSettings = () => {
  const [mfaSettings, setMfaSettings] = useState([
    {
      id: 1,
      title: "Multifactor Authentication",
      description:
        "By turning on multi-factor authentication, you will enable two step process login process.",
      enabled: false,
      hasAuthMethods: false,
      authMethods: { sms: false, email: false, authenticator: false },
    },
    {
      id: 2,
      title: "Multifactor Authentication",
      description:
        "If enabled, you'll be required to enter a code from your authenticator app in addition to your password.",
      enabled: false,
      hasAuthMethods: true,
      authMethods: { sms: false, email: true, authenticator: false },
    },
    {
      id: 3,
      title: "Multifactor Authentication",
      description:
        "If enabled, you'll be required to enter a code from your authenticator app in addition to your password.",
      enabled: true,
      hasAuthMethods: true,
      authMethods: { sms: true, email: false, authenticator: false },
    },
  ]);

  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [originalSettings, setOriginalSettings] = useState(mfaSettings);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const handleEdit = (id: number) => {
    setOriginalSettings([...mfaSettings]);
    setEditingSection(id);
  };

  const handleSave = (id: number) => {
    console.log("Saving MFA settings for:", id);
    setEditingSection(null);
  };

  const handleCancel = () => {
    setMfaSettings(originalSettings);
    setEditingSection(null);
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
    setMfaSettings((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              authMethods: {
                ...s.authMethods,
                [method]: !s.authMethods[method],
              },
            }
          : s,
      ),
    );
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="mfa-content"
        className="w-5xl space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {mfaSettings.map((setting) => (
          <motion.div
            key={setting.id}
            className="bg-white rounded-lg border border-grey-light overflow-hidden"
            variants={itemVariants}
            layout
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border rounded-t-lg border-grey-light bg-base-white">
              <h3 className="text-lg font-semibold text-gray-800">
                {setting.title}
              </h3>
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
                <span className="text-sm text-gray-600">
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
              <p className="text-sm text-gray-500">{setting.description}</p>
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
                        disabled={
                          editingSection !== null &&
                          editingSection !== setting.id
                        }
                      />
                      <MessageSquare size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700">SMS Code</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioButton
                        selected={setting.authMethods.email}
                        onChange={() => toggleAuthMethod(setting.id, "email")}
                        disabled={
                          editingSection !== null &&
                          editingSection !== setting.id
                        }
                      />
                      <Shield size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700">Email Code</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioButton
                        selected={setting.authMethods.authenticator}
                        onChange={() =>
                          toggleAuthMethod(setting.id, "authenticator")
                        }
                        disabled={
                          editingSection !== null &&
                          editingSection !== setting.id
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
              <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-200">
                <Button label="Cancel" variant="none" onClick={handleCancel} />
                <Button
                  label="Save"
                  variant="primary"
                  onClick={() => handleSave(setting.id)}
                />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default MfaSettings;
