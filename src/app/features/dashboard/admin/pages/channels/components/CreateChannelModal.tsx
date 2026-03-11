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
          className="relative z-10 w-full max-w-md not-odd:not-odd:rounded-lg shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-grey dark:text-white">
              Create Channel
            </h2>
            <button
              onClick={onClose}
              className="text-grey-medium hover:text-grey-medium dark:hover:text-grey-light transition-colors"
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
              <label className="text-sm font-medium text-grey-medium dark:text-grey-light block">
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
                        : "border-grey-light dark:border-grey-medium hover:border-grey-light dark:hover:border-grey-medium text-grey-medium dark:text-grey-light",
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
                className="text-sm font-medium text-grey-medium dark:text-grey-light block"
              >
                Channel Name
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-grey-light" />
                <Input
                  id="channelName"
                  type="text"
                  value={channelName}
                  onChange={(e) => {
                    setChannelName(e.target.value);
                    setError("");
                  }}
                  placeholder="e.g., general-chat"
                  className="pl-10 dark:bg-grey-medium dark:border-grey-medium dark:text-white"
                />
              </div>
              <p className="text-xs text-grey-medium dark:text-grey-light">
                Use lowercase letters, numbers, and hyphens
              </p>
            </div>

            {/* Privacy Toggle */}
            <div className="flex items-center justify-between p-3 bg-base-white dark:bg-grey-medium/50 rounded-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-grey-medium rounded-md">
                  {isPrivate ? (
                    <Lock className="h-5 w-5 text-grey-medium dark:text-grey-light" />
                  ) : (
                    <Hash className="h-5 w-5 text-grey-medium dark:text-grey-light" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-grey dark:text-white">
                    {isPrivate ? "Private Channel" : "Public Channel"}
                  </p>
                  <p className="text-xs text-grey-medium dark:text-grey-light">
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
                  isPrivate
                    ? "bg-blue-600"
                    : "bg-grey-light dark:bg-grey-medium",
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
              <label className="text-sm font-medium text-grey-medium dark:text-grey-light block">
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 border border-grey-light dark:border-grey-medium rounded-md bg-white dark:bg-grey-medium text-grey dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* Members Selection (for private channels) */}
            {isPrivate && availableUsers.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-grey-medium dark:text-grey-light block">
                  Invite Members ({selectedUsers.length} selected)
                </label>
                <div className="max-h-40 overflow-y-auto border border-grey-light dark:border-grey-medium rounded-md">
                  {availableUsers.map((user) => (
                    <label
                      key={user.id}
                      className="flex items-center gap-3 p-3 hover:bg-base-white dark:hover:bg-grey-medium/50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUser(user.id)}
                        className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-grey dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-grey-medium dark:text-grey-light">
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
          <div className="flex items-center justify-end gap-3 p-6 border-t border-grey-light dark:border-grey-medium">
            <Button
              onClick={onClose}
              variant="outlined"
              className="dark:border-grey-medium dark:text-grey-light"
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
