import { useState } from "react";
import { Download, FileText, Play } from "lucide-react";
import type { InboxMessage, MessageAttachment } from "@/app/types/message.types";
import { cn } from "@/app/utils/cn";
import VoiceMessagePlayer from "./VoiceMessagePlayer";
import ImageLightbox from "./ImageLightbox";

interface Props {
  message: InboxMessage;
  isAgent: boolean;
}

// ── Image attachment ────────────────────────────────────────────────────────

function ImageAttachment({
  attachment,
  onPreview,
}: {
  attachment: MessageAttachment;
  onPreview: (src: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onPreview(attachment.url)}
      className="group/img block overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      style={{ maxWidth: 280 }}
    >
      <img
        src={attachment.url}
        alt={attachment.name}
        loading="lazy"
        className="block h-auto w-auto cursor-zoom-in rounded-xl transition-transform duration-200 group-hover/img:scale-[1.02]"
        style={{ maxWidth: 280, maxHeight: 340, minWidth: 100, minHeight: 80 }}
      />
    </button>
  );
}

// ── Image grid (multiple images) ────────────────────────────────────────────

function ImageGrid({
  images,
  onPreview,
}: {
  images: MessageAttachment[];
  onPreview: (src: string) => void;
}) {
  if (images.length === 1) {
    return <ImageAttachment attachment={images[0]!} onPreview={onPreview} />;
  }

  const gridClass =
    images.length === 2
      ? "grid-cols-2"
      : images.length === 3
        ? "grid-cols-2"
        : "grid-cols-2";

  const visibleImages = images.slice(0, 4);
  const overflow = images.length - 4;

  return (
    <div className={cn("grid gap-1 rounded-xl overflow-hidden", gridClass)} style={{ maxWidth: 280 }}>
      {visibleImages.map((img, idx) => (
        <button
          key={img.id}
          type="button"
          onClick={() => onPreview(img.url)}
          className={cn(
            "relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            images.length === 3 && idx === 0 && "row-span-2",
          )}
        >
          <img
            src={img.url}
            alt={img.name}
            loading="lazy"
            className="h-full w-full cursor-zoom-in object-cover transition-transform duration-200 hover:scale-[1.03]"
            style={{
              minHeight: images.length === 3 && idx === 0 ? 200 : 96,
              maxHeight: images.length === 3 && idx === 0 ? 280 : 138,
            }}
          />
          {idx === 3 && overflow > 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-lg font-bold text-white">+{overflow}</span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

// ── Audio / Voice attachment (Messenger-style) ──────────────────────────────

function AudioAttachment({
  attachment,
  isAgent,
}: {
  attachment: MessageAttachment;
  isAgent: boolean;
}) {
  return <VoiceMessagePlayer src={attachment.url} isAgent={isAgent} />;
}

// ── Video attachment ────────────────────────────────────────────────────────

function VideoAttachment({ attachment }: { attachment: MessageAttachment }) {
  return (
    <div className="relative w-full max-w-[300px] overflow-hidden rounded-xl">
      <video
        controls
        src={attachment.url}
        className="w-full rounded-xl"
        preload="metadata"
      >
        <Play className="absolute inset-0 m-auto size-10 opacity-70" />
      </video>
    </div>
  );
}

// ── File attachment ─────────────────────────────────────────────────────────

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

// ── Dispatcher ──────────────────────────────────────────────────────────────

function renderAttachment(
  attachment: MessageAttachment,
  isAgent: boolean,
) {
  const mime = attachment.mimeType?.toLowerCase() ?? "";

  // Images are handled separately via ImageGrid
  if (mime.startsWith("image/")) return null;

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

// ── Media skeleton (shown while attachment URL hasn't arrived yet) ──────────

function MediaSkeleton({
  type,
  isAgent,
}: {
  type: InboxMessage["type"];
  isAgent: boolean;
}) {
  const base = cn(
    "animate-pulse rounded-xl",
    isAgent ? "bg-white/20" : "bg-grey-light/60",
  );

  if (type === "IMAGE" || type === "VIDEO") {
    return <div className={base} style={{ width: 220, height: 160 }} />;
  }
  if (type === "AUDIO" || type === "VOICE") {
    return <div className={base} style={{ width: 220, height: 44 }} />;
  }
  // FILE / default
  return <div className={base} style={{ width: 200, height: 52 }} />;
}

// "[Attachment]" was a legacy placeholder emitted by the socket normalizer.
// Messages cached before the fix still carry it — treat as empty so the UI
// doesn't render the literal text next to the actual media.
const LEGACY_ATTACHMENT_PLACEHOLDER = "[Attachment]";

// ── MessageContent ──────────────────────────────────────────────────────────

const MessageContent = ({ message, isAgent }: Props) => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const trimmedContent = message.content?.trim() ?? "";
  const hasText =
    trimmedContent.length > 0 &&
    trimmedContent !== LEGACY_ATTACHMENT_PLACEHOLDER;

  const imageAttachments = message.attachments.filter((a) =>
    a.mimeType?.toLowerCase().startsWith("image/"),
  );
  const otherAttachments = message.attachments.filter(
    (a) => !a.mimeType?.toLowerCase().startsWith("image/"),
  );

  // If the message type says media but attachments haven't hydrated yet
  // (socket arrived before REST, or attachments URL still processing),
  // show a skeleton instead of a "[Attachment]" text flash.
  const isMediaType =
    message.type === "IMAGE" ||
    message.type === "VIDEO" ||
    message.type === "AUDIO" ||
    message.type === "VOICE" ||
    message.type === "FILE";
  const showMediaSkeleton =
    isMediaType && message.attachments.length === 0 && !hasText;

  return (
    <>
      <div className="space-y-2">
        {imageAttachments.length > 0 && (
          <ImageGrid images={imageAttachments} onPreview={setLightboxSrc} />
        )}
        {hasText && (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        )}
        {otherAttachments.length > 0 && (
          <div className="space-y-2">
            {otherAttachments.map((att) =>
              renderAttachment(att, isAgent),
            )}
          </div>
        )}
        {showMediaSkeleton && (
          <MediaSkeleton type={message.type} isAgent={isAgent} />
        )}
      </div>
      <ImageLightbox
        src={lightboxSrc}
        onClose={() => setLightboxSrc(null)}
      />
    </>
  );
};

export default MessageContent;
