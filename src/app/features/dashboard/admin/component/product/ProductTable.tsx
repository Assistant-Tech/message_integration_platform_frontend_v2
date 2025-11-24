import { Product } from "@/app/types/product.types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import GenericTable from "../table/GenericTable";
import { Trash2, Edit, Eye } from "lucide-react";
import { Button } from "@/app/components/ui";

interface ExtendedProductTableProps {
  data: Product[];
  onViewDetails?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

const ProductTable: React.FC<ExtendedProductTableProps> = ({
  data,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      // ID
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => <span>{info.getValue() as string}</span>,
      },

      // Product title + image
      {
        accessorKey: "title",
        header: "Name",
        cell: (info) => {
          const row = info.row.original;
          const primaryImage = row.images?.[0]?.url;

          return (
            <div className="flex items-center gap-3">
              <div className="bg-grey-light w-16 h-16 rounded-md overflow-hidden">
                <img
                  src={primaryImage}
                  alt={row.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="font-medium">{row.title}</span>
            </div>
          );
        },
      },

      // Price (from first variant)
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => {
          const row = info.row.original;
          const price = row.variants?.[0]?.price ?? 0;

          return <span>Rs. {price}</span>;
        },
      },

      // SKU
      {
        accessorKey: "sku",
        header: "SKU",
        cell: (info) => <span>{info.getValue() as string}</span>,
      },

      // Variant count or details
      {
        accessorKey: "variants",
        header: "Variants",
        cell: (info) => {
          const row = info.row.original;

          // Show size/color: "M / Red"
          const variant = row.variants?.[0];
          return (
            <span>
              {variant?.attributes?.size} / {variant?.attributes?.color}
            </span>
          );
        },
      },

      // Stock
      {
        accessorKey: "stock",
        header: "Stock",
        cell: (info) => {
          const row = info.row.original;
          return <span>{row.variants?.[0]?.inventory?.stock ?? "N/A"}</span>;
        },
      },

      // Actions
      {
        accessorKey: "action",
        header: "Action",
        cell: (info) => {
          const row = info.row.original;

          return (
            <div className="flex items-center gap-2">
              <Button
                variant="none"
                IconLeft={<Eye size={20} />}
                onClick={() => onViewDetails?.(row)}
                className="p-2 hover:bg-gray-100 rounded"
              />

              <Button
                variant="none"
                IconLeft={<Edit size={20} />}
                onClick={() => onEdit?.(row)}
                className="p-2 hover:bg-gray-100 rounded"
              />

              <Button
                variant="none"
                IconLeft={<Trash2 size={20} color="#EF4444" />}
                onClick={() => onDelete?.(row.id)}
                className="p-2 hover:bg-red-50 rounded"
              />
            </div>
          );
        },
      },
    ],
    [onViewDetails, onEdit, onDelete],
  );

  return <GenericTable columns={columns} data={data} />;
};

export default ProductTable;
