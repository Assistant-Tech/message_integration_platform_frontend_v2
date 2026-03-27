import { useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Flex } from "@radix-ui/themes";
import { cn } from "@/app/utils/cn";
import { usePlans } from "@/app/hooks/usePlans";
import { usePricingStore } from "@/app/store/pricing.store";
import { PricingCard } from "@/app/components/common";
import { Badge, Button, DynamicToggle } from "@/app/components/ui";
import { Plan, Duration, APIDuration, Currency } from "@/app/types/plan.types";
import { extractFeatures } from "@/app/utils/helper";
import { Check } from "lucide-react";
import Ribbon from "../aboutus/components/Ribbon";
import * as RadioGroup from "@radix-ui/react-radio-group";

const Pricing = () => {
  const { currency, duration, setCurrency, setDuration } = usePricingStore();
  const { data, isLoading, isError } = usePlans(duration, currency);

  const formatTitle = (title: string) =>
    title
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const transformPlan = (plan: Plan) => {
    const displayAmount = (plan.totalAmount || 0) / 100;

    return {
      ...plan,
      title: formatTitle(plan.name),
      subtitle: plan.description,
      price: `${plan.currency === "NPR" ? "रु" : "$"}${displayAmount}`,
      buttonText: displayAmount === 0 ? "Contact Us" : "Choose Plan",
      features: extractFeatures(plan.features),
    };
  };

  const plans = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map(transformPlan);
  }, [data]);

  const pricingOptions = [
    {
      id: "YEARLY",
      label: "Bill Yearly",
      value: "YEARLY",
      extraLabel: "Save 10%",
    },
    { id: "MONTHLY", label: "Monthly", value: "MONTHLY" },
  ];

  return (
    <Box className="px-6 md:px-2 max-w-full mx-auto">
      <Flex direction="column" align="center" gap="3" mb="6">
        <div className="flex flex-col items-center text-center space-y-4">
          <article className="flex flex-col items-center text-center space-y-4">
            <Badge
              title="PLANS TAILORED TO YOUR NEEDS"
              textStyle="body-italic-bold-16"
            />
            <h1 className="h2-bold-40 text-grey">Discover Plans For You</h1>
            <p className="h4-regular-24 text-grey-medium">
              Whether you're just starting out or ready to scale, we have a plan
              designed to fit your goals.
            </p>
          </article>

          <DynamicToggle
            options={pricingOptions}
            defaultSelected={duration}
            onChange={(val) => setDuration(val.value as APIDuration)}
          />

          <div className="flex flex-col items-end gap-4 pb-4 w-full">
            {/* 💱 Currency Toggle - Centered & Inline */}
            <RadioGroup.Root
              value={currency}
              onValueChange={(val) => setCurrency(val as Currency)}
              className="flex gap-6 justify-end items-end"
            >
              {["NPR", "USD"].map((cur) => (
                <label
                  key={cur}
                  htmlFor={cur.toLowerCase()}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <RadioGroup.Item
                    value={cur}
                    id={cur.toLowerCase()}
                    className={cn(
                      "relative flex items-center justify-center",
                      "w-4 h-4 rounded-full border border-gray-400",
                      "data-[state=checked]:border-primary",
                    )}
                  >
                    <RadioGroup.Indicator className="absolute w-2 h-2 bg-primary rounded-full" />
                  </RadioGroup.Item>
                  <span
                    className={cn(
                      currency === cur ? "text-primary" : "text-base-black",
                      "body-regular-16",
                    )}
                  >
                    {cur === "NPR" ? "NPR (रु)" : "USD ($)"}
                  </span>
                </label>
              ))}
            </RadioGroup.Root>
          </div>
        </div>
      </Flex>

      {/* 📝 Plans List */}
      <div className="w-full">
        {isLoading ? (
          <div className="text-center py-10">Loading plans...</div>
        ) : isError ? (
          <div className="text-center py-10 text-danger">
            Failed to load plans.
          </div>
        ) : (
          <>
            {/* 💻 Desktop Grid */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-12">
              {plans.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  duration={duration.toLowerCase() as Duration}
                />
              ))}
            </div>

            {/* 📱 Mobile Carousel */}
            <div className="md:hidden px-4 overflow-hidden">
              <motion.div
                className="flex gap-4"
                drag="x"
                dragConstraints={{ left: -plans.length * 280, right: 0 }}
                dragElastic={0.2}
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {plans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    className={cn(
                      "relative min-w-[85%] max-w-[85%] flex-shrink-0 rounded-2xl border p-6 shadow-sm",
                      plan.isPopular
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-grey border-gray-200",
                    )}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.isPopular && <Ribbon />}
                    <div className="mb-4">
                      <h2
                        className={cn(
                          "h5-bold-16",
                          plan.isPopular ? "text-white" : "text-grey",
                        )}
                      >
                        {plan.title}
                      </h2>
                      <p
                        className={cn(
                          "label-medium-14",
                          plan.isPopular ? "text-white/80" : "text-grey-medium",
                        )}
                      >
                        {plan.subtitle}
                      </p>
                    </div>

                    <div
                      className={cn(
                        "h5-bold-16 mb-4 pt-4 border-t-2",
                        plan.isPopular
                          ? "border-white text-white"
                          : "border-grey-light text-grey",
                      )}
                    >
                      {plan.price}
                    </div>

                    <Button
                      label={plan.buttonText}
                      className={cn(
                        "mb-6 w-full py-2",
                        plan.isPopular
                          ? "bg-white text-primary hover:bg-white/90"
                          : "",
                      )}
                    />

                    <ul
                      className={cn(
                        "space-y-3 label-medium-14",
                        plan.isPopular ? "text-white/90" : "text-grey",
                      )}
                    >
                      {plan.features?.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check
                            size={20}
                            className={cn(
                              plan.isPopular
                                ? "text-white"
                                : "text-grey-medium",
                            )}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="/pricing"
                      className={cn(
                        "block mt-6 label-regular-14 underline ps-7 text-left",
                        plan.isPopular ? "text-white/80" : "text-grey-medium",
                      )}
                    >
                      Learn more
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </>
        )}
      </div>
    </Box>
  );
};

export default Pricing;
