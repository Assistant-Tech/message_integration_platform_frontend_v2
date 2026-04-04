import { useRef } from "react";
import { io } from "socket.io-client";
import { CHAT_EVENTS } from "@/app/socket/events/chatEvents";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL as string;

export const useTypingEmitter = (conversationId: string | null) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onType = () => {
    if (!conversationId) return;
    const socket = io(SOCKET_URL, { transports: ["websocket"] });

    socket.emit(CHAT_EVENTS.TYPING_START, { conversationId });

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      socket.emit(CHAT_EVENTS.TYPING_STOP, { conversationId });
    }, 1500);
  };

  return { onType };
};
