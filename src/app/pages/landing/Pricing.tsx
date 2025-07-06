import { useMemo } from "react";
import { Box, Flex, RadioGroup } from "@radix-ui/themes";
import { cn } from "@/app/utils/cn";
import { usePlans } from "@/app/hooks/usePlans";
import { usePricingStore } from "@/app/store/pricingStore";
import { PricingCard } from "@/app/components/common";
import { Badge, DynamicToggle } from "@/app/components/ui";
import { Plan, Duration, APIDuration } from "@/app/types/plan";
import { extractFeatures } from "@/app/utils/helper";

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
    { id: "MONTHLY", label: "Monthly", value: "MONTHLY" },
    {
      id: "YEARLY",
      label: "Bill Yearly",
      value: "YEARLY",
      extraLabel: "Save 10%",
    },
  ];

  return (
    <Box className="px-6 md:px-2 max-w-full mx-auto">
      <Flex direction="column" align="center" gap="3" mb="6">
        <article className="flex flex-col items-center text-center space-y-4">
          <Badge title="PLANS TAILORED TO YOUR NEEDS" />
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
          <Flex justify="end" align="center" className="py-4 gap-4">
            {["NPR", "USD"].map((cur) => (
              <Flex key={cur} direction="row" align="center" gap="2">
                <RadioGroup.Item value={cur} id={cur.toLowerCase()} />
                <label
                  className={cn(
                    currency === cur ? "text-primary" : "text-base-black",
                    "body-regular-16 cursor-pointer lowercase",
                  )}
                >
                  {cur === "NPR" ? "Nepal (रु)" : "USD ($)"}
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
          <div className="text-center py-10 text-red-500">
            Failed to load plans.
          </div>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
              {plans.map((plan: any) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  duration={duration.toLowerCase() as Duration}
                />
              ))}
            </div>

            <div className="md:hidden overflow-x-auto px-4 -mx-4">
              <div className="flex gap-4 w-max">
                {plans.map((plan: any) => (
                  <div
                    key={plan.id}
                    className="min-w-[85%] max-w-[85%] sm:min-w-[75%] sm:max-w-[75%]"
                  >
                    <PricingCard
                      plan={plan}
                      duration={duration.toLowerCase() as Duration}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Box>
  );
};

export default Pricing;
