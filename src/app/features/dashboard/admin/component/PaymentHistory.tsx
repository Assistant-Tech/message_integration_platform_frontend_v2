import { useEffect, useMemo, useState } from "react";
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
import { formatCurrency } from "@/app/utils/helper";
import { getPaymentHistory } from "@/app/services/subscription.services";

interface Payment {
  id: string;
  transactionId: string;
  method: string;
  amount: number;
  currency: "NPR" | "USD";
  status: "SUCCESS" | "FAILED" | "PENDING";
  createdAt: string;
}

const columnHelper = createColumnHelper<Payment>();

const PaymentHistory = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Payment[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    getPaymentHistory()
      .then((res) => {
        if (!mounted) return;
        const data = Array.isArray(res.data) ? res.data : [res.data];
        const normalized: Payment[] = data.map((item: any) => ({
          id: item.id ?? item._id ?? "",
          transactionId:
            item.transactionId ??
            item.providerTransactionId ??
            item.txnId ??
            "",
          method:
            item.method ??
            item.paymentMethod?.provider ??
            (typeof item.paymentMethod === "string"
              ? item.paymentMethod
              : "Unknown"),
          amount: Number(item.amount ?? item.invoice?.total ?? 0),
          currency: (item.currency ?? item.invoice?.currency ?? "NPR") as
            | "NPR"
            | "USD",
          status: (item.status ?? item.invoice?.status ?? "PENDING") as
            | "SUCCESS"
            | "FAILED"
            | "PENDING",
          createdAt:
            item.createdAt ?? item.invoice?.paidAt ?? new Date().toISOString(),
        }));

        setHistory(normalized);
      })
      .catch(console.error)
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const data = useMemo(
    () =>
      history.map((p) => ({
        ...p,
        createdAt: new Date(p.createdAt).toLocaleDateString(),
      })),
    [history],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("transactionId", {
        header: "Transaction ID",
        cell: (info) => (
          <span className="font-medium text-grey">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("method", {
        header: "Payment Method",
        cell: (info) => (
          <span className="text-grey-medium">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => {
          const value = info.getValue();
          const currency = info.row.original.currency;
          return (
            <span className="text-grey-medium">
              {formatCurrency(value, currency)}
            </span>
          );
        },
      }),
      columnHelper.accessor("createdAt", {
        header: "Date",
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
                status === "SUCCESS"
                  ? "bg-green-100 text-green-800"
                  : status === "PENDING"
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
    state: { globalFilter, sorting },
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
                        {header.column.getIsSorted() === "asc"
                          ? " ↑"
                          : header.column.getIsSorted() === "desc"
                            ? " ↓"
                            : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-base-white">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-grey-medium">
                    Loading...
                  </td>
                </tr>
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row, index) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <p className="text-grey-medium text-sm">
                      No payment history available
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentHistory;
