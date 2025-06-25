import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
    header: "Total",
    cell: ({ getValue }) => `₹ ${getValue()}`,
  },
  {
    accessorKey: "payment",
    header: "Payment",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => <button className="text-blue-600">View</button>,
  },
];

const OrderTable = ({ data }: OrderTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section>
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
              <tr key={row.id} className="hover:bg-grey-light">
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
    </section>
  );
};
export default OrderTable;
