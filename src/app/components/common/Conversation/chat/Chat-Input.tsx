import { useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";
import { useChatSocket } from "@/app/Socket/useInternalChatSocket";

interface ChatInputProps {
  selectedConversationId: string;
}

export function ChatInput({ selectedConversationId }: ChatInputProps) {
  const { sendMessage } = useChatSocket();
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    sendMessage(selectedConversationId, message);
    console.log("📤 Sent message:", message);

    setMessage("");
  };

  return (
    <form
      onSubmit={handleSend}
      className="flex items-center gap-2 border-t border-gray-200 p-3"
    >
      <button
        type="button"
        className="p-2 rounded-full hover:bg-gray-100"
        aria-label="Attach File"
      >
        <Paperclip className="w-5 h-5 text-gray-500" />
      </button>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="button"
        className="p-2 rounded-full hover:bg-gray-100"
        aria-label="Add Emoji"
      >
        <Smile className="w-5 h-5 text-gray-500" />
      </button>

      <button
        type="submit"
        className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
        aria-label="Send Message"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}
