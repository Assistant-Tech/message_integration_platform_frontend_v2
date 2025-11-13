import { forwardRef } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/app/utils/cn";

const ChatFeed = forwardRef<HTMLDivElement, { messages: any[] }>(
  ({ messages }, ref) => (
    <div className="relative h-full bg-base-white">
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-grey-medium mt-10">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex flex-col w-fit max-w-[75%] p-3 rounded-2xl break-words shadow-sm",
                msg.sender === "You"
                  ? "ml-auto bg-information text-white"
                  : "bg-white text-grey border border-grey-light",
              )}
            >
              <span className="text-xs font-semibold mb-1 opacity-80">
                {msg.sender}
              </span>
              <p className="text-sm whitespace-pre-wrap break-words">
                {msg.content}
              </p>
              <span className="mt-1 text-xs opacity-70 self-end">
                {format(new Date(msg.createdAt), "p")}
              </span>
            </motion.div>
          ))
        )}
        <div ref={ref} />
      </div>
    </div>
  ),
);

export default ChatFeed;
