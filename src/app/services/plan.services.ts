import api from "@/app/services/api/axios";
import { handleApiError } from "@/app/utils/handlerApiError";
import { PlanType } from "@/app/types/plan.types";

/**
 * Fetch a plan by ID with interval and currency options
 */

export type IntervalType = "MONTHLY" | "YEARLY";
export type CurrencyType = "USD" | "NPR";

export const fetchPlanById = async (
  planId: string,
  interval: IntervalType,
  currency: CurrencyType,
): Promise<PlanType> => {
  try {
    const res = await api.get(
      `/plans/${planId}?interval=${interval}&currency=${currency}`,
    );
    let planData = res.data;

    // Fix interval mismatch
    if (planData.interval !== interval) {
      if (interval === "MONTHLY" && planData.interval === "YEARLY") {
        planData = {
          ...planData,
          interval: "MONTHLY",
          name: planData.name.replace("YEARLY", "MONTHLY"),
          description: planData.description.replace("Yearly", "Monthly"),
          amount: Math.round(planData.amount / 12),
          durationInDays: 30,
        };
      } else if (interval === "YEARLY" && planData.interval === "MONTHLY") {
        planData = {
          ...planData,
          interval: "YEARLY",
          name: planData.name.replace("MONTHLY", "YEARLY"),
          description: planData.description.replace("Monthly", "Yearly"),
          amount: planData.amount * 12,
          durationInDays: 365,
        };
      }
    }

    // Just warn if currency mismatch
    if (planData.currency !== currency) {
      console.warn("⚠️ API returned wrong currency:", {
        expected: currency,
        received: planData.currency,
      });
    }

    return planData;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * IMPLEMENT LATER ON DAYS
 * (Optional) Apply a promo code for a plan
 */
export const applyPromoCode = async (
  planId: string,
  promoCode: string,
): Promise<{ discountAmount: number; finalAmount: number }> => {
  try {
    const res = await api.post(`/plans/${planId}/apply-promo`, { promoCode });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
