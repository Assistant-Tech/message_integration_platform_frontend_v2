import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  CreditCard,
  Clock,
  Wallet,
  MoreVertical,
  XCircle,
  PauseCircle,
} from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { CurrentSubscriptionResponse } from "@/app/types/subscription.types";
import { formatCurrency } from "@/app/utils/helper";
import {
  cancelSubscription,
  getCurrentSubscription,
  pauseSubscription,
  resumeSubscription,
} from "@/app/services/subscription.services";
import { toast } from "sonner";

type YourSubscriptionProps = {
  data?: CurrentSubscriptionResponse["data"];
};

const YourSubscription = ({ data }: YourSubscriptionProps) => {
  const [subscription, setSubscription] = useState<
    CurrentSubscriptionResponse["data"] | null
  >(data || null);
  const [showCancel, setShowCancel] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelImmediately, setCancelImmediately] = useState(false);
  const [pauseDuration, setPauseDuration] = useState(7);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const refreshData = async () => {
    try {
      const res = await getCurrentSubscription();
      setSubscription(res?.success ? res.data : null);
    } catch (err) {
      console.error("Failed to refresh subscription:", err);
    }
  };

  useEffect(() => {
    if (!subscription) {
      refreshData();
    }
  }, [subscription]);

  if (!subscription) {
    return (
      <div className="text-center text-grey-medium py-10">
        You don’t have an active subscription yet.
      </div>
    );
  }

  const {
    id: subscriptionId,
    plan,
    startDate,
    endDate,
    nextBillingDate,
    status,
    totalAmount,
    currency,
  } = subscription;

  const formattedStartDate = format(new Date(startDate), "MMM dd, yyyy");
  const formattedEndDate = format(new Date(endDate), "MMM dd, yyyy");
  const formattedNextBillingDate = nextBillingDate
    ? format(new Date(nextBillingDate), "MMM dd, yyyy")
    : "N/A";
  const daysLeft = Math.max(differenceInDays(new Date(endDate), new Date()), 0);
  const formattedAmount = formatCurrency(
    Number(totalAmount),
    currency as "NPR" | "USD",
  );

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // --- ACTION HANDLERS ---
  const handleCancelSubscription = async () => {
    try {
      setLoading(true);
      const res = await cancelSubscription({
        subscriptionId,
        cancellationReason: cancelReason || "No reason provided",
        cancelImmediately,
      });
      if (res?.success) {
        toast.success(res.message || "Subscription cancelled successfully");
        await refreshData();
      } else toast.error("Failed to cancel subscription");
      setShowCancel(false);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to cancel subscription",
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePauseSubscription = async () => {
    try {
      setLoading(true);
      const res = await pauseSubscription({ subscriptionId, pauseDuration });
      if (res?.success) {
        toast.success(res.message || "Subscription paused successfully");
        await refreshData();
      } else toast.error("Failed to pause subscription");
      setShowPause(false);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to pause subscription",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResumeSubscription = async () => {
    try {
      setLoading(true);
      const res = await resumeSubscription({ subscriptionId });
      if (res?.success) {
        toast.success(res.message || "Subscription resumed successfully");
        await refreshData();
      } else toast.error("Failed to resume subscription");
      setShowResume(false);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to resume subscription",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* PAUSED STATE NOTICE */}
      {status === "PAUSED" && (
        <div className="flex flex-col items-start justify-center mb-6 bg-white py-6 px-4 rounded-2xl">
          <h1 className="body-bold-16 text-warning-dark">
            Subscription Paused
          </h1>
          <p className="body-regular-16 text-warning">
            Your subscription is currently paused. Resume anytime to continue
            using all premium features.
          </p>
          <button
            onClick={() => setShowResume(true)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
          >
            Resume Subscription
          </button>
        </div>
      )}

      {/* TRIAL NOTICE */}
      {status === "TRIALING" && (
        <div className="flex flex-col items-start justify-center mb-6 bg-information-light py-6 px-4 rounded-2xl">
          <h1 className="body-bold-16 text-information-dark">
            Upgrade your plan
          </h1>
          <p className="body-regular-16 text-information">
            You are currently on trial period which ends in{" "}
            <strong>{daysLeft} days</strong>. To continue using Chatblix, please
            upgrade to paid plans.
          </p>
        </div>
      )}

      {/* Subscription Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-2 rounded-lg border border-grey-light bg-base-white relative"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6 px-6 pt-6">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-grey">
                Subscription Detail
              </h2>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                  status === "ACTIVE"
                    ? "bg-green-100 text-green-800"
                    : status === "TRIALING"
                      ? "bg-information-light text-information"
                      : status === "PAUSED"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-danger-light text-danger"
                }`}
              >
                {status}
              </span>
            </div>

            {/* Menu */}
            {status !== "PAUSED" && (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <MoreVertical size={20} />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <button
                      onClick={() => {
                        setShowPause(true);
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 w-full text-left"
                    >
                      <PauseCircle size={16} /> Pause Subscription
                    </button>

                    <button
                      onClick={() => {
                        setShowCancel(true);
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger-light/10 w-full text-left"
                    >
                      <XCircle size={16} /> Cancel Subscription
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4 bg-white p-6 rounded-b-xl">
            {[
              { label: "Plan", value: plan?.name || "N/A", icon: CreditCard },
              {
                label: "Billing Cycle",
                value: plan?.interval || "N/A",
                icon: Clock,
              },
              { label: "Amount", value: formattedAmount, icon: Wallet },
              {
                label: "Start Date",
                value: formattedStartDate,
                icon: Calendar,
              },
              { label: "End Date", value: formattedEndDate, icon: Calendar },
              {
                label: "Next Billing Date",
                value: formattedNextBillingDate,
                icon: Calendar,
              },
            ].map(({ label, value, icon: Icon }, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between py-3 ${idx < 5 ? "border-b border-gray-100" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className="text-grey-medium" />
                  <span className="text-grey-medium">{label}</span>
                </div>
                <span className="font-medium text-grey">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Days Left */}
        <motion.div
          className="bg-white rounded-lg border border-grey-light p-6 flex flex-col items-center justify-center"
          variants={itemVariants}
        >
          <div className="relative w-48 h-48 mb-6">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="10"
                fill="none"
                className="text-grey-light"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${(daysLeft / 30) * 282.7} 282.7`}
                strokeLinecap="round"
                className="text-teal-500 transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-bold text-grey mb-1">
                {daysLeft}
              </span>
              <p className="text-sm font-medium text-grey-medium">days left</p>
            </div>
          </div>
          <div className="text-sm text-center">
            <p className="text-grey-medium mb-1">Expires:</p>
            <span className="text-danger font-bold">{formattedEndDate}</span>
          </div>
        </motion.div>
      </div>

      {/* DIALOGS */}
      {showCancel && (
        <Dialog
          title="Cancel Subscription"
          onClose={() => setShowCancel(false)}
          onConfirm={handleCancelSubscription}
          loading={loading}
          confirmText="Confirm Cancel"
        >
          <p className="text-sm text-grey-medium mb-4">
            Are you sure you want to cancel your subscription?
          </p>
          <textarea
            className="w-full border border-grey-light rounded-md p-2 text-sm mb-3"
            placeholder="Reason for cancellation (optional)"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <input
              id="cancelNow"
              type="checkbox"
              checked={cancelImmediately}
              onChange={(e) => setCancelImmediately(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="cancelNow" className="text-sm">
              Cancel immediately
            </label>
          </div>
        </Dialog>
      )}

      {showPause && (
        <Dialog
          title="Pause Subscription"
          onClose={() => setShowPause(false)}
          onConfirm={handlePauseSubscription}
          loading={loading}
          confirmText="Confirm Pause"
        >
          <p className="text-sm text-grey-medium mb-4">
            Choose how many days to pause (1–15 days):
          </p>
          <input
            type="number"
            min={1}
            max={15}
            value={pauseDuration}
            onChange={(e) => setPauseDuration(Number(e.target.value))}
            className="w-full border border-grey-light rounded-md p-2 text-sm"
          />
        </Dialog>
      )}

      {showResume && (
        <Dialog
          title="Resume Subscription"
          onClose={() => setShowResume(false)}
          onConfirm={handleResumeSubscription}
          loading={loading}
          confirmText="Confirm Resume"
        >
          <p className="text-sm text-grey-medium mb-4">
            Do you want to resume your paused subscription?
          </p>
        </Dialog>
      )}
    </div>
  );
};

// Reusable Dialog Component
const Dialog = ({
  title,
  children,
  onClose,
  onConfirm,
  loading,
  confirmText,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  confirmText: string;
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md text-grey-medium hover:bg-gray-100"
        >
          Close
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition disabled:opacity-50"
        >
          {loading ? "Processing..." : confirmText}
        </button>
      </div>
    </div>
  </div>
);

export default YourSubscription;
