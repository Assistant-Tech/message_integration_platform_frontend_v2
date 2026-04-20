import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/app/store/auth.store";
import { useSocketStore } from "@/app/store/socket.store";
import { useInboxStore } from "@/app/store/inbox.store";
import { CHAT_EVENTS } from "@/app/socket/events/chatEvents";
import { APP_ROUTES } from "@/app/constants/routes";
import {
  getOrCreateSocket,
  addSubscriber,
  removeSubscriber,
  isSocketConnected,
} from "@/app/features/inbox/hooks/socket/socketManager";
import { createInboxEventHandler } from "@/app/features/inbox/hooks/socket/eventHandlers";
import type { InboxMessage } from "@/app/types/message.types";
import { getMessagePreview } from "@/app/utils/inbox/messageAdapters";

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
 *      is NOT currently viewing that specific conversation.
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
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  // Track active conversation from Zustand store (single source of truth).
  const selectedId = useInboxStore((s) => s.selectedId);
  const activeConversationIdRef = useRef<string | null>(selectedId);
  activeConversationIdRef.current = selectedId;

  // Stable refs for navigation so toast callbacks always have current values
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;
  const slugRef = useRef(slug);
  slugRef.current = slug;

  // ── Toast notification for new messages ────────────────────────────────────

  useEffect(() => {
    function onNewMessage(e: Event) {
      const { message, conversationId } = (
        e as CustomEvent<{
          message: InboxMessage;
          conversationId: string;
        }>
      ).detail;

      // User is already looking at this conversation — no toast needed.
      // (This check now works because activeConversationIdRef reads from Zustand)
      if (activeConversationIdRef.current === conversationId) return;

      const raw = getMessagePreview(message);
      const preview =
        raw.length > 60 ? `${raw.slice(0, 60)}…` : raw;

      toast(message.senderName ?? "New message", {
        description: preview,
        duration: 5_000,
        action: {
          label: "Open",
          onClick: () => {
            const s = slugRef.current;
            if (!s) return;
            // Select conversation in store (triggers room join + mark-as-read)
            useInboxStore.getState().setSelected(conversationId);
            // Navigate to inbox (SPA navigation, no full reload)
            navigateRef.current(
              `/app/${s}/admin/${APP_ROUTES.ADMIN.CONVERSATION}`,
            );
          },
        },
      });
    }

    window.addEventListener("inbox:new-message", onNewMessage);
    return () => window.removeEventListener("inbox:new-message", onNewMessage);
  }, []); // no deps — all values read from refs

  // ── Socket lifecycle + event registration ──────────────────────────────────

  useEffect(() => {
    if (!accessToken) return;

    addSubscriber();
    const socket = getOrCreateSocket(accessToken);

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
