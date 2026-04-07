import type { KeyboardEvent } from "react";
import { Image as ImageIcon, Mic, Send, Smile, X } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { InboxMessage } from "@/app/types/message.types";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  replyTarget?: InboxMessage | null;
  onClearReply?: () => void;
  onTypingStart?: () => void;
  onTypingStop?: () => void;
  onAttachPhoto?: () => void;
  onPickEmoji?: () => void;
  onRecordVoice?: () => void;
}

const ChatComposer = ({
  value,
  onChange,
  onSend,
  replyTarget,
  onClearReply,
  onTypingStart,
  onTypingStop,
  onAttachPhoto,
  onPickEmoji,
  onRecordVoice,
}: Props) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  const hasContent = value.trim().length > 0;

  return (
    <div className="border-t border-grey-light bg-base-white/80 px-3 py-3 sm:px-4">
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

      <div className="flex items-end gap-1.5 rounded-2xl border border-grey-light bg-primary-light/20 px-2 py-2 sm:gap-2 sm:px-3">
        <div className="flex items-center gap-0.5 sm:gap-1">
          <ComposerIconButton
            icon={ImageIcon}
            label="Attach photo"
            onClick={onAttachPhoto}
          />
          <ComposerIconButton
            icon={Smile}
            label="Insert emoji"
            onClick={onPickEmoji}
          />
          <ComposerIconButton
            icon={Mic}
            label="Record voice"
            onClick={onRecordVoice}
          />
        </div>

        <textarea
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

        <button
          type="button"
          onClick={onSend}
          disabled={!hasContent}
          aria-label="Send message"
          className={cn(
            "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors",
            hasContent
              ? "bg-primary text-white hover:bg-primary/90"
              : "cursor-not-allowed bg-grey-light text-grey-medium",
          )}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

interface IconButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
}

const ComposerIconButton = ({ icon: Icon, label, onClick }: IconButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-grey-medium transition-colors hover:bg-primary-light hover:text-primary sm:h-9 sm:w-9"
  >
    <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
  </button>
);

export default ChatComposer;
