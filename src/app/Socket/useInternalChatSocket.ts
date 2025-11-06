import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { useAuthStore } from "@/app/store/auth.store";
import { CHAT_EVENTS } from "@/app/Socket/events/chatEvents";
import { useInternalConversationStore } from "@/app/store/internal-conversation.store";

export const useChatSocket = () => {
  const { accessToken } = useAuthStore();
  const {
    addConversation,
    setConversations,
    updateConversation,
    removeConversation,
    updateAndMoveConversation,
  } = useInternalConversationStore();

  useEffect(() => {
    if (!accessToken) return;

    let socket: Socket;

    try {
      socket = io(`${import.meta.env.VITE_SOCKET_CHAT_URL}`, {
        auth: { token: accessToken },
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        console.log("✅ Chat socket connected");
      });

      socket.on("disconnect", (reason) => {
        console.warn("⚠️ Chat socket disconnected:", reason);
      });

      socket.on(CHAT_EVENTS.CHAT_CONNECTED, (data) => {
        console.log("Chat initialized:", data);
        setConversations(data.channels || []);
      });

      socket.on(CHAT_EVENTS.CHAT_MESSAGE, (updatedConversation) => {
        updateConversation(updatedConversation);
        toast.success(
          `💬 New message in ${updatedConversation.name || updatedConversation._id}`,
        );
      });

      socket.on(CHAT_EVENTS.CHAT_ERROR, (error) => {
        console.error("❌ Chat error received:", error);
        toast.error(`Chat error: ${error.message || "Unknown error"}`);
      });

      socket.on(
        CHAT_EVENTS.CONVERSATION_MEMBER_ADDED,
        (updatedConversation) => {
          updateConversation(updatedConversation);
          toast.info(`👤 New member added to ${updatedConversation.name}`);
        },
      );

      socket.on(CHAT_EVENTS.CONVERSATION_CREATED, (newConversation) => {
        addConversation(newConversation);
        toast.info(`✨ New conversation created: ${newConversation.name}`);
      });

      socket.on(CHAT_EVENTS.CONVERSATION_JOINED, (joinedConversation) => {
        addConversation(joinedConversation);
        toast.info(`🔗 Joined conversation: ${joinedConversation.name}`);
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
    }
  }, [
    accessToken,
    setConversations,
    addConversation,
    updateConversation,
    removeConversation,
    updateAndMoveConversation,
  ]);
};
