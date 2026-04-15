import { cn } from "@/app/utils/cn";
import { formatMessageTime } from "./helpers";
import { InboxMessage } from "@/app/types/message.types";
import MessageStatusIcon from "@/app/components/common/Conversation/chat/MessageStatusIcon";
import { ConversationAvatar } from "@/app/components/ui/ConversationAvatar";
import MessageContent from "./MessageContent";
import { CornerUpLeft, Ellipsis } from "lucide-react";

interface Props {
  message: InboxMessage;
  avatar?: string;
  contactName: string;
  onReply?: () => void;
  showTime?: boolean;
  showAvatar?: boolean;
}

const MessageBubble = ({
  message,
  contactName,
  avatar,
  onReply,
  showTime = false,
  showAvatar = true,
}: Props) => {
  const isAgent = message.senderName === "AGENT";

  return (
    <div className={cn("flex w-full flex-col", isAgent ? "items-end" : "items-start")}>
      <div
        className={cn(
          "group flex w-full items-end gap-2",
          isAgent ? "flex-row-reverse" : "flex-row",
        )}
      >
        {/* Avatar or spacer to keep alignment */}
        {!isAgent &&
          (showAvatar ? (
            <ConversationAvatar name={contactName} avatarUrl={avatar} />
          ) : (
            <div className="w-12 flex-shrink-0" />
          ))}

        {/* Bubble */}
        <div
          className={cn(
            "max-w-[70%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap break-words",
            isAgent
              ? "rounded-lg bg-primary text-white"
              : "rounded-lg bg-base-white text-grey shadow-sm ring-1 ring-grey-light",
          )}
        >
          {message.replyTo && (() => {
            const isSelfQuote =
              message.replyTo.senderName === message.senderName;
            const quotedName = isSelfQuote
              ? isAgent
                ? "You"
                : contactName
              : message.replyTo.senderName;
            const quotedContent = message.replyTo.content?.trim()
              ? message.replyTo.content
              : "Attachment";
            return (
              <div
                className={cn(
                  "mb-2 flex items-stretch gap-0 overflow-hidden rounded-lg text-xs",
                  isAgent
                    ? "bg-white/15 text-white/95"
                    : "bg-primary-light/40 text-grey",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "w-[3px] flex-shrink-0 rounded-l-sm",
                    isAgent ? "bg-white/80" : "bg-primary",
                  )}
                />
                <div className="min-w-0 flex-1 px-2 py-1.5">
                  <p
                    className={cn(
                      "flex items-center gap-1 font-semibold",
                      isAgent ? "text-white" : "text-primary",
                    )}
                  >
                    <CornerUpLeft
                      className={cn(
                        "h-3 w-3 flex-shrink-0",
                        isAgent ? "text-white/80" : "text-primary/80",
                      )}
                    />
                    <span className="truncate">{quotedName}</span>
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 line-clamp-2 italic",
                      isAgent ? "text-white/85" : "text-grey-medium",
                    )}
                  >
                    {quotedContent}
                  </p>
                </div>
              </div>
            );
          })()}
          <MessageContent message={message} isAgent={isAgent} />
        </div>

        {/* Hover action buttons */}
        <div className="hidden group-hover:flex items-center gap-1 pb-1">
          <button
            type="button"
            onClick={onReply}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-grey-light bg-white text-grey-medium transition-colors hover:text-primary hover:border-primary/30"
            aria-label="Reply"
          >
            <CornerUpLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-grey-light bg-white text-grey-medium transition-colors hover:text-grey hover:border-grey-medium"
            aria-label="More options"
          >
            <Ellipsis className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Time + status — shown once per minute group */}
      {showTime && (
        <div
          className={cn(
            "mt-0.5 flex items-center gap-1 px-1",
            isAgent ? "flex-row-reverse" : "flex-row",
            isAgent && "ml-auto",
          )}
        >
          <p className="text-[10px] text-grey-medium">
            {formatMessageTime(message.timestamp)}
          </p>
          {isAgent &&
            (message.status === "SENT" ||
              message.status === "DELIVERED" ||
              message.status === "READ") && (
              <MessageStatusIcon status={message.status} />
            )}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
