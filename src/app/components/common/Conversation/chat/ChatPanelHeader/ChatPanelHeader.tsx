import { Info } from "lucide-react";
import { ConversationAvatar } from "@/app/components/ui/ConversationAvatar";
import { Button, Label } from "@/app/components/ui";
import { cn } from "@/app/utils/cn";

import ActionMenu from "./ActionMenu";
import { buildActions, getDisplayName } from "./logic";
import type { ChatPanelHeaderProps } from "./types";

const ChatPanelHeader = ({
  conversation,
  onDetailsToggle,
  isDetailsOpen = false,
  onAssignToggle,
  isAssignOpen = false,
  onResolve,
  onTagsClick,
}: ChatPanelHeaderProps) => {
  const displayName = getDisplayName(conversation);
  const actions = buildActions(conversation, {
    onDetailsToggle,
    isDetailsOpen,
    onAssignToggle,
    isAssignOpen,
    onResolve,
    onTagsClick,
  });

  return (
    <header className="h-18 flex flex-shrink-0 items-center justify-between gap-3 border-b border-grey-light bg-base-white px-4 py-3">
      {/* Identity */}
      <div className="flex min-w-0 items-center gap-3">
        <ConversationAvatar
          name={displayName}
          platform={conversation.channel}
          avatarUrl={conversation.contact?.avatar}
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-grey">
            {displayName}
          </p>
          <span className="flex flex-wrap items-center gap-1.5 text-xs text-grey-medium">
            <span className="capitalize">
              {conversation.channel.toLowerCase()}
            </span>
            {conversation.priority !== "NORMAL" && (
              <Label variant="priority" value={conversation.priority} />
            )}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-shrink-0 items-center gap-2">
        <ActionMenu actions={actions} />
        <Button
          variant="none"
          iconOnly
          size="xs"
          aria-label="Details"
          aria-pressed={isDetailsOpen}
          onClick={onDetailsToggle}
          IconLeft={<Info className="h-4 w-4" />}
          className={cn(
            "!h-9 !w-9 rounded-full border transition-colors",
            isDetailsOpen
              ? "border-primary bg-primary-light text-primary"
              : "border-grey-light bg-base-white text-grey-medium hover:border-primary hover:bg-primary-light hover:text-primary",
          )}
        />
      </div>
    </header>
  );
};

export default ChatPanelHeader;
