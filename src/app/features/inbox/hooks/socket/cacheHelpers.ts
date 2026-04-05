/**
 * React Query cache update helpers
 *
 * Encapsulates all cache mutation logic for inbox and message data.
 * Single source of truth for how cache is structured and updated.
 */

import { QueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/app/constants/queryKeys";
import type { InboxMessage } from "@/app/types/message.types";
import type { InboxListResponse } from "@/app/types/inbox.types";

const INBOX_QUERY_KEY = QUERY_KEYS.INBOX("INTERNAL", 1, 20);

// ────────────────────────────────────────────────────────────────────────────
// TYPING STATE UPDATES
// ────────────────────────────────────────────────────────────────────────────

/**
 * Update a specific conversation's isTyping state in the inbox list cache
 * @param queryClient - React Query client
 * @param conversationId - Conversation to update
 * @param isTyping - New typing state
 */
export function updateInboxListTypingState(
  queryClient: QueryClient,
  conversationId: string,
  isTyping: boolean,
): void {
  queryClient.setQueryData<InboxListResponse>(INBOX_QUERY_KEY, (old) => {
    if (!old?.data) return old;
    return {
      ...old,
      data: old.data.map((c) =>
        c.id === conversationId ? { ...c, isTyping } : c,
      ),
    };
  });
}

// ────────────────────────────────────────────────────────────────────────────
// MESSAGE UPDATES
// ────────────────────────────────────────────────────────────────────────────

/**
 * Add a message to the messages cache for a conversation
 * Deduplicates if message with same ID already exists
 *
 * @param queryClient - React Query client
 * @param conversationId - Conversation ID
 * @param message - Message to add
 */
export function addMessageToCache(
  queryClient: QueryClient,
  conversationId: string,
  message: InboxMessage,
): void {
  queryClient.setQueriesData<InboxMessage[]>(
    { queryKey: ["messages", conversationId] },
    (old = []) =>
      old.some((m) => m.id === message.id) ? old : [...old, message],
  );
}

/**
 * Update message status (e.g., when server ACKs the message with real ID)
 * Replaces temporary message ID with server-assigned ID
 *
 * @param queryClient - React Query client
 * @param conversationId - Conversation ID
 * @param tempId - Temporary ID assigned by client
 * @param realId - Server-assigned ID
 * @param status - New message status
 */
export function updateMessageStatusInCache(
  queryClient: QueryClient,
  conversationId: string,
  tempId: string,
  realId: string,
  status: InboxMessage["status"],
): void {
  queryClient.setQueriesData<InboxMessage[]>(
    { queryKey: ["messages", conversationId] },
    (old = []) =>
      old.map((msg) =>
        msg.id === tempId ? { ...msg, id: realId, status } : msg,
      ),
  );
}

// ────────────────────────────────────────────────────────────────────────────
// INBOX LIST UPDATES
// ────────────────────────────────────────────────────────────────────────────

/**
 * Update inbox list when new message arrives
 * Updates: lastMessageContent, lastMessageAt, unreadCount, hasNewMessage
 *
 * @param queryClient - React Query client
 * @param conversationId - Conversation ID
 * @param message - The new message
 * @param isCurrentConversation - Whether this is the currently active conversation
 */
export function updateInboxListWithNewMessage(
  queryClient: QueryClient,
  conversationId: string,
  message: InboxMessage,
  isCurrentConversation: boolean,
): void {
  queryClient.setQueryData<InboxListResponse>(INBOX_QUERY_KEY, (old) => {
    if (!old?.data) return old;
    return {
      ...old,
      data: old.data.map((conv) => {
        if (conv.id !== conversationId) return conv;

        // Only increment unread count for incoming customer messages
        // when not in the active conversation
        const isIncomingCustomerMessage =
          message.sender === "customer" && !isCurrentConversation;

        return {
          ...conv,
          lastMessageContent: message.content,
          lastMessageAt: message.timestamp,
          unreadCount: isIncomingCustomerMessage
            ? (conv.unreadCount ?? 0) + 1
            : conv.unreadCount,
          hasNewMessage: isIncomingCustomerMessage,
        };
      }),
    };
  });
}

/**
 * Mark conversation as read when user joins it
 * Clears unreadCount and hasNewMessage flags
 *
 * @param queryClient - React Query client
 * @param conversationId - Conversation ID to mark as read
 */
export function markConversationAsRead(
  queryClient: QueryClient,
  conversationId: string,
): void {
  queryClient.setQueryData<InboxListResponse>(INBOX_QUERY_KEY, (old) => {
    if (!old?.data) return old;
    return {
      ...old,
      data: old.data.map((c) =>
        c.id === conversationId
          ? { ...c, unreadCount: 0, hasNewMessage: false }
          : c,
      ),
    };
  });
}

/**
 * Get the current inbox list from cache
 * Useful for checking state before mutations
 *
 * @param queryClient - React Query client
 * @returns Current inbox list or undefined if not cached
 */
export function getInboxListFromCache(
  queryClient: QueryClient,
): InboxListResponse | undefined {
  return queryClient.getQueryData(INBOX_QUERY_KEY);
}
