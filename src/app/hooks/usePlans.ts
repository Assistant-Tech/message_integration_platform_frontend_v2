import { useQuery } from "@tanstack/react-query";
import { Plan, APIDuration, Currency } from "@/app/types/plan.types";
import api from "@/app/services/api/axios";

export const usePlans = (duration: APIDuration, currency: Currency) => {
  return useQuery<Plan[]>({
    queryKey: ["plans", duration, currency],
    queryFn: async () => {
      const { data } = await api.get<{
        message: string;
        success: boolean;
        data: Plan[];
      }>(`/plans?currency=${currency}&interval=${duration}`);
      if (!data.success) {
        throw new Error("Failed to fetch plans");
      }
      return data.data;
    },
    enabled: !!duration && !!currency,
    staleTime: 5 * 60 * 1000,
  });
};
