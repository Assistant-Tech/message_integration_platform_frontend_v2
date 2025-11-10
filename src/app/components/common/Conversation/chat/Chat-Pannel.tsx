import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Info, Loader2, Send, Users } from "lucide-react";
import { useChatSocket } from "@/app/Socket/useInternalChatSocket";
import { useInternalConversationStore } from "@/app/store/internal-conversation.store";
import { cn } from "@/app/utils/cn";
import { GenericDialog } from "@/app/components/common/";
import { Button, Input } from "@/app/components/ui";
import {
  useInternalConversationById,
  useInternalConversationMembers,
  useUpdateInternalConversation,
  useAddConversationMembers,
  useRemoveConversationMember,
} from "@/app/Socket/conversation/useInternalConversation";

interface Member {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

interface Message {
  _id: string;
  sender: string;
  content: string;
  createdAt: string;
}

const ChatPanel = () => {
  const {
    selectedConversationId,
    conversations,
    updateConversation: updateConversationInStore,
  } = useInternalConversationStore();

  const { sendMessage } = useChatSocket();

  const [message, setMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<
    "low" | "normal" | "high" | "urgent"
  >("normal");
  const [membersList, setMembersList] = useState<Member[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationFromStore = conversations.find(
    (c) => c._id === selectedConversationId,
  );

  const { data: conversationData, isLoading: conversationLoading } =
    useInternalConversationById(selectedConversationId || "", {
      enabled: !!selectedConversationId && !conversationFromStore,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });

  const { data: membersData, isLoading: membersLoading } =
    useInternalConversationMembers(selectedConversationId || "", {
      enabled: !!selectedConversationId,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });

  const updateConversationMutation = useUpdateInternalConversation(
    selectedConversationId || "",
  );
  const addMembersMutation = useAddConversationMembers(
    selectedConversationId || "",
  );
  const removeMemberMutation = useRemoveConversationMember(
    selectedConversationId || "",
  );

  const conversation = conversationFromStore || conversationData?.data;
  const members = (membersData?.data as Member[]) || [];

  useEffect(() => {
    if (members && members.length > 0) {
      setMembersList(members);
    }
  }, [members]);

  useEffect(() => {
    if (conversationData?.data && !conversationFromStore) {
      updateConversationInStore(conversationData.data);
    }
  }, [conversationData, conversationFromStore, updateConversationInStore]);

  useEffect(() => {
    if (conversation) {
      setTitle(conversation.title || "");
      setPriority(conversation.priority || "normal");
    }
  }, [conversation]);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleUpdateConversation = async () => {
    if (!title.trim()) return toast.error("Title cannot be empty");

    try {
      const result = await updateConversationMutation.mutateAsync({
        title,
        priority,
      });

      if (result?.data) {
        updateConversationInStore(result.data);
      }

      toast.success("Conversation updated");
      setIsEditDialogOpen(false);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to update conversation",
      );
    }
  };

  const handleAddRandomMembers = async () => {
    if (!selectedConversationId) return;

    const randomIds = Array.from({ length: 1 }, () => uuidv4());

    try {
      await addMembersMutation.mutateAsync({ participants: randomIds });
      toast.success("Added random member(s)");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add members");
    }
  };

  const handleMemberToggle = async (
    memberId: string,
    checked: boolean,
    memberName: string,
  ) => {
    try {
      if (checked) {
        await addMembersMutation.mutateAsync({ participants: [memberId] });
        toast.success(`${memberName} added`);
      } else {
        await removeMemberMutation.mutateAsync(memberId);
        toast.success(`${memberName} removed`);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update member");
    }
  };

  if (!selectedConversationId) {
    return (
      <div className="flex h-full items-center justify-center text-grey-light">
        Select a conversation to start chatting.
      </div>
    );
  }

  if (conversationLoading && !conversation) {
    return (
      <div className="flex h-full items-center justify-center text-grey-light">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading
        conversation...
      </div>
    );
  }

  return (
    <div className="flex flex-1 h-screen w-full overflow-hidden bg-white border border-grey-light">
      {/* Chat Feed */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-grey-light py-3 px-4 bg-white">
          <div>
            <h2 className="text-lg font-semibold text-grey">
              {conversation?.title || "Untitled Conversation"}
            </h2>
            <p className="text-sm text-grey-medium">
              {membersList?.length || 0} members
            </p>
          </div>
          <button
            onClick={() => setIsOpenDetails((prev) => !prev)}
            className="p-2 hover:bg-grey-light rounded-lg transition-colors"
          >
            <Info size={20} className="text-grey-medium" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-grey-light">
          {localMessages.length === 0 ? (
            <div className="text-center text-grey-light mt-10">
              No messages yet. Start the conversation!
            </div>
          ) : (
            localMessages.map((msg) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex flex-col w-fit max-w-[75%] p-3 rounded-2xl break-words shadow-sm",
                  msg.sender === "You"
                    ? "ml-auto bg-information text-white"
                    : "bg-white text-grey border border-grey-light",
                )}
              >
                <span className="text-xs font-semibold mb-1 opacity-80">
                  {msg.sender === "You" ? "You" : msg.sender}
                </span>
                <p className="text-sm whitespace-pre-wrap break-words">
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

        {/* Input */}
        <div className="border-t border-grey-light bg-white p-3 flex items-end gap-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 resize-none border border-grey-light rounded-lg px-3 py-2 text-grey focus:outline-none focus:ring-2 focus:ring-information max-h-32"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="bg-information hover:bg-information-dark disabled:bg-grey-light disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Send className="h-4 w-4" />
            <span>Send</span>
          </button>
        </div>
      </div>

      {/* Right Details Panel */}
      {isOpenDetails && (
        <div className="w-80 border-l border-grey-light bg-white overflow-y-auto">
          <div className="p-4 border-b border-grey-light flex items-center gap-2 bg-grey-light">
            <Users className="h-5 w-5 text-grey" />
            <h3 className="font-semibold text-grey">Details</h3>
          </div>

          <div className="p-4 space-y-6">
            <div>
              <h4 className="font-semibold text-grey mb-2">Title</h4>
              <p className="text-grey-medium">{conversation?.title || "N/A"}</p>
            </div>

            <div>
              <h4 className="font-semibold text-grey mb-2">Priority</h4>
              <span
                className={cn(
                  "inline-block px-3 py-1 rounded-full text-xs font-medium capitalize",
                  conversation?.priority === "urgent" &&
                    "bg-red-100 text-red-700",
                  conversation?.priority === "high" &&
                    "bg-orange-100 text-orange-700",
                  conversation?.priority === "normal" &&
                    "bg-blue-100 text-information-dark",
                )}
              >
                {conversation?.priority || "normal"}
              </span>
            </div>

            <div>
              <h4 className="font-semibold text-grey mb-3">
                Members ({membersList.length})
              </h4>
              {membersLoading && membersList.length === 0 ? (
                <p className="text-grey-light flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                </p>
              ) : membersList.length === 0 ? (
                <p className="text-grey-light">No members yet</p>
              ) : (
                <ul className="space-y-2">
                  {membersList.map((m) => (
                    <li
                      key={m.id}
                      className="flex items-center gap-3 text-sm p-2 hover:bg-grey-light rounded-lg transition-colors"
                    >
                      <img
                        src={
                          m.avatar ||
                          `https://ui-avatars.com/api/?name=${m.name}`
                        }
                        alt={m.name}
                        className="h-8 w-8 rounded-full object-cover border border-grey-light"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-grey">{m.name}</p>
                        {m.email && (
                          <p className="text-xs text-grey-light">{m.email}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t border-grey-light">
              <Button
                label="Manage Members"
                onClick={() => setIsAddMemberDialogOpen(true)}
                variant="primary"
              />
              <Button
                variant="outlined"
                label="Edit Conversation"
                onClick={() => setIsEditDialogOpen(true)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Manage Members Dialog */}
      <GenericDialog
        open={isAddMemberDialogOpen}
        onClose={() => setIsAddMemberDialogOpen(false)}
        title="Manage Members"
        maxWidth="max-w-md"
      >
        <div className="flex flex-col gap-4">
          <Button
            label="Add Random Members (Test)"
            onClick={handleAddRandomMembers}
            variant="primary"
            disabled={addMembersMutation.isPending}
          />

          {membersLoading && membersList.length === 0 ? (
            <p className="text-grey-light flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading members...
            </p>
          ) : membersList.length === 0 ? (
            <p className="text-grey-light">No members available.</p>
          ) : (
            <ul className="space-y-2 max-h-80 overflow-y-auto">
              {membersList.map((member) => {
                const isChecked = membersList.some((m) => m.id === member.id);
                return (
                  <li
                    key={member.id}
                    className="flex items-center justify-between p-3 border border-grey-light rounded-lg hover:bg-grey-light transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          member.avatar ||
                          `https://ui-avatars.com/api/?name=${member.name}`
                        }
                        alt={member.name}
                        className="h-10 w-10 rounded-full object-cover border border-grey-light"
                      />
                      <div>
                        <p className="text-sm font-medium text-grey">
                          {member.name}
                        </p>
                        <p className="text-xs text-grey-light">
                          {member.email || "No email"}
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleMemberToggle(
                          member.id,
                          e.target.checked,
                          member.name,
                        )
                      }
                      className="h-4 w-4 accent-information cursor-pointer"
                      disabled={
                        addMembersMutation.isPending ||
                        removeMemberMutation.isPending
                      }
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </GenericDialog>

      {/* Edit Conversation Dialog */}
      <GenericDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        title="Edit Conversation"
        maxWidth="max-w-md"
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-grey mb-2">
              Title
            </label>
            <Input
              placeholder="Conversation title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-grey mb-2">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full border border-grey-light rounded-lg px-3 py-2 text-grey focus:outline-none focus:ring-2 focus:ring-information"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <Button
            label="Update Conversation"
            onClick={handleUpdateConversation}
            disabled={updateConversationMutation.isPending}
          />
        </div>
      </GenericDialog>
    </div>
  );
};

export default ChatPanel;
