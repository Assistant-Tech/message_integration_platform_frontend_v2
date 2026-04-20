import { useEffect, useRef } from "react";
import { ConversationAvatar } from "@/app/components/ui/ConversationAvatar";
import { BellDot, Ellipsis, Pin, Trash2 } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { formatTimestamp } from "@/app/utils/helper";
import { Button, Label } from "@/app/components/ui";
import { type Inbox } from "@/app/types/inbox.types";
import UnreadBadge from "@/app/components/common/Conversation/chat/UnreadBadge";
import { sanitizePreviewText } from "@/app/utils/inbox/messageAdapters";

interface Props {
  conv: Inbox;
  isSelected: boolean;
  onSelect: () => void;
  onRemove?: () => void;
  openId: string | null;
  setOpenId: (id: string | null) => void;
  isPinned?: boolean;
  onTogglePin?: () => void;
}
const ConversationItem = ({
  conv,
  isSelected,
  onSelect,
  openId,
  setOpenId,
  isPinned = false,
  onTogglePin,
}: Props) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const isOpen = openId === conv.id;

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenId(null);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenId(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, setOpenId]);

  const displayName = conv.contact?.name ?? conv.title;
  const showTyping = Boolean(conv.isTyping);
  const sanitizedLast = sanitizePreviewText(conv.lastMessageContent, "");
  const preview =
    conv.assignedUser && conv.unreadCount === 0
      ? `You: ${sanitizedLast}`
      : sanitizedLast || "No message yet";

  const handleDialogDrop = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string | null,
  ) => {
    e.stopPropagation();
    setOpenId(openId === id ? null : id);
  };

  return (
    <div
      className={cn(
        "relative group flex items-center justify-between ",
        "flex h-22 items-start gap-2 border-b border-grey-light px-4 py-3 transition-colors hover:bg-primary-light/50",
        isSelected && "bg-primary-light",
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex min-w-0 flex-1 items-start gap-3 text-left cursor-pointer"
      >
        <ConversationAvatar
          name={displayName}
          platform={conv.channel}
          hasUnread={conv.unreadCount > 0}
          avatarUrl={conv.contact?.avatar}
        />

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
            <p
              className={cn(
                "truncate text-xs",
                showTyping ? "font-medium text-primary" : "text-grey-medium",
              )}
            >
              {showTyping ? "Typing..." : preview}
            </p>
            <div className="flex items-center gap-1.5">
              {conv.hasNewMessage && conv.unreadCount === 0 && (
                <BellDot
                  className="h-4 w-4 text-primary"
                  aria-label="New message"
                />
              )}
              <UnreadBadge count={conv.unreadCount} />
            </div>
          </div>

          {/* Badges */}
          <div className="mt-1.5 flex flex-wrap gap-1 min-h-5">
            {conv.priority !== "NORMAL" && (
              <Label variant="priority" value={conv.priority} />
            )}
            {conv.assignedUser && (
              <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-medium text-primary">
                {conv.assignedUser.name}
              </span>
            )}
          </div>
        </div>
      </button>

      <div ref={menuRef}>
        {/* Only showcase when hovered */}
        <div
          className={cn(
            "absolute right-4 top-7",
            isOpen ? "block" : "hidden group-hover:block",
          )}
        >
          <Button
            variant="none"
            onClick={(e) => handleDialogDrop(e, conv.id)}
            className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-grey-light bg-white "
            IconRight={<Ellipsis className="h-4 w-4 rounded-full" />}
          />
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute right-6 top-18 z-10 min-w-[130px] rounded-lg border border-grey-light bg-white shadow-md">
            <Button
              variant="none"
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin?.();
                setOpenId(null);
              }}
              className="flex gap-2 px-3 py-2 text-xs text-grey"
              IconLeft={<Pin className="h-3.5 w-3.5" />}
              label={isPinned ? "Unpin" : "Pin"}
            />

            <Button
              label="Remove"
              variant="none"
              onClick={(e) => {
                e.stopPropagation();
                setOpenId(null);
              }}
              className="flex gap-2 px-3 py-2 text-xs text-grey"
              IconLeft={<Trash2 className="h-3.5 w-3.5" />}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;
