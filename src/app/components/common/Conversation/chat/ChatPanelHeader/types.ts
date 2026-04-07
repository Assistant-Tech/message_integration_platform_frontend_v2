import type { LucideIcon } from "lucide-react";
import type { Inbox } from "@/app/types/inbox.types";

export interface ConversationAction {
  key: string;
  label: string;
  Icon: LucideIcon;
  isActive: boolean;
  onSelect: (() => void) | undefined;
}

export interface ChatPanelHeaderProps {
  conversation: Inbox;
  isConnected: boolean;
  onDetailsToggle?: () => void;
  isDetailsOpen?: boolean;
  onAssignToggle?: () => void;
  isAssignOpen?: boolean;
  onResolve?: (id: string) => void;
  onTagsClick?: (id: string) => void;
}

export interface ActionHandlers {
  onDetailsToggle?: () => void;
  isDetailsOpen: boolean;
  onAssignToggle?: () => void;
  isAssignOpen: boolean;
  onResolve?: (id: string) => void;
  onTagsClick?: (id: string) => void;
}
