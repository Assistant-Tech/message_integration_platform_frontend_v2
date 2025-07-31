import { useState } from "react";
import { X } from "lucide-react";
import { ChatbotPanel } from "@/app/components/common/";
import chatbotlogo from "@/app/assets/icons/chatbotlogo.svg";
import { AnimatePresence, motion } from "framer-motion";

const ChatToggleButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-16 right-6 z-50 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition cursor-pointer"
        aria-label="Toggle ChatBot"
      >
        {open ? (
          <div className="p-4">
            <X className="w-10 h-10" />
          </div>
        ) : (
          <img src={chatbotlogo} className="w-[72px] h-[72px]" />
        )}
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
            <ChatbotPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatToggleButton;
