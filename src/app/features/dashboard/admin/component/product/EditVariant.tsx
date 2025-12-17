import { Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";
import {
  UpdateVariantPayload,
  Variant,
  VariantAttribute,
} from "@/app/types/variants.types";
import { X, Save } from "lucide-react";
import { useState, useEffect } from "react";

interface EditVariantProps {
  isOpen: boolean;
  onClose: () => void;
  variant: Variant;
  onUpdate: (variantId: string, payload: UpdateVariantPayload) => void;
}

const EditVariant: React.FC<EditVariantProps> = ({
  isOpen,
  onClose,
  variant,
  onUpdate,
}) => {
  const [price, setPrice] = useState<number>(variant.price);
  const [sku, setSku] = useState<string>(variant.sku || "");
  const [attributes, setAttributes] = useState<VariantAttribute>({
    color: "",
    size: "",
  });

  // Update state when variant changes
  useEffect(() => {
    setPrice(variant.price);
    setSku(variant.sku || "");
    setAttributes(variant.attributes || {});
  }, [variant]);

  if (!isOpen) return null;

  const handleSave = () => {
    const payload: UpdateVariantPayload = {
      price,
      sku,
      attributes,
    };

    onUpdate(variant.id, payload);
  };

  const updateAttribute = (field: keyof VariantAttribute, value: string) => {
    setAttributes((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="max-w-lg w-full p-8 bg-white rounded-2xl max-h-[90vh] overflow-y-auto space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Heading title="Edit Variant" align="left" />
          <X size={24} onClick={onClose} className="cursor-pointer" />
        </div>

        {/* Variant Info (Read-only) */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Variant Title</p>
          <p className="font-semibold">{variant.title}</p>
        </div>

        {/* Edit Form */}
        <div className="grid grid-cols-1 gap-3">
          <Input
            label="SKU"
            aria-label="variant-sku"
            placeholder="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />

          <Input
            label="Price"
            aria-label="variant-price"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          {/* Attributes */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Attributes</label>

            <div className="grid grid-cols-2 gap-2">
              <Input
                aria-label="color"
                placeholder="Color"
                value={attributes.color}
                onChange={(e) => updateAttribute("color", e.target.value)}
              />

              <Input
                aria-label="size"
                placeholder="Size"
                value={attributes.size}
                onChange={(e) => updateAttribute("size", e.target.value)}
              />
            </div>
          </div>

          {/* Inventory Info (Read-only) */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-1">
            <p className="text-sm text-gray-600">Inventory</p>
            <p className="text-sm">
              <span className="font-medium">Stock:</span>{" "}
              {variant.inventory.stock}
            </p>
            <p className="text-sm">
              <span className="font-medium">Low Stock:</span>{" "}
              {variant.inventory.lowStock ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-primary text-white py-2 rounded-md flex justify-center items-center gap-2 hover:bg-primary-dark"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditVariant;
