import { useEffect, useRef, useCallback, useState } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { useAuthStore } from "@/app/store/auth.store";
import { CHAT_EVENTS } from "@/app/Socket/events/chatEvents";
import { useInternalConversationStore } from "@/app/store/internal-conversation.store";
import { useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

export const useChatSocket = () => {
  const { accessToken } = useAuthStore();
  const {
    addConversation,
    setConversations,
    updateConversation,
    updateAndMoveConversation,
  } = useInternalConversationStore();
  const queryClient = useQueryClient();

  const socketRef = useRef<Socket | null>(null);

  // Store incoming messages keyed by conversationId
  const [incomingMessages, setIncomingMessages] = useState<
    Record<string, any[]>
  >({});

  // Send message function
  const sendMessage = useCallback((conversationId: string, content: string) => {
    if (!socketRef.current) return;
    socketRef.current.emit(CHAT_EVENTS.CHAT_MESSAGE, {
      conversationId,
      content,
    });
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    const socket = io(`${import.meta.env.VITE_SOCKET_CHAT_URL}`, {
      auth: { token: accessToken },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => console.log("✅ Chat socket connected"));
    socket.on("disconnect", (reason) =>
      console.warn("⚠️ Chat socket disconnected:", reason),
    );

    // Initial conversation list
    socket.on(CHAT_EVENTS.CHAT_CONNECTED, (data) => {
      setConversations(data.channels || []);
    });

    // Incoming messages
    socket.on(CHAT_EVENTS.CHAT_MESSAGE, (payload) => {
      try {
        const convId = payload.received?.conversationId;
        if (!convId) return;

        const message = {
          _id: `socket-${uuidv4()}`,
          sender: payload.from || "Unknown",
          content: payload.received?.content || "",
          createdAt: payload.timestamp || new Date().toISOString(),
        };

        setIncomingMessages((prev) => ({
          ...prev,
          [convId]: [...(prev[convId] || []), message],
        }));
      } catch (err) {
        console.error("Error handling CHAT_MESSAGE:", err);
      }
    });

    // Conversation created
    socket.on(CHAT_EVENTS.CONVERSATION_CREATED, (newConv) => {
      addConversation(newConv);
      if (newConv?._id) {
        queryClient.setQueryData(["internalConversation", newConv._id], {
          data: newConv,
        });
      }
    });

    // User joined
    socket.on(CHAT_EVENTS.USER_JOINED, (data) => {
      try {
        const convId = data.conversationId;
        if (!convId) return;
        console.log("user - joined");

        queryClient.setQueryData<any>(
          ["internalConversationMembers", convId],
          (old: any) => {
            if (!old?.data) return old;
            const exists = old.data.find(
              (m: any) => m._id === (data.user?._id || data.userId),
            );
            if (exists) return old;
            return {
              data: [
                ...old.data,
                data.user || {
                  _id: data.userId,
                  name: data.userName,
                  email: data.user?.email,
                },
              ],
            };
          },
        );

        queryClient.invalidateQueries({
          queryKey: ["internalConversation", convId],
        });
      } catch (err) {
        console.error("USER_JOINED handler error:", err);
      }
    });

    // User left
    socket.on(CHAT_EVENTS.USER_LEFT, (data) => {
      try {
        const convId = data.conversationId;
        if (!convId) return;

        queryClient.setQueryData<any>(
          ["internalConversationMembers", convId],
          (old: any) => {
            if (!old?.data) return old;
            return {
              data: old.data.filter(
                (m: any) => m._id !== (data.user?._id || data.userId),
              ),
            };
          },
        );

        queryClient.invalidateQueries({
          queryKey: ["internalConversation", convId],
        });
      } catch (err) {
        console.error("USER_LEFT handler error:", err);
      }
    });

    // Chat error
    socket.on(CHAT_EVENTS.CHAT_ERROR, (error) => {
      toast.error(`Chat error: ${error?.message || "Unknown error"}`);
    });

    // Ping/pong keep-alive
    const pingInterval = setInterval(
      () => socket.emit(CHAT_EVENTS.CHAT_PING),
      10000,
    );
    socket.on(CHAT_EVENTS.CHAT_PONG, () => console.log("🏓 Pong received"));

    return () => {
      clearInterval(pingInterval);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [
    accessToken,
    addConversation,
    setConversations,
    updateConversation,
    updateAndMoveConversation,
    queryClient,
  ]);

  return { sendMessage, incomingMessages };
};
