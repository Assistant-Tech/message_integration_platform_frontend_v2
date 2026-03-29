import { Breadcrumb } from "@/app/components/ui";
import { useAuthStore } from "@/app/store/auth.store";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderById } from "@/app/services/order.services";
import moment from "moment";
import { Order } from "@/app/types/order.types";

const OrderDetailsPage = () => {
  const ORDER_FLOW = ["PENDING", "Confirmed", "Shipped", "Delivered"];
  const navigate = useNavigate();
  const tenantSlug = useAuthStore((s) => s.tenantSlug);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const [order, setOrder] = useState<Order | null>(
    (location.state as Order) || null,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!order && id) {
      fetchOrder();
    }
  }, [id, order]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const res = await getOrderById(id!);
      setOrder(res.data || res);
    } catch (error) {
      console.error("Failed to fetch order:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(`/app/${tenantSlug}/admin/orders`);
  };

  const OrderDetalsBreadCrumbs = [
    { label: "Order", onClick: handleBack, icon: ArrowLeft },
    { label: "Order Details" },
  ];

  const getPaymentStatus = (currentOrder: Order): string => {
    return currentOrder.payments?.length > 0 ? "Paid" : "Unpaid (COD/Pending)";
  };

  if (loading || !order) {
    return <div className="p-6 text-center">Loading order details...</div>;
  }

  // --- Derived values from the fetched 'order' object ---
  const customerName = order.shippingDetail?.customerName || "N/A";
  const customerEmail = order.shippingDetail?.contactInfo?.email || "N/A";
  const customerPhone = order.shippingDetail?.contactInfo?.phone || "N/A";
  const paymentMethod = getPaymentStatus(order);
  const address = order.shippingDetail?.shippingAddress || "N/A";
  const formattedDate = moment(order.createdAt).format("MMM DD, YYYY h:mm A");

  // Create timeline AFTER order is confirmed to exist
  const timeline = ORDER_FLOW.map((step, index) => {
    const currentIndex = ORDER_FLOW.indexOf(order?.status || "PENDING");
    return {
      status: step,
      completed: index <= currentIndex,
      date:
        index === 0
          ? formattedDate
          : index <= currentIndex
            ? moment(order?.createdAt)
                .add(index * 2, "hours")
                .format("MMM DD, YYYY h:mm A")
            : "",
    };
  });

  const statusStyles: Record<string, string> = {
    PENDING: "bg-warning",
    Confirmed: "bg-secondary",
    Shipped: "bg-information",
    Delivered: "bg-success",
    Cancelled: "bg-danger",
  };
  const bgClass = statusStyles[order.status] || "bg-gray-400";

  return (
    <div className="p-6 space-y-6 bg-base-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-grey">Order Details</h1>
            <Breadcrumb items={OrderDetalsBreadCrumbs} className="py-4" />
            <p className="text-sm text-grey-medium mt-1">
              Order ID: {order.trackingNumber}
            </p>
          </div>
        </div>
        <span
          className={`px-4 py-2 rounded-lg text-white font-medium ${bgClass}`}
        >
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold text-grey mb-4">
              Order Items
            </h2>
            <div className="space-y-4">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b border-grey-light pb-4 last:border-b-0"
                >
                  <img
                    src={(item as any).image}
                    alt={(item as any).name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-grey">
                      {(item as any).name}
                    </h3>
                    <p className="text-sm text-grey-medium">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-grey">
                    Rs. {item.unitPrice.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t border-grey-light space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Rs. {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>
                  Rs.{" "}
                  {(
                    order.total -
                    order.subtotal -
                    order.tax +
                    order.discount
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>Rs. {order.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-grey pt-2 border-t border-grey-light">
                <span>Total</span>
                <span>Rs. {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold text-grey mb-4">
              Order Timeline
            </h2>
            <div className="space-y-4">
              {timeline.map((event, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="relative">
                    {event.completed ? (
                      <CheckCircle className="text-success" size={24} />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-grey-light" />
                    )}
                    {index < timeline.length - 1 && (
                      <div className="absolute left-3 top-6 w-0.5 h-full bg-grey-light" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        event.completed ? "text-grey" : "text-grey-medium"
                      }`}
                    >
                      {event.status}
                    </p>
                    {event.date && (
                      <p className="text-sm text-grey-medium">{event.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold text-grey mb-4">
              Customer Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-grey-medium">Name</p>
                <p className="font-medium text-grey">{customerName}</p>
              </div>
              <div>
                <p className="text-sm text-grey-medium">Email</p>
                <p className="font-medium text-grey">{customerEmail}</p>
              </div>
              <div>
                <p className="text-sm text-grey-medium">Phone</p>
                <p className="font-medium text-grey">{customerPhone}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold text-grey mb-4">
              Shipping Address
            </h2>
            <div className="text-gray-700 space-y-1">
              <p>{address}</p>
            </div>
          </div>

          {/* Payment Method & Date */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold text-grey mb-4">
              Payment & Date
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-grey-medium">Payment Status</p>
                <p className="font-medium text-grey">{paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-grey-medium">Order Date</p>
                <p className="font-medium text-grey">{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
