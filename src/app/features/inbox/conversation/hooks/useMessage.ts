import { useInboxMessagesQuery } from "@/app/hooks/query/useMessageQuery";
import { useEffect, useState } from "react";
import type { InboxMessage } from "@/app/types/message.types";

export const useMessage = (conversationId: string | null) => {
  const { data, isLoading, isError } = useInboxMessagesQuery(conversationId);

  const [localMessages, setLocalMessages] = useState<InboxMessage[]>([]);

  const serverMessages = data ?? [];

  useEffect(() => {
    setLocalMessages([]);
  }, [conversationId]);

  const messages = [
    ...serverMessages,
    ...localMessages.filter(
      (local) => !serverMessages.some((s) => s.id === local.id),
    ),
  ];

  return {
    messages,
    isLoading,
    isError,
  };
};
