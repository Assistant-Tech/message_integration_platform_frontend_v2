import { useEffect, useRef, useState } from "react";
import { CheckCheck, Info, Tag, UserPlus2 } from "lucide-react";
import { TopNavbar } from "@/app/features/dashboard/admin/component/ui";
import type { Inbox, InboxMessage } from "@/app/types/inbox.types";
import { useInboxMessagesQuery } from "@/app/hooks/query/useInboxQuery";
import CustomerChatEmptyState from "./customer-chat-panel/CustomerChatEmptyState";
import CustomerChatAvatar from "./customer-chat-panel/CustomerChatAvatar";
import CustomerChatMessageBubble from "./customer-chat-panel/CustomerChatMessageBubble";
import CustomerChatComposer from "./customer-chat-panel/CustomerChatComposer";
import InboxSkeleton from "@/app/components/ui/InboxSkeleton";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const [localMessages, setLocalMessages] = useState<InboxMessage[]>([]);
  const [input, setInput] = useState("");
  const [replyTarget, setReplyTarget] = useState<InboxMessage | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const { data: serverMessages = [], isLoading: isLoadingMessages } =
    useInboxMessagesQuery(conversation?.id ?? null);

  // console.log("serverMessages", serverMessages);
  useEffect(() => {
    setLocalMessages([]);
    setInput("");
    setReplyTarget(null);
  }, [conversation?.id]);

  const allMessages = [
    ...serverMessages,
    ...localMessages.filter(
      (local) => !serverMessages.some((s) => s.id === local.id),
    ),
  ];

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
    return () => cancelAnimationFrame(frameId);
  }, [allMessages.length]);

  const handleSend = () => {
    if (!input.trim() || !conversation) return;

    const optimistic: InboxMessage = {
      id: `optimistic-${Date.now()}`,
      sender: "agent",
      senderName: "You",
      senderId: "me",
      content: input.trim(),
      timestamp: new Date().toISOString(),
      type: "TEXT",
      status: "SENT",
      attachments: [],
      replyTo: replyTarget
        ? {
            id: replyTarget.id,
            senderName: replyTarget.senderName,
            content: replyTarget.content,
          }
        : null,
    };

    setLocalMessages((prev) => [...prev, optimistic]);
    setInput("");
    setReplyTarget(null);

    queryClient.setQueriesData(
      { queryKey: ["inbox"] },
      (old: Inbox[] | undefined) =>
        old?.map((inbox) =>
          inbox.id === conversation.id
            ? {
                ...inbox,
                lastMessageContent: input.trim(),
                lastMessageAt: new Date().toISOString(),
              }
            : inbox,
        ),
    );
  };

  if (!conversation) return <CustomerChatEmptyState />;

  const displayName = conversation.contact?.name ?? conversation.title;
  const subtitle = `${conversation.channel.toLocaleLowerCase()} · ${conversation.status.toLowerCase()}`;

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
            {allMessages.length === 0 && (
              <p className="py-10 text-center text-sm text-grey-medium">
                No messages yet. Start the conversation.
              </p>
            )}
            {allMessages.map((msg, index) => {
              const isLast = index === allMessages.length - 1;
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
                  onReply={
                    msg.sender === "customer"
                      ? () => setReplyTarget(msg)
                      : undefined
                  }
                />
              );
            })}
            <div ref={endRef} />
          </div>
        )}
      </div>

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
