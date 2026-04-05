import type {
  ApiResponse,
  ChannelType,
  UserSnippet,
} from "@/app/types/common.types";

type Platform = ChannelType;

/* ─── Message Enums ──────────────────────────────────────────────────────── */
export type MessageType = "TEXT" | "IMAGE" | "FILE" | "AUDIO" | "VIDEO";
export type MessageStatus = "SENT" | "DELIVERED" | "READ" | "FAILED";
export type MessageDirection = "INTERNAL" | "INBOUND" | "OUTBOUND";
export type MessageSenderType = "AGENT" | "CONTACT" | "SYSTEM" | "CUSTOMER";

/* ─── Attachments ───────────────────────────────────────────────────────── */
export interface MessageAttachment {
  id: string;
  url: string;
  name: string;
  mimeType: string;
  size: number;
}

/* ─── Raw API Message ───────────────────────────────────────────────────── */
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

/* ─── API Response ──────────────────────────────────────────────────────── */
export interface MessageListData {
  items: ApiMessage[];
  nextCursor: string | null;
}

export type MessageListResponse = ApiResponse<MessageListData>;

/* ─── UI Message Shape ──────────────────────────────────────────────────── */
export type UISenderType = "agent" | "customer" | "system";

export interface InboxMessage {
  id: string;
  sender: UISenderType;
  senderName: "AGENT" | "CUSTOMER" | string;
  senderId: string;
  profilePicUrl?: string | null;
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

/* ─── Send Message Payload ──────────────────────────────────────────────── */
export interface SendMessagePayload {
  conversationId: string;
  content: string;
  parentId?: string | null;
  channel?: Platform;
}
