
export interface Session {
  sessionId: string;
  device: string;
  browser: string;
  ip: string;
  location: string | null;
  lastUsedAt: string;
  isActive: boolean;
}

export interface MemberLoginActivity {
  userId: string;
  memberId: string;
  email: string;
  name: string;
  lastLoginAt: string;
  status: "ONLINE" | "OFFLINE";
  activeSecondsToday: number;
  sessions: Session[];
}

export interface LoginActivityMeta {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface LoginActivityResponse {
  message: string;
  data: MemberLoginActivity[];
  meta: LoginActivityMeta;
  success: boolean;
  timestamp: string;
}


export interface InviteMemberPayload {
  email: string;
  role?: string;
}

export interface InviteMemberResponse {
  message: string;
  success: boolean;
  timestamp: string;
}