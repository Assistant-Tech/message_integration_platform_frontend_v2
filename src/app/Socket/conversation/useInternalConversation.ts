import { getAllInternalConversations } from "@/app/services/internal-converstion.services";
import { useQuery } from "@tanstack/react-query";

export const useInternalConversations = () => {
  return useQuery({
    queryKey: ["internalConversations"],
    queryFn: () => getAllInternalConversations,
    staleTime: 1000 * 60 * 2,
  });
};
