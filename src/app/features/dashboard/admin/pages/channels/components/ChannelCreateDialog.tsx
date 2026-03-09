import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, CirclePlus } from "lucide-react";
import { Button, Input } from "@/app/components/ui";
import { useState } from "react";
import { useForm } from "react-hook-form";

const tags = [
  "Bought",
  "Delivered",
  "Queries & FAQ's",
  "Urgent",
  "Important",
  "Exchange Item",
  "Return Product",
];

interface ChannelCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormValues {
  channelName: string;
  size: number;
  visibility: "public" | "private";
  tags: string[];
}

const FormField = ({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="body-bold-16 text-grey">
      {label}
      {required && <span className="text-danger"> *</span>}
    </label>
    {children}
  </div>
);
const ChannelCreateDialog = ({
  open,
  onOpenChange,
}: ChannelCreateDialogProps) => {
  const [showInput, setShowInput] = useState(false);
  const [newTag, setNewTag] = useState("");

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FormValues>({
      defaultValues: {
        visibility: "public",
        tags: [],
      },
    });

  const selectedTags = watch("tags");
  const size = watch("size");

  const toggleTag = (tag: string) => {
    const updated = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setValue("tags", updated);
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;

    setValue("tags", [...selectedTags, newTag]);
    setNewTag("");
    setShowInput(false);
  };

  const onSubmit = (data: FormValues) => {
    console.log("Channel Data:", data);

    reset();
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-50"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="fixed z-50 left-1/2 top-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg"
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Header */}
                  <div className="flex justify-between items-center border-b border-grey-light pb-4">
                    <Dialog.Title className="h4-bold-24 text-grey">
                      Create Channel
                    </Dialog.Title>

                    <Dialog.Close asChild>
                      <button className="cursor-pointer text-grey">
                        <X />
                      </button>
                    </Dialog.Close>
                  </div>

                  {/* Form Fields */}
                  <div className="grid md:grid-cols-1 gap-4">
                    <Input
                      required
                      label="Channel Name"
                      placeholder="Enter channel name"
                      {...register("channelName", { required: true })}
                    />
                    <FormField label="Channel Size" required>
                      <select
                        id="size"
                        defaultValue=""
                        className={`w-full rounded-md border border-grey-light px-3 py-2 label-regular-14 ${
                          !size ? "text-grey-medium" : "text-black"
                        }`}
                        {...register("size", { required: true })}
                      >
                        <option value="" disabled hidden>
                          Select Channel Size
                        </option>
                        <option value="small">Small (1-10 members)</option>
                        <option value="medium">Medium (11-50 members)</option>
                        <option value="large">Large (51+ members)</option>
                      </select>
                    </FormField>
                  </div>

                  {/* Visibility */}
                  <FormField label="Visibility" required>
                    <div className="flex gap-6 label-regular-14">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="public"
                          {...register("visibility")}
                        />
                        Public
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="private"
                          {...register("visibility")}
                        />
                        Private
                      </label>
                    </div>
                  </FormField>

                  {/* Tags */}
                  <FormField label="Tags">
                    <div className="grid grid-cols-3 gap-3">
                      {tags.map((tag) => (
                        <Button
                          key={tag}
                          variant="none"
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-2 text-black rounded-md border transition label-regular-14 cursor-pointer
                          ${
                            selectedTags.includes(tag)
                              ? "border border-information"
                              : "border-grey-light hover:bg-grey-light"
                          }`}
                          label={tag}
                        />
                      ))}
                    </div>
                  </FormField>

                  {/* Add Tag */}
                  <div>
                    {showInput ? (
                      <div className="flex gap-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Enter new tag"
                        />

                        <Button
                          type="button"
                          label="Add"
                          variant="outlined"
                          IconLeft={<Plus size={18} />}
                          onClick={handleAddTag}
                        />
                      </div>
                    ) : (
                      <Button
                        type="button"
                        label="Add New Tag"
                        IconLeft={<CirclePlus size={18} />}
                        variant="none"
                        onClick={() => setShowInput(true)}
                      />
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between gap-2 pt-4 w-full">
                    <Dialog.Close asChild>
                      <Button
                        type="button"
                        label="Cancel"
                        variant="none"
                        className="bg-grey text-white w-full"
                      />
                    </Dialog.Close>

                    <Button
                      type="submit"
                      label="Save Channel"
                      variant="primary"
                      className="w-full"
                    />
                  </div>
                </form>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default ChannelCreateDialog;
