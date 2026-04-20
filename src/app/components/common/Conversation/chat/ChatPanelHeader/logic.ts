import { Info, Tag, UserPlus2 } from "lucide-react";
import type { Inbox } from "@/app/types/inbox.types";
import type { ActionHandlers, ConversationAction } from "./types";

export function buildActions(
  conversation: Inbox,
  handlers: ActionHandlers,
): ConversationAction[] {
  return [
    {
      key: "details",
      label: "Details",
      Icon: Info,
      isActive: handlers.isDetailsOpen,
      onSelect: handlers.onDetailsToggle,
    },
    {
      key: "assign",
      label: "Assign",
      Icon: UserPlus2,
      isActive: handlers.isAssignOpen,
      onSelect: handlers.onAssignToggle,
    },
    {
      key: "tags",
      label: "Tags",
      Icon: Tag,
      isActive: false,
      onSelect: handlers.onTagsClick
        ? () => handlers.onTagsClick!(conversation.id)
        : undefined,
    },
  ];
}

export function getDisplayName(conversation: Inbox): string {
  return conversation.contact?.name ?? conversation.title;
}
