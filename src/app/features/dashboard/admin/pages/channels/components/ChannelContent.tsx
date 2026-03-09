import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Smile, Paperclip, MoreVertical, Pin, Info } from "lucide-react";
import { Button } from "@/app/components/ui";
import { TopNavbar } from "@/app/features/dashboard/admin/component/ui";

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: Date;
  attachments?: { type: string; url: string; name: string }[];
  isEdited?: boolean;
}

interface ChannelContentProps {
  channelTitle: string;
  channelType: "internal" | "whatsapp" | "facebook" | "instagram";
  messages: Message[];
  onSendMessage: (content: string, attachments?: File[]) => void;
  onToggleDetails: () => void;
}

const ChannelContent: React.FC<ChannelContentProps> = ({
  channelTitle,
  channelType,
  messages,
  onSendMessage,
  onToggleDetails,
}) => {
  const [messageInput, setMessageInput] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim() || attachments.length > 0) {
      onSendMessage(messageInput, attachments);
      setMessageInput("");
      setAttachments([]);

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);

    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getChannelInitials = () =>
    channelTitle
      .split(/[\s-_]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "CH";

  return (
    <div className="flex flex-1 flex-col h-full bg-primary-light/20">
      <TopNavbar
        title={channelTitle}
        subtitle={
          channelType === "internal"
            ? "Internal Channel"
            : `${channelType.charAt(0).toUpperCase()}${channelType.slice(1)} Channel`
        }
        leadingContent={
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-base-white text-sm font-semibold text-primary shadow-sm">
            {getChannelInitials()}
          </div>
        }
        actions={[
          { label: "Pinned", icon: Pin },
          { label: "Details", icon: Info, onClick: onToggleDetails },
        ]}
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex min-h-full flex-col justify-end gap-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary text-white font-bold">
                    {message.userAvatar ? (
                      <img
                        src={message.userAvatar}
                        className="rounded-full w-full h-full object-cover"
                      />
                    ) : (
                      message.userName.charAt(0).toUpperCase()
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{message.userName}</span>
                      <span className="text-xs text-grey-medium">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>

                    <p className="text-grey-medium whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>

                  <Button variant="none" className="h-6 w-6 p-0">
                    <MoreVertical size={16} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* MESSAGE INPUT */}
      <div className="border-t border-grey-light bg-base-white p-4">
        {attachments.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {attachments.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-full bg-primary-light px-3 py-1 text-sm"
              >
                <Paperclip className="h-4 w-4" />
                <span className="text-primary">{file.name}</span>

                <button
                  onClick={() =>
                    setAttachments(attachments.filter((_, i) => i !== idx))
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />

          {/* Attachment Button */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="h-9 w-9 flex items-center justify-center cursor-pointer"
          >
            <Paperclip size={18} />
          </div>

          {/* Message Composer */}
          <div className="flex items-center flex-1 bg-primary-light/20 border border-grey-light rounded-lg px-2">
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={messageInput}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyPress}
              placeholder={`Message #${channelTitle}`}
              className="flex-1 resize-none bg-transparent py-2 px-2 outline-none max-h-[140px]"
            />

            {/* Emoji Button */}
            <Button
              variant="none"
              className="h-8 w-8 flex items-center justify-center hover:bg-primary-light rounded-md"
            >
              <Smile size={18} />
            </Button>
          </div>

          {/* Send Button */}
          <Button
            variant="primary"
            onClick={handleSendMessage}
            disabled={!messageInput.trim() && attachments.length === 0}
            label="Send"
            IconRight={<Send size={18} />}
          />
        </div>
      </div>
    </div>
  );
};

export default ChannelContent;
