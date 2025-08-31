import { Check } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { Button } from "@/app/components/ui";
import { Plan } from "@/app/types/plan.types";

// 🔹 Utility to make keys human-readable
const toReadable = (key: string): string =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

// 🔹 Formatter for plan features
const formatFeatures = (features: Record<string, any> | string[]): string[] => {
  if (Array.isArray(features)) return features;

  const formatters: Record<string, (value: any) => string | string[] | null> = {
    includes: (v) => `Includes ${v} features`,
    channels: (v) => (Array.isArray(v) ? `Channels: ${v.join(", ")}` : null),
    chatAgents: (v) => `${v} Chat Agents`,
    integrations: (v) => `${v} Integrations`,
  };

  return Object.entries(features).flatMap(([key, value]) => {
    if (key in formatters) {
      return formatters[key]?.(value) ?? [];
    }
    if (typeof value === "boolean" && value) {
      return toReadable(key);
    }
    if (typeof value === "number") {
      return `${toReadable(key)}: ${value}`;
    }
    return [];
  });
};

interface PricingCardProps {
  plan: Plan & {
    title?: string;
    subtitle?: string;
    price?: string;
    buttonText?: string;
    features?: Record<string, any> | string[];
  };
  duration: "monthly" | "yearly";
}

const PricingCard = ({ plan, duration }: PricingCardProps) => {
  const formatTitle = (rawTitle?: string): string => {
    if (!rawTitle) return "";
    return rawTitle
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getInterval = () => (duration === "yearly" ? "YEARLY" : "MONTHLY");
  const getCurrency = () => plan.currency || "USD";

  const getCheckoutUrl = () => {
    const interval = getInterval();
    const currency = getCurrency();
    return `/checkout/${plan.id}?interval=${interval}&currency=${currency}`;
  };

  const displayFeatures = plan.features ? formatFeatures(plan.features) : [];
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
      style={
        plan.isPopular
          ? {
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }
          : {}
      }
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
            redirectTo={getCheckoutUrl()}
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

      <div className="my-6 px-8">
        <a
          href="#"
          className={cn(
            "text-sm underline transition-colors duration-200",
            plan.isPopular
              ? "text-primary-light/80 hover:text-white"
              : "text-grey hover:text-grey-medium",
          )}
        >
          Learn more
        </a>
      </div>
    </div>
  );
};

export default PricingCard;
