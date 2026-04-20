import type {
  InboxMessage,
  MessageSenderType,
  MessageType,
  UISenderType,
} from "@/app/types/message.types";

/**
 * Map a raw API sender type to the UI sender type used in the inbox.
 */
export function toUISender(senderType: MessageSenderType): UISenderType {
  switch (senderType) {
    case "AGENT":
      return "agent";
    case "CUSTOMER":
    case "CONTACT":
      return "customer";
    default:
      return "system";
  }
}

// Legacy placeholder the socket normalizer used to emit for attachment-only
// messages. Strings equal to this are treated as empty content.
const LEGACY_ATTACHMENT_PLACEHOLDER = "[Attachment]";

/**
 * Bracket-tagged previews emitted by the backend for non-text message types.
 * When the backend sets `conversation.lastMessageContent` for an image/voice/etc.
 * message, it uses the string on the left; the frontend renders the value on
 * the right (emoji + localized label). Source of truth: backend lead spec.
 */
const BACKEND_TAG_LABELS: Record<string, string> = {
  "[Image]": "🖼 Photo",
  "[Video]": "🎥 Video",
  "[Audio]": "🎙 Voice message",
  "[Document]": "📄 Document",
  "[Location]": "📍 Location",
  "[Contact]": "👤 Contact",
  "[Template]": "📋 Template",
  "[Quick Reply]": "⚡ Quick reply",
};

/**
 * Human-friendly label for a media message type (shown in inbox sidebar
 * previews, toasts, and notifications when there's no text content).
 */
export function mediaTypeLabel(type: MessageType): string {
  switch (type) {
    case "IMAGE":
      return "📷 Photo";
    case "VIDEO":
      return "🎬 Video";
    case "AUDIO":
    case "VOICE":
      return "🎙️ Voice message";
    case "FILE":
      return "📄 Document";
    default:
      return "📎 Attachment";
  }
}

type PreviewInput = Pick<InboxMessage, "content" | "type" | "attachments">;

/**
 * Build a preview string for sidebar / toast / notification display.
 *
 * Priority:
 *   1. Real text content (not the legacy "[Attachment]" placeholder)
 *   2. Humanized label based on message type (📷 Photo, 🎙️ Voice message, …)
 *   3. If attachments exist but type is TEXT — fall back to "📎 Attachment"
 *   4. Empty string (caller decides the ultimate fallback, e.g. "No message yet")
 */
export function getMessagePreview(message: PreviewInput): string {
  const trimmed = message.content?.trim() ?? "";
  if (trimmed.length > 0 && trimmed !== LEGACY_ATTACHMENT_PLACEHOLDER) {
    return trimmed;
  }

  if (
    message.type === "IMAGE" ||
    message.type === "VIDEO" ||
    message.type === "AUDIO" ||
    message.type === "VOICE" ||
    message.type === "FILE"
  ) {
    return mediaTypeLabel(message.type);
  }

  if (message.attachments && message.attachments.length > 0) {
    return mediaTypeLabel("FILE");
  }

  return "";
}

/**
 * Narrow preview used when a conversation's `lastMessageContent` comes straight
 * from the backend (no type/attachments available at the call site).
 *
 * Maps the backend's bracket-tag conventions (`[Image]`, `[Video]`, … —
 * 8 tags total) to emoji + label. Real text passes through unchanged.
 */
export function sanitizePreviewText(
  content: string | null | undefined,
  fallback = "",
): string {
  const trimmed = content?.trim() ?? "";
  if (trimmed.length === 0) return fallback;
  if (trimmed === LEGACY_ATTACHMENT_PLACEHOLDER) return mediaTypeLabel("FILE");
  const mapped = BACKEND_TAG_LABELS[trimmed];
  if (mapped) return mapped;
  return trimmed;
}
