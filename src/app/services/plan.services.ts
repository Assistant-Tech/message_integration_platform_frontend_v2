import api from "@/app/services/api/axios";
import { handleApiError } from "@/app/utils/handlerApiError";
import { PlanType } from "@/app/types/plan.types";

/**
 * Fetch all plans
 */
export const fetchPlans = async () => {
  try {
    const res = await api.get("/plans");
    return res.data?.data ?? [];
  } catch (error) {
    throw handleApiError(error);
  }
};

export type IntervalType = "MONTHLY" | "YEARLY";
export type CurrencyType = "USD" | "NPR";

/**
 * Fetch a plan by ID with interval and currency options
 */
export const fetchPlanById = async (
  planId: string,
  interval: IntervalType,
  currency: CurrencyType,
): Promise<PlanType> => {
  try {
    const res = await api.get(
      `/plans/${planId}?currency=${currency}&interval=${interval}`,
    );

    let planData: PlanType = res.data?.data;
    // console.log("🚀 ~ fetchPlanById ~ raw:", res.data);

    // --- Ensure interval is consistent ---
    if (planData.interval !== interval) {
      if (interval === "MONTHLY" && planData.interval === "YEARLY") {
        planData = {
          ...planData,
          interval: "MONTHLY",
          name: planData.name?.replace("YEARLY", "MONTHLY"),
          description: planData.description?.replace("Yearly", "Monthly"),
          totalAmount: Math.round(planData.totalAmount / 12),
          durationInDays: 30,
        };
      } else if (interval === "YEARLY" && planData.interval === "MONTHLY") {
        planData = {
          ...planData,
          interval: "YEARLY",
          name: planData.name?.replace("MONTHLY", "YEARLY"),
          description: planData.description?.replace("Monthly", "Yearly"),
          totalAmount: planData.totalAmount * 12,
          durationInDays: 365,
        };
      } else {
        // fallback force
        planData.interval = interval;
      }
    }

    // --- Ensure currency is consistent ---
    if (!planData.currency || planData.currency !== currency) {
      // console.warn("⚠️ API returned wrong currency, overriding:", {
      //   expected: currency,
      //   received: planData.currency,
      // });
      planData.currency = currency;
    }

    return planData;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Apply a promo code for a plan
 */
export const applyPromoCode = async (
  planId: string,
  promoCode: string,
): Promise<{ discountAmount: number; finalAmount: number }> => {
  try {
    const res = await api.post(`/plans/${planId}/apply-promo`, { promoCode });
    return res.data?.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
