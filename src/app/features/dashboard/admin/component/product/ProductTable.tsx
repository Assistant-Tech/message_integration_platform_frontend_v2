import { Product, ProductTableProps, Status } from "@/app/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import GenericTable from "../table/GenericTable";

const ProductTable: React.FC<ProductTableProps> = ({ data }) => {

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => <span>{info.getValue() as string}</span>,
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
        cell: (info) =>
          (info.getValue() as boolean) ? (
            <span className="text-primary">Visible</span>
          ) : (
            <span className="text-danger">Hidden</span>
          ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const value = info.getValue() as Status;
          return <span className="capitalize">{value}</span>;
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
