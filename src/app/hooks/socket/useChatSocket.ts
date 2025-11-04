import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { useChatStore } from "@/app/store/chat.store";
import { useAuthStore } from "@/app/store/auth.store";
import { CHAT_EVENTS } from "@/app/components/common/socket/chatEvents";

export const useChatSocket = () => {
  const { accessToken } = useAuthStore();
  const { addMessage, setConversations, setConnected } = useChatStore();

  useEffect(() => {
    if (!accessToken) return;

    let socket: Socket;

    try {
      socket = io(`${import.meta.env.VITE_API_BASE_URL_TEST}/internal-chat`, {
        auth: { token: accessToken },
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        console.log("✅ Chat socket connected");
        setConnected(true);
      });

      socket.on("disconnect", (reason) => {
        console.warn("⚠️ Chat socket disconnected:", reason);
        setConnected(false);
      });

      socket.on(CHAT_EVENTS.CHAT_CONNECTED, (data) => {
        console.log("Chat initialized:", data);
        setConversations(data.channels || []);
      });

      socket.on(CHAT_EVENTS.CHAT_MESSAGE, (payload) => {
        addMessage(payload.conversationId, payload.message);
        toast.success(`💬 New message in ${payload.conversationId}`);
      });

      socket.on(CHAT_EVENTS.CHAT_ERROR, (error) => {
        console.error("❌ Chat error received:", error);
        toast.error(`Chat error: ${error.message || "Unknown error"}`);
      });

      socket.on(CHAT_EVENTS.CONVERSATION_MEMBER_ADDED, (data) => {
        setConversations([...data]);
        toast.info(`🆕 New member added: ${data.userName}`);
      });

      socket.on(CHAT_EVENTS.USER_JOINED, (data) => {
        toast.info(`${data.userName} joined ${data.conversationName}`);
      });

      socket.on(CHAT_EVENTS.USER_LEFT, (data) => {
        toast.info(`${data.userName} left ${data.conversationName}`);
      });

      const pingInterval = setInterval(
        () => socket.emit(CHAT_EVENTS.CHAT_PING),
        10000,
      );
      socket.on(CHAT_EVENTS.CHAT_PONG, () =>
        console.log("🏓 chat pong received"),
      );

      return () => {
        clearInterval(pingInterval);
        socket.disconnect();
      };
    } catch (err) {
      console.error("❌ Error initializing chat socket:", err);
      setConnected(false);
    }
  }, [accessToken, setConnected, setConversations, addMessage]);
};
