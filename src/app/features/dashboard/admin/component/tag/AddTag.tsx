import { Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";
import { X, PlusCircle } from "lucide-react";

interface AddTagProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTag: () => void;
  tagName: string;
  setTagName: (name: string) => void;
  color: string;
  setColor: (color: string) => void;
  visibility: boolean;
  setVisibility: (visible: boolean) => void;
}

const AddTag: React.FC<AddTagProps> = ({
  isOpen,
  onClose,
  onAddTag,
  tagName,
  setTagName,
  color,
  setColor,
  visibility,
  setVisibility,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-xl p-6 bg-white rounded-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Heading title="Add New Tag" align="left" />
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        {/* Form */}
        <div className="flex w-full gap-4 items-center mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <Input
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            placeholder="New Tag"
            className="w-full"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <Input
            placeholder="none"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10 rounded-lg border"
          />

          <div className="col-span-3 flex items-center gap-2">
            <Input
              placeholder="none"
              type="checkbox"
              checked={visibility}
              onChange={() => setVisibility(!visibility)}
            />
            <span className="text-sm text-grey-medium">Visibility</span>
          </div>
        </div>

        {/* Add Button */}
        <div
          className="text-primary flex items-center gap-1 cursor-pointer mb-4"
          onClick={onAddTag}
        >
          <PlusCircle size={16} />
          <span>Add New Tag</span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-gray-800 text-white"
          >
            Cancel
          </button>
          <button
            onClick={onAddTag}
            disabled={!tagName}
            className={`px-6 py-2 rounded-lg ${
              tagName
                ? "bg-primary-light text-grey-medium"
                : "bg-primary text-white cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTag;
