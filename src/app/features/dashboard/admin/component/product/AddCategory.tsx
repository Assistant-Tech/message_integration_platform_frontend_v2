import { Button, Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";
import { X, Trash2, CirclePlus } from "lucide-react";
import { useState } from "react";

interface AddCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (categories: string[]) => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [categories, setCategories] = useState<string[]>([""]);

  if (!isOpen) return null;

  const handleInputChange = (index: number, value: string) => {
    const updated = [...categories];
    updated[index] = value;
    setCategories(updated);
  };

  const addNewInput = () => {
    setCategories((prev) => [...prev, ""]);
  };

  const removeCategory = (index: number) => {
    setCategories((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const filtered = categories.map((c) => c.trim()).filter((c) => c !== "");
    onSave(filtered);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="max-w-lg w-full p-8 bg-white rounded-2xl max-h-[90vh] overflow-y-auto space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Heading
            title="Add Category"
            align="left"
            className="text-base-black"
          />
          <X size={24} onClick={onClose} className="cursor-pointer" />
        </div>

        {/* Category Inputs */}
        <div className="space-y-3">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <Input
                value={cat}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                placeholder="Add category name"
                className="w-full"
              />
              {categories.length > 1 && (
                <button
                  onClick={() => removeCategory(idx)}
                  className="text-grey-medium hover:text-danger"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add New Category Link */}
        <Button
          label="Add New Category"
          IconLeft={<CirclePlus size={24} />}
          onClick={addNewInput}
          variant="none"
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-muted text-white px-6 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-primary text-white px-6 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
