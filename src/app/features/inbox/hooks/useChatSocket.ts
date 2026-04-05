/**
 * useChatSocket - Main hook for inbox socket management
 *
 * Coordinates:
 * - Socket lifecycle (connection, disconnection, subscription counting)
 * - Unified inbox:event handling (new_message, new_conversation, message_read, message_reaction)
 * - Typing indicators via typing:update (isTyping boolean)
 * - Conversation join/leave (emits conversation:join / conversation:leave)
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
  createInboxEventHandler,
  createTypingUpdateHandler,
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

  /**
   * Called when typing:update arrives with isTyping=true for a conversation.
   * Delegates to typingStateManager which handles auto-reset timer.
   */
  const handleTypingStart = useCallback(
    (cid: string) => {
      setTypingActive(queryClient, cid, conversationIdRef, (typing) => {
        if (conversationIdRef.current === cid) setIsTyping(typing);
      });
    },
    [queryClient],
  );

  /**
   * Called when typing:update arrives with isTyping=false for a conversation.
   */
  const handleTypingStop = useCallback(
    (cid: string) => {
      clearTyping(queryClient, cid, conversationIdRef, (typing) => {
        if (conversationIdRef.current === cid) setIsTyping(typing);
      });
    },
    [queryClient],
  );

  // Sync isTyping when conversation changes
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

    addSubscriber();
    const socket = getOrCreateSocket(accessToken);

    // Unified inbox:event handler (new_message, new_conversation, message_read, message_reaction)
    const handleInboxEvent = createInboxEventHandler(
      queryClient,
      conversationIdRef,
    );

    // typing:update — single event with isTyping boolean
    const handleTypingUpdate = createTypingUpdateHandler(
      (cid, isTyping) => {
        if (isTyping) handleTypingStart(cid);
        else handleTypingStop(cid);
      },
    );

    const handleConnect = createConnectHandler(setIsConnected);
    const handleDisconnect = createDisconnectHandler(setIsConnected);

    if (!handlersRegisteredRef.current) {
      socket.on(CHAT_EVENTS.INBOX_EVENT, handleInboxEvent);
      socket.on(CHAT_EVENTS.TYPING_UPDATE, handleTypingUpdate);
      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);

      handlersRegisteredRef.current = true;
    }

    setIsConnected(isSocketConnected());

    return () => {
      const wasDisconnected = removeSubscriber();
      if (wasDisconnected) {
        handlersRegisteredRef.current = false;
      }
    };
  }, [
    accessToken,
    queryClient,
    handleTypingStart,
    handleTypingStop,
  ]);

  // ───────────────────────────────────────────────────────────────────────────
  // CONVERSATION JOIN / LEAVE
  //
  // Emits conversation:join when a conversation is opened → server places the
  // socket in the conversation room so it receives typing, read, reaction events.
  // Emits conversation:leave when navigating away.
  // ───────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!accessToken || !conversationId) return;

    const socket = getOrCreateSocket(accessToken);
    if (!socket) return;

    socket.emit(CHAT_EVENTS.CONVERSATION_JOIN, { conversationId });
    markConversationAsRead(queryClient, conversationId);

    return () => {
      socket.emit(CHAT_EVENTS.CONVERSATION_LEAVE, { conversationId });
    };
  }, [conversationId, queryClient, accessToken]);

  // ───────────────────────────────────────────────────────────────────────────
  // EMIT HELPERS — signal own typing to the server
  // ───────────────────────────────────────────────────────────────────────────

  const emitTypingStart = useCallback(() => {
    if (!accessToken) return;
    const cid = conversationIdRef.current;
    const socket = getOrCreateSocket(accessToken);
    if (socket?.connected && cid) {
      socket.emit(CHAT_EVENTS.TYPING_START, { conversationId: cid });
    }
  }, [accessToken]);

  const emitTypingStop = useCallback(() => {
    if (!accessToken) return;
    const cid = conversationIdRef.current;
    const socket = getOrCreateSocket(accessToken);
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
