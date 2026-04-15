import { useEffect, useState } from "react";
import { CHAT_EVENTS } from "@/app/socket/events/chatEvents";
import {
  getOrCreateSocket,
  addSubscriber,
  removeSubscriber,
  isSocketConnected,
} from "./socket/socketManager";
import {
  createTypingUpdateHandler,
  createConnectHandler,
  createDisconnectHandler,
} from "./socket/eventHandlers";

/**
 * Manages the socket singleton lifecycle for the inbox.
 *
 * - Adds a subscriber to keep the socket alive while the inbox is mounted
 * - Handles typing indicators (only needed in inbox)
 * - Exposes live connection state (isConnected)
 *
 * NOTE: inbox:event handling is done by useGlobalSocket (mounted in AdminLayout)
 * to avoid duplicate processing. This hook only handles typing events.
 */
export function useSocketConnection(
  accessToken: string | null,
  onTypingStart: (cid: string) => void,
  onTypingStop: (cid: string) => void,
) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!accessToken) return;

    addSubscriber();
    const socket = getOrCreateSocket(accessToken);

    const handleTypingUpdate = createTypingUpdateHandler((cid, isTyping) => {
      if (isTyping) onTypingStart(cid);
      else onTypingStop(cid);
    });
    const handleConnect = createConnectHandler(setIsConnected);
    const handleDisconnect = createDisconnectHandler(setIsConnected);

    socket.on(CHAT_EVENTS.TYPING_UPDATE, handleTypingUpdate);
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    setIsConnected(isSocketConnected());

    return () => {
      socket.off(CHAT_EVENTS.TYPING_UPDATE, handleTypingUpdate);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      removeSubscriber();
    };
  }, [accessToken, onTypingStart, onTypingStop]);

  return { isConnected };
}
