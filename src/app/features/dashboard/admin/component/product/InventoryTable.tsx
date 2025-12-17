import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import GenericTable from "../table/GenericTable";
import { Edit2, Package } from "lucide-react";
import { Variant } from "@/app/types/variants.types";
import UpdateInventoryModal from "./UpdateInventoryModal";

interface InventoryData extends Variant {
  productName: string;
  productImage?: string;
}

interface InventoryTableProps {
  data: InventoryData[];
}

const InventoryTable: React.FC<InventoryTableProps> = ({ data }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<InventoryData | null>(
    null,
  );

  const handleEditInventory = (variant: InventoryData) => {
    setSelectedVariant(variant);
    setShowUpdateModal(true);
  };

  const columns = useMemo<ColumnDef<InventoryData>[]>(
    () => [
      {
        accessorKey: "productName",
        header: "Product",
        cell: (info) => {
          const variant = info.row.original;
          return (
            <div className="flex items-center gap-3">
              {variant.productImage ? (
                <img
                  src={variant.productImage}
                  alt={variant.productName}
                  className="w-12 h-12 rounded object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center">
                  <Package className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div>
                <p className="font-medium text-grey">{variant.productName}</p>
                <p className="text-xs text-grey-medium">{variant.title}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "sku",
        header: "SKU",
        cell: (info) => (
          <span className="font-mono text-sm">
            {(info.getValue() as string) || "N/A"}
          </span>
        ),
      },
      {
        accessorKey: "attributes",
        header: "Variant",
        cell: (info) => {
          const attributes = info.getValue() as any;

          // Handle case where attributes might be undefined or null
          if (!attributes) return <span>-</span>;

          // attributes is a single object, not an array
          return (
            <div className="flex items-center gap-1">
              {attributes.color && (
                <span className="inline-block px-2 py-0.5 bg-gray-100 rounded text-xs">
                  {attributes.color}
                </span>
              )}
              {attributes.size && (
                <span className="inline-block px-2 py-0.5 bg-gray-100 rounded text-xs">
                  {attributes.size}
                </span>
              )}
              {!attributes.color && !attributes.size && <span>-</span>}
            </div>
          );
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => (
          <span className="font-semibold">₹{info.getValue() as number}</span>
        ),
      },
      {
        accessorKey: "inventory.stock",
        header: "Stock",
        cell: (info) => {
          const stock = info.getValue() as number;
          const isLowStock = info.row.original.inventory?.lowStock;
          const isOutOfStock = stock === 0;

          return (
            <div className="flex items-center gap-2">
              <span
                className={`font-semibold ${
                  isOutOfStock
                    ? "text-red-600"
                    : isLowStock
                      ? "text-orange-600"
                      : "text-green-600"
                }`}
              >
                {stock}
              </span>
              {isLowStock && stock > 0 && (
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                  Low
                </span>
              )}
              {isOutOfStock && (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                  Out
                </span>
              )}
            </div>
          );
        },
      },
      {
        id: "status",
        header: "Status",
        cell: (info) => {
          const stock = info.row.original.inventory?.stock || 0;
          const isLowStock = info.row.original.inventory?.lowStock;

          if (stock === 0) {
            return (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                Out of Stock
              </span>
            );
          } else if (isLowStock) {
            return (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                Low Stock
              </span>
            );
          } else {
            return (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                In Stock
              </span>
            );
          }
        },
      },
      {
        id: "action",
        header: "Action",
        cell: (info) => {
          const variant = info.row.original;
          return (
            <button
              onClick={() => handleEditInventory(variant)}
              className="text-information hover:text-information-dark cursor-pointer"
              title="Update inventory"
            >
              <Edit2 size={20} />
            </button>
          );
        },
      },
    ],
    [],
  );

  return (
    <>
      <GenericTable
        columns={columns}
        data={data}
        emptyMessage="No inventory data available"
      />

      {selectedVariant && (
        <UpdateInventoryModal
          isOpen={showUpdateModal}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedVariant(null);
          }}
          variant={selectedVariant}
        />
      )}
    </>
  );
};

export default InventoryTable;
