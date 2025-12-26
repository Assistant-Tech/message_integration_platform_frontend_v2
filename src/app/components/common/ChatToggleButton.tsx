import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatBotPanel from "@/app/components/common/ChatbotPanel";

const ChatToggleButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-16 right-6 z-50 rounded-full text-grey-medium hover:shadow-sm hover:scale-105 hover:shadow-primary-dark transition cursor-pointer"
        aria-label="Toggle ChatBot"
      >
        <img
          src={`https://res.cloudinary.com/dtoqwn0gx/image/upload/v1765951638/chat-bubble_sqo5oe.png`}
          className="w-[72px] h-[72px]"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-36 right-6 z-40 w-[350px] h-[500px] bg-base-white shadow-2xl rounded-xl overflow-hidden"
          >
            <ChatBotPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatToggleButton;
