import type {
  ApiResponse,
  ChannelType,
  Contact,
  Pagination,
  Participant,
  UserSnippet,
} from "./common.types";

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
  contact: Contact | null;
  assignedUser: UserSnippet | null;
  participants: Participant[];
}

export interface InboxById extends Inbox {
  tags: string[];
}

/* ─── API Responses ──────────────────────────────────────────────────────── */
export interface InboxListResponse extends ApiResponse<Inbox[]> {
  pagination: Pagination;
}

export type InboxDetailResponse = ApiResponse<InboxById>;
