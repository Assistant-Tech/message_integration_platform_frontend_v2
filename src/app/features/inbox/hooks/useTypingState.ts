import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  setTypingActive,
  clearTyping,
  getTypingState,
} from "./socket/typingStateManager";

/**
 * Manages the remote typing indicator for the currently open conversation.
 *
 * - Tracks whether the contact is typing (isTyping)
 * - Provides callbacks for the socket layer to call when typing events arrive
 * - Syncs state when the active conversation changes
 */
export function useTypingState(
  conversationId: string | null,
  conversationIdRef: React.RefObject<string | null>,
) {
  const queryClient = useQueryClient();
  const [isTyping, setIsTyping] = useState(false);

  const onTypingStart = useCallback(
    (cid: string) => {
      setTypingActive(queryClient, cid, conversationIdRef.current, (typing) => {
        if (conversationIdRef.current === cid) setIsTyping(typing);
      });
    },
    [queryClient, conversationIdRef],
  );

  const onTypingStop = useCallback(
    (cid: string) => {
      clearTyping(queryClient, cid, conversationIdRef.current, (typing) => {
        if (conversationIdRef.current === cid) setIsTyping(typing);
      });
    },
    [queryClient, conversationIdRef],
  );

  // Sync when switching conversations
  useEffect(() => {
    setIsTyping(
      conversationId ? getTypingState(queryClient, conversationId) : false,
    );
  }, [conversationId, queryClient]);

  return { isTyping, onTypingStart, onTypingStop };
}
