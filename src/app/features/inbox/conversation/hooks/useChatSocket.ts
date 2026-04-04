/**
 * useChatSocket - Main hook for inbox socket management
 *
 * Coordinates:
 * - Socket lifecycle (connection, disconnection, subscription counting)
 * - Message events (incoming, ACK, deduplication)
 * - Typing indicators (with auto-reset timeout)
 * - Conversation join/leave
 * - Cache synchronization with React Query
 *
 * Uses a singleton socket instance shared across all hook instances.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CHAT_EVENTS } from "@/app/socket/events/chatEvents";
import { useAuthStore } from "@/app/store/auth.store";

// Socket management
import {
  getOrCreateSocket,
  addSubscriber,
  removeSubscriber,
  isSocketConnected,
} from "./socket/socketManager";

// Cache updates
import { markConversationAsRead } from "./socket/cacheHelpers";

// Event handlers
import {
  createMessageEventHandler,
  createMessageAckHandler,
  createTypingStartHandler,
  createTypingStopHandler,
  createConnectHandler,
  createDisconnectHandler,
} from "./socket/eventHandlers";

// Typing state
import {
  setTypingActive,
  clearTyping,
  getTypingState,
} from "./socket/typingStateManager";

// ────────────────────────────────────────────────────────────────────────────
// HOOK
// ────────────────────────────────────────────────────────────────────────────

export function useChatSocket(conversationId: string | null) {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((s) => s.accessToken);
  const conversationIdRef = useRef(conversationId);
  conversationIdRef.current = conversationId;

  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // ───────────────────────────────────────────────────────────────────────────
  // TYPING STATE CALLBACKS
  // ───────────────────────────────────────────────────────────────────────────

  const handleSetTypingActive = useCallback(
    (cid: string) => {
      setTypingActive(queryClient, cid, conversationIdRef, (isTyping) => {
        if (conversationIdRef.current === cid) {
          setIsTyping(isTyping);
        }
      });
    },
    [queryClient],
  );

  const handleClearTyping = useCallback(
    (cid: string) => {
      clearTyping(queryClient, cid, conversationIdRef, (isTyping) => {
        if (conversationIdRef.current === cid) {
          setIsTyping(isTyping);
        }
      });
    },
    [queryClient],
  );

  // Sync isTyping state when conversation changes
  useEffect(() => {
    setIsTyping(
      conversationId ? getTypingState(queryClient, conversationId) : false,
    );
  }, [conversationId, queryClient]);

  // ───────────────────────────────────────────────────────────────────────────
  // SOCKET LIFECYCLE & EVENT REGISTRATION
  // ───────────────────────────────────────────────────────────────────────────

  const handlersRegisteredRef = useRef(false);

  useEffect(() => {
    if (!accessToken) return;

    // Increment subscriber count
    addSubscriber();

    // Get or create socket
    const socket = getOrCreateSocket(accessToken);

    // Create event handlers
    const handleMessageEvent = createMessageEventHandler(
      queryClient,
      conversationIdRef,
    );
    const handleMessageAck = createMessageAckHandler(
      queryClient,
      conversationIdRef,
    );
    const handleTypingStart = createTypingStartHandler(
      queryClient,
      conversationIdRef,
      handleSetTypingActive,
    );
    const handleTypingStop = createTypingStopHandler(
      queryClient,
      handleClearTyping,
    );
    const handleConnect = createConnectHandler(setIsConnected);
    const handleDisconnect = createDisconnectHandler(setIsConnected);

    // Register handlers only once
    if (!handlersRegisteredRef.current) {
      socket.on(CHAT_EVENTS.NEW_INBOX_MESSAGE, handleMessageEvent);
      socket.on(CHAT_EVENTS.INBOX_MESSAGE, handleMessageEvent);
      socket.on(CHAT_EVENTS.INBOX_MESSAGE_ACK, handleMessageAck);
      socket.on(CHAT_EVENTS.TYPING_START, handleTypingStart);
      socket.on(CHAT_EVENTS.TYPING_STOP, handleTypingStop);
      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);

      handlersRegisteredRef.current = true;
    }

    // Set initial connection state
    setIsConnected(isSocketConnected());

    // Cleanup on unmount
    return () => {
      const wasDisconnected = removeSubscriber();

      if (wasDisconnected) {
        // Handlers are cleaned up automatically when socket disconnects
        handlersRegisteredRef.current = false;
      }
    };
  }, [accessToken, queryClient, handleSetTypingActive, handleClearTyping]);

  // ───────────────────────────────────────────────────────────────────────────
  // CONVERSATION JOIN/LEAVE & MARK AS READ
  // ───────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const socket = getOrCreateSocket(accessToken || "");
    if (!socket || !conversationId) return;

    // Emit conversation joined event
    socket.emit(CHAT_EVENTS.CONVERSATION_JOINED, { conversationId });

    // Mark conversation as read
    markConversationAsRead(queryClient, conversationId);

    // Cleanup: emit leave event on unmount or conversation change
    return () => {
      socket.emit("leave:conversation", { conversationId });
    };
  }, [conversationId, queryClient, accessToken]);

  // ───────────────────────────────────────────────────────────────────────────
  // EMIT HELPERS - For consumer to signal typing
  // ───────────────────────────────────────────────────────────────────────────

  const emitTypingStart = useCallback(() => {
    const cid = conversationIdRef.current;
    const socket = getOrCreateSocket(accessToken || "");
    if (socket?.connected && cid) {
      socket.emit(CHAT_EVENTS.TYPING_START, { conversationId: cid });
    }
  }, [accessToken]);

  const emitTypingStop = useCallback(() => {
    const cid = conversationIdRef.current;
    const socket = getOrCreateSocket(accessToken || "");
    if (socket?.connected && cid) {
      socket.emit(CHAT_EVENTS.TYPING_STOP, { conversationId: cid });
    }
  }, [accessToken]);

  return {
    isConnected,
    isTyping,
    emitTypingStart,
    emitTypingStop,
  };
}
