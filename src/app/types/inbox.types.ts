/* --- API Generic Response Wrappers --- */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

/* --- Generic Types --- */
export type ChannelType = "INTERNAL" | "EXTERNAL" | "SUPPORT";

export interface UserSnippet {
  id: string;
  name: string;
  avatar: string | null;
}

export interface Participant {
  userId: string;
  role: "ADMIN" | "MEMBER";
  joinedAt: string;
  leftAt: string | null;
  user: UserSnippet;
}

export interface Contact {
  id: string;
  name: string;
  email?: string;
  avatar?: string | null;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/* --- Dataset Types --- */
export interface Inbox {
  id: string;
  title: string;
  type: "INTERNAL" | "CUSTOMER";
  channel: ChannelType;
  isGroup: boolean;
  status: "OPEN" | "CLOSED";
  priority: "LOW" | "NORMAL" | "HIGH";
  assignedTo: string | null;
  lastMessageContent: string;
  lastMessageAt: string;
  unreadCount: number;
  createdAt: string;
  contact: Contact | null;
  assignedUser: UserSnippet | null;
  participants: Participant[];
}

// Inherits everything from Inbox and adds tags
export interface InboxById extends Inbox {
  tags: string[];
}

// Specialized response for the list (includes pagination)
export interface InboxListResponse extends ApiResponse<Inbox[]> {
  pagination: Pagination;
}

// Specialized response for a single inbox
export type InboxDetailResponse = ApiResponse<InboxById>;

// Update Conversation
export interface UpdateConversationBody {
  title?: string;
  assignedTo?: string | null;
  priority?: "LOW" | "NORMAL" | "HIGH";
}

/* --- Request Bodies --- */
export interface CreateInboxBody {
  title: string;
  channel: "INTERNAL" | "FACEBOOK";
  type: "INTERNAL" | "CUSTOMER";
  isGroup: boolean;
  priority: "LOW" | "NORMAL" | "HIGH";
  participantIds?: string[];
  contactId?: string | null;
  assignedTo?: string | null;
}
