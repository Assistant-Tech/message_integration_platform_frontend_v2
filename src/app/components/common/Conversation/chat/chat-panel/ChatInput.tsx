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
    <div className="sticky bottom-0 z-10 border-t border-grey-light bg-white p-3 flex items-end gap-2">
      <textarea
        value={message}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        data-testid="chat-input"
        placeholder="Type a message..."
        rows={1}
        className="flex-1 resize-none border border-grey-light rounded-lg px-3 py-2 text-grey focus:outline-none focus:ring-2 focus:ring-information max-h-32"
      />
      <button
        onClick={onSend}
        disabled={!message.trim()}
        className="bg-information hover:bg-information-dark disabled:bg-grey-light disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      >
        <Send className="h-4 w-4" />
        <span>Send</span>
      </button>
    </div>
  );
};

export default ChatInput;
