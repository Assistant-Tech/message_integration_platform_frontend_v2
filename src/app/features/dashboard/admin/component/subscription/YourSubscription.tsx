import { motion } from "framer-motion";
import { Calendar, CreditCard, Clock, Wallet } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { CurrentSubscriptionResponse } from "@/app/types/subscription.types";
import { formatCurrency } from "@/app/utils/helper";

type YourSubscriptionProps = {
  data?: CurrentSubscriptionResponse["data"];
};

const YourSubscription = ({ data }: YourSubscriptionProps) => {
  if (!data) {
    return (
      <div className="text-center text-grey-medium py-10">
        No active subscription found.
      </div>
    );
  }

  const {
    plan,
    startDate,
    endDate,
    nextBillingDate,
    status,
    totalAmount,
    currency,
  } = data;
  // console.log("🚀 ~ data:", data);

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
      {/* only showcase when trialing */}
      {status === "TRIALING" ? (
        <div className="flex flex-col items-start justify-center mb-6 bg-information-light py-6 px-4 rounded-2xl">
          <h1 className="body-bold-16 text-information-dark">
            Updrage your plan
          </h1>
          <p className="body-regular-16 text-information">
            You are currently on trial period which ends in
            <strong> {daysLeft} days left</strong>. To continue using Chatblix,
            Please upgrade to paid plans and access exclusive features and added
            benefits{" "}
            <span className="body-regular-16 underline cursor-pointer">
              terms & conditions applied.
            </span>
          </p>
        </div>
      ) : (
        <div></div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subscription Details */}
        <motion.div
          className="lg:col-span-2  rounded-lg border border-grey-light bg-base-white"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6 px-6 pt-6">
            <h2 className="text-lg font-semibold text-grey">
              Subscription Detail
            </h2>
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                status === "ACTIVE"
                  ? "bg-green-100 text-green-800"
                  : status === "TRIALING"
                    ? "bg-information-light text-information"
                    : "bg-danger-light text-danger"
              }`}
            >
              {status}
            </span>
          </div>

          <div className="space-y-4 bg-white p-6 rounded-b-xl">
            {[
              { label: "Plan", value: plan?.name || "N/A", icon: CreditCard },
              {
                label: "Billing Cycle",
                value: plan?.interval || "N/A",
                icon: Clock,
              },
              {
                label: "Amount",
                value: formattedAmount,
                icon: Wallet,
              },
              {
                label: "Start Date",
                value: formattedStartDate,
                icon: Calendar,
              },
              {
                label: "End Date",
                value: formattedEndDate,
                icon: Calendar,
              },
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
                <div className="flex items-center gap-3 ">
                  <Icon size={20} className="text-grey-medium" />
                  <span className="text-grey-medium">{label}</span>
                </div>
                <span className="font-medium text-grey">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Days Left Card */}
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
    </div>
  );
};

export default YourSubscription;
