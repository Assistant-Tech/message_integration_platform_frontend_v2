import {
  Inventory,
  InventoryTableProps,
  Name,
} from "@/app/types/product.types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import GenericTable from "../table/GenericTable";
import VisibilityCell from "@/app/features/dashboard/admin/component/ui/VisibilityCell";

const InventoryTable: React.FC<InventoryTableProps> = ({ data }) => {
  const columns = useMemo<ColumnDef<Inventory>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => {
          const name = info.getValue<Name>();
          return (
            <div className="flex items-center gap-3">
              <img
                src={name.productImage}
                alt={name.productName}
                className="w-10 h-10 rounded-md object-cover"
              />
              <div>
                <p className="font-semibold">{name.productName}</p>
                {name.productSubName && (
                  <p className="text-sm text-gray-500">{name.productSubName}</p>
                )}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "color",
        header: "Color",
        cell: (info) => (
          <span className="capitalize">{info.getValue() as string}</span>
        ),
      },
      {
        accessorKey: "size",
        header: "Size",
        cell: (info) => (
          <span className="capitalize">{info.getValue() as number}</span>
        ),
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        cell: (info) => <span>{info.getValue() as number}</span>,
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => (
          <span>Rs. {(info.getValue() as number).toFixed(2)}</span>
        ),
      },
      {
        accessorKey: "stock",
        header: "Stock",
        cell: (info) => <VisibilityCell value={info.getValue<boolean>()} />,
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: () => (
          <button className="text-information hover:underline">Edit</button>
        ),
      },
    ],
    [],
  );

  return <GenericTable columns={columns} data={data} />;
};

export default InventoryTable;
