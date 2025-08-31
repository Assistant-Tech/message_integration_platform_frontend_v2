import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Upload } from "lucide-react";
import { Button, Input } from "@/app/components/ui";
import ChatPreview from "./ChatPreview";

const ChatSettings: React.FC = () => {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chat settings state
  const [chatSettings, setChatSettings] = useState({
    primaryColor: "#10B981",
    backgroundColor: "#f0f0f0",
    companyName: "ChatBot",
    logo: null as string | null,
    messages: {
      message1: "Welcome to ChatBot! I'm here to help you get started.",
      message2: "How can I help you today?",
    },
    actionButtons: [
      { text: "Chat with agent" },
      { text: "I'd like to book a demo" },
    ],
    borderRadius: 12,
    shadow: true,
  });

  const [isEditing, setIsEditing] = useState(false);

  // Predefined colors
  const predefinedColors = [
    "#10B981",
    "#059669",
    "#F59E0B",
    "#374151",
    "#1F2937",
    "#064E3B",
    "#065F46",
    "#FCD34D",
    "#DC2626",
    "#2563EB",
    "#7C3AED",
    "#9333EA",
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const handleColorChange = (color: string) => {
    setChatSettings((prev) => ({
      ...prev,
      primaryColor: color,
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setChatSettings((prev) => ({
          ...prev,
          logo: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addActionButton = () => {
    setChatSettings((prev) => ({
      ...prev,
      actionButtons: [...prev.actionButtons, { text: "New Button" }],
    }));
  };

  const removeActionButton = (index: number) => {
    setChatSettings((prev) => ({
      ...prev,
      actionButtons: prev.actionButtons.filter((_, i) => i !== index),
    }));
  };

  const updateActionButton = (index: number, text: string) => {
    setChatSettings((prev) => ({
      ...prev,
      actionButtons: prev.actionButtons.map((button, i) =>
        i === index ? { ...button, text } : button,
      ),
    }));
  };

  const updateMessage = (
    messageKey: "message1" | "message2",
    value: string,
  ) => {
    setChatSettings((prev) => ({
      ...prev,
      messages: {
        ...prev.messages,
        [messageKey]: value,
      },
    }));
  };

  const handleSaveChanges = () => {
    console.log("Saving chat settings:", chatSettings);
    setIsEditing(false);
    // API call would go here
  };

  return (
    <motion.section
      className="w-full flex flex-col h-full py-4 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex gap-6 h-full">
        {/* Settings Panel */}
        <div className="w-1/2 flex-1 space-y-6">
          {/* Colors Section */}
          <motion.div
            className="bg-white rounded-lg border border-grey-light p-6"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold text-grey mb-4">Colors</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-grey-medium mb-3">
                  Primary Color
                </label>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded border-2 border-gray-300"
                    style={{ backgroundColor: chatSettings.primaryColor }}
                  />
                  <span className="text-sm font-mono text-grey-medium">
                    {chatSettings.primaryColor.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {predefinedColors.map((color) => (
                    <motion.button
                      key={color}
                      className={`w-8 h-8 rounded border-2 ${
                        chatSettings.primaryColor === color
                          ? "border-grey-medium scale-110"
                          : "border-grey-light"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Logo Section */}
          <motion.div
            className="bg-white rounded-lg border border-grey-light p-6"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold text-grey mb-4">Logo</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                {chatSettings.logo ? (
                  <div className="space-y-4">
                    <img
                      src={chatSettings.logo}
                      alt="Logo"
                      className="mx-auto h-16 w-auto"
                    />
                    <Button
                      label="Change Logo"
                      variant="outlined"
                      onClick={() => fileInputRef.current?.click()}
                      IconLeft={<Upload size={16} />}
                    />
                  </div>
                ) : (
                  <div className="space-y-4 text-center flex flex-col justify-center items-center">
                    <p className="text-grey-medium">
                      Drag & drop your logo here
                    </p>
                    <p className="text-grey-light text-sm">Or</p>
                    <Button
                      label="Add Attachment"
                      variant="none"
                      className="bg-black text-white px-3 py-2"
                      onClick={() => fileInputRef.current?.click()}
                      IconLeft={<Plus size={16} />}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Company Name */}
          <motion.div
            className="bg-white rounded-lg border border-grey-light p-6"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold text-grey mb-4">
              Company Name
            </h3>
            <Input
              placeholder="Enter company name"
              value={chatSettings.companyName}
              onChange={(e) =>
                setChatSettings((prev) => ({
                  ...prev,
                  companyName: e.target.value,
                }))
              }
            />
          </motion.div>

          {/* Body Messages */}
          <motion.div
            className="bg-white rounded-lg border border-grey-light p-6"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold text-grey mb-4">
              Body Message
            </h3>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-grey-medium mb-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  Message 1
                </label>
                <Input
                  placeholder="Enter first message"
                  value={chatSettings.messages.message1}
                  onChange={(e) => updateMessage("message1", e.target.value)}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-grey-medium mb-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  Message 2
                </label>
                <Input
                  placeholder="Enter second message"
                  value={chatSettings.messages.message2}
                  onChange={(e) => updateMessage("message2", e.target.value)}
                />
              </div>

              <Button
                label="Add New Message"
                variant="outlined"
                IconLeft={<Plus size={16} />}
                className="w-full"
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="bg-white rounded-lg border border-grey-light p-6"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold text-grey mb-4">
              Action Button
            </h3>
            <div className="space-y-4">
              <AnimatePresence>
                {chatSettings.actionButtons.map((button, index) => (
                  <motion.div
                    key={index}
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-grey-medium">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        Button {index + 1}
                      </label>
                      {chatSettings.actionButtons.length > 1 && (
                        <button
                          onClick={() => removeActionButton(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    <Input
                      placeholder={`Enter button ${index + 1} text`}
                      value={button.text}
                      onChange={(e) =>
                        updateActionButton(index, e.target.value)
                      }
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              <Button
                label="Add New Message"
                variant="outlined"
                onClick={addActionButton}
                IconLeft={<Plus size={16} />}
                className="w-full"
              />
            </div>
          </motion.div>

          {/* Style Settings */}
          <motion.div
            className="bg-white rounded-lg border border-grey-light p-6"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold text-grey mb-4">
              Style Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-grey-medium mb-2">
                  Border Radius
                </label>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={chatSettings.borderRadius}
                  onChange={(e) =>
                    setChatSettings((prev) => ({
                      ...prev,
                      borderRadius: parseInt(e.target.value),
                    }))
                  }
                  className="w-full"
                />
                <span className="text-sm text-grey-medium">
                  {chatSettings.borderRadius}px
                </span>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-grey-medium">
                  Shadow
                </label>
                <motion.button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    chatSettings.shadow ? "bg-primary" : "bg-grey-light"
                  }`}
                  onClick={() =>
                    setChatSettings((prev) => ({
                      ...prev,
                      shadow: !prev.shadow,
                    }))
                  }
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                      chatSettings.shadow ? "translate-x-6" : "translate-x-1"
                    }`}
                    layout
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div variants={itemVariants}>
            <Button
              label="Save Changes"
              variant="primary"
              onClick={handleSaveChanges}
              className="w-full"
            />
          </motion.div>
        </div>

        {/* Live Preview Panel */}
        <motion.div className="w-1/2 sticky top-4" variants={itemVariants}>
          <ChatPreview
            settings={{
              ...chatSettings,
              viewMode,
              setViewMode,
            }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ChatSettings;
