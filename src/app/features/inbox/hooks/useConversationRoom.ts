import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CHAT_EVENTS } from "@/app/socket/events/chatEvents";
import { getOrCreateSocket } from "./socket/socketManager";
import { markConversationAsRead } from "./socket/cacheHelpers";
import { markConversationAsReadApi } from "@/app/services/inbox.services";

/**
 * Joins/leaves a socket room when the active conversation changes.
 *
 * - Emits conversation:join on mount or conversation switch →
 *   server places the socket in the room to receive typing, read, and reaction events
 * - Marks the conversation as read in cache AND on the backend
 * - Emits conversation:leave on unmount or conversation switch
 */
export function useConversationRoom(
  conversationId: string | null,
  accessToken: string | null,
) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!accessToken || !conversationId) return;

    const socket = getOrCreateSocket(accessToken);

    socket.emit(CHAT_EVENTS.CONVERSATION_JOIN, { conversationId });
    markConversationAsRead(queryClient, conversationId);
    markConversationAsReadApi(conversationId).catch(() => {});

    return () => {
      socket.emit(CHAT_EVENTS.CONVERSATION_LEAVE, { conversationId });
    };
  }, [conversationId, accessToken, queryClient]);
}
