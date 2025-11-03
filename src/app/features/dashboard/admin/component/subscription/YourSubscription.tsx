import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CreditCard,
  Clock,
  Wallet,
  MoreVertical,
  XCircle,
  PauseCircle,
  MoveUpRight,
} from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { Button } from "@/app/components/ui";
import { CurrentSubscriptionResponse } from "@/app/types/subscription.types";
import { formatCurrency } from "@/app/utils/helper";
import { getCurrentSubscription } from "@/app/services/subscription.services";
import { Modal } from "@/app/components/common";
import { useSubscriptionMutations } from "@/app/hooks/mutation/useSubscriptionMutation";

type YourSubscriptionProps = {
  data?: CurrentSubscriptionResponse["data"];
  onUpgradeClick?: () => void;
};

const YourSubscription = ({ data, onUpgradeClick }: YourSubscriptionProps) => {
  const [subscription, setSubscription] = useState<
    CurrentSubscriptionResponse["data"] | null
  >(data || null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelImmediately, setCancelImmediately] = useState(false);
  const [pauseDuration, setPauseDuration] = useState(7);
  const [modalType, setModalType] = useState<
    null | "cancel" | "pause" | "resume"
  >(null);

  const { cancelMutation, pauseMutation, resumeMutation } =
    useSubscriptionMutations(); 

  const refreshData = async () => {
    try {
      const res = await getCurrentSubscription();
      if (res.success) setSubscription(res.data);
    } catch (err) {
      console.error("Failed to refresh subscription:", err);
    }
  };

  useEffect(() => {
    if (!subscription) refreshData();
  }, [subscription]);

  if (!subscription) return <div>Loading...</div>;

  const {
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

  return (
    <div>
      {/* STATUS NOTICE */}
      {status === "PAUSED" && (
        <div className="flex flex-col items-start justify-center mb-6 bg-white py-6 px-4 rounded-2xl">
          <h1 className="body-bold-16 text-warning-dark">
            Subscription Paused
          </h1>
          <p className="body-regular-16 text-warning">
            Your subscription is currently paused. Resume anytime to continue
            using premium features.
          </p>
          <button
            onClick={() => setModalType("resume")}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
          >
            Resume Subscription
          </button>
        </div>
      )}

      {status === "TRIALING" && (
        <div className="flex flex-col items-start justify-center mb-6 bg-information-light py-6 px-4 rounded-2xl">
          <h1 className="body-bold-16 text-information-dark">
            Upgrade your plan
          </h1>
          <p className="body-regular-16 text-information">
            You are currently on a trial period which ends in{" "}
            <strong>{daysLeft} days</strong>. Upgrade to continue using premium
            features.
          </p>
        </div>
      )}

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-2 rounded-lg border border-grey-light bg-white relative"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
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
                        setModalType("pause");
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 w-full text-left"
                    >
                      <PauseCircle size={16} /> Pause Subscription
                    </button>
                    <button
                      onClick={() => {
                        setModalType("cancel");
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
                className={`flex items-center justify-between py-3 ${
                  idx < 5 ? "border-b border-gray-100" : ""
                }`}
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

        {/* DAYS LEFT */}
        <motion.div
          className="bg-white rounded-lg border border-grey-light p-6 flex flex-col items-center justify-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
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
          <div className="flex flex-col justify-center gap-4">
            <div className="text-sm text-center">
              <p className="text-grey-medium mb-1">Expires:</p>
              <span className="text-danger font-bold">{formattedEndDate}</span>
            </div>
            <div onClick={onUpgradeClick}>
              <Button label="Upgrade plans" IconRight={<MoveUpRight />} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {modalType === "cancel" && (
          <Modal title="Cancel Subscription" onClose={() => setModalType(null)}>
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
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 rounded-md text-grey-medium hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={() =>
                  cancelMutation.mutate(
                    {
                      subscriptionId: subscription.id,
                      cancellationReason: cancelReason,
                      cancelImmediately: cancelImmediately,
                    },
                    { onSuccess: refreshData },
                  )
                }
                disabled={cancelMutation.isPending}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition disabled:opacity-50"
              >
                {cancelMutation.isPending ? "Processing..." : "Confirm Cancel"}
              </button>
            </div>
          </Modal>
        )}

        {modalType === "pause" && (
          <Modal title="Pause Subscription" onClose={() => setModalType(null)}>
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
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 rounded-md text-grey-medium hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={() =>
                  pauseMutation.mutate(
                    {
                      subscriptionId: subscription.id,
                      pauseDuration: pauseDuration,
                    },
                    { onSuccess: refreshData },
                  )
                }
                disabled={pauseMutation.isPending}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition disabled:opacity-50"
              >
                {pauseMutation.isPending ? "Processing..." : "Confirm Pause"}
              </button>
            </div>
          </Modal>
        )}

        {modalType === "resume" && (
          <Modal title="Resume Subscription" onClose={() => setModalType(null)}>
            <p className="text-sm text-grey-medium mb-4">
              Do you want to resume your paused subscription?
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 rounded-md text-grey-medium hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={() =>
                  resumeMutation.mutate(
                    {
                      subscriptionId: subscription.id,
                    },
                    { onSuccess: refreshData },
                  )
                }
                disabled={resumeMutation.isPending}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition disabled:opacity-50"
              >
                {resumeMutation.isPending ? "Processing..." : "Confirm Resume"}
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default YourSubscription;
