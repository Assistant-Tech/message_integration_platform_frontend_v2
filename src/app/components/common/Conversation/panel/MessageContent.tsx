import { Download, FileText, Music, Play } from "lucide-react";
import type { InboxMessage, MessageAttachment } from "@/app/types/message.types";
import { cn } from "@/app/utils/cn";

interface Props {
  message: InboxMessage;
  isAgent: boolean;
}

// ── Attachment renderers ────────────────────────────────────────────────────

function ImageAttachment({ attachment }: { attachment: MessageAttachment }) {
  return (
    <a
      href={attachment.url}
      target="_blank"
      rel="noreferrer"
      className="block overflow-hidden rounded-2xl"
      style={{ maxWidth: 260 }}
    >
      <img
        src={attachment.url}
        alt={attachment.name}
        loading="lazy"
        className="block h-auto w-auto cursor-zoom-in transition-opacity hover:opacity-90"
        style={{ maxWidth: 260, maxHeight: 320, minWidth: 80, minHeight: 60 }}
      />
    </a>
  );
}

function AudioAttachment({
  attachment,
  isAgent,
}: {
  attachment: MessageAttachment;
  isAgent: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl px-3 py-2",
        isAgent ? "bg-white/15" : "bg-grey-light/60",
      )}
    >
      <Music className="size-4 shrink-0 opacity-70" />
      <audio controls src={attachment.url} className="h-8 w-48 min-w-0">
        Your browser does not support audio playback.
      </audio>
    </div>
  );
}

function VideoAttachment({ attachment }: { attachment: MessageAttachment }) {
  return (
    <div className="relative max-w-[300px] w-full rounded-lg overflow-hidden">
      <video
        controls
        src={attachment.url}
        className="w-full rounded-lg"
        preload="metadata"
      >
        <Play className="absolute inset-0 m-auto size-10 opacity-70" />
      </video>
    </div>
  );
}

function FileAttachment({
  attachment,
  isAgent,
}: {
  attachment: MessageAttachment;
  isAgent: boolean;
}) {
  const sizeLabel =
    attachment.size > 0
      ? attachment.size < 1024 * 1024
        ? `${(attachment.size / 1024).toFixed(1)} KB`
        : `${(attachment.size / (1024 * 1024)).toFixed(1)} MB`
      : null;

  return (
    <a
      href={attachment.url}
      download={attachment.name}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-opacity hover:opacity-80",
        isAgent ? "bg-white/15 text-white" : "bg-grey-light/60 text-grey",
      )}
    >
      <FileText className="size-5 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium">{attachment.name}</p>
        {sizeLabel && (
          <p className="text-[10px] opacity-60">{sizeLabel}</p>
        )}
      </div>
      <Download className="size-4 shrink-0 opacity-70" />
    </a>
  );
}

// ── Dispatcher ─────────────────────────────────────────────────────────────

function renderAttachment(
  attachment: MessageAttachment,
  isAgent: boolean,
) {
  const mime = attachment.mimeType?.toLowerCase() ?? "";

  if (mime.startsWith("image/")) {
    return <ImageAttachment key={attachment.id} attachment={attachment} />;
  }
  if (mime.startsWith("audio/")) {
    return (
      <AudioAttachment key={attachment.id} attachment={attachment} isAgent={isAgent} />
    );
  }
  if (mime.startsWith("video/")) {
    return <VideoAttachment key={attachment.id} attachment={attachment} />;
  }
  return (
    <FileAttachment key={attachment.id} attachment={attachment} isAgent={isAgent} />
  );
}

// ── MessageContent ──────────────────────────────────────────────────────────

/**
 * Renders the body of a message based on its type.
 *
 * - TEXT  → plain text
 * - IMAGE → inline image (click to open full-size)
 * - AUDIO / VOICE → native audio player
 * - VIDEO → native video player
 * - FILE  → download card with filename + size
 *
 * Mixed messages (e.g. text + image) render both sections.
 */
const MessageContent = ({ message, isAgent }: Props) => {
  const hasText = Boolean(message.content?.trim());
  const hasAttachments = message.attachments.length > 0;

  return (
    <div className="space-y-2">
      {hasText && (
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      )}
      {hasAttachments && (
        <div className="space-y-2">
          {message.attachments.map((att) => renderAttachment(att, isAgent))}
        </div>
      )}
    </div>
  );
};

export default MessageContent;
