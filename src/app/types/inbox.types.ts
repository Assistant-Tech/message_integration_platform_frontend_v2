/* ─── Generic API Wrapper ─────────────────────────────────────────────────── */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

/* ─── Shared Enums ────────────────────────────────────────────────────────── */
// export type ChannelType = "INTERNAL" | "EXTERNAL" | "SUPPORT";
export type ChannelType = "FACEBOOK" | "WHATSAPP" | "TIKTOK" | "INSTAGRAM";
export type InboxType = "INTERNAL" | "CUSTOMER";
export type InboxStatus = "OPEN" | "CLOSED";
export type InboxPriority = "LOW" | "NORMAL" | "HIGH";
export type ParticipantRole = "ADMIN" | "MEMBER";
export type TabId = "all" | ChannelType;
export type QuickFilterId = "unread" | "priority" | "followUp";
export type StatusFilter = "all" | "OPEN" | "CLOSED";
export type SortOption = "latest" | "oldest" | "name-asc" | "name-desc";

// Message-specific enums — derived from real API response shape
export type MessageType = "TEXT" | "IMAGE" | "FILE" | "AUDIO" | "VIDEO";
export type MessageStatus = "SENT" | "DELIVERED" | "READ" | "FAILED";
export type MessageDirection = "INTERNAL" | "INBOUND" | "OUTBOUND";
export type MessageSenderType = "AGENT" | "CONTACT" | "SYSTEM" | "CUSTOMER";

/* ─── Shared Primitives ───────────────────────────────────────────────────── */
export interface UserSnippet {
  id: string;
  name: string;
  avatar: string | null;
}

export interface Contact {
  id: string;
  name: string;
  email?: string;
  avatar?: string | null;
}

export interface Participant {
  userId: string;
  role: ParticipantRole;
  joinedAt: string;
  leftAt: string | null;
  user: UserSnippet;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/* ─── Inbox ───────────────────────────────────────────────────────────────── */
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

// Extends Inbox with fields only available on the detail endpoint
export interface InboxById extends Inbox {
  tags: string[];
}

/* ─── Inbox API Responses ─────────────────────────────────────────────────── */
export interface InboxListResponse extends ApiResponse<Inbox[]> {
  pagination: Pagination;
}

export type InboxDetailResponse = ApiResponse<InboxById>;

/* ─── Messages — Raw API Shape (/inbox/:id/messages) ─────────────────────── */
export interface MessageAttachment {
  id: string;
  url: string;
  name: string;
  mimeType: string;
  size: number;
}

// Exact shape returned by the API — never mutate, only read
export interface ApiMessage {
  id: string;
  content: string;
  type: MessageType;
  direction: MessageDirection;
  senderType: MessageSenderType;
  status: MessageStatus;
  channel: ChannelType;
  sentAt: string;
  sentBy: string | null;
  parentId: string | null;
  metadata: Record<string, unknown> | null;
  isDeleted: boolean;
  createdAt: string;
  sender: UserSnippet | null;
  attachments: MessageAttachment[];
}

export interface MessageListData {
  items: ApiMessage[];
  nextCursor: string | null;
}

export type MessageListResponse = ApiResponse<MessageListData>;

/* ─── Messages — UI Shape ─────────────────────────────────────────────────── */
export type UISenderType = "agent" | "customer" | "system";

export interface InboxMessage {
  id: string;
  sender: UISenderType;
  senderName: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: MessageType;
  status: MessageStatus;
  attachments: MessageAttachment[];
  replyTo: {
    id: string;
    senderName: string;
    content: string;
  } | null;
}

/* ─── Request Bodies ──────────────────────────────────────────────────────── */
export interface CreateInboxBody {
  title: string;
  channel: ChannelType;
  type: InboxType;
  isGroup: boolean;
  priority: InboxPriority;
  participantIds?: string[];
  contactId?: string | null;
  assignedTo?: string | null;
}

export interface UpdateConversationBody {
  title?: string;
  assignedTo?: string | null;
  priority?: InboxPriority;
}

export interface SendMessageBody {
  content: string;
  type?: MessageType;
  parentId?: string | null;
}
