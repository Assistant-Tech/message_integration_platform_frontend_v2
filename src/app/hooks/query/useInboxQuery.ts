import { fetchInboxById, fetchInboxes } from "@/app/services/inbox.services";
import {
  adaptApiMessage,
  fetchInboxMessages,
} from "@/app/services/messages.services";
import { InboxMessage } from "@/app/types/inbox.types";
import { useQuery } from "@tanstack/react-query";

/*
 * Fetch Inbox messages query
 */
export const useInboxMessagesQuery = (inboxId: string | null) => {
  return useQuery({
    queryKey: ["inboxMessages", inboxId],
    queryFn: async (): Promise<InboxMessage[]> => {
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

/*
 * Fetch Inbox queries
 */
export const useInboxFetchAllQuery = (
  channelType = "INTERNAL",
  page: number = 1,
  limit: number = 20,
) => {
  return useQuery({
    queryKey: ["inbox", channelType, page, limit],
    queryFn: () => fetchInboxes(),
    staleTime: 60_000,
  });
};

/*
 * Fetch Inbox by Id query
 */
export const useInboxFetchByIdQuery = (inboxId: string) => {
  return useQuery({
    queryKey: ["inboxById", inboxId],
    queryFn: () => fetchInboxById(inboxId),
    staleTime: 60_000,
  });
};
