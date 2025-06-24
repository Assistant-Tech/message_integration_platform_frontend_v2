import { MessagesSquare, Send, Paperclip, Smile, Info } from "lucide-react";
import { useState } from "react";
import { DetailsPanel } from "@/app/features/dashboard/admin/component/";
import { AnimatePresence, motion } from "framer-motion";

interface ChatPanelProps {
  chat?: {
    name: string;
    message: string;
    time: string;
    avatar: string;
    platform: string;
  };
}

const ChatPannel = ({ chat }: ChatPanelProps) => {
  const [message, setMessage] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!chat) {
    return (
      <main className="flex-1 flex items-center justify-center text-center">
        <div className="space-y-1">
          <MessagesSquare className="mx-auto h-48 w-48 text-grey-medium" />
          <h3 className="h4-semi-bold-24 text-grey">Chat with Customers</h3>
          <p className="body-regular-16 text-grey-medium">
            View and manage all your conversations here.
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="flex flex-1 h-full">
      <main className="flex-1 flex flex-col h-full">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-[9px] border-b border-grey-light">
          <div className="flex items-center gap-4">
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h4 className="font-semibold text-base text-black">
                {chat.name}
              </h4>
              <p className="text-sm text-grey-medium">Online</p>
            </div>
          </div>
          <button
            onClick={() => setShowDetails((prev) => !prev)}
            className="text-grey-medium hover:text-primary transition-colors"
            title="Show Details"
          >
            <Info className="w-5 h-5 cursor-pointer" />
          </button>
        </header>

        {/* Messages */}
        <section className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-grey-lightest">
          <div className="bg-white w-max px-4 py-2 rounded-lg shadow text-sm text-black">
            {chat.message}
          </div>
          <div className="text-sm text-right text-grey-medium">
            Today, {chat.time}
          </div>
          <div className="w-max ml-auto bg-primary text-white px-4 py-2 rounded-lg shadow text-sm">
            Hello Sir, Yes, this product is available in black color
          </div>
          <div className="w-max ml-auto bg-primary text-white px-4 py-2 rounded-lg shadow text-sm underline">
            Buy t-shirt casual multi color - Shop Name
          </div>
        </section>

        {/* Message Input */}
        <footer className="px-6 py-2 border-t border-grey-light bg-white">
          <div className="flex items-center gap-3">
            <button className="p-2 text-grey-medium hover:text-grey transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full px-4 py-3 pr-12 text-grey border border-grey-light rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-grey-light focus:border-transparent mt-2"
                rows={1}
                style={{
                  minHeight: "44px",
                  maxHeight: "120px",
                  overflow: "auto",
                }}
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-grey-medium hover:text-grey transition-colors">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </footer>
      </main>

      {/* Right Sidebar */}
      <AnimatePresence>    
        {showDetails && (
          <motion.div
            key="details-panel"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            className="w-96 border-l border-grey-light py-px space-y-6 bg-white overflow-x-hidden"
          >
            <DetailsPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatPannel;
