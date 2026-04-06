/**
 * Socket event handler factory functions
 *
 * Creates event handlers that close over queryClient and state callbacks.
 * Each handler is a pure function that can be tested independently.
 */

import type { QueryClient } from "@tanstack/react-query";
import {
  extractConversationId,
  normalizeMessage,
  isPlainObject,
} from "./normalizers";
import {
  addMessageToCache,
  updateInboxListWithNewMessage,
} from "./cacheHelpers";
import { playNotificationSound } from "@/app/utils/audioManager";

// ────────────────────────────────────────────────────────────────────────────
// UNIFIED INBOX EVENT HANDLER
// ────────────────────────────────────────────────────────────────────────────

/**
 * Factory: create handler for the unified `inbox:event`.
 *
 * Switches on event.type:
 *   new_message       — normalise and insert into message/inbox caches
 *   new_conversation  — dispatch window event so sidebar can refetch
 *   message_read      — dispatch window event for read-receipt UI
 *   message_reaction  — dispatch window event for reaction UI
 */
export function createInboxEventHandler(
  queryClient: QueryClient,
  conversationIdRef: React.MutableRefObject<string | null>,
) {
  return (event: unknown) => {
    if (!isPlainObject(event)) return;

    const type = event.type as string | undefined;

    switch (type) {
      case "new_message": {
        const conversationId = extractConversationId(event);
        const message = normalizeMessage(event);

        if (!conversationId || !message) return;

        // Add to messages cache (deduplication handled inside)
        addMessageToCache(queryClient, conversationId, message);

        // Update inbox list sidebar
        const isCurrentConversation =
          conversationIdRef.current === conversationId;
        updateInboxListWithNewMessage(
          queryClient,
          conversationId,
          message,
          isCurrentConversation,
        );

        // Notify other UI layers (e.g. notification badge) for incoming
        // customer messages when this conversation isn't currently open
        if (message.sender === "customer" && !isCurrentConversation) {
          playNotificationSound();
          window.dispatchEvent(
            new CustomEvent("inbox:new-message", {
              detail: { message, conversationId },
            }),
          );
        }
        break;
      }

      case "new_conversation": {
        // Let the sidebar pick this up and refetch the inbox list
        window.dispatchEvent(
          new CustomEvent("inbox:new-conversation", { detail: event }),
        );
        break;
      }

      case "message_read": {
        window.dispatchEvent(
          new CustomEvent("inbox:message-read", { detail: event }),
        );
        break;
      }

      case "message_reaction": {
        window.dispatchEvent(
          new CustomEvent("inbox:message-reaction", { detail: event }),
        );
        break;
      }
    }
  };
}

// ────────────────────────────────────────────────────────────────────────────
// TYPING HANDLER
// ────────────────────────────────────────────────────────────────────────────

/**
 * Factory: create handler for `typing:update` events.
 *
 * The server sends a single event with `isTyping: boolean` instead of
 * separate typing:start / typing:stop events.
 *
 * @param onTypingChange - callback(conversationId, isTyping)
 */
export function createTypingUpdateHandler(
  onTypingChange: (conversationId: string, isTyping: boolean) => void,
) {
  return (payload: unknown) => {
    if (!isPlainObject(payload)) return;

    const conversationId = payload.conversationId;
    const isTyping = payload.isTyping;

    if (typeof conversationId !== "string" || typeof isTyping !== "boolean") {
      return;
    }

    onTypingChange(conversationId, isTyping);
  };
}

// ────────────────────────────────────────────────────────────────────────────
// CONNECTION STATE HANDLERS
// ────────────────────────────────────────────────────────────────────────────

export function createConnectHandler(onConnect: (connected: boolean) => void) {
  return () => onConnect(true);
}

export function createDisconnectHandler(
  onDisconnect: (connected: boolean) => void,
) {
  return () => onDisconnect(false);
}
