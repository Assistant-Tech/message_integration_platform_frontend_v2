import { useQuery } from "@tanstack/react-query";
import { Plan, APIDuration, Currency } from "@/app/types/plan";
import api from "@/app/services/api/api";

export const usePlans = (duration: APIDuration, currency: Currency) => {
  return useQuery({
    queryKey: ["plans", duration, currency],
    queryFn: async () => {
      const { data } = await api.get(
        `/plans?interval=${duration}&currency=${currency}`,
      );
      return data as Plan[];
    },
    staleTime: 5 * 60 * 1000,
  });
};
