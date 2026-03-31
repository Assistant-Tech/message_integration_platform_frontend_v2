import { ConversationAvatar } from "@/app/components/ui/ConversationAvatar";
import { Trash2 } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { formatTimestamp } from "@/app/utils/helper";
import { Label } from "@/app/components/ui";
import { type Inbox } from "@/app/types/inbox.types";

interface Props {
  conv: Inbox;
  isSelected: boolean;
  onSelect: () => void;
  isManageMode?: boolean;
  onRemove?: () => void;
}
const ConversationItem = ({
  conv,
  isSelected,
  onSelect,
  isManageMode = false,
  onRemove,
}: Props) => {
  const displayName = conv.contact?.name ?? conv.title;
  const preview =
    conv.assignedUser && conv.unreadCount === 0
      ? `You: ${conv.lastMessageContent ?? ""}`
      : (conv.lastMessageContent ?? "No message yet");

  return (
    <div
      className={cn(
        "flex h-22 items-start gap-2 border-b border-grey-light px-4 py-3 transition-colors hover:bg-primary-light/50",
        isSelected && "bg-primary-light",
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex min-w-0 flex-1 items-start gap-3 text-left cursor-pointer"
      >
        <ConversationAvatar name={displayName} platform={conv.channel} />

        <div className="flex min-h-full min-w-0 flex-1 flex-col">
          {/* Name + timestamp */}
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm font-semibold text-grey">
              {displayName}
            </span>
            <span className="flex-shrink-0 text-xs text-grey-medium">
              {formatTimestamp(conv.lastMessageAt)}
            </span>
          </div>

          {/* Message preview + unread badge */}
          <div className="mt-0.5 flex items-center justify-between gap-2">
            <p className="truncate text-xs text-grey-medium">{preview}</p>
            {conv.unreadCount > 0 && (
              <span className="flex h-5 min-w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white">
                {conv.unreadCount}
              </span>
            )}
          </div>

          {/* Badges */}
          <div className="mt-1.5 flex flex-wrap gap-1 min-h-5">
            <Label variant="status" value={conv.status} />
            <Label variant="priority" value={conv.priority} />
            {conv.assignedUser && (
              <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-medium text-primary">
                {conv.assignedUser.name}
              </span>
            )}
          </div>
        </div>
      </button>

      {isManageMode && (
        <button
          type="button"
          onClick={onRemove}
          className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-grey-light bg-white text-grey-medium transition-colors hover:border-danger/30 hover:bg-danger/5 hover:text-danger"
          aria-label={`Remove ${displayName}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default ConversationItem;
