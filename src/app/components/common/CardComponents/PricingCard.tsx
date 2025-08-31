import { Check } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { Button } from "@/app/components/ui";
import { Plan } from "@/app/types/plan.types";
import { usePricingCardData } from "@/app/hooks/usePricingCardData";

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
  // Use the custom hook to get all the data needed for rendering
  const {
    displayTitle,
    displayFeatures,
    displayPrice,
    buttonText,
    priceSuffix,
    cardIsPopular,
    checkoutUrl,
    subtitle,
  } = usePricingCardData({ plan, duration });

  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 sm:p-8 transition-all duration-300 w-full h-full",
        cardIsPopular
          ? "bg-primary text-white transform scale-105 shadow-2xl shadow-primary/25 border-2 border-primary-light z-10 overflow-hidden"
          : "bg-white border-2 border-grey-light shadow-lg hover:shadow-xl",
        "min-w-[280px] max-w-sm md:max-w-full flex-shrink-0",
      )}
      style={
        cardIsPopular
          ? {
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }
          : {}
      }
    >
      {cardIsPopular && (
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
            cardIsPopular ? "text-white drop-shadow-sm" : "text-gray-900",
          )}
        >
          {displayTitle}
        </h3>
        <p
          className={cn(
            "text-sm mb-6",
            cardIsPopular ? "text-primary-light opacity-90" : "text-gray-600",
          )}
        >
          {subtitle}
        </p>

        <div
          className={cn(
            "w-full my-6",
            cardIsPopular
              ? "border border-primary-light/30"
              : "border border-grey-light",
          )}
        />

        <div className="h-full">
          <div
            className={cn(
              "h3-bold-32",
              cardIsPopular ? "text-white drop-shadow-sm" : "text-grey",
            )}
          >
            {displayPrice}
            <span className="ps-2">{priceSuffix}</span>
          </div>

          <Button
            className={cn(
              "w-full py-4 mt-4 font-semibold transition-all duration-200",
              cardIsPopular
                ? "bg-white text-primary hover:text-white hover:bg-primary-light shadow-lg hover:shadow-xl transform hover:scale-105"
                : "bg-primary text-white hover:text-primary hover:bg-base-white shadow-md hover:shadow-lg",
            )}
            label={buttonText}
            variant="primary"
            redirectTo={checkoutUrl}
          />
        </div>
      </div>

      <div
        className={cn(
          "w-full my-6",
          cardIsPopular
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
                cardIsPopular
                  ? "text-primary-light drop-shadow-sm"
                  : "text-primary",
              )}
            />
            <span
              className={cn(
                "text-sm",
                cardIsPopular
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
            cardIsPopular
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
