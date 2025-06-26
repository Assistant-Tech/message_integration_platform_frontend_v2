import { Button } from "@/app/components/ui";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

interface Order {
  id: string;
  name: string;
  createdAt: string;
  total: number;
  payment: string;
  status: string;
}

interface OrderTableProps {
  data: Order[];
}

// Table HEADs use in @Tanstack Query methodology
const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: () => (
      <input
        type="checkbox"
        className="w-4 h-4 rounded bg-primary text-white accent-primary border-none focus:ring-0 checked:bg-primary checked:text-white"
      />
    ),
    cell: () => (
      <input
        type="checkbox"
        className="w-4 h-4 rounded bg-primary text-white accent-primary border-none focus:ring-0 checked:bg-primary checked:text-white"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created On",
  },
  {
    accessorKey: "total",
    header: "Total Amount",
    cell: ({ getValue }) => `Rs. ${getValue()}`,
  },
  {
    accessorKey: "payment",
    header: "Payment",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;

      const statusStyles: Record<string, string> = {
        Confirmed: "bg-secondary",
        Shipped: "bg-information",
        Delivered: "bg-success",
        Cancelled: "bg-danger",
      };

      const bgClass = statusStyles[status] || "bg-gray-medium";

      return (
        <span
          className={`px-3 py-1 rounded-lg text-center text-white label-regular-14 ${bgClass}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex justify-start items-center gap-4">
        <button className="text-grey-medium">
          <SquarePen size={16} />
        </button>
        <button className="text-danger">
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
];

const OrderTable = ({ data }: OrderTableProps) => {
  // Pagination
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Table usage of @Tanstack Query
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <section>
      {/* Table Section && Data Set sections */}
      <table className="min-w-full border border-grey-light rounded-lg divide-y divide-grey-light">
        <thead className="bg-base-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left label-bold-14 text-grey"
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
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-base-white">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 label-regular-14 text-grey-medium"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="py-6 text-left label-regular-14 text-grey-medium"
              >
                No orders available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
        {/* Page Info */}
        <div className="button-semi-bold-16 text-grey-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        {/* Page Size Selector */}
        <div className="flex items-center gap-2">
          <label className="button-semi-bold-16 text-grey-medium">
            Rows per page:
          </label>
          <select
            className="border border-grey-light rounded px-2 py-1 button-semi-bold-16 text-grey-medium"
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Prev / Next Buttons */}
        <div className="flex gap-2 text-grey-medium">
          <Button
            label="Prev"
            variant="none"
            IconLeft={<ChevronLeft size={16} />}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 button-semi-bold-16 disabled:opacity-50"
          />
          <Button
            label="Next"
            variant="none"
            IconRight={<ChevronRight size={16} />}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 button-semi-bold-16 disabled:opacity-50"
          />
        </div>
      </div>
    </section>
  );
};
export default OrderTable;
