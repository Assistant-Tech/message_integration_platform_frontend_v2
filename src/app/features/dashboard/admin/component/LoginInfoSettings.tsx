import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { motion, AnimatePresence } from "framer-motion";
import { useTenantStore } from "@/app/store/tenant.store";

// Define the row type for the table
interface LoginInfo {
  id: number;
  name: string;
  location: string;
  ipAddress: string;
  device: string;
  lastLogin: string;
}

// Column helper
const columnHelper = createColumnHelper<LoginInfo>();

const LoginInfoTable = () => {
  const { members, loading, meta, fetchLoginActivity } = useTenantStore();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  // Fetch data when pagination changes
  useEffect(() => {
    fetchLoginActivity(pagination.pageIndex + 1, pagination.pageSize);
  }, [pagination.pageIndex, pagination.pageSize, fetchLoginActivity]);

  // Transform API data → table rows
  const data: LoginInfo[] = members.map((m, idx) => ({
    id: idx + 1,
    name: m.name,
    location: m.sessions[0]?.location ?? "Unknown",
    ipAddress: m.sessions[0]?.ip ?? "-",
    device: m.sessions[0]?.device ?? "-",
    lastLogin: new Date(m.lastLoginAt).toLocaleString(),
  }));

  // Define columns
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => (
          <span className="font-medium text-gray-900">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("location", {
        header: "Location",
        cell: (info) => (
          <span className="text-gray-600">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("ipAddress", {
        header: "IP Address",
        cell: (info) => (
          <span className="font-mono text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("device", {
        header: "Device",
        cell: (info) => (
          <span className="text-gray-600">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("lastLogin", {
        header: "Last Login",
        cell: (info) => (
          <span className="text-gray-600">{info.getValue()}</span>
        ),
      }),
    ],
    [],
  );

  // React Table setup
  const table = useReactTable({
    data,
    columns,
    pageCount: meta ? Math.ceil(meta.total / pagination.pageSize) : -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true, // ✅ we control pagination via API
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = meta ? Math.ceil(meta.total / pagination.pageSize) : 1;
  const canNextPage = table.getCanNextPage();
  const canPreviousPage = table.getCanPreviousPage();
  const hasMultiplePages = totalPages > 1;

  if (loading) {
    return <p className="p-4 text-gray-600">Loading...</p>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="login-table-content"
        className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.map((row, index) => (
                <motion.tr
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
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

        {hasMultiplePages && (
          <div className="flex items-center justify-between p-4 border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => table.previousPage()}
                disabled={!canPreviousPage}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!canNextPage}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * pagination.pageSize + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      currentPage * pagination.pageSize,
                      meta?.total || 0,
                    )}
                  </span>{" "}
                  of <span className="font-medium">{meta?.total || 0}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => table.previousPage()}
                    disabled={!canPreviousPage}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                      !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {[...Array(totalPages)].map((_, pageIndex) => (
                    <button
                      key={pageIndex}
                      onClick={() => table.setPageIndex(pageIndex)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        pageIndex === pagination.pageIndex
                          ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {pageIndex + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => table.nextPage()}
                    disabled={!canNextPage}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                      !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {data.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500 text-sm">
              No login information available
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginInfoTable;
