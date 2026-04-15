import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  YourSubscription,
  PricingSubscription,
  BillingSubscription,
} from "@/app/features/dashboard/admin/component";
import { getCurrentSubscription } from "@/app/services/subscription.services";
import { useSubscriptionStore } from "@/app/store/subscription.store";
import { Loader2 } from "lucide-react";
import UpgradeSubscription from "../../component/subscription/UpgradeSubscription";
import PaymentHistory from "../../component/PaymentHistory";

const SubscriptionSettings = () => {
  const [activeTab, setActiveTab] = useState<
    | "your subscription"
    | "billing information"
    | "payment history"
    | "upgrade plan"
  >("your subscription");

  const { loading, error, currentSubscriptionResponse } =
    useSubscriptionStore();

  useEffect(() => {
    const fetchCurrentSubscription = async () => {
      try {
        await getCurrentSubscription();
      } catch {
        console.log("There is no subscription to fetch");
      }
    };
    fetchCurrentSubscription();
  }, []);

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

  const tabVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="p-6 bg-base-white min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="mb-8" variants={itemVariants}>
        <h1 className="text-2xl font-bold text-grey mb-2">Settings</h1>
        <p className="text-teal-600 font-medium">Subscriptions</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="w-full flex items-center border-b border-grey-light mb-6 bg-white rounded-t-lg"
        variants={itemVariants}
      >
        <button
          className={`flex-1 px-6 py-3 text-sm font-medium transition-colors rounded-tl-lg ${
            activeTab === "your subscription"
              ? "text-primary border-b-2 border-primary bg-primary-light"
              : "text-grey-medium hover:text-grey"
          }`}
          onClick={() => setActiveTab("your subscription")}
        >
          Your Subscription
        </button>
        <button
          className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === "payment history"
              ? "text-primary border-b-2 border-primary bg-primary-light"
              : "text-grey-medium hover:text-grey"
          }`}
          onClick={() => setActiveTab("payment history")}
        >
          Payment History
        </button>
        <button
          className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === "upgrade plan"
              ? "text-primary border-b-2 border-primary bg-primary-light"
              : "text-grey-medium hover:text-grey"
          }`}
          onClick={() => setActiveTab("upgrade plan")}
        >
          Upgrade Plan
        </button>
        <button
          className={`flex-1 px-6 py-3 text-sm font-medium transition-colors rounded-tr-lg ${
            activeTab === "billing information"
              ? "text-primary border-b-2 border-primary bg-primary-light"
              : "text-grey-medium hover:text-grey"
          }`}
          onClick={() => setActiveTab("billing information")}
        >
          Billing Information & Invoice
        </button>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin text-primary w-6 h-6" />
          <span className="ml-2 text-grey">Loading subscription...</span>
        </div>
      )}

      {/* Error State */}
      {!loading && error && <div></div>}

      {/* Content */}
      {!loading && !error && (
        <>
          <AnimatePresence mode="wait">
            {activeTab === "your subscription" ? (
              <motion.div
                key="your-subscription"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {currentSubscriptionResponse && (
                  <YourSubscription
                    data={currentSubscriptionResponse.data}
                    onUpgradeClick={() => setActiveTab("upgrade plan")}
                  />
                )}
              </motion.div>
            ) : activeTab === "payment history" ? (
              <motion.div
                key="payment history"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <PaymentHistory />
              </motion.div>
            ) : activeTab === "upgrade plan" ? (
              <motion.div
                key="billing information"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <UpgradeSubscription current={currentSubscriptionResponse} />
              </motion.div>
            ) : (
              <motion.div
                key="billing information"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <BillingSubscription
                  subscriptionId={
                    currentSubscriptionResponse?.data?.Invoice[0]
                      ?.subscriptionId
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Available Plans / Upgrade */}
      {activeTab === "your subscription" && (
        <>
          {!currentSubscriptionResponse && (
            <div className="py-4">
              <h1 className="h4-bold-24 text-grey py-6">Available Plans</h1>
              <PricingSubscription />
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default SubscriptionSettings;
