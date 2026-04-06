/* ─── Generic API Wrapper ─────────────────────────────────────────────────── */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

/* ─── Shared Enums ────────────────────────────────────────────────────────── */
export type ChannelType = "FACEBOOK" | "WHATSAPP" | "TIKTOK" | "INSTAGRAM";

export type ParticipantRole = "ADMIN" | "MEMBER";

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
  avatar?: string;
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
