import { QUERY_KEYS } from "@/app/constants/queryKeys";
import { fetchInboxById, fetchInboxes } from "@/app/services/inbox.services";
import { useQuery } from "@tanstack/react-query";

/*
 * Fetch Inbox queries
 */
export const useInboxFetchAllQuery = (
  channelType = "INTERNAL",
  page: number = 1,
  limit: number = 20,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.INBOX(channelType, page, limit),
    queryFn: () => fetchInboxes(),
    staleTime: 10_000,
  });
};

/*
 * Fetch Inbox by Id query
 */
export const useInboxFetchByIdQuery = (inboxId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.INBOX_BY_ID(inboxId),
    queryFn: () => fetchInboxById(inboxId),
    staleTime: 60_000,
  });
};
