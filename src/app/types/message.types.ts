import type {
  ApiResponse,
  ChannelType,
  UserSnippet,
} from "@/app/types/common.types";

type Platform = ChannelType;

/* ─── Message Enums ──────────────────────────────────────────────────────── */
export type MessageType = "TEXT" | "IMAGE" | "FILE" | "AUDIO" | "VIDEO" | "VOICE";
// "RECIEVED" is a backend typo kept here intentionally for API compatibility
export type MessageStatus = "SENT" | "DELIVERED" | "READ" | "FAILED" | "RECIEVED";
// "INCOMING"/"OUTGOING" are Facebook-flavored values alongside the canonical ones
export type MessageDirection = "INTERNAL" | "INBOUND" | "OUTBOUND" | "INCOMING" | "OUTGOING";
export type MessageSenderType = "AGENT" | "CONTACT" | "SYSTEM" | "CUSTOMER";

/* ─── Attachments ───────────────────────────────────────────────────────── */

/** Raw attachment shape returned by the API */
export interface ApiAttachment {
  url: string;
  size: number;
  filename: string;
  originalFilename: string;
  mimeType: string;
}

/** Normalised attachment shape used throughout the UI */
export interface MessageAttachment {
  id: string;   // derived from url when the API doesn't provide one
  url: string;
  name: string;
  mimeType: string;
  size: number;
}

/* ─── Raw API Message ───────────────────────────────────────────────────── */
export interface ApiMessage {
  id: string;
  content: string | null;
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
  attachments: ApiAttachment[];
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
