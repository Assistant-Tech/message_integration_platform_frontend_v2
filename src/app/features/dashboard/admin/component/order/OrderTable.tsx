import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import GenericTable from "../table/GenericTable";
import { useNavigate } from "react-router-dom";
import { getOrders } from "@/app/services/order.services";
import { Order } from "@/app/types/order.types";

interface OrderTableProps {
  search: string;
  sortBy: string;
  category: string;
  statusFilter: string;
}

export default function OrderTable({
  search,
  sortBy,
  statusFilter,
}: OrderTableProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const columns: ColumnDef<Order>[] = useMemo(
    () => [
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
        accessorKey: "shippingDetail.customerName",
        header: "Name",
        cell: ({ row }) => row.original.shippingDetail?.customerName || "N/A",
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
      // {
      //   accessorKey: "payment",
      //   header: "Payment",
      // },
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

          return (
            <span
              className={`px-3 py-1 rounded-lg text-white label-regular-14 ${
                statusStyles[status] || "bg-gray-medium"
              }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-4">
            <button
              className="text-grey-medium cursor-pointer"
              onClick={() =>
                navigate(`details/${row.original.id}`, {
                  state: row.original,
                })
              }
            >
              <Eye size={16} />
            </button>

            <button className="text-grey-medium cursor-pointer">
              <SquarePen size={16} />
            </button>

            <button className="text-danger cursor-pointer">
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ],
    [navigate],
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await getOrders({
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        order: "desc",
      });

      setOrders(res.data || res);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    if (search) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(search.toLowerCase()) ||
          order.shippingDetail?.customerName
            ?.toLowerCase()
            .includes(search.toLowerCase()),
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // ✅ Sorting
    if (sortBy === "newest") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    if (sortBy === "oldest") {
      filtered.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }

    return filtered;
  }, [orders, search, sortBy, statusFilter]);

  if (loading) return <div className="p-6">Loading orders...</div>;

  return <GenericTable columns={columns} data={filteredOrders} />;
}
