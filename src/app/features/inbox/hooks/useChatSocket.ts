import { useCallback, useRef } from "react";
import { useAuthStore } from "@/app/store/auth.store";
import { CHAT_EVENTS } from "@/app/socket/events/chatEvents";
import { getOrCreateSocket } from "./socket/socketManager";
import { useTypingState } from "./useTypingState";
import { useSocketConnection } from "./useSocketConnection";
import { useConversationRoom } from "./useConversationRoom";

/**
 * Public API for inbox real-time features.
 *
 * Composes three focused hooks:
 *   useSocketConnection  — singleton socket lifecycle + event registration
 *   useConversationRoom  — join/leave room per active conversation
 *   useTypingState       — remote typing indicator state
 *
 * Exposes:
 *   isConnected     — live socket connection status
 *   isTyping        — whether the contact is currently typing
 *   emitTypingStart — call when the agent starts typing
 *   emitTypingStop  — call when the agent stops typing
 */
export function useChatSocket(conversationId: string | null) {
  const accessToken = useAuthStore((s) => s.accessToken);

  // Stable ref so event handlers always read the current conversation ID
  // without needing it in their dependency arrays
  const conversationIdRef = useRef<string | null>(conversationId);
  conversationIdRef.current = conversationId;

  const { isTyping, onTypingStart, onTypingStop } = useTypingState(
    conversationId,
    conversationIdRef,
  );

  const { isConnected } = useSocketConnection(
    accessToken,
    onTypingStart,
    onTypingStop,
  );

  useConversationRoom(conversationId, accessToken);

  const emitTypingStart = useCallback(() => {
    if (!accessToken || !conversationIdRef.current) return;
    const socket = getOrCreateSocket(accessToken);
    if (socket.connected) {
      socket.emit(CHAT_EVENTS.TYPING_START, {
        conversationId: conversationIdRef.current,
      });
    }
  }, [accessToken]);

  const emitTypingStop = useCallback(() => {
    if (!accessToken || !conversationIdRef.current) return;
    const socket = getOrCreateSocket(accessToken);
    if (socket.connected) {
      socket.emit(CHAT_EVENTS.TYPING_STOP, {
        conversationId: conversationIdRef.current,
      });
    }
  }, [accessToken]);

  return { isConnected, isTyping, emitTypingStart, emitTypingStop };
}
