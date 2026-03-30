import {
  adaptApiMessage,
  fetchInboxById,
  fetchInboxes,
  fetchInboxMessages,
} from "@/app/services/inbox.services";
import { ChannelType, InboxMessage } from "@/app/types/inbox.types";
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
      return res.data.items
        .filter((msg) => !msg.isDeleted)
        .map(adaptApiMessage);
    },
    enabled: Boolean(inboxId),
    staleTime: 30_000,
  });
};

/*
 * Fetch Inbox queries
 */
export const useInboxFetchAllQuery = (
  channelType: ChannelType = "INTERNAL",
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
