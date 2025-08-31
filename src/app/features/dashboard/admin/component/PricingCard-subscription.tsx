import { Check } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { Button } from "@/app/components/ui";
import { Plan } from "@/app/types/plan.types";

interface PricingCardProps {
  plan: Plan & {
    title?: string;
    subtitle?: string;
    price?: string;
    buttonText?: string;
    features?: string[];
  };
  duration: "monthly" | "yearly";
  onSelect?: () => void; // new
}

const PricingcardSubscription = ({
  plan,
  duration,
  onSelect,
}: PricingCardProps) => {
  const formatTitle = (rawTitle?: string): string => {
    if (!rawTitle) return "";
    return rawTitle
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const displayFeatures = Array.isArray(plan.features) ? plan.features : [];
  const displayPrice =
    plan.price || `${plan.currency === "NPR" ? "रु" : "$"}${plan.amount}`;
  const buttonText =
    plan.buttonText || (plan.amount === 0 ? "Contact Us" : "Choose Plan");

  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 sm:p-8 transition-all duration-300 w-full h-full",
        plan.isPopular
          ? "bg-primary text-white transform scale-105 shadow-2xl shadow-primary/25 border-2 border-primary-light z-10 overflow-hidden"
          : "bg-white border-2 border-grey-light shadow-lg hover:shadow-xl",
        "min-w-[280px] max-w-sm md:max-w-full flex-shrink-0",
      )}
    >
      {plan.isPopular && (
        <div className="absolute -top-0 -right-0 z-20 overflow-hidden w-32 h-32">
          <div className="absolute transform rotate-45 bg-orange-500 text-white text-xs font-bold py-2 px-1 w-[140px] top-[22px] right-[-35px] text-center shadow-lg">
            Most Popular
          </div>
        </div>
      )}

      <div className="text-start">
        <h3
          className={cn(
            "text-2xl font-bold mb-2",
            plan.isPopular ? "text-white drop-shadow-sm" : "text-gray-900",
          )}
        >
          {formatTitle(plan.title || plan.name)}
        </h3>
        <p
          className={cn(
            "text-sm mb-6",
            plan.isPopular ? "text-primary-light opacity-90" : "text-gray-600",
          )}
        >
          {plan.subtitle || plan.description}
        </p>

        <div
          className={cn(
            "w-full my-6",
            plan.isPopular
              ? "border border-primary-light/30"
              : "border border-grey-light",
          )}
        />

        <div className="h-full">
          <div
            className={cn(
              "h3-bold-32",
              plan.isPopular ? "text-white drop-shadow-sm" : "text-grey",
            )}
          >
            {displayPrice}
            {plan.amount !== 0 && <span className="ps-2">/{duration}</span>}
          </div>
          <Button
            className={cn(
              "w-full py-4 mt-4 font-semibold transition-all duration-200",
              plan.isPopular
                ? "bg-white text-primary hover:text-white hover:bg-primary-light shadow-lg hover:shadow-xl transform hover:scale-105"
                : "bg-primary text-white hover:text-primary hover:bg-base-white shadow-md hover:shadow-lg",
            )}
            label={buttonText}
            variant="primary"
            onClick={onSelect} // ✅ open dialog
          />
        </div>
      </div>

      <div
        className={cn(
          "w-full my-6",
          plan.isPopular
            ? "border border-primary-light/30"
            : "border border-grey-light",
        )}
      />

      <ul className="space-y-4">
        {displayFeatures.map((feature: string, i: number) => (
          <li key={i} className="flex items-start gap-3">
            <Check
              className={cn(
                "w-5 h-5 mt-0.5 flex-shrink-0",
                plan.isPopular
                  ? "text-primary-light drop-shadow-sm"
                  : "text-primary",
              )}
            />
            <span
              className={cn(
                "text-sm",
                plan.isPopular
                  ? "text-primary-light opacity-90"
                  : "text-gray-600",
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingcardSubscription;
