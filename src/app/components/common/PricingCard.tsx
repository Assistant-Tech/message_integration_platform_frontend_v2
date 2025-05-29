// components/PricingCard.tsx
import { Check } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { Button } from "@/app/components/ui";
import { Plan } from "@/app/types/types";

interface PricingCardProps {
  plan: Plan;
  duration: "monthly" | "yearly";
}

const PricingCard = ({ plan, duration }: PricingCardProps) => {
  return (
    <div
      className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-300 w-full h-full ${
        plan.isPopular
          ? "bg-primary text-white transform scale-105"
          : "bg-white border-2 border-grey-light"
      }`}
    >
      {plan.isPopular && (
        <div className="absolute -top-3 -right-3 w-36 h-36 overflow-hidden">
          <div className="absolute transform rotate-45 bg-secondary text-white text-xs font-semibold py-1 w-[140%] top-6 right-[-40%] text-center shadow-lg">
            Most Popular
          </div>
        </div>
      )}

      <div className="text-start">
        <h3
          className={cn(
            "text-2xl font-bold mb-2",
            plan.isPopular ? "text-white" : "text-gray-900",
          )}
        >
          {plan.title}
        </h3>
        <p
          className={cn(
            "text-sm mb-6",
            plan.isPopular ? "text-primary-light" : "text-gray-600",
          )}
        >
          {plan.subtitle}
        </p>

        <div className="w-full border border-grey-light my-6" />

        <div className="h-full">
          <div
            className={cn(
              "h3-bold-32",
              plan.isPopular ? "text-white" : "text-grey",
            )}
          >
            {plan.price}
            {plan.price !== "Custom Pricing" && (
              <span className="ps-2">/{duration}</span>
            )}
          </div>
          <Button
            className={cn(
              "w-full py-4 mt-4",
              plan.isPopular
                ? "bg-white text-primary hover:text-white hover:bg-primary"
                : "bg-primary text-white hover:text-primary hover:bg-base-white",
            )}
            label={plan.buttonText}
            variant="primary"
          />
        </div>
      </div>

      <div className="w-full border border-grey-light my-6" />

      <ul className="space-y-4">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check
              className={cn(
                "w-5 h-5 mt-0.5 flex-shrink-0",
                plan.isPopular ? "text-primary-light" : "text-primary",
              )}
            />
            <span
              className={cn(
                "text-sm",
                plan.isPopular ? "text-primary-light" : "text-gray-600",
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className="my-6 px-8">
        <a
          href="#"
          className={cn(
            "text-sm underline",
            plan.isPopular
              ? "text-primary-light hover:text-white"
              : "text-grey hover:text-grey-medium",
          )}
        >
          Learn mze
        </a>
      </div>
    </div>
  );
};

export default PricingCard;
