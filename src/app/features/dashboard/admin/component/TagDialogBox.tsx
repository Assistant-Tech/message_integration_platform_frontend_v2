import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, CirclePlus } from "lucide-react";
import { Button, Input } from "@/app/components/ui";
import { useState } from "react";

const tags = [
  "Bought",
  "Delivered",
  "Queries",
  "Urgent",
  "Important",
  "Exchange Item",
  "Return Product",
];

interface TagDialogProps {
  trigger: React.ReactNode;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}
const TagDialog = ({ trigger, selected, setSelected }: TagDialogProps) => {
  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newTag, setNewTag] = useState("");

  const toggleTag = (tag: string) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      tags.push(newTag);
      setSelected([...selected, newTag]);
    }
    setNewTag("");
    setShowInput(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/65 z-50"
              />
            </Dialog.Overlay>
            <Dialog.Content
              asChild
              aria-description="tag_dialogbox"
              aria-label="dialog-box"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="fixed z-50 left-1/2 top-1/2 w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-white px-8 py-6 shadow-lg"
              >
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-grey-light">
                  <Dialog.Title className="h4-bold-24 text-grey">
                    Add Tag
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="text-grey cursor-pointer">
                      <X />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  {tags.map((tag, i) => (
                    <button
                      key={i}
                      onClick={() => toggleTag(tag)}
                      className={`label-regular-14 px-3 py-2 rounded-md border border-grey-light hover:bg-grey-light cursor-pointer ${
                        selected.includes(tag)
                          ? "bg-primary text-white border-primary"
                          : "bg-base-white text-grey-medium"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="mb-4">
                  {showInput ? (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-2"
                      >
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Enter new tag"
                          className="px-3 py-2 body-regular-16 w-full"
                        />
                        <Button
                          label="Add"
                          IconLeft={<Plus size={24} />}
                          onClick={handleAddTag}
                          variant="primary"
                          className="px-4"
                        />
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <Button
                      label="Add New Tag"
                      IconLeft={<CirclePlus size={24} />}
                      variant="none"
                      onClick={() => setShowInput(true)}
                    />
                  )}
                </div>

                <div className="flex justify-end gap-2 mt-4 border-t border-grey-light pt-4">
                  <Dialog.Close asChild>
                    <Button
                      label="Cancel"
                      variant="none"
                      className="bg-grey hover:bg-grey-medium text-white p-4"
                    />
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <Button
                      label="Save"
                      variant="primary"
                      className="px-5"
                      disabled={selected.length === 0}
                      //   Checking the data sets
                      onClick={() => console.log("Selected Tags:", selected)}
                    />
                  </Dialog.Close>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default TagDialog;
