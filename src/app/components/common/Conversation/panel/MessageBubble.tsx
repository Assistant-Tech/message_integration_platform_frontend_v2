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
          {message.replyTo && (
            <div
              className={cn(
                "mb-2 rounded-lg border-l-2 px-2 py-1 text-xs",
                isAgent
                  ? "border-white/70 bg-white/15 text-white/90"
                  : "border-primary/60 bg-base-white text-grey",
              )}
            >
              <p className="font-semibold">{message.replyTo.senderName}</p>
              <p className="line-clamp-2 opacity-90">
                {message.replyTo.content}
              </p>
            </div>
          )}
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
