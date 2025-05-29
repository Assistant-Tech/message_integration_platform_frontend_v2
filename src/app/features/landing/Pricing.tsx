import { Badge, DynamicToggle } from "@/app/components/ui";
import { cn } from "@/app/utils/cn";
import { Box, Flex, RadioGroup } from "@radix-ui/themes";
import { useState } from "react";
// import { Check } from "lucide-react";
import { pricingData } from "@/app/mock/mockData";
import { PricingCard } from "@/app/components/common";

const Pricing = () => {
  const [currency, setCurrency] = useState<"USD" | "NPR">("NPR");
  const [duration, setDuration] = useState<"monthly" | "yearly">("monthly");

  const pricingOptions = [
    { id: "monthly", label: "Monthly", value: "monthly" },
    { id: "yearly", label: "Yearly", value: "yearly" },
  ];

  const plans = pricingData[currency][duration];

  return (
    <Box className="px-6 max-w-full mx-auto">
      {/* Top typo && Badge section */}
      <Flex direction="column" align="center" gap="3" mb="6">
        <article className="flex flex-col items-center justify-center max-w-4xl text-center space-y-4">
          <Badge title="PLANS TAILORED TO YOUR NEEDS" />
          <h1 className="h2-bold-40 text-grey">Discover Plans For You</h1>
          <p className="h4-regular-24 text-grey-medium">
            Whether you're just starting out or ready to scale, we have a plan
            designed to fit your goals. Choose the one that works best for you
            and get started.
          </p>
        </article>

        {/* Toggle for Monthly / Yearly */}
        <div className="py-6">
          <DynamicToggle
            options={pricingOptions}
            defaultSelected="monthly"
            onChange={(selected) =>
              setDuration(selected.value as "monthly" | "yearly")
            }
            variant="primary"
            size="lg"
          />
        </div>

        {/* Toggle for currency */}
        <RadioGroup.Root
          value={currency}
          onValueChange={(val) => setCurrency(val as "NPR" | "USD")}
          className="w-full"
        >
          <Flex gap="4" justify="end" align="center">
            <Flex direction="row" align="center" gap="2">
              <RadioGroup.Item value="NPR" id="npr" />
              <label
                htmlFor="npr"
                className={cn(
                  currency === "NPR" ? "text-primary" : "text-base-black",
                  "body-regular-16 cursor-pointer",
                )}
              >
                Nepal (रु)
              </label>
            </Flex>
            <Flex direction="row" align="center" gap="2">
              <RadioGroup.Item value="USD" id="usd" />
              <label
                htmlFor="usd"
                className={cn(
                  currency === "USD" ? "text-primary" : "text-base-black",
                  "body-regular-16 cursor-pointer",
                )}
              >
                USD ($)
              </label>
            </Flex>
          </Flex>
        </RadioGroup.Root>
      </Flex>

      {/* Pricing Card Section */}
      <div className="w-full">
        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} duration={duration} />
          ))}
        </div>

        {/* Mobile/Tablet: Horizontal slider */}
        <div className="md:hidden overflow-x-auto px-4 -mx-4">
          <div className="flex gap-4 w-max">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="min-w-[85%] max-w-[85%] sm:min-w-[75%] sm:max-w-[75%]"
              >
                <PricingCard plan={plan} duration={duration} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Pricing;
