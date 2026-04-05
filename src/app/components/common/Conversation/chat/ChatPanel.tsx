import { useEffect, useRef, useState } from "react";
import { CheckCheck, Info, Tag, UserPlus2 } from "lucide-react";
import { TopNavbar } from "@/app/features/dashboard/admin/component/ui";
import type { Inbox } from "@/app/types/inbox.types";
import ChatEmptyState from "@/app/components/common/Conversation/panel/ChatEmptyState";
import ChatAvatar from "@/app/components/common/Conversation/panel/ChatAvatar";
import MessageBubble from "@/app/components/common/Conversation/panel/MessageBubble";
import ChatComposer from "@/app/components/common/Conversation/panel/ChatComposer";
import InboxSkeleton from "@/app/components/ui/InboxSkeleton";
import { Label } from "@/app/components/ui";
import { InboxMessage } from "@/app/types/message.types";
import { useMessage } from "@/app/features/inbox/hooks/useMessage";
import { useSendMessage } from "@/app/features/inbox/hooks/useSendMessage";
import { useChatSocket } from "@/app/features/inbox/hooks/useChatSocket";
import TypingIndicator from "@/app/components/common/Conversation/chat/TypingIndicator";

const TYPING_STOP_DELAY = 1200;

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

const ChatPanel = ({
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
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const typingStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousConversationIdRef = useRef<string | null>(null);
  const shouldStickToBottomRef = useRef(true);
  const pendingLoadMoreHeightRef = useRef<number | null>(null);

  const {
    messages,
    isLoading: isLoadingMessages,
    canLoadMore,
    isLoadingMore,
    loadMore,
  } = useMessage(conversation?.id ?? null);

  // Socket Connection Idealogy
  const conversationId = conversation?.id ?? null;
  const { isConnected, isTyping, emitTypingStart, emitTypingStop } =
    useChatSocket(conversationId ?? null);

  useEffect(() => {
    setInput("");
    setReplyTarget(null);
  }, [conversation?.id]);

  useEffect(() => {
    const conversationChanged =
      previousConversationIdRef.current !== (conversation?.id ?? null);

    if (conversationChanged) {
      previousConversationIdRef.current = conversation?.id ?? null;
      shouldStickToBottomRef.current = true;

      const frameId = requestAnimationFrame(() => {
        endRef.current?.scrollIntoView({ behavior: "auto" });
      });

      return () => cancelAnimationFrame(frameId);
    }
  }, [conversation?.id]);

  useEffect(() => {
    if (pendingLoadMoreHeightRef.current === null) return;

    const container = messagesContainerRef.current;
    if (!container) return;

    const previousHeight = pendingLoadMoreHeightRef.current;
    const nextHeight = container.scrollHeight;
    container.scrollTop += nextHeight - previousHeight;
    pendingLoadMoreHeightRef.current = null;
  }, [messages.length]);

  useEffect(() => {
    if (!shouldStickToBottomRef.current) return;

    const frameId = requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ behavior: "auto" });
    });

    return () => cancelAnimationFrame(frameId);
  }, [messages.length, isTyping]);

  useEffect(() => {
    return () => {
      if (typingStopTimerRef.current) {
        clearTimeout(typingStopTimerRef.current);
      }
    };
  }, []);

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

    emitTypingStop();

    setInput("");
    setReplyTarget(null);
  };

  const handleTypingStart = () => {
    emitTypingStart();

    if (typingStopTimerRef.current) {
      clearTimeout(typingStopTimerRef.current);
    }

    typingStopTimerRef.current = setTimeout(() => {
      emitTypingStop();
    }, TYPING_STOP_DELAY);
  };

  const handleTypingStop = () => {
    if (typingStopTimerRef.current) {
      clearTimeout(typingStopTimerRef.current);
      typingStopTimerRef.current = null;
    }
    emitTypingStop();
  };

  const handleMessagesScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    shouldStickToBottomRef.current = distanceFromBottom < 80;
  };

  const handleLoadMore = () => {
    const container = messagesContainerRef.current;
    if (container) {
      pendingLoadMoreHeightRef.current = container.scrollHeight;
    }
    loadMore();
  };

  if (!conversation) return <ChatEmptyState />;

  const displayName = conversation.contact?.name ?? conversation.title;

  const subtitle = (
    <span className="flex items-center gap-1.5">
      <span>{conversation.channel.toLowerCase()}</span>
      <Label variant="status" value={conversation.status} />
      <span
        className={
          isConnected
            ? "text-[10px] font-medium text-emerald-600"
            : "text-[10px] font-medium text-amber-600"
        }
      >
        {isConnected ? "Live" : "Reconnecting"}
      </span>
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
          <ChatAvatar
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

      <div
        ref={messagesContainerRef}
        onScroll={handleMessagesScroll}
        className="min-h-0 flex-1 overflow-y-auto bg-white px-5 py-4"
      >
        {isLoadingMessages ? (
          <InboxSkeleton />
        ) : (
          <div className="flex min-h-full flex-col justify-end gap-4">
            {canLoadMore && (
              <div className="flex justify-center pb-1">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="rounded-full border border-grey-light px-4 py-1.5 text-xs font-medium text-grey transition-colors hover:bg-grey-light/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoadingMore ? "Loading..." : "Load more"}
                </button>
              </div>
            )}

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
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  contactName={displayName}
                  sentByLabel={sentByLabel}
                  onReply={() => setReplyTarget(msg)}
                />
              );
            })}

            {isTyping && <TypingIndicator />}

            <div ref={endRef} />
          </div>
        )}
      </div>

      {/* Reply and all stuffs */}
      <ChatComposer
        value={input}
        onChange={setInput}
        onSend={handleSend}
        replyTarget={replyTarget}
        onClearReply={() => setReplyTarget(null)}
        onTypingStart={handleTypingStart}
        onTypingStop={handleTypingStop}
      />
    </div>
  );
};

export default ChatPanel;
