import { useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Flex, RadioGroup } from "@radix-ui/themes";
import { cn } from "@/app/utils/cn";
import { usePlans } from "@/app/hooks/usePlans";
import { usePricingStore } from "@/app/store/pricing.store";
import { PricingCard } from "@/app/components/common";
import { Badge, Button, DynamicToggle } from "@/app/components/ui";
import { Plan, Duration, APIDuration } from "@/app/types/plan.types";
import { extractFeatures } from "@/app/utils/helper";
import { Check } from "lucide-react";
import Ribbon from "../aboutus/components/Ribbon";

const Pricing = () => {
  const { currency, duration, setCurrency, setDuration } = usePricingStore();

  const {
    data: fetchedPlans = [],
    isLoading,
    isError,
  } = usePlans(duration, currency);

  const transformPlan = (plan: Plan) => ({
    ...plan,
    title: plan.name,
    subtitle: plan.description,
    price: `${plan.currency === "NPR" ? "रु" : "$"}${plan.amount}`,
    buttonText: plan.amount === 0 ? "Contact Us" : "Choose Plan",
    features: extractFeatures(plan.features),
  });

  const plans = useMemo(() => {
    if (!fetchedPlans || !Array.isArray(fetchedPlans)) {
      return [];
    }
    return fetchedPlans.map(transformPlan);
  }, [fetchedPlans]);

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

        <div className="pt-6">
          <DynamicToggle
            options={pricingOptions}
            defaultSelected={duration}
            onChange={(val) => setDuration(val.value as APIDuration)}
          />
        </div>

        <RadioGroup.Root
          value={currency}
          onValueChange={(val) => setCurrency(val as any)}
          color="teal"
          className="w-full pb-4 md:pb-8"
        >
          <Flex justify="end" align="center" className="pt-4 gap-4">
            {["NPR", "USD"].map((cur) => (
              <Flex key={cur} direction="row" align="center" gap="2">
                <RadioGroup.Item value={cur} id={cur.toLowerCase()} />
                <label
                  className={cn(
                    currency === cur ? "text-primary" : "text-base-black",
                    "body-regular-16 cursor-pointer",
                  )}
                >
                  {cur === "NPR" ? "NPL (रु)" : "USD ($)"}
                </label>
              </Flex>
            ))}
          </Flex>
        </RadioGroup.Root>
      </Flex>

      <div className="w-full">
        {isLoading ? (
          <div className="text-center py-10">Loading plans...</div>
        ) : isError ? (
          <div className="text-center py-10 text-danger">
            Failed to load plans.
          </div>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-12">
              {plans.map((plan: any) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  duration={duration.toLowerCase() as Duration}
                />
              ))}
            </div>

            <div className="md:hidden px-4 overflow-hidden">
              <motion.div
                className="flex gap-4"
                drag="x"
                dragConstraints={{ left: -500, right: 0 }}
                dragElastic={0.2}
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {plans.map((plan: any) => (
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
                        {plan.title
                          .replace(/_/g, " ")
                          .toLowerCase()
                          .replace(/\b\w/g, (c: string) => c.toUpperCase())}
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
                      {plan.features
                        ?.filter(
                          (value: string, index: number, self: string[]) =>
                            self.indexOf(value) === index,
                        )
                        .map((feature: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span
                              className={cn(
                                "font-bold",
                                plan.isPopular
                                  ? "text-white"
                                  : "text-grey-medium",
                              )}
                            >
                              <Check size={20} />
                            </span>
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
