import { useQuery } from "@tanstack/react-query";
import { Plan, APIDuration, Currency } from "@/app/types/plan.types";
import api from "@/app/services/api/axios";

export const usePlans = (duration: APIDuration, currency: Currency) => {
  return useQuery<Plan[]>({
    queryKey: ["plans", duration, currency],
    queryFn: async () => {
      const { data } = await api.get<Plan[]>(
        `/plans?interval=${duration}&currency=${currency}`,
      );
      return data;
    },
    enabled: !!duration && !!currency,
    staleTime: 5 * 60 * 1000,
  });
};
