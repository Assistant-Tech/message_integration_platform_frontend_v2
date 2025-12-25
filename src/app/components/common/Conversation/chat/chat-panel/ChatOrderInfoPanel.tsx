import React, { useEffect, useMemo, useState } from "react";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import {
  AlertCircle,
  Loader2,
  X,
  Plus,
  Search,
  ShoppingCart,
  Filter,
  ChevronDown,
} from "lucide-react";
import {
  fetchCategories,
  fetchProductByCategoryId,
} from "@/app/services/category.services";
import { fetchProductsById } from "@/app/services/product.services";
import { createOrder } from "@/app/services/order.services";
import {
  fetchStripeIntegrationStatus,
  getStripePaymentLink,
} from "@/app/services/stripe.services";
import { Product } from "@/app/types/product.types";
import { toast } from "sonner";
import { Input } from "@/app/components/ui";

interface Category {
  id: string;
  title: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface OrderInfoPanelProps {
  onSendOrderMessage: (msg: any) => void;
}

const OrderInfoPanel: React.FC<OrderInfoPanelProps> = ({
  onSendOrderMessage,
}) => {
  /* ------------------------ STATE ------------------------ */
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [stripeConfigured, setStripeConfigured] = useState(false);
  const [isCheckingStripe, setIsCheckingStripe] = useState(true);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    shippingAddress: "",
    deliveryCharge: "",
    paymentMethod: "",
    expectedDelivery: "",
    orderNotes: "",
  });

  /* ------------------------ EFFECTS ------------------------ */
  useEffect(() => {
    fetchStripeIntegrationStatus()
      .then((res) => setStripeConfigured(res?.data?.configured))
      .catch(() => {
        setStripeConfigured(false);
        toast.error("Failed to check Stripe configuration");
      })
      .finally(() => setIsCheckingStripe(false));
  }, []);

  useEffect(() => {
    fetchCategories("").then(setCategories);
  }, []);

  /* ------------------------ COMPUTED VALUES ------------------------ */
  const subtotal = useMemo(() => {
    return orderItems.reduce((sum, item) => {
      const price = item.product.variants?.[0]?.price ?? 0;
      return sum + price * item.quantity;
    }, 0);
  }, [orderItems]);

  const deliveryCharge = parseFloat(formData.deliveryCharge) || 0;
  const totalAmount = subtotal + deliveryCharge;

  /* ------------------------ FORM HANDLERS ------------------------ */
  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* ------------------------ PRODUCT HANDLERS ------------------------ */
  const handleCategoryClick = async (category: Category) => {
    setSelectedCategory(category);
    const res = await fetchProductByCategoryId(category.id);
    setProducts(res);
    setShowCategoryFilter(false);
  };

  const handleAddProduct = async (productId: string) => {
    const product = await fetchProductsById(productId);

    setOrderItems((prev) => {
      const exists = prev.find((i) => i.product.id === product.id);
      if (exists) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    toast.success(`${product.title} added`);
  };

  const removeProduct = (productId: string) => {
    setOrderItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, qty: number) => {
    if (qty < 1) return;
    setOrderItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: qty } : i,
      ),
    );
  };

  /* ------------------------ SUBMIT ORDER ------------------------ */
  const handlePreviewOrder = () => {
    if (!orderItems.length) {
      toast.error("Add at least one product");
      return;
    }

    if (!formData.fullName || !formData.phoneNumber) {
      toast.error("Customer name & phone are required");
      return;
    }

    setShowConfirmModal(true);
  };

  const handleSubmitOrder = async () => {
    if (!stripeConfigured) {
      toast.error("Stripe is not configured");
      return;
    }

    setShowConfirmModal(false);
    setIsProcessingOrder(true);

    try {
      setOrderStatus("Creating order...");

      const orderRes = await createOrder({
        channel: "WHATSAPP",
        items: orderItems.map((item) => ({
          productId: item.product.id,
          variantId: item.product.variants?.[0]?.id,
          quantity: item.quantity,
        })),
        shippingDetails: {
          customerName: formData.fullName,
          contactInfo: {
            phone: formData.phoneNumber,
            email: formData.email || "no-reply@example.com",
          },
          shippingAddress: formData.shippingAddress || "Nepal",
        },
        discount: 0,
        tax: 0,
        metadata: {
          notes: formData.orderNotes,
          deliveryCharge: formData.deliveryCharge,
          paymentMethod: formData.paymentMethod,
          expectedDelivery: formData.expectedDelivery,
        },
      });

      const orderId = orderRes?.data?.id;

      setOrderStatus("Generating payment link...");
      const paymentRes = await getStripePaymentLink(orderId);
      const paymentLink = paymentRes?.data?.paymentLink?.url;

      setOrderStatus("Sending order confirmation...");

      onSendOrderMessage({
        _id: crypto.randomUUID(),
        type: "order-confirmation",
        sender: "System",
        createdAt: new Date().toISOString(),
        data: {
          orderId,
          items: orderItems.map((item) => ({
            productName: item.product.title,
            productImage: item.product.images?.[0] || "",
            quantity: item.quantity,
            pricePerUnit: item.product.variants?.[0]?.price || 0,
          })),
          customerName: formData.fullName,
          phone: formData.phoneNumber,
          email: formData.email,
          shippingAddress: formData.shippingAddress || "Nepal",
          subtotal,
          deliveryCharge,
          totalAmount,
          paymentMethod: formData.paymentMethod,
          expectedDelivery: formData.expectedDelivery,
          orderNotes: formData.orderNotes,
        },
      });

      if (paymentLink) {
        onSendOrderMessage({
          _id: crypto.randomUUID(),
          type: "payment-link",
          sender: "admin",
          createdAt: new Date().toISOString(),
          content: { url: paymentLink, orderId },
        });
      }

      toast.success("Order created & sent successfully");

      // Reset form
      setOrderItems([]);
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        shippingAddress: "",
        deliveryCharge: "",
        paymentMethod: "",
        expectedDelivery: "",
        orderNotes: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Order creation failed");
    } finally {
      setIsProcessingOrder(false);
      setOrderStatus("");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  console.log("🚀 ~ OrderInfoPanel ~ filteredProducts:", filteredProducts);

  return (
    <aside className="w-2xl bg-white border-l border-grey-light overflow-y-auto flex flex-col h-full">
      <div className="border-b border-grey-light px-4 py-3">
        <Heading title="Create Order" />
      </div>

      {!isCheckingStripe && !stripeConfigured && (
        <div className="m-4 p-3 bg-amber-50 border rounded flex gap-2">
          <AlertCircle className="text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-700">
            Stripe is not configured. Payment links won't work.
          </p>
        </div>
      )}

      {isProcessingOrder && (
        <div className="m-4 p-4 bg-blue-50 border rounded flex gap-3">
          <Loader2 className="animate-spin text-blue-600" />
          <p className="text-sm">{orderStatus}</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* CUSTOMER INFORMATION */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Customer Information</h3>

          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter customer name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <Input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
              placeholder="customer@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Shipping Address
            </label>
            <textarea
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleFormChange}
              className="w-full border border-grey-light rounded px-3 py-2"
              rows={2}
              placeholder="Enter shipping address"
            />
          </div>
        </div>

        {/* PRODUCTS SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Products</h3>
            <button
              onClick={() => setShowProductSearch(!showProductSearch)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add Product</span>
            </button>
          </div>

          {/* Product Search Panel */}
          {showProductSearch && (
            <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-3 py-2 border rounded"
                  />
                </div>

                {/* Category Filter Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                    className={`flex items-center gap-2 px-4 py-2 border rounded hover:bg-white transition-colors ${
                      selectedCategory
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "bg-white"
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {selectedCategory ? selectedCategory.title : "Filter"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${showCategoryFilter ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Category Dropdown */}
                  {showCategoryFilter && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
                      <div className="p-2">
                        <button
                          onClick={() => {
                            setSelectedCategory(null);
                            setProducts([]);
                            setShowCategoryFilter(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm text-gray-700"
                        >
                          All Categories
                        </button>
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat)}
                            className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm ${
                              selectedCategory?.id === cat.id
                                ? "bg-blue-50 text-blue-700 font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            {cat.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Category Display */}
              {selectedCategory && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">Filtering by:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                    {selectedCategory.title}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setProducts([]);
                    }}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="max-h-64 overflow-y-auto space-y-2">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-8 text-grey-medium">
                    <p className="text-sm">
                      {searchQuery || selectedCategory
                        ? "No products found"
                        : "Select a category to view products"}
                    </p>
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleAddProduct(product.id)}
                      className="flex items-center gap-3 p-3 bg-white border rounded hover:border-blue-500 cursor-pointer"
                    >
                      {product.images?.[0] && (
                        <img
                          src={`https://api.chatblix.com${product.images[0].url}`}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{product.title}</p>
                        <p className="text-sm text-gray-600">
                          Rs {product.variants?.[0]?.price}
                        </p>
                      </div>
                      <Plus className="w-5 h-5 text-blue-600" />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Selected Products */}
          {orderItems.length === 0 ? (
            <div className="text-center py-8 text-grey-medium">
              <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No products added yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orderItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 border rounded p-3"
                >
                  {item.product.images?.[0] && (
                    <img
                      src={`https://api.chatblix.com${item.product.images[0].url}`}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{item.product.title}</p>
                    <p className="text-sm text-grey-medium">
                      Rs {item.product.variants?.[0]?.price} × {item.quantity} =
                      Rs{" "}
                      {(item.product.variants?.[0]?.price ?? 0) * item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Input
                      placeholder=""
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.product.id, Number(e.target.value))
                      }
                      className="w-16 border rounded px-2 py-1 text-center"
                    />
                    <button
                      onClick={() => removeProduct(item.product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ORDER DETAILS */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Order Details</h3>

          <div>
            <label className="block text-sm font-medium mb-1">
              Delivery Charge
            </label>
            <Input
              type="number"
              name="deliveryCharge"
              value={formData.deliveryCharge}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleFormChange}
              className="w-full border border-grey-light rounded px-3 py-2"
            >
              <option value="">Select payment method</option>
              <option value="COD">Cash on Delivery</option>
              <option value="KHALTI">Khalti</option>
              <option value="ESEWA">Esewa</option>
              <option value="STRIPE">Stripe</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Expected Delivery
            </label>
            <Input
              placeholder=""
              type="date"
              name="expectedDelivery"
              value={formData.expectedDelivery}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Order Notes
            </label>
            <textarea
              name="orderNotes"
              value={formData.orderNotes}
              onChange={handleFormChange}
              className="w-full border border-grey-light rounded px-3 py-2"
              rows={3}
              placeholder="Add any special instructions..."
            />
          </div>
        </div>
      </div>

      {/* FOOTER WITH TOTAL AND ACTION */}
      <div className="border-t border-grey-light p-6 space-y-4 bg-base-white">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">Rs {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery Charge:</span>
            <span className="font-medium">Rs {deliveryCharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Total Amount:</span>
            <span className="text-blue-600">Rs {totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handlePreviewOrder}
          disabled={isProcessingOrder}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isProcessingOrder ? "Processing..." : "Create Order"}
        </button>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-grey/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Confirm Order</h3>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Customer:
                </p>
                <p className="text-sm">{formData.fullName}</p>
                <p className="text-sm text-gray-600">{formData.phoneNumber}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Products:
                </p>
                {orderItems.map((item) => (
                  <div key={item.product.id} className="text-sm mb-1">
                    {item.product.title} × {item.quantity} = Rs{" "}
                    {(item.product.variants?.[0]?.price ?? 0) * item.quantity}
                  </div>
                ))}
              </div>

              <div className="border-t border-grey-light bg-base-white pt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Subtotal:</span>
                  <span>Rs {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Delivery:</span>
                  <span>Rs {deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-blue-600">
                    Rs {totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitOrder}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Confirm & Send
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default OrderInfoPanel;
