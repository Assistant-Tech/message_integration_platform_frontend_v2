import type { KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { cn } from "@/app/utils/cn";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

const CustomerChatComposer = ({ value, onChange, onSend }: Props) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-grey-light bg-base-white px-4 py-3">
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
