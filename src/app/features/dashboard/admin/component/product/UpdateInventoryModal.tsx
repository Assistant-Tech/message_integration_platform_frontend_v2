import { Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";
import { Variant } from "@/app/types/variants.types";
import { X, Save, Package } from "lucide-react";
import { useState, useEffect } from "react";
import { useUpdateVariantInventory } from "@/app/hooks/useUpdateVariantInventory";

interface InventoryData extends Variant {
  productName: string;
  productImage?: string;
}

interface UpdateInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: InventoryData;
}

const UpdateInventoryModal: React.FC<UpdateInventoryModalProps> = ({
  isOpen,
  onClose,
  variant,
}) => {
  const [quantity, setQuantity] = useState<number>(variant.inventory.stock);
  const [lowStockThreshold, setLowStockThreshold] = useState<number>(5);

  const updateInventoryMutation = useUpdateVariantInventory(
    variant.productId,
    variant.id, // Changed from variant._id to variant.id
  );

  useEffect(() => {
    if (variant) {
      setQuantity(variant.inventory.stock);
    }
  }, [variant]);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      await updateInventoryMutation.mutateAsync({
        quantity,
        lowStockThreshold,
      });
      onClose();
    } catch (error) {
      console.error("Failed to update inventory:", error);
    }
  };

  const isLowStock = quantity <= lowStockThreshold;
  const isOutOfStock = quantity === 0;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <Heading title="Update Inventory" align="left" />
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-grey-medium"
          >
            <X size={24} />
          </button>
        </div>

        {/* Product Info */}
        <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
          {variant.productImage ? (
            <img
              src={variant.productImage}
              alt={variant.productName}
              className="w-16 h-16 rounded object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <div className="flex-1">
            <p className="font-semibold text-grey">{variant.productName}</p>
            <p className="text-sm text-grey-medium">{variant.title}</p>
            <p className="text-xs text-grey-medium mt-1">
              SKU: {variant.sku || "N/A"}
            </p>
          </div>
        </div>

        {/* Current Status */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-blue-800">
              Current Stock
            </span>
            <span className="text-2xl font-bold text-blue-900">
              {variant.inventory.stock}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-blue-700">Status:</span>
            {variant.inventory.stock === 0 ? (
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                Out of Stock
              </span>
            ) : variant.inventory.lowStock ? (
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                Low Stock
              </span>
            ) : (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                In Stock
              </span>
            )}
          </div>
        </div>

        {/* Update Form */}
        <div className="space-y-4 mb-6">
          <div>
            <Input
              label="New Stock Quantity"
              aria-label="stock-quantity"
              type="number"
              min="0"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            {quantity !== variant.inventory.stock && (
              <p className="text-xs text-grey-medium mt-1">
                Change:{" "}
                <span
                  className={
                    quantity > variant.inventory.stock
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {quantity > variant.inventory.stock ? "+" : ""}
                  {quantity - variant.inventory.stock}
                </span>
              </p>
            )}
          </div>

          <Input
            label="Low Stock Threshold"
            aria-label="low-stock-threshold"
            type="number"
            min="0"
            placeholder="Enter threshold"
            value={lowStockThreshold}
            onChange={(e) => setLowStockThreshold(Number(e.target.value))}
          />
        </div>

        {/* Status Preview */}
        {quantity !== variant.inventory.stock && (
          <div className="mb-6 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs font-medium text-grey mb-2">After Update:</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-grey">{quantity}</span>
              {isOutOfStock ? (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                  Out of Stock
                </span>
              ) : isLowStock ? (
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                  Low Stock
                </span>
              ) : (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  In Stock
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={updateInventoryMutation.isPending}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              updateInventoryMutation.isPending
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark text-white"
            }`}
          >
            {updateInventoryMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Updating...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Save size={18} />
                Update Stock
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateInventoryModal;
