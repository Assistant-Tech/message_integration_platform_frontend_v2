import { cn } from "@/app/utils/cn";
import { formatMessageTime, getAvatarColour, getInitials } from "./helpers";
import { InboxMessage } from "@/app/types/message.types";

interface Props {
  message: InboxMessage;
  contactName: string;
  sentByLabel?: string;
  onReply?: () => void;
}

const CustomerChatMessageBubble = ({
  message,
  contactName,
  sentByLabel,
  onReply,
}: Props) => {
  const isAgent = message.senderName === "AGENT";

  return (
    <div
      className={cn("flex gap-3", isAgent ? "flex-row-reverse" : "flex-row")}
    >
      {!isAgent && (
        <div
          className={cn(
            "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold",
            getAvatarColour(contactName),
          )}
        >
          {getInitials(contactName)}
        </div>
      )}
      <div
        className={cn(
          "max-w-[70%] space-y-1",
          isAgent ? "items-end text-right" : "items-start",
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap break-words",
            isAgent
              ? "rounded-tr-sm bg-primary text-white"
              : "rounded-tl-sm bg-base-white text-grey shadow-sm ring-1 ring-grey-light",
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
          {message.content}
        </div>
        {!isAgent && onReply && (
          <button
            type="button"
            onClick={onReply}
            className="w-fit px-1 text-[12px] font-medium text-grey-medium transition-colors hover:text-primary"
          >
            Reply
          </button>
        )}
        {sentByLabel && (
          <p className="px-1 text-[10px] font-medium text-primary">
            Sent by {sentByLabel}
          </p>
        )}
        <p className="px-1 text-[10px] text-grey-medium">
          {formatMessageTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default CustomerChatMessageBubble;
