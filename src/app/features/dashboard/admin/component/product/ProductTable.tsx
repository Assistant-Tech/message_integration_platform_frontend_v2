import { Product, ProductTableProps, Status } from "@/app/types/product";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { useMemo } from "react";

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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border border-grey-light rounded-lg overflow-x-auto">
      <table className="min-w-full text-left ">
        <thead className="bg-base-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="label-bold-14 text-grey px-6 py-4"
                  key={header.id}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-grey-light">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-base-white">
              {row.getVisibleCells().map((cell) => (
                <td
                  className="px-6 py-4   label-regular-14 text-grey-medium"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
