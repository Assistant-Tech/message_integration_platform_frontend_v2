import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Hash, Lock, AlertCircle } from "lucide-react";
import { Button, Input } from "@/app/components/ui";
import { cn } from "@/app/utils/cn";

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: {
    title: string;
    type: "internal" | "whatsapp" | "facebook" | "instagram";
    isPrivate: boolean;
    priority: string;
    participants: string[];
  }) => void;
  availableUsers?: { id: string; name: string; email: string }[];
}

const CreateChannelModal: React.FC<CreateChannelModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  availableUsers = [],
}) => {
  const [channelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState<
    "internal" | "whatsapp" | "facebook" | "instagram"
  >("internal");
  const [isPrivate, setIsPrivate] = useState(false);
  const [priority, setPriority] = useState("normal");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!channelName.trim()) {
      setError("Channel name is required");
      return;
    }

    if (channelName.length < 3) {
      setError("Channel name must be at least 3 characters");
      return;
    }

    onCreate({
      title: channelName,
      type: channelType,
      isPrivate,
      priority,
      participants: selectedUsers,
    });

    // Reset form
    setChannelName("");
    setChannelType("internal");
    setIsPrivate(false);
    setPriority("normal");
    setSelectedUsers([]);
    setError("");
    onClose();
  };

  const toggleUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Create Channel
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md"
              >
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </motion.div>
            )}

            {/* Channel Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                Channel Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    value: "internal",
                    label: "Internal",
                    icon: <Hash className="h-4 w-4" />,
                  },
                  {
                    value: "whatsapp",
                    label: "WhatsApp",
                    icon: (
                      <span>
                        <Hash size={16} />;
                      </span>
                    ),
                  },
                  {
                    value: "facebook",
                    label: "Facebook",
                    icon: (
                      <span>
                        <Hash size={16} />;
                      </span>
                    ),
                  },
                  {
                    value: "instagram",
                    label: "Instagram",
                    icon: (
                      <span>
                        <Hash size={16} />;
                      </span>
                    ),
                  },
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() =>
                      setChannelType(type.value as typeof channelType)
                    }
                    className={cn(
                      "flex items-center justify-center gap-2 p-3 rounded-md border-2 transition-all",
                      channelType === type.value
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300",
                    )}
                  >
                    {type.icon}
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Channel Name */}
            <div className="space-y-2">
              <label
                htmlFor="channelName"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 block"
              >
                Channel Name
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="channelName"
                  type="text"
                  value={channelName}
                  onChange={(e) => {
                    setChannelName(e.target.value);
                    setError("");
                  }}
                  placeholder="e.g., general-chat"
                  className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Use lowercase letters, numbers, and hyphens
              </p>
            </div>

            {/* Privacy Toggle */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-gray-600 rounded-md">
                  {isPrivate ? (
                    <Lock className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  ) : (
                    <Hash className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {isPrivate ? "Private Channel" : "Public Channel"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isPrivate
                      ? "Only invited members can access"
                      : "Everyone can access"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPrivate(!isPrivate)}
                className={cn(
                  "relative w-12 h-6 rounded-full transition-colors",
                  isPrivate ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600",
                )}
              >
                <motion.div
                  animate={{ x: isPrivate ? 24 : 2 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                />
              </button>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* Members Selection (for private channels) */}
            {isPrivate && availableUsers.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                  Invite Members ({selectedUsers.length} selected)
                </label>
                <div className="max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md">
                  {availableUsers.map((user) => (
                    <label
                      key={user.id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUser(user.id)}
                        className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={onClose}
              variant="outlined"
              className="dark:border-gray-600 dark:text-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Channel
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateChannelModal;
