import { useEffect } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  YourSubscription,
  PurchaseHistory,
  PricingSubscription,
  BillingSubscription,
} from "@/app/features/dashboard/admin/component";
import { getCurrentSubscription } from "@/app/services/subscription.services";
import { useSubscriptionStore } from "@/app/store/subscription.store";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import UpgradeSubscription from "../../component/subscription/UpgradeSubscription";

const SubscriptionSettings = () => {
  const [activeTab, setActiveTab] = useState<
    "your subscription" | "purchase history" | "billing information"
  >("your subscription");

  const { loading, error, currentSubscriptionResponse } =
    useSubscriptionStore();

  useEffect(() => {
    const fetchCurrentSubscription = async () => {
      try {
        await getCurrentSubscription();
      } catch {
        toast.error("Failed to fetch current subscription");
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
          className={`w-1/2 px-6 py-3 text-sm font-medium transition-colors rounded-tl-lg ${
            activeTab === "your subscription"
              ? "text-primary border-b-2 border-primary bg-primary-light"
              : "text-grey-medium hover:text-grey"
          }`}
          onClick={() => setActiveTab("your subscription")}
        >
          Your Subscription
        </button>
        <button
          className={`w-1/2 px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === "purchase history"
              ? "text-primary border-b-2 border-primary bg-primary-light"
              : "text-grey-medium hover:text-grey"
          }`}
          onClick={() => setActiveTab("purchase history")}
        >
          Purchase History
        </button>
        <button
          className={`w-1/2 px-6 py-3 text-sm font-medium transition-colors ${
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
      {!loading && error && (
        <div className="text-center text-danger py-6">
          You don’t have an active subscription yet.
        </div>
      )}

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
                {currentSubscriptionResponse ? (
                  <YourSubscription data={currentSubscriptionResponse.data} />
                ) : (
                  <div className="text-center py-12 text-grey">
                    You don’t have an active subscription yet.
                  </div>
                )}
              </motion.div>
            ) : activeTab === "purchase history" ? (
              <motion.div
                key="purchase history"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <PurchaseHistory />
              </motion.div>
            ) : (
              <div></div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Available Plans / Upgrade */}
      {activeTab === "your subscription" && (
        <>
          {!currentSubscriptionResponse ? (
            <div className="py-4">
              <h1 className="h4-bold-24 text-grey py-6">Available Plans</h1>
              <PricingSubscription />
            </div>
          ) : (
            <div className="py-4">
              <UpgradeSubscription current={currentSubscriptionResponse} />
            </div>
          )}
        </>
      )}

      {/* Implement after the api fix */}
      {/* Invoice list and billing info  */}
      {activeTab === "billing information" && (
        <BillingSubscription
          subscriptionId={
            currentSubscriptionResponse?.data?.Invoice[0]?.subscriptionId
          }
        />
      )}
    </motion.div>
  );
};

export default SubscriptionSettings;
