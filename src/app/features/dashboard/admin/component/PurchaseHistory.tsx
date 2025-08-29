import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from "@tanstack/react-table";
import { motion } from "framer-motion";

// 1. Define a type for purchase history item
interface Purchase {
  id: number;
  plan: string;
  type: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: "Active" | "Expired" | "Cancelled";
}

// 2. Static sample data
const staticData: Purchase[] = [
  {
    id: 1,
    plan: "Pro Annual",
    type: "Subscription",
    amount: 120,
    startDate: "06/01/2025",
    endDate: "06/01/2026",
    status: "Active",
  },
  {
    id: 2,
    plan: "Basic Monthly",
    type: "Subscription",
    amount: 10,
    startDate: "05/01/2025",
    endDate: "06/01/2025",
    status: "Expired",
  },
];

const columnHelper = createColumnHelper<Purchase>();

const PurchaseHistory = () => {
  const [data] = useState(staticData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("plan", {
        header: "Plan",
        cell: (info) => (
          <span className="font-medium text-grey">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("type", {
        header: "Type",
        cell: (info) => (
          <span className="text-grey-medium">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => (
          <span className="text-grey-medium">${info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("startDate", {
        header: "Start Date",
        cell: (info) => (
          <span className="text-grey-medium">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("endDate", {
        header: "End Date",
        cell: (info) => (
          <span className="text-grey-medium">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue();
          return (
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                status === "Active"
                  ? "bg-green-100 text-green-800"
                  : status === "Expired"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {status}
            </span>
          );
        },
      }),
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.05 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="bg-base-white min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Table */}
      <div className="bg-white rounded-lg border border-grey-light overflow-hidden my-2">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-base-white border-b border-grey-light">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-sm font-semibold text-grey tracking-wider cursor-pointer hover:bg-base-white"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {{
                          asc: " ↑",
                          desc: " ↓",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-base-white">
              {table.getRowModel().rows.map((row, index) => (
                <motion.tr
                  key={row.id}
                  className="hover:bg-base-white transition-colors duration-200"
                  variants={rowVariants}
                  custom={index}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {table.getRowModel().rows.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-grey-medium text-sm">
              No purchase history available
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PurchaseHistory;
