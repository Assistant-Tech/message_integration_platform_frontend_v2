import { ConversationAvatar } from "@/app/components/ui/ConversationAvatar";
import { Trash2 } from "lucide-react";
import {
  CustomerConversation,
  LEAD_SOURCE_LABELS,
  LEAD_SOURCE_STYLES,
  TAG_STYLES,
} from "@/app/features/dashboard/admin/pages/conversation/mockData/customerConversationMockData";
import { cn } from "@/app/utils/cn";
import { formatTimestamp } from "@/app/utils/helper";

const ConversationItem = ({
  conv,
  isSelected,
  onSelect,
  isManageMode = false,
  onRemove,
}: {
  conv: CustomerConversation;
  isSelected: boolean;
  onSelect: () => void;
  isManageMode?: boolean;
  onRemove?: () => void;
}) => {
  const preview = conv.sentByAgent
    ? `You: ${conv.lastMessage}`
    : conv.lastMessage;

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
        <ConversationAvatar name={conv.contactName} platform={conv.platform} />

        <div className="flex min-h-full min-w-0 flex-1 flex-col">
          {/* Name + timestamp */}
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm font-semibold text-grey">
              {conv.contactName}
            </span>
            <span className="flex-shrink-0 text-xs text-grey-medium">
              {formatTimestamp(conv.timestamp)}
            </span>
          </div>

          {/* Message preview + unread badge */}
          <div className="mt-0.5 flex items-center justify-between gap-2">
            <p className="truncate text-xs text-grey-medium">{preview}</p>
            {!!conv.unreadCount && conv.unreadCount > 0 && (
              <span className="flex h-5 min-w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white">
                {conv.unreadCount}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="mt-1.5 min-h-5">
            {(conv.leadSource || (conv.tags && conv.tags.length > 0)) && (
              <div className="flex flex-wrap gap-1">
                {conv.leadSource && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium",
                      LEAD_SOURCE_STYLES[conv.leadSource],
                    )}
                  >
                    {LEAD_SOURCE_LABELS[conv.leadSource]}
                  </span>
                )}
                {conv.tags?.map((tag: any) => (
                  <span
                    key={tag}
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium",
                      TAG_STYLES[tag] ?? "bg-grey-light text-grey",
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </button>

      {isManageMode && (
        <button
          type="button"
          onClick={onRemove}
          className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-grey-light bg-white text-grey-medium transition-colors hover:border-danger/30 hover:bg-danger/5 hover:text-danger"
          aria-label={`Remove ${conv.contactName}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default ConversationItem;
