import Pricing from "@/app/pages/landing/Pricing";
import { motion } from "framer-motion";
import { Calendar, CreditCard, Clock, DollarSign } from "lucide-react";

const YourSubscription = () => {
  const subscriptionData = {
    plan: "Basic Plan",
    type: "Monthly",
    amount: "Rs. 2000",
    purchaseDate: "06/17/2025",
    endDate: "07/17/2025",
    paymentMethod: "E-Sewa",
    status: "Active",
    daysLeft: 25,
    expiresDate: "Sep 04, 2025",
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subscription Details */}
        <motion.div
          className="lg:col-span-2 bg-white rounded-lg border border-grey-light p-6"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-grey">
              Subscription Detail
            </h2>
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {subscriptionData.status}
            </span>
          </div>

          <div className="space-y-4">
            {[
              { label: "Plan", value: subscriptionData.plan, icon: CreditCard },
              { label: "Type", value: subscriptionData.type, icon: Clock },
              {
                label: "Amount",
                value: subscriptionData.amount,
                icon: DollarSign,
              },
              {
                label: "Purchase Date",
                value: subscriptionData.purchaseDate,
                icon: Calendar,
              },
              {
                label: "End Date",
                value: subscriptionData.endDate,
                icon: Calendar,
              },
              {
                label: "Payment Method",
                value: subscriptionData.paymentMethod,
                icon: CreditCard,
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
                strokeDasharray={`${(subscriptionData.daysLeft / 30) * 282.7} 282.7`}
                strokeLinecap="round"
                className="text-teal-500 transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-bold text-grey mb-1">
                {subscriptionData.daysLeft}
              </span>
              <p className="text-sm font-medium text-grey-medium">days left</p>
            </div>
            <div className="absolute top-7 right-40 transform translate-x-1/2 -translate-y-1/2 bg-secondary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm">
              Day-5
            </div>
          </div>
          <div className="text-sm text-center">
            <p className="text-grey-medium mb-1">Expires:</p>
            <span className="text-danger font-bold">
              {subscriptionData.expiresDate}
            </span>
          </div>
        </motion.div>
      </div>
      
    </div>
  );
};

export default YourSubscription;
