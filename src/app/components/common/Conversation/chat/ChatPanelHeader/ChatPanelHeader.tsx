import { ConversationAvatar } from "@/app/components/ui/ConversationAvatar";
import { Label } from "@/app/components/ui";
import { cn } from "@/app/utils/cn";

import ActionMenu from "./ActionMenu";
import ActionPill from "./ActionPill";
import { buildActions, getConnectionDisplay, getDisplayName } from "./logic";
import type { ChatPanelHeaderProps } from "./types";

const ChatPanelHeader = ({
  conversation,
  isConnected,
  onDetailsToggle,
  isDetailsOpen = false,
  onAssignToggle,
  isAssignOpen = false,
  onResolve,
  onTagsClick,
}: ChatPanelHeaderProps) => {
  const displayName = getDisplayName(conversation);
  const connection = getConnectionDisplay(isConnected);
  const actions = buildActions(conversation, {
    onDetailsToggle,
    isDetailsOpen,
    onAssignToggle,
    isAssignOpen,
    onResolve,
    onTagsClick,
  });

  return (
    <header className="flex flex-shrink-0 items-center justify-between gap-3 border-b border-grey-light bg-base-white px-4 py-3">
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
            <Label variant="status" value={conversation.status} />
            <span className={cn("font-medium", connection.className)}>
              {connection.label}
            </span>
            {conversation.priority !== "NORMAL" && (
              <Label variant="priority" value={conversation.priority} />
            )}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-shrink-0 items-center gap-2">
        <div className="hidden items-center gap-2 xl:flex">
          {actions.map((action) => (
            <ActionPill key={action.key} action={action} />
          ))}
        </div>
        <div className="flex xl:hidden">
          <ActionMenu actions={actions} />
        </div>
      </div>
    </header>
  );
};

export default ChatPanelHeader;
