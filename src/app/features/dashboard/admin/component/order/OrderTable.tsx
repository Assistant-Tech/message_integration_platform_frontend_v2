import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import GenericTable from "../table/GenericTable";

interface Order {
  id: string;
  name: string;
  createdAt: string;
  total: number;
  payment: string;
  status: string;
}

const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: () => <input type="checkbox" />,
    cell: () => <input type="checkbox" />,
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
          className={`px-3 py-1 rounded-lg text-white label-regular-14 ${bgClass}`}
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
      <div className="flex gap-4">
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

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    name: "John Doe",
    createdAt: "2025-06-28",
    total: 2500,
    payment: "COD",
    status: "Confirmed",
  },
  {
    id: "ORD-002",
    name: "Jane Smith",
    createdAt: "2025-06-27",
    total: 1200,
    payment: "Card",
    status: "Delivered",
  },
];

export default function OrderTable() {
  return <GenericTable columns={columns} data={mockOrders} />;
}
