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
import { DataTableToolbar } from "./ui";

// Define the row type for the table
interface LoginInfo {
  id: number;
  name: string;
  location: string;
  ipAddress: string;
  device: string;
  lastLogin: string;
  status: string;
  role?: string;
}

const columnHelper = createColumnHelper<LoginInfo>();

const LoginInfoTable = () => {
  const { members = [], loading, meta, fetchLoginActivity } = useTenantStore();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  // Toolbar state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortValue, setSortValue] = useState("lastLoginDesc");

  // Fetch data when pagination changes
  useEffect(() => {
    fetchLoginActivity(pagination.pageIndex + 1, pagination.pageSize);
  }, [pagination.pageIndex, pagination.pageSize, fetchLoginActivity]);

  // Transform API data → table rows
  const data: LoginInfo[] = members.map((m, idx) => ({
    id: idx + 1,
    name: m.name,
    location: m.sessions?.[0]?.location ?? "Unknown",
    ipAddress: m.sessions?.[0]?.ip ?? "-",
    device: m.sessions?.[0]?.device ?? "-",
    lastLogin: m.lastLoginAt ? new Date(m.lastLoginAt).toLocaleString() : "—",
    status: m.status,
    role: m.role ?? "User", // fallback role
  }));

  // Apply filters + search
  const filteredData = useMemo(() => {
    return data
      .filter((row) => {
        if (statusFilter !== "all" && row.status !== statusFilter) return false;
        if (roleFilter !== "all" && row.role !== roleFilter) return false;

        if (timeRange !== "all" && row.lastLogin !== "—") {
          const loginDate = new Date(row.lastLogin);
          const now = new Date();
          if (timeRange === "today") {
            return loginDate.toDateString() === now.toDateString();
          }
          if (timeRange === "7days") {
            return (
              now.getTime() - loginDate.getTime() <= 7 * 24 * 60 * 60 * 1000
            );
          }
          if (timeRange === "30days") {
            return (
              now.getTime() - loginDate.getTime() <= 30 * 24 * 60 * 60 * 1000
            );
          }
        }

        if (search) {
          return (
            row.name.toLowerCase().includes(search.toLowerCase()) ||
            row.ipAddress.toLowerCase().includes(search.toLowerCase()) ||
            row.device.toLowerCase().includes(search.toLowerCase())
          );
        }

        return true;
      })
      .sort((a, b) => {
        if (sortValue === "lastLoginDesc") {
          return (
            new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime()
          );
        }
        if (sortValue === "lastLoginAsc") {
          return (
            new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime()
          );
        }
        return 0;
      });
  }, [data, statusFilter, timeRange, roleFilter, search, sortValue]);

  // Define columns
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => (
          <span className="font-medium text-gray-900">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              info.getValue() === "ONLINE"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {info.getValue()}
          </span>
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
      columnHelper.accessor("role", {
        header: "Role",
        cell: (info) => (
          <span className="text-gray-600">{info.getValue()}</span>
        ),
      }),
    ],
    [],
  );

  // React Table setup
  const table = useReactTable({
    data: filteredData,
    columns,
    pageCount: meta ? Math.ceil(meta.total / pagination.pageSize) : -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true, // ✅ API-driven pagination
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
  const totalPages = meta
    ? Math.max(1, Math.ceil(meta.total / pagination.pageSize))
    : 1;
  const canNextPage = table.getCanNextPage();
  const canPreviousPage = table.getCanPreviousPage();
  const hasMultiplePages = totalPages > 1;

  if (loading) {
    return <p className="p-4 text-gray-600">Loading...</p>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key="login-table-content"
        className="bg-white rounded-lg border border-grey-light overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200">
          <DataTableToolbar
            search={search}
            onSearchChange={setSearch}
            sortOptions={[
              { label: "Last Login (Newest)", value: "lastLoginDesc" },
              { label: "Last Login (Oldest)", value: "lastLoginAsc" },
            ]}
            sortValue={sortValue}
            onSortChange={setSortValue}
            filters={[
              {
                label: "Status",
                value: statusFilter,
                options: [
                  { label: "All", value: "all" },
                  { label: "Online", value: "ONLINE" },
                  { label: "Offline", value: "OFFLINE" },
                ],
                onChange: (val) => setStatusFilter(String(val)),
              },
              {
                label: "Time",
                value: timeRange,
                options: [
                  { label: "All", value: "all" },
                  { label: "Today", value: "today" },
                  { label: "Last 7 days", value: "7days" },
                  { label: "Last 30 days", value: "30days" },
                ],
                onChange: (val) => setTimeRange(String(val)),
              },
              {
                label: "Role",
                value: roleFilter,
                options: [
                  { label: "All", value: "all" },
                  { label: "Admin", value: "Admin" },
                  { label: "User", value: "User" },
                ],
                onChange: (val) => setRoleFilter(String(val)),
              },
            ]}
          />
        </div>

        {/* Table */}
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
              {filteredData.length > 0 ? (
                table.getRowModel().rows.map((row, index) => (
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
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center text-gray-500 text-sm"
                  >
                    No login information available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {hasMultiplePages && filteredData.length > 0 && (
          <div className="flex items-center justify-between p-4 border-t border-gray-200">
            {/* ... keep your pagination here ... */}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginInfoTable;
