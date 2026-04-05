import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CHAT_EVENTS } from "@/app/socket/events/chatEvents";
import {
  getOrCreateSocket,
  addSubscriber,
  removeSubscriber,
  isSocketConnected,
} from "./socket/socketManager";
import {
  createInboxEventHandler,
  createTypingUpdateHandler,
  createConnectHandler,
  createDisconnectHandler,
} from "./socket/eventHandlers";

/**
 * Manages the socket singleton lifecycle for the inbox.
 *
 * - Creates the socket when the first subscriber mounts
 * - Registers/unregisters event handlers on every render cycle (prevents stale closures)
 * - Tears down the socket when the last subscriber unmounts
 * - Exposes live connection state (isConnected)
 */
export function useSocketConnection(
  accessToken: string | null,
  conversationIdRef: React.RefObject<string | null>,
  onTypingStart: (cid: string) => void,
  onTypingStop: (cid: string) => void,
) {
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!accessToken) return;

    addSubscriber();
    const socket = getOrCreateSocket(accessToken);

    const handleInboxEvent = createInboxEventHandler(queryClient, conversationIdRef);
    const handleTypingUpdate = createTypingUpdateHandler((cid, isTyping) => {
      if (isTyping) onTypingStart(cid);
      else onTypingStop(cid);
    });
    const handleConnect = createConnectHandler(setIsConnected);
    const handleDisconnect = createDisconnectHandler(setIsConnected);

    socket.on(CHAT_EVENTS.INBOX_EVENT, handleInboxEvent);
    socket.on(CHAT_EVENTS.TYPING_UPDATE, handleTypingUpdate);
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    setIsConnected(isSocketConnected());

    return () => {
      socket.off(CHAT_EVENTS.INBOX_EVENT, handleInboxEvent);
      socket.off(CHAT_EVENTS.TYPING_UPDATE, handleTypingUpdate);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      removeSubscriber();
    };
  }, [accessToken, queryClient, conversationIdRef, onTypingStart, onTypingStop]);

  return { isConnected };
}
