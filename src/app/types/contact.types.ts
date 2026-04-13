export interface ContactChannelIdentity {
  id: string;
  channel: "FACEBOOK" | "INSTAGRAM" | "WHATSAPP" | "TIKTOK" | "INTERNAL";
  identifier: string;
  username: string | null;
  profilePicUrl: string | null;
}

export interface Contact {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  avatar: string | null;
  customFields: Record<string, unknown> | null;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
  channelIdentities: ContactChannelIdentity[];
  _count?: { conversations: number };
}

export interface CreateContactPayload {
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  customFields?: Record<string, unknown>;
}

export interface UpdateContactPayload {
  name?: string;
  email?: string | null;
  phone?: string | null;
  avatar?: string | null;
  customFields?: Record<string, unknown> | null;
}

export interface MergeContactPayload {
  sourceContactId: string;
}

export interface ContactListParams {
  search?: string;
  channel?: string;
  sort?: string;
  page?: number;
  limit?: number;
}
