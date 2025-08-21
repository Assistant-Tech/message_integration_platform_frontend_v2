import {
  Inventory,
  InventoryTableProps,
  Name,
} from "@/app/types/product.types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import GenericTable from "../table/GenericTable";

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

      // Update global state or other ways and connect backend for real time upate in the datasets
      {
        accessorKey: "stock",
        header: "Stock",
        cell: (info) => {
          const initial = info.getValue<boolean>();
          const [enabled, setEnabled] = useState(initial);

          return (
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={enabled}
                onChange={() => setEnabled((prev) => !prev)}
              />
              <div
                className={`w-11 h-6 rounded-full transition-colors duration-300 ${
                  enabled ? "bg-primary" : "bg-grey-light"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    enabled ? "translate-x-5" : "translate-x-1"
                  }`}
                  style={{ transform: "translateY(10%)" }}
                />
              </div>
            </label>
          );
        },
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
