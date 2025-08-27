import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/app/components/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GenericTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  emptyMessage?: string;
}

export function GenericTable<T>({
  data,
  columns,
  emptyMessage = "No data available",
}: GenericTableProps<T>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

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
      <div className="overflow-x-auto border border-grey-light rounded-lg">
        <table className="min-w-full text-left divide-y divide-grey-light">
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
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-base-white">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 label-regular-14 text-grey-medium"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-6 px-4 text-left label-regular-14 text-grey-medium"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
}

export default GenericTable;
