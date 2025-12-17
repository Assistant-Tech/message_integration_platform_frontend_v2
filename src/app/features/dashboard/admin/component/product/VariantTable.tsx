import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import GenericTable from "../table/GenericTable";
import { Edit2, Trash2 } from "lucide-react";
import { Variant } from "@/app/types/variants.types";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";
import { useAuthStore } from "@/app/store/auth.store";

interface VariantTableProps {
  data: Variant[];
  onEdit: (variant: Variant) => void;
  onDelete: (variantId: string) => void;
}

const VariantTable: React.FC<VariantTableProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const tenantSlug = useAuthStore((s) => s.tenantSlug);
  const navigate = useNavigate();

  const handleRedirectToInventory = () => {
    navigate(`/${tenantSlug}/admin/${APP_ROUTES.ADMIN.PRODUCTS_INVENTORY}`);
  };

  const columns = useMemo<ColumnDef<Variant>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Variant Id",
        cell: (info) => {
          const fullId = info.getValue() as string;
          const maxLen = 8;
          const displayValue =
            fullId.length > maxLen ? fullId.slice(0, maxLen) + "..." : fullId;
          return <span>{displayValue}</span>;
        },
      },
      {
        accessorKey: "title",
        header: "Name",
        cell: (info) => <span>{info.getValue() as string}</span>,
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => <span>₹{info.getValue() as number}</span>,
      },
      {
        accessorKey: "sku",
        header: "SKU",
        cell: (info) => <span>{(info.getValue() as string) || "N/A"}</span>,
      },
      {
        accessorKey: "inventory.stock",
        header: "Stock",
        cell: (info) => {
          const stock = info.getValue() as number;
          const isLowStock = info.row.original.inventory.lowStock;
          return (
            <span className={isLowStock ? "text-danger font-semibold" : ""}>
              {stock}
            </span>
          );
        },
      },
      {
        accessorKey: "attributes",
        header: "Attributes",
        cell: (info) => {
          const attributes = info.getValue() as Record<
            string,
            string | undefined
          >;

          return (
            <div className="flex flex-col gap-1">
              <span className="text-xs">
                {attributes.color && `Color: ${attributes.color}`}
                {attributes.color && attributes.size && " | "}
                {attributes.size && `Size: ${attributes.size}`}
              </span>
            </div>
          );
        },
      },
      {
        id: "inventory-details",
        header: "Inventory Details",
        cell: () => (
          <button
            onClick={handleRedirectToInventory}
            className="text-primary hover:text-primary-dark cursor-pointer underline"
          >
            View Inventory
          </button>
        ),
      },
      {
        id: "action",
        header: "Action",
        cell: (info) => {
          const variant = info.row.original;
          return (
            <div className="flex gap-4">
              <button
                onClick={() => onEdit(variant)}
                className="text-information hover:text-information-dark cursor-pointer"
                title="Edit variant"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={() => onDelete(variant.id)}
                className="text-danger hover:text-danger-dark cursor-pointer"
                title="Delete variant"
              >
                <Trash2 size={20} />
              </button>
            </div>
          );
        },
      },
    ],
    [onEdit, onDelete, tenantSlug],
  );

  return <GenericTable columns={columns} data={data} />;
};

export default VariantTable;
