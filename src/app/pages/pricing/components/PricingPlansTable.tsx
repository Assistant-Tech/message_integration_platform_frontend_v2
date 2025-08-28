import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { plans } from "@/app/utils/pricingTable";

const featuresList = [
  "Maximum number of chat apps",
  "Maximum number of staffs",
  "Send unlimited message",
  "Assign chats to team member",
  "View stats",
  "View team report",
  "Priority Email Support",
  "API access for custom support",
] as const;

const PricingPlansTable = () => {
  return (
    <div className="w-full p-4 pb-20">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="h3-bold-32 mb-8 text-center"
      >
        Compare Our Plans
      </motion.h2>

      {/* Responsive Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            className="border border-grey-light rounded-xl shadow-md p-6 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="h4-bold-24 text-center mb-4">{plan.name}</h3>
            <ul className="space-y-3 flex-1">
              {featuresList.map((feature) => {
                const value = plan.features[feature];
                const isBoolean = typeof value === "boolean";

                return (
                  <li
                    key={feature}
                    className="flex items-start justify-between text-sm text-grey-medium"
                  >
                    <span className="w-2/3 pr-2">{feature}</span>
                    <span className="w-1/3 text-right">
                      {isBoolean ? (
                        value ? (
                          <Check className="text-primary w-5 h-5 inline" />
                        ) : (
                          <X className="text-danger w-5 h-5 inline" />
                        )
                      ) : (
                        value
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlansTable;
