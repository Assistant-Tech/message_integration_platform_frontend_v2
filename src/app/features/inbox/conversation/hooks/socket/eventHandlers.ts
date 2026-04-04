/**
 * Socket event handler factory functions
 *
 * Creates event handlers that close over queryClient and state callbacks.
 * Each handler is a pure function that can be tested independently.
 */

import type { QueryClient } from "@tanstack/react-query";
import type { InboxMessage } from "@/app/types/message.types";
import {
  extractConversationId,
  normalizeMessage,
  isPlainObject,
} from "./normalizers";
import {
  updateInboxListTypingState,
  addMessageToCache,
  updateMessageStatusInCache,
  updateInboxListWithNewMessage,
} from "./cacheHelpers";
import type { MessageAckPayload } from "./types";

// ────────────────────────────────────────────────────────────────────────────
// MESSAGE EVENT HANDLER
// ────────────────────────────────────────────────────────────────────────────

/**
 * Factory: create handler for incoming messages
 *
 * Handles:
 * - Message normalization and validation
 * - Deduplication in messages cache
 * - Inbox list updates (last message, unread count)
 * - Custom event dispatch for notifications
 */
export function createMessageEventHandler(
  queryClient: QueryClient,
  conversationIdRef: React.MutableRefObject<string | null>,
) {
  return (payload: unknown) => {
    const conversationId = extractConversationId(
      isPlainObject(payload) ? payload : {},
    );
    const message = normalizeMessage(payload);

    if (!conversationId || !message) return;

    // Add to messages cache
    addMessageToCache(queryClient, conversationId, message);

    // Update inbox list
    const isCurrentConversation =
      conversationIdRef.current === conversationId;
    updateInboxListWithNewMessage(
      queryClient,
      conversationId,
      message,
      isCurrentConversation,
    );

    // Dispatch notification event for new incoming customer messages
    // (only if not in active conversation)
    if (message.sender === "customer" && !isCurrentConversation) {
      window.dispatchEvent(
        new CustomEvent("inbox:new-message", {
          detail: { message, conversationId },
        }),
      );
    }
  };
}

// ────────────────────────────────────────────────────────────────────────────
// MESSAGE ACK HANDLER
// ────────────────────────────────────────────────────────────────────────────

/**
 * Factory: create handler for message ACK events
 *
 * Handles:
 * - Replacing temporary message IDs with server-assigned IDs
 * - Updating message status (SENT, DELIVERED, etc.)
 * - Deduplication and message tracking
 */
export function createMessageAckHandler(
  queryClient: QueryClient,
  conversationIdRef: React.MutableRefObject<string | null>,
) {
  return (ack: unknown) => {
    const conversationId = conversationIdRef.current;
    if (!conversationId) return;

    if (!isPlainObject(ack) || !ack.tempId) return;

    const { tempId, id, status } = ack as MessageAckPayload;

    if (!id || !status) return;

    updateMessageStatusInCache(
      queryClient,
      conversationId,
      tempId,
      id,
      status,
    );
  };
}

// ────────────────────────────────────────────────────────────────────────────
// TYPING INDICATOR HANDLERS
// ────────────────────────────────────────────────────────────────────────────

/**
 * Factory: create handler for typing start events
 *
 * Updates:
 * - isTyping state for specific conversation in inbox list
 * - Local isTyping state if it's the active conversation
 * - Typing timeout (auto-clears after TYPING_RESET_MS)
 */
export function createTypingStartHandler(
  queryClient: QueryClient,
  conversationIdRef: React.MutableRefObject<string | null>,
  onTypingStart: (conversationId: string) => void,
) {
  return (payload: unknown) => {
    const conversationId = extractConversationId(
      isPlainObject(payload) ? payload : {},
    );
    if (conversationId) {
      onTypingStart(conversationId);
    }
  };
}

/**
 * Factory: create handler for typing stop events
 *
 * Updates:
 * - isTyping state for specific conversation to false
 * - Clears typing timeout
 */
export function createTypingStopHandler(
  queryClient: QueryClient,
  onTypingStop: (conversationId: string) => void,
) {
  return (payload: unknown) => {
    const conversationId = extractConversationId(
      isPlainObject(payload) ? payload : {},
    );
    if (conversationId) {
      onTypingStop(conversationId);
    }
  };
}

// ────────────────────────────────────────────────────────────────────────────
// CONNECTION STATE HANDLERS
// ────────────────────────────────────────────────────────────────────────────

/**
 * Create handler for socket connected event
 */
export function createConnectHandler(
  onConnect: (connected: boolean) => void,
) {
  return () => onConnect(true);
}

/**
 * Create handler for socket disconnected event
 */
export function createDisconnectHandler(
  onDisconnect: (connected: boolean) => void,
) {
  return () => onDisconnect(false);
}
