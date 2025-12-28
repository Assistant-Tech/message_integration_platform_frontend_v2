import { Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";
import { CreateVariantPayload } from "@/app/types/variants.types";
import { cn } from "@/app/utils/cn";
import { Plus, X, Trash2 } from "lucide-react";
import { useState } from "react";

interface AddVariantProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (variant: CreateVariantPayload) => Promise<void>;
}

const AddVariant: React.FC<AddVariantProps> = ({ isOpen, onClose, onAdd }) => {
  const [variants, setVariants] = useState<CreateVariantPayload[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAdd = async () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || isSubmitting) return;

    const payload: CreateVariantPayload = {
      title: trimmedTitle,
      price,
      attributes: {
        color,
        size,
      },
      inventory: {
        stock,
        lowStock: stock <= 5,
      },
    };
    console.log("🚀 ~ handleAdd ~ payload:", payload);

    setIsSubmitting(true);
    try {
      await onAdd(payload);

      // Add to local list for display
      setVariants((prev) => [...prev, payload]);

      // Reset form
      setTitle("");
      setPrice(0);
      setStock(0);
      setColor("");
      setSize("");
    } catch (error) {
      console.error("Failed to add variant:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    // Reset all state when closing
    setVariants([]);
    setTitle("");
    setPrice(0);
    setStock(0);
    setColor("");
    setSize("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="max-w-lg w-full p-8 bg-white rounded-2xl max-h-[90vh] overflow-y-auto space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Heading title="Add Variant" align="left" />
          <X size={24} onClick={handleClose} className="cursor-pointer" />
        </div>

        {/* Variant Form */}
        <div className="grid grid-cols-1 gap-3">
          <Input
            label="Variant Title"
            aria-label="variant-title"
            placeholder="Variant Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            label="Variant Price"
            aria-label="variant-price"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <Input
            label="Variant Color"
            aria-label="variant-color"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />

          <Input
            label="Variant Size"
            aria-label="variant-size"
            placeholder="Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />

          <Input
            label="Variant Stock"
            aria-label="variant-stock"
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </div>

        <button
          onClick={handleAdd}
          className={cn(
            "w-full bg-primary text-white py-2 rounded-md flex justify-center items-center gap-2",
            (!title.trim() || isSubmitting) && "opacity-50 cursor-not-allowed",
          )}
          disabled={!title.trim() || isSubmitting}
        >
          <Plus size={18} />
          {isSubmitting ? "Adding..." : "Add Variant"}
        </button>

        {/* Variant List */}
        {variants.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Added Variants ({variants.length})
            </p>
            {variants.map((variant, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border px-3 py-2 rounded-md text-sm bg-green-50 border-green-200"
              >
                <div className="truncate">
                  <p className="font-medium">{variant.title}</p>
                  <p className="text-xs text-grey">
                    ₹{variant.price} • Stock: {variant.inventory.stock}
                  </p>
                </div>

                <button
                  onClick={() => removeVariant(idx)}
                  className="text-grey-medium hover:text-danger"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        {variants.length > 0 && (
          <div className="flex gap-3 pt-4 border-t">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddVariant;
