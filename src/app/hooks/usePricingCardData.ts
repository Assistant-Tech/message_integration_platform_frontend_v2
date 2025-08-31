import { Plan } from "@/app/types/plan.types";

interface UsePricingCardDataProps {
  plan: Plan & {
    title?: string;
    subtitle?: string;
    price?: string;
    buttonText?: string;
    features?: Record<string, any> | string[];
  };
  duration: "monthly" | "yearly";
}

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

export const usePricingCardData = ({
  plan,
  duration,
}: UsePricingCardDataProps) => {
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

  const displayTitle = formatTitle(plan.title || plan.name);
  const displayFeatures = plan.features ? formatFeatures(plan.features) : [];
  const displayPrice =
    plan.price || `${plan.currency === "NPR" ? "रु" : "$"}${plan.amount}`;
  const buttonText =
    plan.buttonText || (plan.amount === 0 ? "Contact Us" : "Choose Plan");
  const priceSuffix = plan.amount !== 0 ? `/${duration}` : "";
  const cardIsPopular = !!plan.isPopular;

  return {
    displayTitle,
    displayFeatures,
    displayPrice,
    buttonText,
    priceSuffix,
    cardIsPopular,
    checkoutUrl: getCheckoutUrl(),
    subtitle: plan.subtitle || plan.description,
  };
};
