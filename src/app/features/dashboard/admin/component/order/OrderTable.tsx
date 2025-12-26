import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, SquarePen, Trash2, Truck } from "lucide-react";
import GenericTable from "../table/GenericTable";
import { useNavigate } from "react-router-dom";
import { getOrders } from "@/app/services/order.services";
import { Order } from "@/app/types/order.types";
import CancelOrderModal from "../../pages/orders/CancelOrderModal";
import ShippingLabelModal from "../../pages/orders/ShippingLabelModal";
import { checkStripeConfiguration } from "@/app/services/stripe.services";
import { toast } from "sonner";
import { Loading } from "@/app/components/common";

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

  const [cancelModal, setCancelModal] = useState<{
    orderId: string;
    orderTotal: number;
  } | null>(null);

  const [shippingModal, setShippingModal] = useState<{
    orderId: string;
    orderItems: any[];
    customerName: string;
  } | null>(null);

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

      // 🟩 PAYMENT STATUS COLUMN
      {
        accessorKey: "paymentStatus",
        header: "Payment",
        cell: ({ row }) => {
          const payment = row.original.payments?.[0];

          if (!payment) return "N/A";

          const isPaid = payment.status === "PAID";

          console.log("🚀 ~ OrderTable ~ payment.status:", payment.status);
          return (
            <span
              className={`px-3 py-1 rounded-lg label-regular-14 ${
                isPaid ? " text-primary" : " text-danger"
              }`}
            >
              {payment.status.toUpperCase()}
            </span>
          );
        },
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
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const status = getValue() as string;

          const statusStyles: Record<string, string> = {
            CONFIRMED: "bg-secondary",
            SHIPPED: "bg-information",
            DELIVERED: "bg-success",
            CANCELLED: "bg-danger",
            PENDING: "bg-warning",
            PAID: "bg-primary",
          };

          return (
            <span
              className={`px-3 py-1 rounded-lg  text-white label-regular-14 ${
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
        cell: ({ row }) => {
          const payment = row.original.payments?.[0];
          const isPaid = payment?.status === "PAID";

          return (
            <div className="flex gap-4">
              {/* VIEW */}
              <button
                className="text-grey-medium cursor-pointer hover:text-primary transition"
                onClick={() =>
                  navigate(`details/${row.original.id}`, {
                    state: row.original,
                  })
                }
              >
                <Eye size={16} />
              </button>

              {/* SHIPPING LABEL BUTTON */}
              <button
                className="text-grey-medium cursor-pointer hover:text-information transition"
                onClick={async () => {
                  try {
                    const config = await checkStripeConfiguration();

                    const isConfigured = config?.data?.isConfigured;

                    if (!isConfigured) {
                      toast.error(
                        "Stripe is not configured. Please add API key & webhook.",
                      );
                      return;
                    }

                    if (!isPaid) {
                      toast.error(
                        "Order is not paid yet. Cannot generate shipping label.",
                      );
                      return;
                    }

                    setShippingModal({
                      orderId: row.original.id,
                      orderItems: row.original.items || [],
                      customerName:
                        row.original.shippingDetail?.customerName || "N/A",
                    });
                  } catch {
                    toast.error("Failed to check Stripe configuration");
                  }
                }}
                disabled={row.original.status === "CANCELLED"}
              >
                <Truck size={16} />
              </button>

              {/* EDIT */}
              <button className="text-grey-medium cursor-pointer hover:text-warning transition">
                <SquarePen size={16} />
              </button>

              {/* CANCEL */}
              <button
                className={`cursor-pointer transition ${
                  row.original.status === "CANCELLED"
                    ? "text-grey-light cursor-not-allowed"
                    : "text-danger hover:text-red-600"
                }`}
                onClick={() => {
                  if (row.original.status !== "CANCELLED") {
                    setCancelModal({
                      orderId: row.original.id,
                      orderTotal: row.original.total,
                    });
                  }
                }}
                disabled={row.original.status === "CANCELLED"}
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        },
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

  if (loading) return <Loading />;

  return (
    <>
      <GenericTable columns={columns} data={filteredOrders} />

      {cancelModal && (
        <CancelOrderModal
          orderId={cancelModal.orderId}
          orderTotal={cancelModal.orderTotal}
          onClose={() => setCancelModal(null)}
          onSuccess={fetchOrders}
        />
      )}

      {shippingModal && (
        <ShippingLabelModal
          orderId={shippingModal.orderId}
          orderItems={shippingModal.orderItems}
          customerName={shippingModal.customerName}
          onClose={() => setShippingModal(null)}
        />
      )}
    </>
  );
}
