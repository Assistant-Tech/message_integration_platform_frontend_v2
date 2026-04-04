import { QUERY_KEYS } from "@/app/constants/queryKeys";
import {
  adaptApiMessage,
  fetchInboxMessages,
} from "@/app/services/messages.services";
import { InboxMessage } from "@/app/types/message.types";
import { useQuery } from "@tanstack/react-query";

/*
 * Fetch Inbox messages query
 */
export const useInboxMessagesQuery = (
  inboxId: string | null,
  limit: number = 30,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.MESSAGES(inboxId as string, limit),
    queryFn: async (): Promise<InboxMessage[]> => {
      if (!inboxId) return [];
      const res = await fetchInboxMessages(inboxId, limit);
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
    staleTime: 15_000,
  });
};
