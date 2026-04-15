import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChatWidget,
  MessageTemplateSettings,
} from "@/app/features/dashboard/admin/component/";
import type { ChatSettings as ChatSettingsType } from "@/app/features/dashboard/admin/component/MessageTemplateSettings";

const ChatSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"template" | "widget">("template");

  const [chatSettings, setChatSettings] = useState<ChatSettingsType>({
    primaryColor: "#10B981",
    backgroundColor: "#f0f0f0",
    companyName: "ChatBot",
    logo: null,
    messages: [
      {
        heading: "Welcome",
        shortcut: "ctrl+1",
        message: "Welcome to ChatBot! I'm here to help you get started.",
      },
      {
        heading: "Help",
        shortcut: "ctrl+2",
        message: "How can I help you today?",
      },
    ],
    actionButtons: [
      { text: "Chat with agent" },
      { text: "I'd like to book a demo" },
    ],
    borderRadius: 12,
    shadow: true,
  });

  return (
    <motion.section className="flex flex-col h-full px-6 py-4 min-h-screen">
      {/* Header */}
      <motion.article className="flex flex-col text-start mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <h2 className="text-lg font-semibold text-primary">Chat Settings</h2>
      </motion.article>

      {/* Tab Navigation */}
      <div className="w-full flex justify-between items-center border-b border-grey-light bg-base-white rounded-t-lg mb-4">
        <button
          className={`w-1/2 px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === "template"
              ? "text-primary border-b-2 border-primary bg-primary-light rounded-tl-lg"
              : "text-grey-medium hover:text-grey"
          }`}
          onClick={() => setActiveTab("template")}
        >
          Message Template
        </button>
        <button
          className={`w-1/2 px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === "widget"
              ? "text-primary border-b-2 border-primary bg-primary-light"
              : "text-grey-medium hover:text-grey"
          }`}
          onClick={() => setActiveTab("widget")}
        >
          Chat Widget
        </button>
      </div>

      <div className="flex gap-6 h-full">
        {/* Settings Panel */}
        <div className="flex-1 space-y-6">
          {activeTab === "template" ? (
            <MessageTemplateSettings
              chatSettings={chatSettings}
              setChatSettings={setChatSettings}
            />
          ) : (
            <ChatWidget />
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default ChatSettings;
