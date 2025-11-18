import { useQuery } from "@tanstack/react-query";
import { getAllInternalConversations } from "@/app/services/internal-converstion.services";

export const useInternalConversationsQuery = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ["internalConversations", page, limit],
    queryFn: () =>
      getAllInternalConversations({ page, limit, includeDefault: true }),
  });
};
