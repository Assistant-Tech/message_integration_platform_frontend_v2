import { QUERY_KEYS } from "@/app/constants/queryKeys";
import {
  adaptApiMessage,
  fetchInboxMessages,
} from "@/app/services/messages.services";
import { MessageResponse } from "@/app/types/inbox.types";
import { useQuery } from "@tanstack/react-query";

/*
 * Fetch Inbox messages query
 */
export const useInboxMessagesQuery = (inboxId: string | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.MESSAGES(inboxId as string),
    queryFn: async (): Promise<MessageResponse[]> => {
      if (!inboxId) return [];
      const res = await fetchInboxMessages(inboxId);
      try {
        return res.data.items
          .filter((msg) => !msg.isDeleted)
          .map(adaptApiMessage);
      } catch (err) {
        console.error("adaptApiMessage failed", err);
        return [];
      }
    },
    enabled: Boolean(inboxId),
    staleTime: 30_000,
  });
};
