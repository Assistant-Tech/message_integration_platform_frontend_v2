/**
 * Payload normalization and extraction utilities
 *
 * Converts various socket.io payload formats into our application types.
 * Handles the unified `inbox:event` payload shape from the backend.
 */

import type { InboxMessage, MessageType, MessageStatus } from "@/app/types/message.types";
import type { PlainObject, SenderInfo } from "./types";

// ────────────────────────────────────────────────────────────────────────────
// TYPE GUARDS
// ────────────────────────────────────────────────────────────────────────────

/**
 * Type guard: ensure value is a plain object
 */
export const isPlainObject = (value: unknown): value is PlainObject =>
  value !== null && typeof value === "object" && value.constructor === Object;

// ────────────────────────────────────────────────────────────────────────────
// PAYLOAD EXTRACTORS
// ────────────────────────────────────────────────────────────────────────────

/**
 * Extract conversation ID from payload.
 *
 * Primary path (inbox:event[new_message]): payload.message.conversation.id
 * Fallbacks for other shapes: conversationId, inboxId, roomId, chatId,
 * conversation.id (flat nested)
 */
export function extractConversationId(payload: PlainObject): string | null {
  // Primary: new backend shape — message.conversation.id
  const msgData = isPlainObject(payload.message) ? payload.message : null;
  const convData = msgData && isPlainObject(msgData.conversation)
    ? msgData.conversation
    : null;
  if (typeof convData?.id === "string" && convData.id.trim()) {
    return convData.id;
  }

  // Fallbacks for older shapes
  const candidates = [
    payload.conversationId,
    payload.inboxId,
    payload.roomId,
    payload.chatId,
    isPlainObject(payload.conversation) ? payload.conversation.id : undefined,
  ];

  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c;
  }

  return null;
}

/**
 * Extract message ID from payload.
 *
 * Primary path: payload.message.id
 * Fallbacks: id, messageId
 */
export function extractMessageId(payload: PlainObject): string | null {
  const msgData = isPlainObject(payload.message) ? payload.message : null;

  const candidates = [msgData?.id, payload.id, payload.messageId];
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c;
  }

  return null;
}

/**
 * Extract message content from payload.
 *
 * Returns null for attachment-only messages (content is null/missing).
 */
export function extractMessageContent(payload: PlainObject): string | null {
  const msgData = isPlainObject(payload.message) ? payload.message : null;

  const candidates = [msgData?.content, payload.content, payload.text];
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c;
  }

  return null;
}

/**
 * Extract sender info from payload.
 *
 * Primary path (new shape): payload.message.sender.{name, contactId}
 *   + payload.message.senderType for the role
 * Fallbacks: flat senderName / senderType fields
 */
export function extractSenderInfo(payload: PlainObject): SenderInfo & { profilePicUrl?: string | null } {
  const msgData = isPlainObject(payload.message) ? payload.message : null;
  const senderData = msgData && isPlainObject(msgData.sender)
    ? msgData.sender
    : null;

  // Name: prefer sender.name, then senderType, then legacy fields
  const name =
    (senderData?.name as string | undefined) ||
    (msgData?.senderType as string | undefined) ||
    (payload.senderName as string | undefined) ||
    (payload.senderType as string | undefined) ||
    "CUSTOMER";

  // ID: prefer sender.contactId, then legacy sentBy/senderId
  const id =
    (senderData?.contactId as string | undefined) ||
    (msgData?.sentBy as string | undefined) ||
    (payload.senderId as string | undefined) ||
    "";

  const profilePicUrl =
    (senderData?.profilePicUrl as string | null | undefined) ?? null;

  return { name, id, profilePicUrl };
}

/**
 * Extract timestamp from payload.
 * Primary: payload.message.sentAt
 * Fallback: payload.timestamp, current time
 */
export function extractTimestamp(payload: PlainObject): string {
  const msgData = isPlainObject(payload.message) ? payload.message : null;

  const candidates = [
    msgData?.sentAt,
    msgData?.timestamp,
    payload.timestamp,
    payload.sentAt,
  ];

  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c;
  }

  return new Date().toISOString();
}

/**
 * Map backend MessageType to frontend MessageType.
 * Backend types not in frontend enum fall back to "TEXT".
 */
function mapMessageType(raw: unknown): MessageType {
  const FRONTEND_TYPES: MessageType[] = ["TEXT", "IMAGE", "FILE", "AUDIO", "VIDEO"];
  if (typeof raw === "string" && FRONTEND_TYPES.includes(raw as MessageType)) {
    return raw as MessageType;
  }
  // Backend DOCUMENT → FILE
  if (raw === "DOCUMENT") return "FILE";
  return "TEXT";
}

/**
 * Map backend MessageStatus to frontend MessageStatus.
 */
function mapMessageStatus(raw: unknown): MessageStatus {
  const FRONTEND_STATUSES: MessageStatus[] = ["SENT", "DELIVERED", "READ", "FAILED"];
  if (typeof raw === "string" && FRONTEND_STATUSES.includes(raw as MessageStatus)) {
    return raw as MessageStatus;
  }
  return "DELIVERED";
}

// ────────────────────────────────────────────────────────────────────────────
// MESSAGE NORMALIZER
// ────────────────────────────────────────────────────────────────────────────

/**
 * Normalize an `inbox:event[new_message]` payload to InboxMessage.
 *
 * Handles:
 * - The new unified inbox:event shape (payload.message.*)
 * - Null content for attachment-only messages (uses "[Attachment]" placeholder)
 * - Sender role mapping: CUSTOMER/BOT → "customer", AGENT → "agent", SYSTEM → "system"
 * - Profile picture URL from payload.message.sender.profilePicUrl
 *
 * Returns null if the required message ID cannot be extracted.
 */
export function normalizeMessage(payload: unknown): InboxMessage | null {
  if (!isPlainObject(payload)) return null;

  const id = extractMessageId(payload);
  if (!id) return null;

  const content = extractMessageContent(payload) ?? "[Attachment]";
  const { name: senderName, id: senderId, profilePicUrl } = extractSenderInfo(payload);
  const timestamp = extractTimestamp(payload);

  const msgData = isPlainObject(payload.message) ? payload.message : null;
  const type = mapMessageType(msgData?.type ?? payload.type);
  const status = mapMessageStatus(msgData?.status ?? payload.status);

  // Derive UI sender role from senderType
  const senderType = (msgData?.senderType ?? payload.senderType) as string | undefined;
  const sender =
    senderType === "AGENT" ? "agent"
    : senderType === "SYSTEM" ? "system"
    : "customer";

  return {
    id,
    content,
    senderName,
    sender,
    senderId,
    profilePicUrl,
    timestamp,
    type,
    status,
    attachments: [],
    replyTo: null,
  };
}
