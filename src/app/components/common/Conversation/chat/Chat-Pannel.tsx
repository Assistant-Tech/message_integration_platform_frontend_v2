import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";
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
import { useTenantStore } from "@/app/store/tenant.store";

interface Member {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  status: string;
  lastActiveAt?: string;
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

  const { sendMessage, incomingMessages } = useChatSocket();

  const { tenantUsers, fetchTenantUsers } = useTenantStore();

  useEffect(() => {
    fetchTenantUsers();
  }, [fetchTenantUsers]);

  const [message, setMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<
    "low" | "normal" | "high" | "urgent"
  >("normal");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationFromStore = conversations.find(
    (c) => c._id === selectedConversationId,
  );

  const shouldFetchConversation =
    !!selectedConversationId && !conversationFromStore;

  const { data: conversationData, isLoading: conversationLoading } =
    useInternalConversationById(selectedConversationId || "", {
      enabled: shouldFetchConversation,
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
    if (
      conversationData?.data &&
      !conversationFromStore &&
      selectedConversationId
    ) {
      updateConversationInStore(conversationData.data);
    }
  }, [conversationData?.data?._id]);

  useEffect(() => {
    if (conversation) {
      setTitle(conversation.title || "");
      setPriority(conversation.priority || "normal");
    }
  }, [conversation?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  const handleSend = () => {
    if (!message.trim() || !selectedConversationId) return;

    const optimisticMessage: Message = {
      _id: `temp-${Date.now()}`,
      sender: "You",
      content: message.trim(),
      createdAt: new Date().toISOString(),
    };

    setLocalMessages((prev) => [...prev, optimisticMessage]);
    sendMessage(selectedConversationId, message.trim());
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
      if (conversation) {
        updateConversationInStore({
          ...conversation,
          title,
        });
      }

      const result = await updateConversationMutation.mutateAsync({
        title,
        priority,
      });
      console.log("🚀 ~ handleUpdateConversation ~ result:", result);

      toast.success("Conversation updated");
      setIsEditDialogOpen(false);
    } catch (err: any) {
      if (conversation) {
        updateConversationInStore(conversation);
      }
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

  useEffect(() => {
    if (selectedConversationId) {
      setLocalMessages(incomingMessages[selectedConversationId] || []);
    }
  }, [incomingMessages, selectedConversationId]);

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
    <div className="flex flex-1 h-screen w-full bg-white border border-grey-light">
      {/* Chat Feed */}
      <div className="relative flex flex-col w-full h-screen bg-white">
        <div className="sticky top-0 z-10 flex items-center justify-between py-2 px-4 bg-white">
          <div>
            <h2 className="text-lg font-semibold text-grey">
              {conversation?.title || "Untitled Conversation"}
            </h2>
            <p className="text-sm text-grey-medium">
              {members?.length || 0} members
            </p>
          </div>
          <button
            onClick={() => setIsOpenDetails((prev) => !prev)}
            className="p-2 hover:bg-grey-light rounded-lg transition-colors"
          >
            <Info size={20} className="text-grey-medium" />
          </button>
        </div>

        <div className="flex-1 p-4 space-y-3 bg-slate-100">
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

        <div className="sticky bottom-0 z-10 border-t border-grey-light bg-white p-3 flex items-end gap-2">
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
        <div className="w-96 border-l border-grey-light bg-base-white overflow-y-auto">
          <div className="px-4 py-6 border-b border-grey-light flex items-center gap-2 bg-base-white">
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
                    "bg-red-100 text-danger",
                  conversation?.priority === "high" &&
                    "bg-orange-100 text-warning",
                  conversation?.priority === "normal" &&
                    "bg-blue-100 text-information-dark",
                )}
              >
                {conversation?.priority || "normal"}
              </span>
            </div>

            <div>
              <h4 className="font-semibold text-grey mb-3">
                Members ({members.length})
              </h4>
              {membersLoading && members.length === 0 ? (
                <p className="text-grey-light flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                </p>
              ) : members.length === 0 ? (
                <p className="text-grey-light">No members yet</p>
              ) : (
                <ul className="space-y-2">
                  {tenantUsers?.map(({ user }) => {
                    const isChecked = members.some((m) => m.id === user.id);
                    const isOnline = user.status === "ONLINE";
                    const lastActive =
                      user.status === "OFFLINE" && user.joinedAt
                        ? formatDistanceToNow(new Date(user.joinedAt), {
                            addSuffix: true,
                          })
                        : null;

                    return (
                      <li
                        key={user.id}
                        className="flex items-center justify-between p-3 border border-grey-light rounded-lg hover:bg-grey-light transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={
                                user.avatar ||
                                `https://ui-avatars.com/api/?name=${user.name}`
                              }
                              alt={user.name}
                              className="h-8 w-8 rounded-full object-cover border border-grey-light"
                            />
                            {/* Online indicator */}
                            <span
                              className={cn(
                                "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
                                isOnline ? "bg-primary" : "bg-grey-light",
                              )}
                              title={isOnline ? "Online" : "Offline"}
                            ></span>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-grey">
                              {user.name}
                            </p>
                            {/* <p className="text-xs text-grey-medium">
                              {user.email || "No email"}
                            </p> */}
                            <p className="text-xs text-grey-medium">
                              {isOnline ? (
                                <span className="text-green-600">Online</span>
                              ) : lastActive ? (
                                `Last active ${lastActive}`
                              ) : (
                                "Offline"
                              )}
                            </p>
                          </div>
                        </div>

                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            handleMemberToggle(
                              user.id,
                              e.target.checked,
                              user.name,
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

          {membersLoading && members.length === 0 ? (
            <p className="text-grey-medium flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading members...
            </p>
          ) : members.length === 0 ? (
            <p className="text-grey-medium">No members available.</p>
          ) : (
            <ul className="space-y-2 max-h-80 overflow-y-auto">
              {members.map((member) => {
                const isChecked = members.some((m) => m.id === member.id);
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
                        <p className="text-xs text-grey-medium">
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
