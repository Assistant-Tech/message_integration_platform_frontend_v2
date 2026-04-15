import type {
  ApiResponse,
  ChannelType,
  Contact,
  Pagination,
  Participant,
  UserSnippet,
} from "@/app/types/common.types";

/* ─── Inbox Enums ────────────────────────────────────────────────────────── */
export type InboxType = "INTERNAL" | "CUSTOMER";
export type InboxStatus = "OPEN" | "CLOSED";
export type InboxPriority = "LOW" | "NORMAL" | "HIGH";

/* ─── Filters ────────────────────────────────────────────────────────────── */
export type TabId = "all" | ChannelType;
export type QuickFilterId = "unread" | "priority" | "followUp";
export type StatusFilter = "all" | "OPEN" | "CLOSED";
export type SortOption = "latest" | "oldest" | "name-asc" | "name-desc";

/* ─── Inbox ──────────────────────────────────────────────────────────────── */
export interface Inbox {
  id: string;
  title: string;
  type: InboxType;
  channel: ChannelType;
  isGroup: boolean;
  status: InboxStatus;
  priority: InboxPriority;
  assignedTo: string | null;
  lastMessageContent: string;
  lastMessageAt: string;
  unreadCount: number;
  createdAt: string;
  contact: Contact;
  assignedUser: UserSnippet | null;
  participants: Participant[];
  isTyping?: boolean;
  hasNewMessage?: boolean;
}

export interface InboxById extends Inbox {
  tags: string[];
}

/* ─── Request Bodies ─────────────────────────────────────────────────────── */
export interface CreateInboxBody {
  title: string;
  type: InboxType;
  channel: ChannelType;
}

export interface UpdateConversationBody {
  title?: string;
  priority?: InboxPriority;
  status?: InboxStatus;
  assignedTo?: string | null;
}

/* ─── API Responses ──────────────────────────────────────────────────────── */
export interface InboxListResponse extends ApiResponse<Inbox[]> {
  pagination: Pagination;
}

export type InboxDetailResponse = ApiResponse<InboxById>;
