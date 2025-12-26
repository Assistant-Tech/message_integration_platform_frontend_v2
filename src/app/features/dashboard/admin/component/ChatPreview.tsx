import React from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { Input } from "@/app/components/ui";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";

const ChatPreview: React.FC<{ settings: any }> = ({ settings }) => {
  return (
    <div className="bg-white rounded-lg border border-grey-light h-[90vh] overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-grey-light">
        <span className="text-sm font-medium text-grey">Live Preview</span>
        <div className="flex gap-2">
          <button
            className={cn(
              "px-3 py-1 text-xs rounded",
              settings.viewMode === "desktop"
                ? "bg-gray-800 text-white"
                : "bg-grey-light text-grey-medium",
            )}
            onClick={() => settings.setViewMode("desktop")}
          >
            Desktop
          </button>
          <button
            className={cn(
              "px-3 py-1 text-xs rounded",
              settings.viewMode === "mobile"
                ? "bg-gray-800 text-white"
                : "bg-grey-light text-grey-medium",
            )}
            onClick={() => settings.setViewMode("mobile")}
          >
            Mobile
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div
        className="h-full relative flex items-center justify-center"
        style={{ backgroundColor: settings.backgroundColor || "#f0f0f0" }}
      >
        {/* Chat Window */}
        <motion.div
          className={cn(
            "bg-white rounded-lg shadow-xl border border-grey-light flex flex-col",
            settings.viewMode === "desktop"
              ? "w-80 h-[28rem]"
              : "w-64 h-[28rem]",
            settings.shadow ? "shadow-2xl" : "",
          )}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Chat Header */}
          <div
            className={cn(
              "p-4 text-white rounded-t-lg flex items-center gap-3",
              settings.primaryColor || "bg-primary",
            )}
            style={{ backgroundColor: settings.primaryColor || "#10B981" }}
          >
            {/* Plain circle avatar */}
            <div className="w-8 h-8 bg-white rounded-full" />
            <div>
              <h3 className="font-semibold text-sm">
                {settings.companyName || "ChatBot"}
              </h3>
              <p className="text-xs opacity-90">I'm here to assist you</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-4 space-y-3 flex-1 overflow-y-auto">
            <div className="flex gap-2 items-start">
              <div className="w-6 h-6 bg-grey-light rounded-full flex items-center justify-center">
                <MessageSquare size={12} className="text-grey-medium" />
              </div>
              <div className="max-w-xs p-3 rounded-lg text-sm bg-white border shadow">
                {settings.messages?.message1 ||
                  "Welcome to ChatBot! I'm here to help you get started."}
              </div>
            </div>

            <div className="flex gap-2 items-start">
              <div className="w-6 h-6 bg-grey-light rounded-full flex items-center justify-center">
                <MessageSquare size={12} className="text-grey-medium" />
              </div>
              <div className="max-w-xs p-3 rounded-lg text-sm bg-white border shadow">
                {settings.messages?.message2 || "How can I help you today?"}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 space-y-2 border-t border-grey-light">
            {settings.actionButtons?.map((button: any, index: number) => (
              <motion.button
                key={index}
                className={cn(
                  "w-full p-2 text-sm text-left rounded-lg border transition-colors cursor-pointer",
                  "hover:bg-base-white",
                )}
                style={{
                  borderColor: settings.primaryColor || "#10B981",
                  color: settings.primaryColor || "#10B981",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {button.text || `Button ${index + 1}`}
              </motion.button>
            ))}
          </div>

          {/* Bottom Terms */}
          <div className="px-4 py-2 text-[11px] text-grey-medium border-t border-grey-light bg-base-white">
            By starting this chat, you agree to{" "}
            <Link to={APP_ROUTES.PUBLIC.TERMSCONDITION} className="text-blue-600 hover:underline">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link to={APP_ROUTES.PUBLIC.POLICY} className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>{" "}
            of the company.
          </div>

          {/* Input area */}
          <div className="p-3 flex items-center gap-2 border-t border-grey-light">
            <Input
              className="flex-1 text-sm rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-grey-medium"
              placeholder="Start conversation"
            />
            <button className="p-2 rounded-full bg-grey-light text-grey-medium cursor-not-allowed">
              <MessageSquare size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatPreview;
