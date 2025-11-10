import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { useAuthStore } from "@/app/store/auth.store";
import { CHAT_EVENTS } from "@/app/Socket/events/chatEvents";
import { useInternalConversationStore } from "@/app/store/internal-conversation.store";
import { useQueryClient } from "@tanstack/react-query";

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

    socket.on("connect", () => {
      console.log("✅ Chat socket connected");
    });

    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Chat socket disconnected:", reason);
    });

    socket.on(CHAT_EVENTS.CHAT_CONNECTED, (data) => {
      setConversations(data.channels || []);
      // toast.success("Connected to internal chat");
    });

    socket.on(CHAT_EVENTS.CHAT_MESSAGE, (payload) => {
      try {
        if (payload && payload._id) {
          updateAndMoveConversation(payload);
          queryClient.setQueryData(["internalConversation", payload._id], {
            data: payload,
          });
        } else if (payload && payload.conversationId) {
          const convId = payload.conversationId;
          if (payload.conversation) {
            updateAndMoveConversation(payload.conversation);
            queryClient.setQueryData(["internalConversation", convId], {
              data: payload.conversation,
            });
          } else if (payload.message) {
            queryClient.setQueryData<any>(
              ["internalConversation", convId],
              (old: any) => {
                if (!old?.data) return old;
                const existing = old.data;
                const newMessages = [
                  ...(existing.messages || []),
                  payload.message,
                ];
                return { data: { ...existing, messages: newMessages } };
              },
            );
          }
        }
      } catch (err) {
        console.error("Error handling CHAT_MESSAGE:", err);
      }
    });

    socket.on(CHAT_EVENTS.CHAT_ERROR, (error) => {
      toast.error(`Chat error: ${error?.message || "Unknown error"}`);
    });

    socket.on(CHAT_EVENTS.CONVERSATION_CREATED, (newConv) => {
      addConversation(newConv);
      // prime react-query cache for new conversation
      if (newConv && newConv._id) {
        queryClient.setQueryData(["internalConversation", newConv._id], {
          data: newConv,
        });
      }
    });

    socket.on(CHAT_EVENTS.USER_JOINED, (data) => {
      try {
        // toast.info(`${data.user?.name || data.userName || "A user"} joined`);
        const convId = data.conversationId;
        if (convId) {
          queryClient.setQueryData<any>(
            ["internalConversationMembers", convId],
            (old: any) => {
              if (!old?.data) return old;
              const already = old.data.find(
                (m: any) => m._id === data.user?._id || data.userId,
              );
              if (already) return old;
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
        }
      } catch (err) {
        console.error("USER_JOINED handler error:", err);
      }
    });

    socket.on(CHAT_EVENTS.USER_LEFT, (data) => {
      try {
        toast.info(`${data.user?.name || data.userName || "A user"} left`);
        const convId = data.conversationId;
        if (convId) {
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
        }
      } catch (err) {
        console.error("USER_LEFT handler error:", err);
      }
    });

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

  return {
    sendMessage,
  };
};
