import { useState } from "react";
import { motion } from "framer-motion";
import {
  MemberInfoSettings,
  MfaSettings,
  // LoginInfoSettings,
} from "@/app/features/dashboard/admin/component";

type Tab = "multifactor" | "memberInfo";

const tabs: { id: Tab; label: string }[] = [
  { id: "multifactor", label: "Multifactor Authentication" },
  // { id: "loginInfo", label: "Login Info" },
  { id: "memberInfo", label: "Member Login Info" },
];

const SecuritySettings = () => {
  const [activeTab, setActiveTab] = useState<Tab>("multifactor");

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
      className="flex flex-col h-full px-4 md:px-6 py-4 min-h-screen font-sans"
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
        <h2 className="label-semi-bold-14 text-primary">Security Settings</h2>
      </motion.article>

      {/* Tabs — horizontally scrollable on mobile */}
      <motion.div
        className="w-full border-b border-grey-light mb-6 bg-base-white rounded-t-lg overflow-x-auto"
        variants={itemVariants}
      >
        <div className="flex min-w-max md:min-w-0 md:w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 min-w-[140px] md:min-w-0 px-4 md:px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary bg-primary-light"
                  : "text-grey-medium hover:text-grey"
              } ${tab.id === "multifactor" ? "rounded-tl-lg" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      {activeTab === "multifactor" ? (
        <MfaSettings />
      ) : (
        // activeTab === "loginInfo" ? (
        // <LoginInfoSettings />
        // ) :
        <MemberInfoSettings />
      )}
    </motion.section>
  );
};

export default SecuritySettings;
