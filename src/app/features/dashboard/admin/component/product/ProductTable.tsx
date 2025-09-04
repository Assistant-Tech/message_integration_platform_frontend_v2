import { Product, ProductTableProps, Status } from "@/app/types/product.types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import GenericTable from "../table/GenericTable";
import { VisibilityCell } from "@/app/features/dashboard/admin/component/ui";

const ProductTable: React.FC<ProductTableProps> = ({ data }) => {
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => {
          const row = info.row.original;
          return (
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="accent-primary w-4 h-4"
                onChange={() => console.log(`Checked: ${row.name}`)}
              />
              <img
                src={row.image}
                alt={row.name}
                className="w-10 h-10 rounded-md object-cover"
              />
              <span className="font-medium">{row.name}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => <span>${info.getValue() as number}</span>,
      },
      {
        accessorKey: "SKU",
        header: "SKU",
        cell: (info) => <span>{info.getValue() as string}</span>,
      },
      {
        accessorKey: "variants",
        header: "Variants",
        cell: (info) => <span>{info.getValue() as string}</span>,
      },
      {
        accessorKey: "visibility",
        header: "Visibility",
        cell: (info) => <VisibilityCell value={info.getValue<boolean>()} />,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const value = info.getValue() as Status;

          const getStatusStyle = (status: Status) => {
            switch (status) {
              case "Pending":
                return "bg-warning text-black";
              case "Success":
                return "bg-primary text-white";
              case "Failed":
                return "bg-danger text-white";
              case "In Progress":
                return "bg-information text-white";
              default:
                return "bg-grey-medium text-black";
            }
          };

          return (
            <span
              className={`capitalize px-3 py-1 rounded-lg text-sm ${getStatusStyle(
                value,
              )}`}
            >
              {value}
            </span>
          );
        },
      },
      {
        accessorKey: "color",
        header: "Color",
        cell: (info) => (
          <div
            className="w-5 h-5 rounded-full border border-grey-light"
            style={{ backgroundColor: info.getValue() as string }}
          />
        ),
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

export default ProductTable;
