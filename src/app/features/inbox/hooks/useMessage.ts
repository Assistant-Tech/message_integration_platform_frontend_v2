import { useEffect, useMemo, useState } from "react";
import { useInboxMessagesQuery } from "@/app/hooks/query/useMessageQuery";
// ⚠️ TEMP showcase mock — see src/app/features/inbox/utils/showcaseMock.ts
import {
  SHOWCASE_MOCK_ENABLED,
  MOCK_MESSAGES,
} from "@/app/features/inbox/utils/showcaseMock";

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

  const messages = useMemo(() => {
    const apiMessages = data ?? [];
    // ⚠️ TEMP showcase mock — only surfaces when the API returns nothing.
    const base =
      SHOWCASE_MOCK_ENABLED &&
      conversationId &&
      apiMessages.length === 0 &&
      MOCK_MESSAGES[conversationId]
        ? MOCK_MESSAGES[conversationId]
        : apiMessages;
    return [...base].sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    );
  }, [data, conversationId]);

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
