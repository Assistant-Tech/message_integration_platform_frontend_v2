import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useChatSocket } from "@/app/Socket/useInternalChatSocket";
import { useInternalConversationStore } from "@/app/store/internal-conversation.store";
import { useQuery } from "@tanstack/react-query";
import {
  getInternalConversationById,
  getInternalConversationMembers,
} from "@/app/services/internal-converstion.services";
import { format } from "date-fns";
import { cn } from "@/app/utils/cn";
import { Info, Loader2, Send, Users } from "lucide-react";

export const ChatPanel = () => {
  const { selectedConversationId } = useInternalConversationStore();
  const { sendMessage } = useChatSocket();
  const [message, setMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);

  // 🔹 Fetch conversation details
  const {
    data: conversationData,
    isLoading: conversationLoading,
    refetch: refetchConversation,
  } = useQuery({
    queryKey: ["internalConversation", selectedConversationId],
    queryFn: () =>
      getInternalConversationById(selectedConversationId as string),
    enabled: !!selectedConversationId,
  });

  const {
    data: membersData,
    isLoading: membersLoading,
    refetch: refetchMembers,
  } = useQuery({
    queryKey: ["internalConversationMembers", selectedConversationId],
    queryFn: () =>
      getInternalConversationMembers(selectedConversationId as string),
    enabled: !!selectedConversationId,
  });

  const conversation = conversationData?.data;
  const members = membersData?.data || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  const handleSend = () => {
    if (!message.trim() || !selectedConversationId) return;
    sendMessage(selectedConversationId, message.trim());
    setLocalMessages((prev) => [
      ...prev,
      {
        _id: Math.random().toString(36).slice(2),
        sender: "You",
        content: message,
        createdAt: new Date().toISOString(),
      },
    ]);
    setMessage("");
  };

  // 🔹 Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!selectedConversationId)
    return (
      <div className="flex h-full items-center justify-center text-grey-medium">
        Select a conversation to start chatting.
      </div>
    );

  if (conversationLoading)
    return (
      <div className="flex h-full items-center justify-center text-grey-medium">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading
        conversation...
      </div>
    );

  return (
    <div className="flex flex-1 h-screen w-full overflow-hidden bg-white border border-grey-light">
      {/* 🔹 Chat Feed */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-grey-light py-2 px-4">
          <div className="flex flex-col items-start">
            <h2 className="text-lg font-semibold text-grey">
              {conversation?.title}
            </h2>
            <p className="body-regular-16 text-grey-medium">
              {conversation?.participantsWithDetails?.length || 0} members
            </p>
          </div>
          <button
            onClick={() => {
              setIsOpenDetails((prev) => !prev);
            }}
            aria-label={
              isOpenDetails ? "Hide details panel" : "Show details panel"
            }
          >
            <Info size={24} color="grey" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-base-white">
          {localMessages.length === 0 ? (
            <div className="text-center text-grey-medium mt-10">
              No messages yet. Start the conversation!
            </div>
          ) : (
            localMessages.map((msg) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex flex-col w-fit max-w-[75%] p-3 rounded-2xl break-words",
                  msg.sender === "You"
                    ? "ml-auto bg-primary text-white"
                    : "bg-white text-grey border border-grey-light",
                )}
              >
                <span className="body-bold-16">
                  {msg.sender === "You" ? "You" : msg.sender}
                </span>
                <p className="body-regular-16 whitespace-pre-wrap break-words">
                  {msg.content}
                </p>
                <span className="mt-1 text-xs opacity-70 self-end">
                  {format(new Date(msg.createdAt), "p")}
                </span>
              </motion.div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="sticky bottom-0 left-0 right-0 border-t border-grey-light text-base-black bg-white p-3 flex items-center gap-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 text-grey resize-none overflow-hidden border border-grey-light rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            style={{ maxHeight: "120px" }}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="bg-information hover:bg-information text-white px-4 py-2 rounded-lg flex items-center gap-1 transition"
          >
            <Send className="h-4 w-4" /> Send
          </button>
        </div>
      </div>

      {/* 🔹 Right Details Panel */}
      {isOpenDetails && (
        <div className="flex w-80 flex-col border-l border-grey-light py-2 px-4">
          <div className="p-4 border-b border-grey-light">
            <h3 className="font-semibold text-grey flex items-center gap-2">
              <Users className="h-4 w-4" /> Details
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div>
              <h4 className="body-bold-16 text-grey">Status</h4>
              <p className="text-base font-semibold capitalize">
                {conversation?.status}
              </p>
            </div>

            <div>
              <h4 className="body-bold-16 text-grey">Priority</h4>
              <p className="text-base font-semibold capitalize">
                {conversation?.priority}
              </p>
            </div>

            <div className="flex flex-col justify-start items-start gap-2">
              <h4 className="body-bold-16 text-grey">Created At</h4>
              <p className="body-regular-16 text-grey-medium">
                {conversation?.createdAt
                  ? format(new Date(conversation.createdAt), "PPpp")
                  : "Unknown"}
              </p>
              <div>
                <h4 className="body-bold-16 text-grey">Last Active</h4>
                <p className="body-regular-16 text-grey-medium">
                  {conversation?.lastActiveAt
                    ? format(new Date(conversation.lastActiveAt), "PPpp")
                    : "Unknown"}
                </p>
              </div>

              {Array.isArray(conversation?.tags) &&
                conversation.tags.length > 0 && (
                  <div>
                    <h4 className="body-bold-16 text-grey mb-1">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {conversation.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs rounded-full bg-primary text-primary-dark"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              <div className="flex flex-col justify-start items-start gap-2">
                <h4 className="body-bold-16 text-grey">Members</h4>
                {membersLoading ? (
                  <p className="text-grey-medium body-regular-16">
                    Loading members...
                  </p>
                ) : members.length === 0 ? (
                  <p className="text-grey-medium body-regular-16">No members</p>
                ) : (
                  <ul className="space-y-1">
                    {members.map((m: any) => (
                      <li
                        key={m.id || m._id}
                        className="body-regular-16 text-grey-medium flex items-center gap-2"
                      >
                        <span className="h-2 w-2 bg-green-500 rounded-full" />
                        {m.name || m.email || "Unnamed user"}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPanel;
