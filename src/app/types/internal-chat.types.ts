
// A single participant in a conversation
export interface ChatParticipant {
  id: string;
  name: string;
  role?: string;
  avatarUrl?: string | null;
  online?: boolean;
}

// A single conversation object
export interface InternalConversation {
  id: string;
  name: string;
  type: "channel" | "dm";
  createdAt: string;
  updatedAt: string;
  members: ChatParticipant[];
  lastMessage?: {
    id: string;
    senderId: string;
    content: string;
    createdAt: string;
  };
}

// Pagination metadata
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
}

// Full response type
export interface GetInternalConversationsResponse {
  data: InternalConversation[];
  meta: PaginationMeta;
  defaultConversation?: InternalConversation | null;
}

// -----------------------------
// API Function
// -----------------------------

export interface GetAllInternalConversationsParams {
  page?: number;
  limit?: number;
  includeDefault?: boolean;
}