import React from "react";
import { Send } from "lucide-react";

const ChatInput = ({ message, onChange, onSend }: any) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="sticky bottom-0 z-10 border-t border-grey-light bg-base-white/95 px-4 py-4 backdrop-blur-sm">
      <div className="flex items-end gap-3 rounded-[24px] border border-grey-light bg-base-white p-2 shadow-sm">
        <textarea
          value={message}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          data-testid="chat-input"
          placeholder="Type your message..."
          rows={1}
          className="max-h-32 min-h-12 flex-1 resize-none bg-transparent px-3 py-2 text-sm text-grey outline-none placeholder:text-grey-medium"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={!message.trim()}
          className="inline-flex h-12 min-w-12 items-center justify-center rounded-[18px] bg-primary px-4 text-base-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-grey-light disabled:text-grey-medium"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
