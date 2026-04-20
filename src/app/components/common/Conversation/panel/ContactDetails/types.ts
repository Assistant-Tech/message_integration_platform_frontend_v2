import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { Inbox } from "@/app/types/inbox.types";

export type ConversationDetails = Inbox & { tags?: string[] };

export interface ContactDetailsProps {
  conversation: ConversationDetails;
  onClose: () => void;
  onAssignToggle?: () => void;
}

export interface SectionDef {
  key: "profile" | "tags" | "activity";
  open: boolean;
  onToggle: () => void;
}

export interface RowDef {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  copyKey?: string;
  copyValue?: string;
}
