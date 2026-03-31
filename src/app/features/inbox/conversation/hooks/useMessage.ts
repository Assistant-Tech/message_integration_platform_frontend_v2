import { useInboxMessagesQuery } from "@/app/hooks/query/useMessageQuery";

export const useMessage = (conversationId: string | null) => {
  const { data, isLoading, isError } = useInboxMessagesQuery(conversationId);

  const messages = (data ?? []).sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  return { messages, isLoading, isError };
};
