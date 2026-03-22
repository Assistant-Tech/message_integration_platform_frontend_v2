import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useChatSocket } from "@/app/socket/useInternalChatSocket";
import { useInternalConversationStore } from "@/app/store/internal-conversation.store";
import {
  useInternalConversationById,
  useInternalConversationMembers,
  useUpdateInternalConversation,
  useAddConversationMembers,
  useRemoveConversationMember,
} from "@/app/socket/conversation/useInternalConversation";
import { useTenantStore } from "@/app/store/tenant.store";
import {
  AssignMembersDrawer,
  ChatHeader,
  ChatDetailsPanel,
  ChatFeed,
  ChatInput,
  EditConversationDialog,
  ChatMembersDetailsPanel,
  ChatOrderInfoPanel,
  ChatSearchProductDetails,
} from "@/app/components/common/Conversation/chat/chat-panel";
// import ChatOrderNotesPanel from "./chat-panel/ChatNotesOrderPanel";

const ChatPanel = () => {
  const {
    selectedConversationId,
    conversations,
    updateConversation: updateConversationInStore,
  } = useInternalConversationStore();

  const { sendMessage, incomingMessages } = useChatSocket();
  const { tenantUsers, fetchTenantUsers } = useTenantStore();

  const [message, setMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<any[]>([]);
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [isAssignDrawerOpen, setIsAssignDrawerOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isOrderInfoOpen, setIsOrderInfoOpen] = useState(false);
  const [isProductSearchOpen, setIsProductSearchOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");
  const [isMembersPanelOpen, setIsMembersPanelOpen] = useState(false);
  const [messageSearch, setMessageSearch] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTenantUsers();
  }, []);

  const conversationFromStore = conversations.find(
    (c) => c._id === selectedConversationId,
  );

  const shouldFetchConversation =
    !!selectedConversationId && !conversationFromStore;

  const { data: conversationData, isLoading: conversationLoading } =
    useInternalConversationById(selectedConversationId || "", {
      enabled: shouldFetchConversation,
    });

  const { data: membersData, isLoading: membersLoading } =
    useInternalConversationMembers(selectedConversationId || "", {
      enabled: !!selectedConversationId,
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
  const members = membersData?.data || [];
  const filteredMessages = localMessages.filter((msg) => {
    if (!messageSearch.trim()) return true;

    const query = messageSearch.toLowerCase().trim();
    const content =
      typeof msg.content === "string"
        ? msg.content
        : JSON.stringify(msg.content || "");

    return (
      content.toLowerCase().includes(query) ||
      (msg.sender || "").toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    if (conversationData?.data && !conversationFromStore) {
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

  useEffect(() => {
    if (selectedConversationId) {
      setLocalMessages(incomingMessages[selectedConversationId] || []);
    }
  }, [incomingMessages, selectedConversationId]);

  // Close all other drawers when one is opened
  const closeAllDrawers = () => {
    setIsOpenDetails(false);
    setIsMembersPanelOpen(false);
    setIsAssignDrawerOpen(false);
    setIsOrderInfoOpen(false);
    setIsProductSearchOpen(false);
  };

  const handleToggleDetails = () => {
    const nextState = !isOpenDetails;
    closeAllDrawers();
    setIsOpenDetails(nextState);
  };

  const handleToggleMembers = () => {
    const nextState = !isMembersPanelOpen;
    closeAllDrawers();
    setIsMembersPanelOpen(nextState);
  };

  const handleToggleOrderInfo = () => {
    const nextState = !isOrderInfoOpen;
    closeAllDrawers();
    setIsOrderInfoOpen(nextState);
  };

  const handleToggleProductSearch = () => {
    const nextState = !isProductSearchOpen;
    closeAllDrawers();
    setIsProductSearchOpen(nextState);
  };

  const handleToggleOrderNotes = () => {
    closeAllDrawers();
  };

  const handleToggleAssignDrawer = () => {
    const nextState = !isAssignDrawerOpen;
    closeAllDrawers();
    setIsAssignDrawerOpen(nextState);
  };

  const handleSend = () => {
    if (!message.trim() || !selectedConversationId) return;

    const optimisticMessage = {
      _id: `temp-${Date.now()}`,
      sender: "You",
      content: message.trim(),
      createdAt: new Date().toISOString(),
    };

    setLocalMessages((prev) => [...prev, optimisticMessage]);
    sendMessage(selectedConversationId, message.trim());
    setMessage("");
  };

  const handleUpdateConversation = async () => {
    if (!title.trim()) return toast.error("Title cannot be empty");

    try {
      await updateConversationMutation.mutateAsync({ title, priority });
      toast.success("Conversation updated");
      setIsEditDialogOpen(false);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to update conversation",
      );
    }
  };

  const handleSaveMemberAssignment = async (nextSelectedIds: string[]) => {
    const currentMemberIds = new Set((members || []).map((m: any) => m.id));
    const nextMemberIds = new Set(nextSelectedIds);

    const toAdd = nextSelectedIds.filter((id) => !currentMemberIds.has(id));
    const toRemove = [...currentMemberIds].filter(
      (id) => !nextMemberIds.has(id),
    );

    try {
      await Promise.all([
        ...toAdd.map((id) =>
          addMembersMutation.mutateAsync({ participants: [id] }),
        ),
        ...toRemove.map((id) => removeMemberMutation.mutateAsync(id)),
      ]);

      toast.success("Members assignment updated");
      setIsAssignDrawerOpen(false);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to save member assignment",
      );
    }
  };

  const handleUpdateConversationTags = (tags: string[]) => {
    if (!conversation) return;

    updateConversationInStore({ ...conversation, tags });
  };

  if (!selectedConversationId)
    return (
      <div className="flex h-full items-center justify-center text-grey-light">
        Select a conversation to start chatting.
      </div>
    );

  if (conversationLoading && !conversation)
    return (
      <div className="flex h-full items-center justify-center text-grey-light">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading
        conversation...
      </div>
    );

  return (
    <div className="flex h-full w-full overflow-hidden bg-primary-light/20">
      <div className="relative flex h-full w-full min-w-0 flex-col overflow-hidden bg-base-white">
        <ChatHeader
          conversation={conversation}
          members={members}
          onToggleDetails={handleToggleDetails}
          onToggleMembers={handleToggleMembers}
          onToggleOrderInfo={handleToggleOrderInfo}
          onToggleProductSearch={handleToggleProductSearch}
          onToggleOrderNotes={handleToggleOrderNotes}
          onUpdateTags={handleUpdateConversationTags}
        />
        <div className="min-h-0 flex-1 overflow-y-auto bg-primary-light/30">
          <ChatFeed
            messages={filteredMessages}
            members={members}
            ref={messagesEndRef}
          />
        </div>
        <ChatInput
          message={message}
          onChange={setMessage}
          onSend={handleSend}
        />

        {isOpenDetails && (
          <>
            <button
              type="button"
              aria-label="Close details drawer overlay"
              className="absolute inset-0 z-10 bg-primary-dark/5 backdrop-blur-[1px]"
              onClick={() => setIsOpenDetails(false)}
            />
            <div className="absolute inset-y-0 right-0 z-20 w-full max-w-[380px] border-l border-grey-light bg-base-white shadow-sm">
              <ChatDetailsPanel
                onClose={() => setIsOpenDetails(false)}
                conversation={conversation}
                members={members}
                membersLoading={membersLoading}
                onEdit={() => setIsEditDialogOpen(true)}
                onManage={() => {
                  setIsOpenDetails(false);
                  setIsAssignDrawerOpen(true);
                }}
              />
            </div>
          </>
        )}

        {isAssignDrawerOpen && (
          <>
            <button
              type="button"
              aria-label="Close assign drawer overlay"
              className="absolute inset-0 z-10 bg-primary-dark/5 backdrop-blur-[1px]"
              onClick={() => setIsAssignDrawerOpen(false)}
            />
            <div className="absolute inset-y-0 right-0 z-20 w-full max-w-[420px]">
              <AssignMembersDrawer
                tenantUsers={tenantUsers}
                members={members}
                membersLoading={membersLoading}
                isSaving={
                  addMembersMutation.isPending || removeMemberMutation.isPending
                }
                onClose={() => setIsAssignDrawerOpen(false)}
                onSave={handleSaveMemberAssignment}
              />
            </div>
          </>
        )}
      </div>

      {isProductSearchOpen && (
        <ChatSearchProductDetails
          onClose={() => setIsProductSearchOpen(false)}
          onSendProduct={(productMsg) => {
            const newMsg = {
              _id: crypto.randomUUID(),
              sender: "You",
              content: productMsg,
              type: "product-details",
              createdAt: new Date().toISOString(),
            };
            setLocalMessages((prev) => [...prev, newMsg]);
          }}
        />
      )}

      {/* {isOrderNotesOpen && (
        <ChatOrderNotesPanel
          onClose={() => setIsOrderNotesOpen(false)}
          conversationId={selectedConversationId}
        />
      )} */}

      {isOrderInfoOpen && (
        <ChatOrderInfoPanel
          onSendOrderMessage={(msg) => {
            setLocalMessages((prev) => [...prev, msg]);
          }}
        />
      )}

      {isMembersPanelOpen && (
        <ChatMembersDetailsPanel
          members={members}
          loading={membersLoading}
          onMemberDetailsClose={() => setIsMembersPanelOpen(false)}
          onManage={() => {
            setIsMembersPanelOpen(false);
            setIsAssignDrawerOpen(true);
          }}
        />
      )}

      <EditConversationDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        title={title}
        setTitle={setTitle}
        priority={priority}
        setPriority={setPriority}
        onUpdate={handleUpdateConversation}
        isLoading={updateConversationMutation.isPending}
      />
    </div>
  );
};

export default ChatPanel;
