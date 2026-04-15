import type { ChannelType } from "@/app/types/common.types";

export type ContactStatus = "active" | "inactive" | "blocked";

export interface ContactRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  channel: ChannelType;
  status: ContactStatus;
  lastMessageAt: string;
  conversationCount: number;
  tags: string[];
}

export type ContactSortField = "name" | "lastMessage" | "conversations";
export type ContactFilterStatus = ContactStatus | "all";
