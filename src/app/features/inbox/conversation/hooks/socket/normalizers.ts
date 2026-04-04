/**
 * Payload normalization and extraction utilities
 *
 * Converts various socket.io payload formats into our application types.
 * Handles API schema flexibility with multiple field name fallbacks.
 */

import type { InboxMessage } from "@/app/types/message.types";
import type { PlainObject, SenderInfo } from "./types";

// ────────────────────────────────────────────────────────────────────────────
// TYPE GUARDS
// ────────────────────────────────────────────────────────────────────────────

/**
 * Type guard: ensure value is a plain object
 * Checks both type and constructor to avoid prototype pollution
 */
export const isPlainObject = (value: unknown): value is PlainObject =>
  value !== null && typeof value === "object" && value.constructor === Object;

// ────────────────────────────────────────────────────────────────────────────
// PAYLOAD EXTRACTORS
// ────────────────────────────────────────────────────────────────────────────

/**
 * Extract conversation ID from payload with fallback chain
 *
 * Attempts multiple field names to handle API schema variations:
 * - conversationId (preferred)
 * - inboxId
 * - roomId
 * - chatId
 * - conversation.id (nested)
 */
export function extractConversationId(payload: PlainObject): string | null {
  const conversationIdCandidates = [
    payload.conversationId,
    payload.inboxId,
    payload.roomId,
    payload.chatId,
    isPlainObject(payload.conversation) ? payload.conversation.id : undefined,
  ];

  for (const candidate of conversationIdCandidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }
  }

  return null;
}

/**
 * Extract message ID from payload with fallback chain
 *
 * Attempts:
 * - message.id (nested message object)
 * - id (top-level)
 * - messageId
 */
export function extractMessageId(payload: PlainObject): string | null {
  const msgData = isPlainObject(payload.message) ? payload.message : null;
  const idCandidates = [msgData?.id, payload.id, payload.messageId];

  for (const candidate of idCandidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }
  }

  return null;
}

/**
 * Extract message content from payload with fallback chain
 *
 * Attempts:
 * - message.content (nested)
 * - content
 * - text (alternative field name)
 */
export function extractMessageContent(payload: PlainObject): string | null {
  const msgData = isPlainObject(payload.message) ? payload.message : null;
  const contentCandidates = [msgData?.content, payload.content, payload.text];

  for (const candidate of contentCandidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }
  }

  return null;
}

/**
 * Extract sender information (name and ID) from payload
 *
 * Returns:
 * - name: defaults to "CUSTOMER" if not found
 * - id: defaults to empty string if not found
 */
export function extractSenderInfo(payload: PlainObject): SenderInfo {
  const msgData = isPlainObject(payload.message) ? payload.message : null;

  const name =
    (msgData?.senderName as string | undefined) ||
    (msgData?.senderType as string | undefined) ||
    (payload.senderName as string | undefined) ||
    (payload.senderType as string | undefined) ||
    "CUSTOMER";

  const id =
    (msgData?.senderId as string | undefined) ||
    (msgData?.sentBy as string | undefined) ||
    (payload.senderId as string | undefined) ||
    (payload.sentBy as string | undefined) ||
    "";

  return { name, id };
}

/**
 * Extract timestamp from payload with fallback to current time
 *
 * Attempts multiple field names, falls back to ISO string of now.
 */
export function extractTimestamp(payload: PlainObject): string {
  const msgData = isPlainObject(payload.message) ? payload.message : null;

  const timestampCandidates = [
    msgData?.sentAt,
    msgData?.timestamp,
    payload.timestamp,
    payload.sentAt,
  ];

  for (const candidate of timestampCandidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }
  }

  return new Date().toISOString();
}

// ────────────────────────────────────────────────────────────────────────────
// MESSAGE NORMALIZER
// ────────────────────────────────────────────────────────────────────────────

/**
 * Normalize incoming socket payload to InboxMessage type
 *
 * @param payload - Raw socket.io event payload
 * @returns InboxMessage if payload contains required fields (id, content), null otherwise
 *
 * This function:
 * 1. Validates payload structure
 * 2. Extracts all required and optional fields using fallback chains
 * 3. Returns typed InboxMessage or null if validation fails
 */
export function normalizeMessage(payload: unknown): InboxMessage | null {
  if (!isPlainObject(payload)) return null;

  const id = extractMessageId(payload);
  const content = extractMessageContent(payload);

  // Required fields validation
  if (!id || !content) return null;

  const { name: senderName, id: senderId } = extractSenderInfo(payload);
  const timestamp = extractTimestamp(payload);

  return {
    id,
    content,
    senderName,
    sender: senderName === "AGENT" ? "agent" : "customer",
    senderId,
    timestamp,
    type: "TEXT",
    status: "DELIVERED",
    attachments: [],
    replyTo: null,
  };
}
