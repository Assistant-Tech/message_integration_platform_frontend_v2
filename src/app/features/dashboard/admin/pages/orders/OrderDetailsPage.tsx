import { Breadcrumb } from "@/app/components/ui";
import { useAuthStore } from "@/app/store/auth.store";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderDetailsPage = () => {
  const navigate = useNavigate();
  const tenantSlug = useAuthStore((s) => s.tenantSlug);

  // Mock order data
  const orderData = {
    id: "ORD-001",
    status: "Confirmed",
    createdAt: "2025-06-28",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+977 9876543210",
    },
    shippingAddress: {
      street: "Kathmandu Street, Ward 5",
      city: "Pātan",
      state: "Bagmati Province",
      country: "Nepal",
      zipCode: "44600",
    },
    paymentMethod: "Cash on Delivery",
    items: [
      {
        id: "1",
        name: "Premium Wireless Headphones",
        quantity: 1,
        price: 1500,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
      },
      {
        id: "2",
        name: "Smart Watch Series 5",
        quantity: 1,
        price: 1000,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop",
      },
    ],
    subtotal: 2500,
    shipping: 100,
    tax: 0,
    total: 2600,
    timeline: [
      { status: "Order Placed", date: "2025-06-28, 10:30 AM", completed: true },
      { status: "Confirmed", date: "2025-06-28, 11:00 AM", completed: true },
      { status: "Shipped", date: "Expected 2025-06-29", completed: false },
      { status: "Delivered", date: "Expected 2025-06-30", completed: false },
    ],
  };

  const statusStyles: Record<string, string> = {
    Confirmed: "bg-warning",
    Shipped: "bg-information",
    Delivered: "bg-success",
    Cancelled: "bg-danger",
  };

  const bgClass = statusStyles[orderData.status] || "bg-gray-400";

  const handleBack = () => {
    navigate(`/${tenantSlug}/admin/orders`);
  };

  const OrderDetalsBreadCrumbs = [
    { label: "Order", onClick: handleBack, icon: ArrowLeft },
    { label: "Order Details" },
  ];

  return (
    <div className="p-6 space-y-6 bg-base-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-grey">Order Details</h1>
            <Breadcrumb items={OrderDetalsBreadCrumbs} className="py-4" />
            <p className="text-sm text-grey-medium mt-1">
              Order ID: {orderData.id}
            </p>
          </div>
        </div>
        <span
          className={`px-4 py-2 rounded-lg text-white font-medium ${bgClass}`}
        >
          {orderData.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold text-grey mb-4">
              Order Items
            </h2>
            <div className="space-y-4">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-grey">{item.name}</h3>
                    <p className="text-sm text-grey-medium">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-grey">
                    Rs. {item.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t  border-grey-light space-y-2 bg-white">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Rs. {orderData.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Rs. {orderData.shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>Rs. {orderData.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-grey pt-2 border-t border-grey-light">
                <span>Total</span>
                <span>Rs. {orderData.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold text-grey mb-4">
              Order Timeline
            </h2>
            <div className="space-y-4">
              {orderData.timeline.map((event, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="relative">
                    {event.completed ? (
                      <CheckCircle className="text-green-500" size={24} />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                    )}
                    {index < orderData.timeline.length - 1 && (
                      <div className="absolute left-3 top-6 w-0.5 h-8 bg-gray-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-medium ${event.completed ? "text-grey" : "text-grey-medium"}`}
                    >
                      {event.status}
                    </p>
                    <p className="text-sm text-grey-medium">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold text-grey mb-4">
              Customer Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-grey-medium">Name</p>
                <p className="font-medium text-grey">
                  {orderData.customer.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-grey-medium">Email</p>
                <p className="font-medium text-grey">
                  {orderData.customer.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-grey-medium">Phone</p>
                <p className="font-medium text-grey">
                  {orderData.customer.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold text-grey mb-4">
              Shipping Address
            </h2>
            <div className="text-gray-700 space-y-1">
              <p>{orderData.shippingAddress.street}</p>
              <p>
                {orderData.shippingAddress.city},{" "}
                {orderData.shippingAddress.state}
              </p>
              <p>
                {orderData.shippingAddress.country} -{" "}
                {orderData.shippingAddress.zipCode}
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold text-grey mb-4">
              Payment Method
            </h2>
            <p className="text-gray-700">{orderData.paymentMethod}</p>
          </div>

          {/* Order Date */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold text-grey mb-4">Order Date</h2>
            <p className="text-gray-700">{orderData.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
