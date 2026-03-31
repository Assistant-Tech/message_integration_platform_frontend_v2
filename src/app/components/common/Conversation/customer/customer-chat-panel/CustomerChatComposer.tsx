import type { KeyboardEvent } from "react";
import { Send, X } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { InboxMessage } from "@/app/types/inbox.types";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  replyTarget?: InboxMessage | null;
  onClearReply?: () => void;
}

const CustomerChatComposer = ({
  value,
  onChange,
  onSend,
  replyTarget,
  onClearReply,
}: Props) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-grey-light bg-base-white/80 px-4 py-3">
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
      <div className="flex items-end gap-3 rounded-2xl border border-grey-light bg-primary-light/20 px-4 py-2">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message…"
          rows={1}
          className="min-h-[36px] flex-1 resize-none bg-transparent text-grey outline-none placeholder:text-grey-medium label-regular-16 pt-1"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={!value.trim()}
          className={cn(
            "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors",
            value.trim()
              ? "bg-primary text-white hover:bg-primary/90"
              : "cursor-not-allowed bg-grey-light text-grey-medium",
          )}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-1.5 text-center text-[10px] text-grey-medium">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
};

export default CustomerChatComposer;
