import { Plus, X, Edit } from "lucide-react";
import { Button, Input } from "@/app/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export type Message = {
  heading: string;
  shortcut: string;
  message: string;
};

export type ChatSettings = {
  primaryColor: string;
  backgroundColor: string;
  companyName: string;
  logo: string | null;
  messages: Message[];
  actionButtons: { text: string }[];
  borderRadius: number;
  shadow: boolean;
};

type MessageTemplateSettingsProps = {
  chatSettings: ChatSettings;
  setChatSettings: React.Dispatch<React.SetStateAction<ChatSettings>>;
};

const MessageTemplateSettings = ({
  chatSettings,
  setChatSettings,
}: MessageTemplateSettingsProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempMessage, setTempMessage] = useState<Message>({
    heading: "",
    shortcut: "",
    message: "",
  });

  const handleSave = () => {
    if (editingIndex !== null) {
      setChatSettings((prev) => {
        const updated = [...prev.messages];
        updated[editingIndex] = tempMessage;
        return { ...prev, messages: updated };
      });
      setEditingIndex(null);
    } else {
      setChatSettings((prev) => ({
        ...prev,
        messages: [...(prev.messages || []), tempMessage],
      }));
    }
    setTempMessage({ heading: "", shortcut: "", message: "" });
    setIsAdding(false);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setTempMessage(
      chatSettings.messages[index] ?? { heading: "", shortcut: "", message: "" }
    );
    setIsAdding(true);
  };

  const handleDelete = (index: number) => {
    setChatSettings((prev) => ({
      ...prev,
      messages: prev.messages.filter((_, i) => i !== index),
    }));
  };

  const noMessages =
    !Array.isArray(chatSettings.messages) || chatSettings.messages.length === 0;

  return (
    <motion.div className="space-y-6">
      <div className="rounded-lg p-6 bg-base-white">
        <h3 className="text-lg font-semibold text-grey mb-4">
          Message Templates
        </h3>

        {noMessages && !isAdding && (
          <div className="text-center space-y-4">
            <figure className="w-auto flex justify-center">
              <img
                src="https://res.cloudinary.com/dtoqwn0gx/image/upload/v1755848331/down_kqjgdp.png"
                alt="No templates"
                className="w-80 h-full"
              />
            </figure>
            <p className="text-gray-600">
              You don’t have any saved message template. Please add a message to
              create one.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <AnimatePresence>
            {Array.isArray(chatSettings.messages) &&
              chatSettings.messages.map((msg, index) => (
                <motion.div
                  key={index}
                  className="border p-4 rounded-md flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{msg.heading}</h4>
                      <p className="text-sm text-gray-600">
                        <strong>Shortcut:</strong> {msg.shortcut}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-primary hover:text-primary-dark"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <p>{msg.message}</p>
                </motion.div>
              ))}
          </AnimatePresence>

          {isAdding ? (
            <div className="border p-6 rounded-lg bg-gray-50 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Heading Name
                </label>
                <Input
                  placeholder="Enter heading name"
                  value={tempMessage.heading}
                  onChange={(e) =>
                    setTempMessage((prev) => ({
                      ...prev,
                      heading: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shortcut
                </label>
                <Input
                  placeholder="Enter keyboard shortcut"
                  value={tempMessage.shortcut}
                  onChange={(e) =>
                    setTempMessage((prev) => ({
                      ...prev,
                      shortcut: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  className="w-full border border-grey-light text-grey-medium rounded-md p-2 mt-1"
                  placeholder="Enter your message here"
                  value={tempMessage.message}
                  onChange={(e) =>
                    setTempMessage((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  label="Cancel"
                  variant="secondary"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingIndex(null);
                  }}
                />
                <Button label="Save" onClick={handleSave} variant="primary" />
              </div>
            </div>
          ) : (
            <div className="flex justify-center py-4">
              <Button
                label="Add Message"
                onClick={() => setIsAdding(true)}
                IconLeft={<Plus size={16} />}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageTemplateSettings;
