import { Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";
import { cn } from "@/app/utils/cn";
import { Plus, X, Trash2 } from "lucide-react";
import { useState } from "react";

interface AddVariantProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (variant: string) => void;
  onSave: (variants: string[]) => void;
}

const defaultVariants = ["Price", "Quantity"];

const AddVariant: React.FC<AddVariantProps> = ({
  isOpen,
  onClose,
  onAdd,
  onSave,
}) => {
  const [variants, setVariants] = useState<string[]>(defaultVariants);
  const [newVariant, setNewVariant] = useState("");

  if (!isOpen) return null;

  const handleAdd = () => {
    const trimmed = newVariant.trim();
    if (trimmed && !variants.includes(trimmed)) {
      const updated = [...variants, trimmed];
      setVariants(updated);
      onAdd(trimmed);
      setNewVariant("");
    }
  };

  const removeVariant = (variant: string) => {
    setVariants((prev) => prev.filter((v) => v !== variant));
  };

  const handleSave = () => {
    onSave(variants);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="max-w-lg w-full p-8 bg-white rounded-2xl max-h-[90vh] overflow-y-auto space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Heading
            title="Add Variant"
            align="left"
            className="text-base-black"
          />
          <X size={24} onClick={onClose} className="cursor-pointer" />
        </div>

        {/* Input */}
        <div className="flex gap-3">
          <Input
            name="variant"
            placeholder="Enter new variant"
            value={newVariant}
            onChange={(e) => setNewVariant(e.target.value)}
            className="w-full"
          />
          <button
            onClick={handleAdd}
            className={cn(
              "bg-primary text-white px-4 rounded-md",
              newVariant.trim() === "" && "opacity-50 cursor-not-allowed",
            )}
            disabled={newVariant.trim() === ""}
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Variant List */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {variants.map((variant, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border border-grey-light px-3 py-2 rounded-md text-sm text-grey bg-grey-soft"
            >
              <span className="truncate">{variant}</span>
              <button
                onClick={() => removeVariant(variant)}
                className="text-grey-medium hover:text-danger ml-2"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
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

export default AddVariant;
