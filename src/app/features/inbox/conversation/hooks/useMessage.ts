import { useEffect, useMemo, useState } from "react";
import { useInboxMessagesQuery } from "@/app/hooks/query/useMessageQuery";

const INITIAL_LIMIT = 30;
const LOAD_MORE_STEP = 30;

export const useMessage = (conversationId: string | null) => {
  const [limit, setLimit] = useState(INITIAL_LIMIT);

  useEffect(() => {
    setLimit(INITIAL_LIMIT);
  }, [conversationId]);

  const { data, isLoading, isError, isFetching } = useInboxMessagesQuery(
    conversationId,
    limit,
  );

  const messages = useMemo(
    () =>
      (data ?? []).sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      ),
    [data],
  );

  const canLoadMore = Boolean(conversationId) && messages.length >= limit;
  const isLoadingMore = isFetching && !isLoading;

  const loadMore = () => {
    if (!conversationId) return;
    setLimit((prev) => prev + LOAD_MORE_STEP);
  };

  return {
    messages,
    isLoading,
    isError,
    canLoadMore,
    isLoadingMore,
    loadMore,
  };
};
