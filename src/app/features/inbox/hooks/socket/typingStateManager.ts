/**
 * Typing indicator state management
 *
 * Handles:
 * - Typing timeout auto-reset (2 seconds)
 * - Typing state for specific conversations
 * - Cleanup of hanging timers
 */

import type { QueryClient } from "@tanstack/react-query";
import { QUERY_KEYS, INBOX_LIST_PARAMS } from "@/app/constants/queryKeys";
import type { InboxListResponse } from "@/app/types/inbox.types";
import { socketState } from "./socketManager";
import { updateInboxListTypingState } from "./cacheHelpers";

const TYPING_RESET_MS = 2000;

// ────────────────────────────────────────────────────────────────────────────
// TYPING STATE MANAGEMENT
// ────────────────────────────────────────────────────────────────────────────

/**
 * Mark conversation as someone is typing
 * Auto-clears typing state after TYPING_RESET_MS if not extended
 *
 * @param queryClient - React Query client
 * @param conversationId - Conversation ID
 * @param onLocalTypingChange - Callback for local state update (optional)
 */
export function setTypingActive(
  queryClient: QueryClient,
  conversationId: string,
  currentConversationId: string | null,
  onLocalTypingChange?: (isTyping: boolean) => void,
): void {
  // Clear any existing timeout for this conversation
  const existingTimer = socketState.typingTimers.get(conversationId);
  if (existingTimer) clearTimeout(existingTimer);

  // Set new timeout and store it
  socketState.typingTimers.set(
    conversationId,
    setTimeout(() => clearTyping(queryClient, conversationId, currentConversationId, onLocalTypingChange), TYPING_RESET_MS),
  );

  // Update cache
  updateInboxListTypingState(queryClient, conversationId, true);

  // Update local state if this is the active conversation
  if (currentConversationId === conversationId) {
    onLocalTypingChange?.(true);
  }
}

/**
 * Mark conversation as no longer typing
 * Clears the auto-reset timeout
 *
 * @param queryClient - React Query client
 * @param conversationId - Conversation ID
 * @param onLocalTypingChange - Callback for local state update (optional)
 */
export function clearTyping(
  queryClient: QueryClient,
  conversationId: string,
  currentConversationId: string | null,
  onLocalTypingChange?: (isTyping: boolean) => void,
): void {
  // Clear any existing timeout
  const existingTimer = socketState.typingTimers.get(conversationId);
  if (existingTimer) clearTimeout(existingTimer);
  socketState.typingTimers.delete(conversationId);

  // Update cache
  updateInboxListTypingState(queryClient, conversationId, false);

  // Update local state if this is the active conversation
  if (currentConversationId === conversationId) {
    onLocalTypingChange?.(false);
  }
}

/**
 * Get current typing state for a conversation from cache
 *
 * @param queryClient - React Query client
 * @param conversationId - Conversation ID
 * @returns true if conversation is marked as typing, false otherwise
 */
export function getTypingState(
  queryClient: QueryClient,
  conversationId: string,
): boolean {
  const data = queryClient.getQueryData<InboxListResponse>(
    QUERY_KEYS.INBOX(INBOX_LIST_PARAMS.type, INBOX_LIST_PARAMS.page, INBOX_LIST_PARAMS.limit)
  );
  return data?.data?.find((c) => c.id === conversationId)?.isTyping ?? false;
}

/**
 * Clear all typing timers (for cleanup on unmount)
 */
export function clearAllTypingTimers(): void {
  socketState.typingTimers.forEach(clearTimeout);
  socketState.typingTimers.clear();
}
