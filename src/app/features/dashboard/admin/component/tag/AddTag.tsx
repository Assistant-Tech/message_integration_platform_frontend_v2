import { Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";
import { X, PlusCircle } from "lucide-react";

interface AddTagProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  tagName: string;
  setTagName: (name: string) => void;
  color: string;
  setColor: (color: string) => void;
  visibility: boolean;
  setVisibility: (visible: boolean) => void;
  onAddNewTagField: () => void;
}

const AddTag: React.FC<AddTagProps> = ({
  isOpen,
  onClose,
  onSave,
  tagName,
  setTagName,
  color,
  setColor,
  visibility,
  setVisibility,
  onAddNewTagField,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 font-inter">
      <div className="w-full max-w-xl p-6 bg-white rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Heading title="Add New Tag" align="left" />
          <X
            className="cursor-pointer text-gray-600 hover:text-gray-900"
            onClick={onClose}
            size={24}
          />
        </div>

        {/* Form Fields - Aligned as per screenshot */}
        <div className="grid grid-cols-12 gap-4 items-center mb-4">
          {/* Name Label and Input */}
          <div className="col-span-6 md:col-span-5">
            <label
              htmlFor="tagName"
              className="block text-sm font-medium text-grey mb-1"
            >
              Name
            </label>
            <Input
              id="tagName"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="Purchased"
              className="w-full rounded-lg"
            />
          </div>

          {/* Color Label and Input */}
          <div className="col-span-3 md:col-span-3">
            <label
              htmlFor="tagColor"
              className="block text-sm font-medium text-grey mb-1"
            >
              Color
            </label>
            <Input
              placeholder=""
              id="tagColor"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 rounded-lg border-2 border-grey-light cursor-pointer p-0"
            />
          </div>

          {/* Visibility Checkbox and Label */}
          <div className="col-span-3 md:col-span-3">
            <label
              htmlFor="tagColor"
              className="block text-sm font-medium text-grey"
            >
              Visibility
            </label>
            <Input
              placeholder=""
              type="checkbox"
              checked={visibility}
              onChange={() => setVisibility(!visibility)}
              className="w-5 h-5 rounded-md text-primary focus:ring-primary border-grey-light cursor-pointer"
            />
          </div>
        </div>

        {/* Add New Tag Button - Matches UI */}
        <div
          className="text-primary flex items-center gap-1 cursor-pointer mb-6 hover:text-primary transition-colors"
          onClick={onAddNewTagField}
        >
          <PlusCircle size={18} />
          <span className="text-sm font-medium">Add New Tag</span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-gray-800 text-white font-medium hover:bg-grey transition-colors shadow-md"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={!tagName}
            className={`px-6 py-2 rounded-lg font-medium shadow-md ${
              tagName
                ? "bg-primary text-white hover:bg-primary-dark transition-colors"
                : "bg-grey-light text-grey-medium cursor-not-allowed"
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
