import { useEffect, useRef, useState } from "react";
import { CheckCheck, Info, Tag, UserPlus2 } from "lucide-react";
import { TopNavbar } from "@/app/features/dashboard/admin/component/ui";
import type { Inbox } from "@/app/types/inbox.types";
import CustomerChatEmptyState from "@/app/components/common/Conversation/customer/customer-chat-panel/CustomerChatEmptyState";
import CustomerChatAvatar from "@/app/components/common/Conversation/customer/customer-chat-panel/CustomerChatAvatar";
import CustomerChatMessageBubble from "@/app/components/common/Conversation/customer/customer-chat-panel/CustomerChatMessageBubble";
import CustomerChatComposer from "@/app/components/common/Conversation/customer/customer-chat-panel/CustomerChatComposer";
import InboxSkeleton from "@/app/components/ui/InboxSkeleton";
import { Label } from "@/app/components/ui";
import { InboxMessage } from "@/app/types/message.types";
import { useMessage } from "@/app/features/inbox/conversation/hooks/useMessage";
import { useSendMessage } from "@/app/features/inbox/conversation/hooks/useSendMessage";

interface Props {
  conversation: Inbox | null;
  onDetailsToggle?: () => void;
  isDetailsOpen?: boolean;
  onAssignToggle?: () => void;
  isAssignOpen?: boolean;
  assignedMemberName?: string;
  onResolve?: (id: string) => void;
  onTagsClick?: (id: string) => void;
}

const CustomerChatPanel = ({
  conversation,
  onDetailsToggle,
  isDetailsOpen = false,
  onAssignToggle,
  isAssignOpen = false,
  assignedMemberName,
  onResolve,
  onTagsClick,
}: Props) => {
  const [input, setInput] = useState("");
  const [replyTarget, setReplyTarget] = useState<InboxMessage | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const { messages, isLoading: isLoadingMessages } = useMessage(
    conversation?.id ?? null,
  );

  useEffect(() => {
    setInput("");
    setReplyTarget(null);
  }, [conversation?.id]);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return () => cancelAnimationFrame(frameId);
  }, [messages.length]);

  const { mutate: sendMessageMutation } = useSendMessage(
    conversation?.id ?? null,
  );

  const handleSend = () => {
    if (!input.trim() || !conversation) return;

    const text = input.trim();

    sendMessageMutation({
      conversationId: conversation.id,
      content: text,
      parentId: replyTarget?.id ?? null,
    });

    setInput("");
    setReplyTarget(null);
  };

  if (!conversation) return <CustomerChatEmptyState />;

  const displayName = conversation.contact?.name ?? conversation.title;

  const subtitle = (
    <span className="flex items-center gap-1.5">
      <span>{conversation.channel.toLowerCase()}</span>
      <Label variant="status" value={conversation.status} />
      {conversation.priority !== "NORMAL" && (
        <Label variant="priority" value={conversation.priority} />
      )}
    </span>
  );

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <TopNavbar
        title={<span className="truncate">{displayName}</span>}
        subtitle={subtitle}
        showSearch={false}
        showHelp={false}
        showNotifications={false}
        showProfileMenu={false}
        leadingContent={
          <CustomerChatAvatar
            name={displayName}
            platform={conversation.channel}
          />
        }
        actions={[
          {
            label: "Details",
            icon: Info,
            onClick: onDetailsToggle,
            isActive: isDetailsOpen,
          },
          {
            label: "Assign",
            icon: UserPlus2,
            onClick: onAssignToggle,
            isActive: isAssignOpen,
          },
          {
            label: "Tags",
            icon: Tag,
            onClick: () => onTagsClick?.(conversation.id),
            isActive: false,
          },
          {
            label: "Resolve",
            icon: CheckCheck,
            onClick: () => onResolve?.(conversation.id),
            isActive: conversation.status === "CLOSED",
          },
        ]}
      />

      <div className="min-h-0 flex-1 overflow-y-auto bg-white px-5 py-4">
        {isLoadingMessages ? (
          <InboxSkeleton />
        ) : (
          <div className="flex min-h-full flex-col justify-end gap-4">
            {messages.length === 0 && (
              <p className="py-10 text-center text-sm text-grey-medium">
                No messages yet. Start the conversation.
              </p>
            )}

            {messages.map((msg, index) => {
              const isLast = index === messages.length - 1;

              const sentByLabel =
                isLast && msg.sender === "agent"
                  ? (assignedMemberName ?? msg.senderName)
                  : undefined;

              return (
                <CustomerChatMessageBubble
                  key={msg.id}
                  message={msg}
                  contactName={displayName}
                  sentByLabel={sentByLabel}
                  onReply={() => setReplyTarget(msg)}
                />
              );
            })}

            <div ref={endRef} />
          </div>
        )}
      </div>

      {/* Reply and all stuffs */}
      <CustomerChatComposer
        value={input}
        onChange={setInput}
        onSend={handleSend}
        replyTarget={replyTarget}
        onClearReply={() => setReplyTarget(null)}
      />
    </div>
  );
};

export default CustomerChatPanel;
