import { useState, useRef, useEffect } from "react";
import { Input } from "@/app/components/ui";

const ChatBotPanel = () => {
  const [messages, setMessages] = useState<string[]>([
    "Hi! How can I help you today?",
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, input]);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-primary flex items-center justify-center h-12 w-full">
        <img
          src={
            "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1765931581/logo_xyvjbg.png"
          }
          className="w-24 h-24"
        />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <p
            key={i}
            className="body-regular-14 text-grey bg-grey-light p-2 rounded-md"
          >
            {msg}
          </p>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-2 border-t border-grey-light flex gap-2">
        <Input
          type="text"
          placeholder="Type your message..."
          className="w-full border rounded px-3 py-2 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={sendMessage}
          className="bg-primary text-white px-3 py-2 rounded hover:bg-primary/90 transition text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBotPanel;
