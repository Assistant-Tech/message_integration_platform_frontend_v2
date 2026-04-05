import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";
import type {
  InboxMessage,
  SendMessagePayload,
} from "@/app/types/message.types";
import { sendMessage } from "@/app/services/messages.services";
import { QUERY_KEYS } from "@/app/constants/queryKeys";

type SendMessageMutationContext = {
  previousMessages: Array<[QueryKey, InboxMessage[] | undefined]>;
};

export const useSendMessage = (conversationId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation<
    InboxMessage,
    Error,
    SendMessagePayload,
    SendMessageMutationContext
  >({
    mutationFn: sendMessage,

    onMutate: async (variables) => {
      if (!conversationId) {
        return { previousMessages: [] };
      }

      await queryClient.cancelQueries({
        queryKey: ["messages", conversationId],
      });

      const previousMessages = queryClient.getQueriesData<InboxMessage[]>({
        queryKey: ["messages", conversationId],
      }) as SendMessageMutationContext["previousMessages"];

      const optimisticMessage: InboxMessage = {
        id: `optimistic-${Date.now()}`,
        sender: "agent",
        senderName: "AGENT",
        senderId: "me",
        content: variables.content,
        timestamp: new Date().toISOString(),
        type: "TEXT",
        status: "SENT",
        attachments: [],
        replyTo: null,
      };

      queryClient.setQueriesData<InboxMessage[]>(
        {
          queryKey: ["messages", conversationId],
        },
        (old: InboxMessage[] = []) => [...old, optimisticMessage],
      );

      return { previousMessages };
    },

    onError: (_err, _variables, context) => {
      if (!context) return;

      for (const [key, data] of context.previousMessages) {
        queryClient.setQueryData(key, data);
      }
    },

    onSuccess: (data) => {
      queryClient.setQueriesData<InboxMessage[]>(
        {
          queryKey: ["messages", conversationId],
        },
        (old: InboxMessage[] = []) =>
          old.map((msg) => (msg.id.startsWith("optimistic-") ? data : msg)),
      );

      queryClient.setQueryData(
        QUERY_KEYS.INBOX("INTERNAL", 1, 20),
        (old: any) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.map((conv: any) =>
              conv.id === conversationId
                ? {
                    ...conv,
                    lastMessageContent: data.content,
                    lastMessageAt: data.timestamp,
                  }
                : conv,
            ),
          };
        },
      );
    },
  });
};
