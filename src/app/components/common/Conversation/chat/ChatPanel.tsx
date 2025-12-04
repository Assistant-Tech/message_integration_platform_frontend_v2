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
  ChatDetailsPanel,
  ChatFeed,
  ChatHeader,
  ChatInput,
  EditConversationDialog,
  ManageMembersDialog,
  ChatMembersDetailsPanel,
  ChatOrderInfoPanel,
  ChatSearchProductDetails,
} from "@/app/components/common/Conversation/chat/chat-panel";

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
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isOrderInfoOpen, setIsOrderInfoOpen] = useState(false);
  const [isProductSearchOpen, setIsProductSearchOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");
  const [isMembersPanelOpen, setIsMembersPanelOpen] = useState(false);

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

  const handleMemberToggle = async (
    id: string,
    checked: boolean,
    name: string,
  ) => {
    try {
      if (checked) {
        await addMembersMutation.mutateAsync({ participants: [id] });
        console.log(`${name} added`);
      } else {
        await removeMemberMutation.mutateAsync(id);
        console.log(`${name} removed`);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update member");
    }
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
    <div className="flex flex-1 h-full w-full bg-white border border-grey-light overflow-hidden">
      <div className="relative flex flex-col w-full h-full bg-white">
        <ChatHeader
          conversation={conversation}
          members={members}
          onToggleDetails={() => setIsOpenDetails((p) => !p)}
          isMembersPanelOpen={() => setIsMembersPanelOpen((p) => !p)}
          isOrderInfoOpen={() => setIsOrderInfoOpen((p) => !p)}
          isProductSearchOpen={() => setIsProductSearchOpen((p) => !p)}
        />
        <div className="flex-1 overflow-y-auto">
          <ChatFeed messages={localMessages} ref={messagesEndRef} />
        </div>
        <ChatInput
          message={message}
          onChange={setMessage}
          onSend={handleSend}
        />
      </div>

      <ChatSearchProductDetails
        isOpen={isProductSearchOpen}
        onClose={() => setIsProductSearchOpen(false)}
        onSendProduct={(productMsg) => {
          const newMsg = {
            _id: crypto.randomUUID(),
            sender: "You",
            content: productMsg,
            type: "product-details",
            createdAt: new Date().toISOString(),
          };

          // Add to local chat feed
          setLocalMessages((prev) => [...prev, newMsg]);

          // Optional: send to WS server
          sendMessage(selectedConversationId, JSON.stringify(productMsg));
        }}
      />

      {isOrderInfoOpen && (
        <ChatOrderInfoPanel
          onSendOrderMessage={(msg) => {
            setLocalMessages((prev) => [...prev, msg]);
          }}
        />
      )}

      {isOpenDetails && (
        <ChatDetailsPanel
          conversation={conversation}
          members={members}
          tenantUsers={tenantUsers}
          membersLoading={membersLoading}
          onEdit={() => setIsEditDialogOpen(true)}
          onManage={() => setIsAddMemberDialogOpen(true)}
        />
      )}

      {isMembersPanelOpen && (
        <ChatMembersDetailsPanel
          members={members}
          loading={membersLoading}
          isMembersPanelOpen={() => setIsMembersPanelOpen(false)}
          onManage={() => setIsAddMemberDialogOpen(true)}
        />
      )}

      <ManageMembersDialog
        open={isAddMemberDialogOpen}
        onClose={() => setIsAddMemberDialogOpen(false)}
        tenantUsers={tenantUsers}
        members={members}
        onToggleMember={handleMemberToggle}
        membersLoading={membersLoading}
      />

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
