import { Check } from "lucide-react";

import { cn } from "@/app/utils/cn";
import { Button } from "@/app/components/ui";
import { Plan } from "@/app/types/plan";
import Ribbon from "@/app/pages/aboutus/components/Ribbon";

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
  const formatTitle = (rawTitle?: string): string => {
    if (!rawTitle) return "";
    return rawTitle
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getFeaturesList = (
    features: Record<string, string> | string[],
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
          ? "bg-primary text-white transform scale-105 shadow-2xl shadow-primary/25 border-2 border-primary-light z-10 overflow-visible"
          : "bg-white border-2 border-grey-light",
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
      {plan.isPopular && <Ribbon />}

      <div className="text-start">
        <h3
          className={cn(
            "h4-bold-24 mb-2",
            plan.isPopular ? "text-white drop-shadow-sm" : "text-grey",
          )}
        >
          {formatTitle(plan.title || plan.name)}
        </h3>
        <p
          className={cn(
            "body-medium-16 mb-6",
            plan.isPopular
              ? "text-primary-light opacity-90"
              : "text-grey-medium",
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
            {plan.amount !== 0 && (
              <span className="h5-regular-16 ps-px">/{duration}</span>
            )}
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
            redirectTo={`/checkout/${plan.id}`}
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
                  : "text-grey-medium",
              )}
            />
            <span
              className={cn(
                "h5-medium-16",
                plan.isPopular
                  ? "text-primary-light opacity-90"
                  : "text-grey-medium",
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
            "body-regular-underlined-16 transition-colors duration-200",
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
