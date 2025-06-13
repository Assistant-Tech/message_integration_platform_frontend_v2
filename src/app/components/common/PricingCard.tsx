import { Check } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { Button } from "@/app/components/ui";
import { Plan } from "@/app/types/plan";

interface PricingCardProps {
  plan: Plan & {
    title?: string;
    subtitle?: string;
    price?: string;
    buttonText?: string;
    features?: string[];
  };
  duration: "monthly" | "yearly";
}

const PricingCard = ({ plan, duration }: PricingCardProps) => {
  // console.log("🚀 ~ PricingCard ~ plan:", plan);

  const formatTitle = (rawTitle?: string): string => {
    if (!rawTitle) return "";
    return rawTitle
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getFeaturesList = (
    features: Record<string, any> | string[],
  ): string[] => {
    if (Array.isArray(features)) return features;

    const featuresList: string[] = [];
    Object.entries(features).forEach(([key, value]) => {
      if (key === "includes") {
        featuresList.push(`Includes ${value} features`);
      } else if (key === "channels" && Array.isArray(value)) {
        featuresList.push(`Channels: ${value.join(", ")}`);
      } else if (key === "chatAgents") {
        featuresList.push(`${value} Chat Agents`);
      } else if (key === "integrations") {
        featuresList.push(`${value} Integrations`);
      } else if (typeof value === "boolean" && value) {
        const readableKey = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        featuresList.push(readableKey);
      } else if (typeof value === "number") {
        const readableKey = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        featuresList.push(`${readableKey}: ${value}`);
      }
    });

    return featuresList;
  };

  const displayFeatures = plan.features ? getFeaturesList(plan.features) : [];
  const displayPrice =
    plan.price || `${plan.currency === "NPR" ? "रु" : "$"}${plan.amount}`;
  const buttonText =
    plan.buttonText || (plan.amount === 0 ? "Contact Us" : "Choose Plan");

  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 sm:p-8 transition-all duration-300 w-full h-full",
        plan.isPopular
          ? "bg-primary text-white transform scale-105"
          : "bg-white border-2 border-grey-light",
        "min-w-[280px] max-w-sm md:max-w-full flex-shrink-0",
      )}
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
          {formatTitle(plan.title || plan.name)}
        </h3>
        <p
          className={cn(
            "text-sm mb-6",
            plan.isPopular ? "text-primary-light" : "text-gray-600",
          )}
        >
          {plan.subtitle || plan.description}
        </p>

        <div className="w-full border border-grey-light my-6" />

        <div className="h-full">
          <div
            className={cn(
              "h3-bold-32",
              plan.isPopular ? "text-white" : "text-grey",
            )}
          >
            {displayPrice}
            {plan.amount !== 0 && <span className="ps-2">/{duration}</span>}
          </div>
          <Button
            className={cn(
              "w-full py-4 mt-4",
              plan.isPopular
                ? "bg-white text-primary hover:text-white hover:bg-primary"
                : "bg-primary text-white hover:text-primary hover:bg-base-white",
            )}
            label={buttonText}
            variant="primary"
          />
        </div>
      </div>

      <div className="w-full border border-grey-light my-6" />

      <ul className="space-y-4">
        {displayFeatures.map((feature: string, i: number) => (
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
          Learn more
        </a>
      </div>
    </div>
  );
};

export default PricingCard;
