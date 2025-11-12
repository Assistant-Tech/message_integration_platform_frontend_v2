import { useEffect, useRef } from "react";

interface Message {
  id: string;
  sender: string;
  content: string;
  createdAt: string;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface ChatDisplayProps {
  messages?: Message[];
  participants?: Participant[];
  loading?: boolean;
}

const ChatDisplay = ({
  messages = [],
  participants = [],
  loading,
}: ChatDisplayProps) => {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-grey-medium">
        Loading conversation...
      </div>
    );
  }

  if (!messages.length) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center text-grey-medium space-y-2">
        <p>No messages yet</p>
        <p className="text-sm">Start the conversation below 👇</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col h-full overflow-y-auto px-6 py-4 space-y-4 bg-grey-lightest">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`max-w-[75%] px-4 py-2 rounded-lg shadow text-sm ${
            msg.sender === "me"
              ? "ml-auto bg-primary text-white"
              : "bg-white text-black"
          }`}
        >
          <p>{msg.content}</p>
          <span className="block text-xs mt-1 opacity-70 text-right">
            {new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      ))}
      <div ref={endRef} />
    </section>
  );
};

export default ChatDisplay;
