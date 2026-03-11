import { useEffect, useRef, useState } from "react";
import { CheckCheck, Info, Tag } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { TopNavbar } from "@/app/features/dashboard/admin/component/ui";
import type {
  CustomerConversation,
  ConversationMessage,
} from "@/app/features/dashboard/admin/pages/conversation/mockData/customerConversationMockData";
import {
  LEAD_SOURCE_LABELS,
  LEAD_SOURCE_STYLES,
  TAG_STYLES,
} from "@/app/features/dashboard/admin/pages/conversation/mockData/customerConversationMockData";
import CustomerChatAvatar from "@/app/components/common/Conversation/customer/customer-chat-panel/CustomerChatAvatar";
import CustomerChatComposer from "@/app/components/common/Conversation/customer/customer-chat-panel/CustomerChatComposer";
import CustomerChatEmptyState from "@/app/components/common/Conversation/customer/customer-chat-panel/CustomerChatEmptyState";
import CustomerChatMessageBubble from "@/app/components/common/Conversation/customer/customer-chat-panel/CustomerChatMessageBubble";
import { getPlatformSubtitle } from "@/app/components/common/Conversation/customer/customer-chat-panel/helpers";

interface Props {
  conversation: CustomerConversation | null;
  onResolve?: (id: string) => void;
  onTagsClick?: (id: string) => void;
  onDetailsToggle?: () => void;
  isDetailsOpen?: boolean;
}

const CustomerChatPanel = ({
  conversation,
  onResolve,
  onTagsClick,
  onDetailsToggle,
  isDetailsOpen = false,
}: Props) => {
  const [messages, setMessages] = useState<ConversationMessage[]>(
    conversation?.messages ?? [],
  );
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    endRef.current?.scrollIntoView({ behavior, block: "end" });
  };

  useEffect(() => {
    setMessages(conversation?.messages ?? []);
    setInput("");
  }, [conversation?._id]);

  useEffect(() => {
    const behavior = conversation ? "auto" : "smooth";
    const frameId = window.requestAnimationFrame(() => {
      scrollToBottom(behavior);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [conversation?._id, messages.length]);

  const handleSend = () => {
    if (!input.trim() || !conversation) return;

    const newMsg: ConversationMessage = {
      _id: `local-${Date.now()}`,
      sender: "agent",
      senderName: "You",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  if (!conversation) {
    return <CustomerChatEmptyState />;
  }

  const hasTags = Boolean(conversation.tags?.length);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {/* ── TopNavbar ── */}
      <TopNavbar
        title={
          <>
            <span className="truncate">{conversation.contactName}</span>
            {conversation.leadSource && (
              <span
                className={cn(
                  "inline-flex max-w-full items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                  LEAD_SOURCE_STYLES[conversation.leadSource],
                )}
              >
                {LEAD_SOURCE_LABELS[conversation.leadSource]}
              </span>
            )}
            {hasTags &&
              conversation.tags?.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "inline-flex max-w-full items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    TAG_STYLES[tag] ?? "bg-grey-light text-grey",
                  )}
                >
                  {tag}
                </span>
              ))}
          </>
        }
        subtitle={getPlatformSubtitle(conversation)}
        showHelp={false}
        showNotifications={false}
        showProfileMenu={false}
        leadingContent={
          <CustomerChatAvatar
            name={conversation.contactName}
            platform={conversation.platform}
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
            label: "Tags",
            icon: Tag,
            onClick: () => onTagsClick?.(conversation._id),
            isActive: false,
          },
          {
            label: "Resolve",
            icon: CheckCheck,
            onClick: () => onResolve?.(conversation._id),
            isActive: conversation.status === "resolved",
          },
        ]}
      />

      {/* ── Message Feed ── */}
      <div className="min-h-0 flex-1 overflow-y-auto bg-primary-light/20 px-5 py-4">
        <div className="flex min-h-full flex-col justify-end gap-4">
          {messages.map((msg) => (
            <CustomerChatMessageBubble
              key={msg._id}
              message={msg}
              contactName={conversation.contactName}
            />
          ))}
          <div ref={endRef} />
        </div>
      </div>

      {/* ── Input ── */}
      <CustomerChatComposer
        value={input}
        onChange={setInput}
        onSend={handleSend}
      />
    </div>
  );
};

export default CustomerChatPanel;
