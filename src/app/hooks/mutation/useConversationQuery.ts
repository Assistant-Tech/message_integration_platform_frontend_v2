import { getAllInternalConversations } from "@/app/services/chat-api.services";
import { useQuery } from "@tanstack/react-query";

export const useInternalConversationsQuery = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ["internalConversations", page, limit],
    queryFn: () =>
      getAllInternalConversations({ page, limit, includeDefault: true }),
  });
  
};
