import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, MessageCircle } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DetailsDrawer({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: 320 }}
          animate={{ x: 0 }}
          exit={{ x: 320 }}
          transition={{ duration: 0.25 }}
          className="w-[320px] border-l bg-white h-full flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-semibold">Conversation Details</h2>
            <button onClick={onClose}>
              <X />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-blue-500" />
              <div>
                <p className="font-semibold">Pharah House</p>
                <p className="text-sm text-gray-500">Active</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail size={18} /> Gmail
              </div>

              <div className="flex items-center gap-2">
                <Phone size={18} /> Phone
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle size={18} /> WhatsApp
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
