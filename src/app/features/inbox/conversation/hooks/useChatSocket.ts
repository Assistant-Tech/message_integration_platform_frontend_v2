import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useChatSocket = (conversationId: string | null) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!conversationId) return;

    const socket = new WebSocket(
      `wss://your-api.com/ws/messages/${conversationId}`,
    );

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      queryClient.setQueryData(
        ["messages", conversationId],
        (old: any[] = []) => {
          if (old.some((m) => m.id === message.id)) return old;

          return [...old, message];
        },
      );
    };

    socket.onclose = () => {
      console.log("socket closed");
    };

    return () => {
      socket.close();
    };
  }, [conversationId]);
};
