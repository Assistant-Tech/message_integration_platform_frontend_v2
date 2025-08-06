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
    <div className="w-full overflow-x-auto p-4 pb-20">
      <div className="min-w-[600px] sm:min-w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h3-bold-32 mb-6"
        >
          Compare Our Plans
        </motion.h2>

        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full table-auto border border-grey-light rounded-lg shadow-md"
        >
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left text-sm font-semibold text-gray-700 border-r border-grey-light min-w-[180px]">
                &nbsp;
              </th>
              {plans.map((plan, idx) => (
                <th
                  key={plan.name}
                  className={`p-4 text-center h4-bold-24 text-base-black ${
                    idx !== plans.length - 1 ? "border-r border-grey-light" : ""
                  }`}
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featuresList.map((feature) => (
              <tr key={feature} className="border-t border-grey-light">
                <td className="px-6 py-4 body-medium-16 text-grey-medium border-r border-grey-light">
                  {feature}
                </td>
                {plans.map((plan, idx) => {
                  const value = plan.features[feature];
                  const isBoolean = typeof value === "boolean";

                  return (
                    <td
                      key={plan.name + feature}
                      className={`px-6 py-4 text-center h5-medium-16 text-grey ${
                        idx !== plans.length - 1
                          ? "border-r border-grey-light"
                          : ""
                      }`}
                    >
                      {isBoolean ? (
                        value ? (
                          <div className="p-2 rounded-full bg-primary inline-flex items-center justify-center">
                            <Check className="text-white w-5 h-5" />
                          </div>
                        ) : (
                          <div className="p-2 rounded-full bg-danger inline-flex items-center justify-center">
                            <X className="text-white w-5 h-5" />
                          </div>
                        )
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
};

export default PricingPlansTable;
