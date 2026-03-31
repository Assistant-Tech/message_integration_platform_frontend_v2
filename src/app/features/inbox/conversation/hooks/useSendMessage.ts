import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  InboxMessage,
  SendMessagePayload,
} from "@/app/types/message.types";
import { sendMessage } from "@/app/services/messages.services";

export const useSendMessage = (conversationId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation<InboxMessage, Error, SendMessagePayload>({
    mutationFn: sendMessage,

    onMutate: async (variables) => {
      if (!conversationId) return;

      await queryClient.cancelQueries({
        queryKey: ["messages", conversationId],
      });

      const previousMessages = queryClient.getQueryData([
        "messages",
        conversationId,
      ]);

      const optimisticMessage: InboxMessage = {
        id: `optimistic-${Date.now()}`,
        sender: "agent",
        senderName: "You",
        senderId: "me",
        content: variables.content,
        timestamp: new Date().toISOString(),
        type: "TEXT",
        status: "SENT",
        attachments: [],
        replyTo: null,
      };

      queryClient.setQueryData(
        ["messages", conversationId],
        (old: InboxMessage[] = []) => [...old, optimisticMessage],
      );

      return { previousMessages };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(
          ["messages", conversationId],
          context.previousMessages,
        );
      }
    },

    onSuccess: (data) => {
      queryClient.setQueryData(
        ["messages", conversationId],
        (old: InboxMessage[] = []) => [
          ...old.filter((m) => !m.id.startsWith("optimistic-")),
          data,
        ],
      );
    },
  });
};
