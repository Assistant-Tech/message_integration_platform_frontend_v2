import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/app/store/auth.store";
import { useSocketStore } from "@/app/store/socket.store";
import { CHAT_EVENTS } from "@/app/socket/events/chatEvents";
import {
  getOrCreateSocket,
  addSubscriber,
  removeSubscriber,
  isSocketConnected,
} from "@/app/features/inbox/hooks/socket/socketManager";
import { createInboxEventHandler } from "@/app/features/inbox/hooks/socket/eventHandlers";
import type { InboxMessage } from "@/app/types/message.types";

/**
 * GLOBAL SOCKET — mounted once in AdminLayout, lives for the entire dashboard session.
 *
 * Responsibilities:
 *   1. Own the primary subscriber slot → socket connects on dashboard entry,
 *      disconnects only when the user logs out / leaves the dashboard entirely.
 *   2. Handle inbox:event for ALL sections, not just inbox:
 *        - Keeps the React Query cache updated with new messages and unread counts
 *          even when the user is reading Analytics, Settings, etc.
 *        - Dispatches window custom events so any section can react (e.g. notification badge)
 *   3. Show a toast notification when a new customer message arrives and the user
 *      is NOT currently in the /inbox section.
 *   4. Sync the socket store's `status` field so any component can read the live
 *      connection state without mounting the inbox.
 *
 * The inbox section's useSocketConnection adds a second subscriber on top of this
 * one, which prevents the socket from being torn down while both are alive.
 * Typing events are kept in useSocketConnection — only the inbox needs them.
 */
export function useGlobalSocket() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();
  const setStatus = useSocketStore((s) => s.setStatus);

  // Track active conversation from URL — synced on navigation so handlers never go stale.
  const activeConversationIdRef = useRef<string | null>(
    new URLSearchParams(window.location.search).get("conversation"),
  );

  useEffect(() => {
    function syncFromUrl() {
      activeConversationIdRef.current = new URLSearchParams(
        window.location.search,
      ).get("conversation");
    }
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  // ── Toast notification for new messages outside inbox ──────────────────────

  useEffect(() => {
    function onNewMessage(e: Event) {
      const { message, conversationId } = (
        e as CustomEvent<{
          message: InboxMessage;
          conversationId: string;
        }>
      ).detail;

      // User is already looking at this conversation — no toast needed.
      if (activeConversationIdRef.current === conversationId) return;

      // User is in /inbox but a different conversation is open — the sidebar
      // badge handles this; a toast would be redundant noise.
      if (window.location.pathname.startsWith("/inbox")) return;

      const preview =
        message.content.length > 60
          ? `${message.content.slice(0, 60)}…`
          : message.content;

      toast(message.senderName ?? "New message", {
        description: preview,
        duration: 5_000,
        action: {
          label: "Open",
          onClick: () => {
            window.location.href = `/inbox?conversation=${conversationId}`;
          },
        },
      });
    }

    window.addEventListener("inbox:new-message", onNewMessage);
    return () => window.removeEventListener("inbox:new-message", onNewMessage);
  }, []); // no deps — activeConversationIdRef is always current via the sync effect above

  // ── Socket lifecycle + event registration ──────────────────────────────────

  useEffect(() => {
    if (!accessToken) return;

    addSubscriber();
    const socket = getOrCreateSocket(accessToken);

    // INBOX_EVENT: update React Query cache + dispatch window custom events.
    // The conversationIdRef passed here always reflects the open conversation
    // (updated via the activeConversationId sync effect above).
    const handleInboxEvent = createInboxEventHandler(
      queryClient,
      activeConversationIdRef,
    );

    const handleConnect = () => {
      setStatus("connected");
    };
    const handleDisconnect = () => {
      setStatus("disconnected");
    };
    const handleReconnecting = () => {
      setStatus("reconnecting");
    };
    const handleError = () => {
      setStatus("error");
    };

    socket.on(CHAT_EVENTS.INBOX_EVENT, handleInboxEvent);
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("reconnect_attempt", handleReconnecting);
    socket.on("connect_error", handleError);

    // Sync initial state (socket may already be connected if token refreshed)
    setStatus(isSocketConnected() ? "connected" : "disconnected");

    return () => {
      socket.off(CHAT_EVENTS.INBOX_EVENT, handleInboxEvent);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("reconnect_attempt", handleReconnecting);
      socket.off("connect_error", handleError);
      removeSubscriber();
    };
  }, [accessToken, queryClient, setStatus]);
}
