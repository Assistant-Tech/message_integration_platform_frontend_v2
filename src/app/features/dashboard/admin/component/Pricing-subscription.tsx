import { useMemo, useState } from "react";
import { Box, Flex, RadioGroup } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { cn } from "@/app/utils/cn";
import { usePlans } from "@/app/hooks/usePlans";
import { usePricingStore } from "@/app/store/pricing.store";
import { useAuthStore } from "@/app/store/auth.store";
import { PricingcardSubscription } from "@/app/features/dashboard/admin/component";
import { Badge, DynamicToggle } from "@/app/components/ui";
import { Plan, Duration, APIDuration, PlanType } from "@/app/types/plan.types";
import { extractFeatures } from "@/app/utils/helper";
import { buildBillingUrl } from "@/app/constants/routes";

const PricingSubscription = () => {
  const navigate = useNavigate();
  const orgSlug = useAuthStore((state) => state.tenantSlug);

  const { currency, duration, setCurrency, setDuration } = usePricingStore();
  const {
    data: fetchedPlans = [],
    isLoading,
    isError,
  } = usePlans(duration, currency);

  const [selectedPlan, setSelectedPlan] = useState<PlanType>();

  const transformPlan = (plan: Plan) => ({
    ...plan,
    title: plan.name,
    subtitle: plan.description,
    price: `${plan.currency === "NPR" ? "रु" : "$"}${plan.totalAmount}`,
    buttonText: plan.totalAmount === 0 ? "Contact Us" : "Choose Plan",
    features: extractFeatures(plan.features),
  });

  const plans = useMemo(() => {
    if (!fetchedPlans || !Array.isArray(fetchedPlans)) return [];
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

  const handlePlanSelect = (plan: PlanType) => {
    setSelectedPlan(plan);
    const billingUrl = orgSlug
      ? buildBillingUrl(orgSlug, plan.id, duration, currency)
      : `/admin/settings/subscription/billing?planId=${plan.id}&interval=${duration}&currency=${currency}`;
    navigate(billingUrl);
  };

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

        {/* ✅ Fixed NPR/USD toggle (same as Upgrade) */}
        <Flex justify="end" align="center" className="py-4 gap-6">
          <RadioGroup.Root
            value={currency}
            onValueChange={(val: any) => setCurrency(val as any)}
            className="flex items-center justify-end gap-6"
          >
            {["NPR", "USD"].map((cur) => (
              <label
                key={cur}
                className={cn(
                  "flex items-center gap-2 cursor-pointer transition-colors",
                  currency === cur
                    ? "text-primary font-medium"
                    : "text-gray-600 hover:text-primary/70",
                )}
              >
                <RadioGroup.Item
                  value={cur}
                  id={cur.toLowerCase()}
                  className="w-4 h-4 rounded-full border border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span>{cur === "NPR" ? "Nepal (रु)" : "USD ($)"}</span>
              </label>
            ))}
          </RadioGroup.Root>
        </Flex>
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
                <PricingcardSubscription
                  key={plan.id}
                  plan={plan}
                  duration={duration.toLowerCase() as Duration}
                  onSelect={() => handlePlanSelect(plan)}
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
                    <PricingcardSubscription
                      plan={plan}
                      duration={duration.toLowerCase() as Duration}
                      onSelect={() => handlePlanSelect(plan)}
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

export default PricingSubscription;
