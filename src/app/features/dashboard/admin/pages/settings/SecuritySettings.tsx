import { useState } from "react";
import { motion } from "framer-motion";
import {
  MemberInfoSettings,
  MfaSettings,
  LoginInfoSettings,
} from "@/app/features/dashboard/admin/component";

const SecuritySettings = () => {
  const [activeTab, setActiveTab] = useState<
    "multifactor" | "loginInfo" | "memberInfo"
  >("multifactor");

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

  return (
    <motion.section
      className="-1/2 flex flex-col h-full px-6 py-4 min-h-screen font-sans"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.article
        className="flex flex-col text-start mb-6"
        variants={itemVariants}
      >
        <h1 className="text-2xl font-bold text-grey mb-2">Settings</h1>
        <h2 className="text-base font-semibold text-primary">
          Security Settings
        </h2>
      </motion.article>

      {/* Tabs */}
      <motion.div
        className="w-full flex items-center border-b border-grey-light mb-6 bg-white rounded-t-lg"
        variants={itemVariants}
      >
        <button
          className={`w-1/2 px-6 py-3 text-sm font-medium transition-colors rounded-tl-lg ${
            activeTab === "multifactor"
              ? "text-primary border-b-2 border-primary bg-primary-light"
              : "text-grey-medium hover:text-grey"
          }`}
          onClick={() => setActiveTab("multifactor")}
        >
          Multifactor Authentication
        </button>
        <button
          className={`w-1/2 px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === "loginInfo"
              ? "text-primary border-b-2 border-primary bg-primary-light"
              : "text-grey-medium hover:text-grey"
          }`}
          onClick={() => setActiveTab("loginInfo")}
        >
          Login Info
        </button>
        <button
          className={`w-1/2 px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === "memberInfo"
              ? "text-primary border-b-2 border-primary bg-primary-light"
              : "text-grey-medium hover:text-grey"
          }`}
          onClick={() => setActiveTab("memberInfo")}
        >
          Member Login Info
        </button>
      </motion.div>

      {/* Tab Content */}
      {activeTab === "multifactor" ? (
        <MfaSettings />
      ) : activeTab === "loginInfo" ? (
        <LoginInfoSettings />
      ) : (
        <MemberInfoSettings />
      )}
    </motion.section>
  );
};

export default SecuritySettings;
