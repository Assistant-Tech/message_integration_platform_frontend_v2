import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentType,
  type KeyboardEvent,
} from "react";
import {
  FileText,
  Image as ImageIcon,
  Mic,
  Paperclip,
  Pause,
  Play,
  Send,
  Smile,
  Square,
  Trash2,
  X,
} from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { toast } from "sonner";
import { cn } from "@/app/utils/cn";
import type { InboxMessage } from "@/app/types/message.types";
import ChatComposerEmojiPicker from "./ChatComposerEmojiPicker";
import { useAudioRecorder } from "./useAudioRecorder";

const DEFAULT_MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB
const DEFAULT_MAX_ATTACHMENTS = 10;

interface SendAudioPayload {
  blob: Blob;
  durationSeconds: number;
}

interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  replyTarget?: InboxMessage | null;
  onClearReply?: () => void;
  onTypingStart?: () => void;
  onTypingStop?: () => void;
  onSendAttachments?: (files: File[]) => void;
  onSendAudio?: (payload: SendAudioPayload) => void;
  maxFileSizeBytes?: number;
  maxAttachments?: number;
}

const ChatComposer = ({
  value,
  onChange,
  onSend,
  replyTarget,
  onClearReply,
  onTypingStart,
  onTypingStop,
  onSendAttachments,
  onSendAudio,
  maxFileSizeBytes = DEFAULT_MAX_FILE_SIZE_BYTES,
  maxAttachments = DEFAULT_MAX_ATTACHMENTS,
}: ChatComposerProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [attachments, setAttachments] = useState<File[]>([]);
  const [isAttachMenuOpen, setIsAttachMenuOpen] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const {
    isRecording,
    recordingElapsed,
    pendingAudio,
    isPreviewPlaying,
    startRecording,
    stopRecording,
    cancelRecording,
    discardPendingAudio,
    togglePreviewPlayback,
    consumePendingAudio,
  } = useAudioRecorder();

  const hasText = value.trim().length > 0;
  const hasAttachments = attachments.length > 0;
  const hasPendingAudio = pendingAudio !== null;
  const canSend =
    (hasText || hasAttachments || hasPendingAudio) && !isRecording;

  // --- attachments --------------------------------------------------------

  const openFilePicker = () => {
    setIsAttachMenuOpen(false);
    fileInputRef.current?.click();
  };

  const openImagePicker = () => {
    setIsAttachMenuOpen(false);
    imageInputRef.current?.click();
  };

  const handleFilesSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (selected.length === 0) return;

    const remainingSlots = maxAttachments - attachments.length;
    if (remainingSlots <= 0) {
      toast.error(`You can attach up to ${maxAttachments} files per message.`);
      return;
    }

    const accepted: File[] = [];
    let oversized = 0;

    for (const file of selected.slice(0, remainingSlots)) {
      if (file.size > maxFileSizeBytes) {
        oversized += 1;
        continue;
      }
      accepted.push(file);
    }

    if (oversized > 0) {
      toast.error(
        `${oversized} file${oversized > 1 ? "s" : ""} exceeded ${formatBytes(
          maxFileSizeBytes,
        )} and ${oversized > 1 ? "were" : "was"} skipped.`,
      );
    }

    if (selected.length > remainingSlots) {
      toast.warning(
        `Attachment limit reached. Only ${remainingSlots} file${
          remainingSlots === 1 ? "" : "s"
        } added.`,
      );
    }

    if (accepted.length > 0) {
      setAttachments((current) => [...current, ...accepted]);
    }
  };

  const removeAttachment = (indexToRemove: number) => {
    setAttachments((current) =>
      current.filter((_, index) => index !== indexToRemove),
    );
  };

  // --- emoji --------------------------------------------------------------

  const insertEmoji = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(`${value}${emoji}`);
      return;
    }

    const start = textarea.selectionStart ?? value.length;
    const end = textarea.selectionEnd ?? value.length;
    const nextValue = value.slice(0, start) + emoji + value.slice(end);
    onChange(nextValue);
    onTypingStart?.();

    requestAnimationFrame(() => {
      const caret = start + emoji.length;
      textarea.focus();
      textarea.setSelectionRange(caret, caret);
    });
  };

  // --- sending ------------------------------------------------------------

  const handleSend = () => {
    if (!canSend) return;

    if (hasPendingAudio) {
      if (!onSendAudio) {
        toast.error(
          "Voice messages are not supported in this conversation yet.",
        );
        return;
      }
      const audio = consumePendingAudio();
      if (audio) {
        onSendAudio({
          blob: audio.blob,
          durationSeconds: audio.durationSeconds,
        });
      }
    }

    if (attachments.length > 0) {
      if (!onSendAttachments) {
        toast.error("Attachments are not supported in this conversation yet.");
        return;
      }
      onSendAttachments(attachments);
      setAttachments([]);
    }

    if (hasText) {
      onSend();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  // --- render -------------------------------------------------------------

  return (
    <div className="border-t border-grey-light bg-base-white/80 px-3 py-3 sm:px-4">
      {/* Reply preview */}
      {replyTarget && (
        <div className="mb-2 flex items-start justify-between gap-3 rounded-xl border border-primary/20 bg-primary-light/20 px-3 py-2">
          <div className="min-w-0 border-l-2 border-primary pl-2">
            <p className="text-xs font-semibold text-primary">
              Replying to {replyTarget.senderName}
            </p>
            <p className="line-clamp-1 text-xs text-grey-medium">
              {replyTarget.content}
            </p>
          </div>
          <button
            type="button"
            onClick={onClearReply}
            className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-grey-medium transition-colors hover:bg-grey-light hover:text-grey"
            aria-label="Cancel reply"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {hasAttachments && (
        <div className="mb-2 flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <AttachmentChip
              key={`${file.name}-${index}-${file.lastModified}`}
              file={file}
              onRemove={() => removeAttachment(index)}
            />
          ))}
        </div>
      )}

      {pendingAudio && !isRecording && (
        <div className="mb-2 flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary-light/20 px-3 py-2">
          <button
            type="button"
            onClick={togglePreviewPlayback}
            aria-label={
              isPreviewPlaying ? "Pause voice preview" : "Play voice preview"
            }
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary/90"
          >
            {isPreviewPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 translate-x-[1px]" />
            )}
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-primary">Voice message</p>
            <p className="text-xs text-grey-medium">
              {formatDuration(pendingAudio.durationSeconds)}
            </p>
          </div>
          <button
            type="button"
            onClick={discardPendingAudio}
            aria-label="Discard voice message"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-grey-medium transition-colors hover:bg-grey-light hover:text-grey"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFilesSelected}
        tabIndex={-1}
        aria-hidden
      />
      <input
        ref={imageInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFilesSelected}
        tabIndex={-1}
        aria-hidden
      />

      <div className="flex items-end gap-1.5 rounded-2xl border border-grey-light bg-primary-light/20 px-2 py-2 sm:gap-2 sm:px-3">
        {!isRecording && (
          <div className="flex items-center gap-0.5 sm:gap-1">
            <Popover.Root
              open={isAttachMenuOpen}
              onOpenChange={setIsAttachMenuOpen}
            >
              <Popover.Trigger asChild>
                <ComposerIconButton
                  icon={Paperclip}
                  label="Add attachment"
                  active={isAttachMenuOpen}
                />
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  side="top"
                  align="start"
                  sideOffset={8}
                  collisionPadding={12}
                  className="z-50 w-48 rounded-2xl border border-grey-light bg-white p-1 shadow-lg outline-none"
                >
                  <AttachMenuItem
                    icon={ImageIcon}
                    label="Photo or image"
                    onClick={openImagePicker}
                  />
                  <AttachMenuItem
                    icon={FileText}
                    label="Document or file"
                    onClick={openFilePicker}
                  />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>

            <Popover.Root open={isEmojiOpen} onOpenChange={setIsEmojiOpen}>
              <Popover.Trigger asChild>
                <ComposerIconButton
                  icon={Smile}
                  label="Insert emoji"
                  active={isEmojiOpen}
                />
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  side="top"
                  align="start"
                  sideOffset={8}
                  collisionPadding={12}
                  className="z-50 w-[340px] max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl border border-grey-light bg-white shadow-lg outline-none"
                >
                  <ChatComposerEmojiPicker onSelect={insertEmoji} />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>

            <ComposerIconButton
              icon={Mic}
              label="Record voice message"
              onClick={startRecording}
            />
          </div>
        )}

        {isRecording ? (
          <div className="flex min-w-0 flex-1 items-center gap-3 px-1 py-1">
            <span
              aria-hidden
              className="inline-flex h-2.5 w-2.5 flex-shrink-0 animate-pulse rounded-full bg-red-500"
            />
            <span className="label-regular-16 min-w-0 flex-1 truncate text-grey">
              Recording… {formatDuration(recordingElapsed)}
            </span>
            <button
              type="button"
              onClick={cancelRecording}
              aria-label="Cancel recording"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-grey-medium transition-colors hover:bg-grey-light hover:text-grey"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => {
              onChange(event.target.value);
              onTypingStart?.();
            }}
            onKeyDown={handleKeyDown}
            onBlur={onTypingStop}
            placeholder="Type a message…"
            rows={1}
            className="label-regular-16 min-h-[36px] min-w-0 flex-1 resize-none bg-transparent pt-1 text-grey outline-none placeholder:text-grey-medium"
          />
        )}

        {isRecording ? (
          <button
            type="button"
            onClick={stopRecording}
            aria-label="Stop recording"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
          >
            <Square className="h-3.5 w-3.5 fill-white" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            aria-label="Send message"
            className={cn(
              "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
              canSend
                ? "bg-primary text-white hover:bg-primary/90"
                : "cursor-not-allowed bg-grey-light text-grey-medium",
            )}
          >
            <Send className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// ---------- Sub-components ------------------------------------------------

interface ComposerIconButtonProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

const ComposerIconButton = forwardRef<
  HTMLButtonElement,
  ComposerIconButtonProps
>(({ icon: Icon, label, onClick, active = false, ...rest }, ref) => (
  <button
    ref={ref}
    type="button"
    onClick={onClick}
    aria-label={label}
    aria-pressed={active || undefined}
    className={cn(
      "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
      active
        ? "bg-primary text-white"
        : "text-grey-medium hover:bg-primary-light hover:text-primary",
    )}
    {...rest}
  >
    <Icon className="h-[18px] w-[18px]" />
  </button>
));
ComposerIconButton.displayName = "ComposerIconButton";

interface AttachMenuItemProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}

const AttachMenuItem = ({
  icon: Icon,
  label,
  onClick,
}: AttachMenuItemProps) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-grey transition-colors hover:bg-primary-light/40 hover:text-primary focus-visible:bg-primary-light/40 focus-visible:outline-none"
  >
    <Icon className="h-4 w-4 flex-shrink-0 text-primary" />
    {label}
  </button>
);

interface AttachmentChipProps {
  file: File;
  onRemove: () => void;
}

const AttachmentChip = ({ file, onRemove }: AttachmentChipProps) => {
  const isImage = file.type.startsWith("image/");
  const previewUrl = useMemo(
    () => (isImage ? URL.createObjectURL(file) : null),
    [file, isImage],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="flex items-center gap-2 rounded-xl border border-grey-light bg-white py-1.5 pl-1.5 pr-2 shadow-sm">
      {previewUrl ? (
        <img
          src={previewUrl}
          alt={file.name}
          className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
          <FileText className="h-5 w-5" />
        </div>
      )}
      <div className="min-w-0">
        <p className="line-clamp-1 max-w-[160px] text-xs font-semibold text-grey">
          {file.name}
        </p>
        <p className="text-[11px] text-grey-medium">{formatBytes(file.size)}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${file.name}`}
        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-grey-medium transition-colors hover:bg-grey-light hover:text-grey"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

// ---------- Helpers -------------------------------------------------------

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

function formatDuration(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default ChatComposer;
