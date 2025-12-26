// -----------------------------
// Shared Types
// -----------------------------
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
}

export interface ChatParticipant {
  id: string;
  name: string;
  email?: string;
  role?: string;
  avatar?: string | null;
  online?: boolean;
}

// -----------------------------
// Internal Conversation Types
// -----------------------------
export type ChatPlatform = "facebook" | "instagram" | "whatsapp" | "internal";
export interface participantsDetails {
  name: string;
  
  avatar?: string;
}
export interface InternalConversation {
  _id: string;
  tenantId: string;
  title: string;
  type: "INTERNAL";
  isDefault: boolean;
  status: "open" | "closed";
  priority: "normal" | "high" | "urgent";
  tags: string[];
  participants: string[];
  participantsWithDetails: participantsDetails[];
  lastMessage?: string;
  avatar?: string | null;
  platform?: ChatPlatform;
  lastActiveAt: string;
  createdAt: string;
  updatedAt: string;
  messages?: string;
}

export interface GetInternalConversationsResponse {
  data: InternalConversation[];
  meta: PaginationMeta;
  defaultConversation?: InternalConversation | null;
}

export interface GetAllInternalConversationsParams {
  page?: number;
  limit?: number;
  includeDefault?: boolean;
  search?: string;
}

// -----------------------------
// Create Conversation
// -----------------------------
export interface CreateInternalConversationPayload {
  title: string;
  type: "INTERNAL" | "WHATSAPP" | "FACEBOOK" | "INSTAGRAM";
  status: "open" | "closed" | "pending";
  priority: "normal" | "high" | "urgent";
}

export interface InternalConversationResponse {
  message: string;
  success: boolean;
  data: InternalConversation;
  timestamp: string;
}

// -----------------------------
// Members Management
// -----------------------------
export interface MemberDetails {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface InternalConversationMembersResponse {
  success: boolean;
  message: string;
  data: MemberDetails[];
}

export interface AddConversationMembersPayload {
  participants: string[];
}

export interface AddConversationMembersResponse {
  success: boolean;
  message: string;
  data: MemberDetails[];
}

// -----------------------------
// Search Filter Typse
// -----------------------------
export interface SearchParamstypes {
  search: string;
  includeDefault: "false" | boolean;
}
