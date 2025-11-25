import { Button, Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";
import { X, Trash2, CirclePlus } from "lucide-react";
import { useState } from "react";
import { createCategory } from "@/app/services/category.services";

interface AddCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newCategoryId?: string) => void;
}

interface CategoryInput {
  title: string;
  description: string;
}

const AddCategory: React.FC<AddCategoryProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [categories, setCategories] = useState<CategoryInput[]>([
    { title: "", description: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleInputChange = (
    index: number,
    field: "title" | "description",
    value: string,
  ) => {
    const updated = [...categories];
    if (updated[index]) {
      updated[index][field] = value;
      setCategories(updated);
    }
  };

  const addNewInput = () => {
    setCategories((prev) => [...prev, { title: "", description: "" }]);
  };

  const removeCategory = (index: number) => {
    setCategories((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      // Filter out empty categories
      const validCategories = categories.filter((c) => c.title.trim() !== "");

      if (validCategories.length === 0) {
        setError("Please add at least one category name");
        setLoading(false);
        return;
      }

      // Create all categories
      const promises = validCategories.map((category) =>
        createCategory({
          title: category.title.trim(),
          description: category.description,
          parentId: null,
        }),
      );

      const results = await Promise.all(promises);

      // Reset form
      setCategories([{ title: "", description: "" }]);

      // If only one category was created, return its ID
      const newCategoryId = results.length === 1 ? results[0]?.id : undefined;

      // Call onSave callback to refresh the list
      onSave(newCategoryId);
      onClose();
    } catch (err) {
      console.error("Error saving categories:", err);
      setError("Failed to save categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCategories([{ title: "", description: "" }]);
    setError(null);
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
          <X
            size={24}
            onClick={handleClose}
            className="cursor-pointer hover:text-gray-600"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        {/* Category Inputs */}
        <div className="space-y-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="space-y-2 p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-2">
                  <Input
                    value={cat.title}
                    onChange={(e) =>
                      handleInputChange(idx, "title", e.target.value)
                    }
                    placeholder="Category name *"
                    className="w-full"
                  />
                  <Input
                    value={cat.description}
                    onChange={(e) =>
                      handleInputChange(idx, "description", e.target.value)
                    }
                    placeholder="Description (optional)"
                    className="w-full"
                  />
                </div>
                {categories.length > 1 && (
                  <button
                    onClick={() => removeCategory(idx)}
                    className="text-grey-medium hover:text-danger mt-2"
                    type="button"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add New Category Link */}
        <Button
          label="Add New Category"
          IconLeft={<CirclePlus size={24} />}
          onClick={addNewInput}
          variant="none"
          disabled={loading}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="bg-muted text-white px-6 py-2 rounded-md hover:bg-gray-400 transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
