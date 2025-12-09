import React, { useEffect, useState } from "react";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import {
  EllipsisVertical,
  ChevronLeft,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import {
  fetchCategories,
  fetchProductByCategoryId,
  getCategoryById,
} from "@/app/services/category.services";
import { fetchProductsById } from "@/app/services/product.services";
import ProductSearchView from "@/app/features/dashboard/admin/component/product/ProductSearchView";
import ProductDetailsView from "@/app/features/dashboard/admin/component/product/ProductDetailsView";
import OrderModals from "@/app/features/dashboard/admin/component/order/OrderModals";
import OrderFormView from "@/app/features/dashboard/admin/component/order/OrderFormView";
import { Product } from "@/app/types/product.types";
import { createOrder } from "@/app/services/order.services";
import {
  fetchStripeIntegrationStatus,
  getStripePaymentLink,
} from "@/app/services/stripe.services";
import { toast } from "sonner";

interface Category {
  id: string;
  title: string;
  parentId: string | null;
  slug: string;
  description: string;
}

interface OrderInfoPanelProps {
  onSendOrderMessage: (msg: any) => void;
}

interface StripeStatusResponse {
  message: string;
  success: boolean;
  data: {
    configured: boolean;
    integration?: {
      id: string;
      provider: string;
      type: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  timestamp: string;
}

const OrderInfoPanel: React.FC<OrderInfoPanelProps> = ({
  onSendOrderMessage,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [view, setView] = useState<"form" | "search" | "details">("search");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [selectedProductForOrder, setSelectedProductForOrder] =
    useState<Product | null>(null);
  const [stripeConfigured, setStripeConfigured] = useState<boolean>(false);
  const [isCheckingStripe, setIsCheckingStripe] = useState<boolean>(true);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [orderStatus, setOrderStatus] = useState<string>("");

  const [formData, setFormData] = useState<any>({
    channel: "WHATSAPP",
    product: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    shippingAddress: "",
    deliveryCharge: "",
    paymentMethod: "",
    expectedDelivery: "",
    totalAmount: "",
    orderNotes: "",
  });

  // Check Stripe configuration status
  const checkStripeStatus = async () => {
    setIsCheckingStripe(true);
    try {
      const data = await fetchStripeIntegrationStatus();

      if (!data.success) {
        throw new Error("Failed to fetch Stripe status");
      }

      if (data.success && data.data.configured) {
        setStripeConfigured(true);
      } else {
        setStripeConfigured(false);
        toast.warning(
          "Stripe is not configured. Please configure Stripe in settings.",
        );
      }
    } catch (error) {
      console.error("Error checking Stripe status:", error);
      setStripeConfigured(false);
      toast.error("Failed to check Stripe configuration status");
    } finally {
      setIsCheckingStripe(false);
    }
  };

  // Check Stripe status on component mount
  useEffect(() => {
    checkStripeStatus();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCancel = () => {
    setFormData((prev: any) => ({
      ...prev,
      fullName: "",
      phoneNumber: "",
      email: "",
      shippingAddress: "",
      deliveryCharge: "",
      paymentMethod: "",
      expectedDelivery: "",
      orderNotes: "",
    }));
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetchCategories("");
      setCategories(res);
    };
    fetchCategory();
  }, [showConfirmModal]);

  const handleOpenProductSearch = () => {
    setView("search");
    setSelectedCategory(null);
    setSearchQuery("");
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    getCategoryById(category.id);
    fetchProductByCategoryId(category.id).then((res) => setProducts(res));
  };

  const handleSelectProduct = async (productId: string) => {
    const product = await fetchProductsById(productId);
    setSelectedProduct(product);
    setView("details");
    setQuantity(1);
  };

  const handleAddProduct = () => {
    if (!selectedProduct) {
      console.error("No product selected");
      return;
    }

    const price = selectedProduct.variants?.[0]?.price ?? 0;
    const total = price * quantity;

    setSelectedProductForOrder(selectedProduct);

    setFormData((prev: any) => ({
      ...prev,
      product: selectedProduct.title,
      totalAmount: String(total),
    }));

    setView("form");
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSubmit = async () => {
    setShowConfirmModal(false);

    if (!stripeConfigured) {
      toast.error(
        "Cannot create order: Stripe is not configured. Please configure Stripe in settings.",
      );
      return;
    }

    if (!selectedProductForOrder) {
      console.error("No product selected for order");
      toast.error("No product selected");
      return;
    }

    if (!formData.fullName || !formData.phoneNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessingOrder(true);

    try {
      setOrderStatus("Creating order...");
      const orderPayload = {
        channel: "WHATSAPP",
        items: [
          {
            productId: selectedProductForOrder.id,
            variantId: selectedProductForOrder.variants?.[0]?.id,
            quantity: quantity,
          },
        ],
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
          source: "admin_panel",
          notes: formData.orderNotes || "Order created from dashboard",
        },
      };

      console.log("Creating order with payload:", orderPayload);

      const orderRes = await createOrder(orderPayload);
      const orderId = orderRes?.data?.id;

      if (!orderId) {
        throw new Error("Order ID not received from server");
      }

      console.log("Order created successfully with ID:", orderId);
      setCurrentOrderId(orderId);

      setOrderStatus("Generating payment link...");
      let paymentLink = null;

      try {
        const paymentRes = await getStripePaymentLink(orderId);

        if (paymentRes?.data?.paymentLink?.url) {
          paymentLink = paymentRes.data.paymentLink.url;
          // console.log("Payment link generated:", paymentLink);
        } else {
          console.warn("Payment link URL not received from server");
        }
      } catch (paymentError) {
        console.error("Payment link generation failed:", paymentError);
        toast.warning("Order created but payment link generation failed");
      }

      // Step 3: Send Order Confirmation Message
      setOrderStatus("Sending order confirmation...");
      const orderMessage = {
        _id: crypto.randomUUID(),
        type: "order-confirmation",
        sender: "System",
        createdAt: new Date().toISOString(),
        data: {
          orderId: orderId,
          productName: formData.product,
          productImage: selectedProductForOrder.images?.[0] || "",
          productDescription: selectedProductForOrder.description || "",
          quantity: quantity,
          pricePerUnit: selectedProductForOrder.variants?.[0]?.price || 0,
          customerName: formData.fullName,
          phone: formData.phoneNumber,
          email: formData.email,
          location: formData.shippingAddress || "Nepal",
          totalAmount: Number(formData.totalAmount),
          deliveryAmount: Number(formData.deliveryCharge) || 0,
          finalAmount:
            Number(formData.totalAmount) +
            (Number(formData.deliveryCharge) || 0),
          paymentMethod: formData.paymentMethod,
          expectedDelivery: formData.expectedDelivery,
          orderNotes: formData.orderNotes,
        },
      };
      onSendOrderMessage(orderMessage);

      // Step 4: Send Payment Link (if generated successfully)
      if (paymentLink) {
        setOrderStatus("Sending payment link...");
        const paymentMessage = {
          _id: crypto.randomUUID(),
          type: "payment-link",
          sender: "admin",
          createdAt: new Date().toISOString(),
          content: {
            url: paymentLink,
            orderId: orderId,
          },
        };
        onSendOrderMessage(paymentMessage);
      }

      // Success!
      toast.success("Order created and messages sent successfully!");

      // Reset form
      setFormData({
        channel: "WHATSAPP",
        product: "",
        fullName: "",
        phoneNumber: "",
        email: "",
        shippingAddress: "",
        deliveryCharge: "",
        paymentMethod: "",
        expectedDelivery: "",
        totalAmount: "",
        orderNotes: "",
      });
      setQuantity(1);
      setSelectedProductForOrder(null);
      setSelectedProduct(null);
      setView("search");
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Order creation failed:", err);
      toast.error("Failed to create order. Check console for details.");
    } finally {
      setIsProcessingOrder(false);
      setOrderStatus("");
    }
  };

  // Handler for sending payment link separately (manual trigger)
  const handleSendPaymentLink = async () => {
    if (!stripeConfigured) {
      toast.error("Cannot generate payment link: Stripe is not configured");
      return;
    }

    if (!currentOrderId) {
      console.error("No order ID available for payment link");
      toast.error("Please create an order first before sending payment link");
      return;
    }

    try {
      setOrderStatus("Generating payment link...");
      console.log("Generating payment link for order:", currentOrderId);

      const paymentRes = await getStripePaymentLink(currentOrderId);

      if (!paymentRes?.data?.paymentLink?.url) {
        throw new Error("Payment link URL not received from server");
      }

      console.log("Payment link generated:", paymentRes.data.paymentLink.url);

      const paymentMessage = {
        _id: crypto.randomUUID(),
        type: "payment-link",
        sender: "admin",
        createdAt: new Date().toISOString(),
        content: {
          url: paymentRes.data.paymentLink.url,
          orderId: currentOrderId,
        },
      };
      onSendOrderMessage(paymentMessage);
      toast.success("Payment link sent successfully!");
    } catch (err) {
      console.error("Failed to generate payment link:", err);
      toast.error(
        "Failed to generate payment link. Check console for details.",
      );
    } finally {
      setOrderStatus("");
    }
  };

  return (
    <aside className="w-2xl bg-white overflow-y-auto border-l border-grey-light">
      <div className="flex justify-between items-center border-b border-grey-light py-[15.2px] px-4">
        <div className="flex items-center gap-2">
          {view !== "search" && (
            <button
              onClick={() => {
                if (view === "details") setView("search");
                if (view === "form") setView("details");
              }}
            >
              <ChevronLeft size={24} color="grey" className="cursor-pointer" />
            </button>
          )}
          <Heading
            title={
              view === "form"
                ? "Order Info"
                : view === "search"
                  ? "Add Product"
                  : "Product Details"
            }
            className="text-grey-medium"
          />
        </div>
        <EllipsisVertical size={24} color="black" />
      </div>

      {/* Stripe Configuration Warning */}
      {!isCheckingStripe && !stripeConfigured && (
        <div className="mx-4 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-800">
              Stripe Not Configured
            </p>
            <p className="text-xs text-amber-700 mt-1">
              Payment processing is unavailable. Please configure Stripe in
              settings.
            </p>
          </div>
        </div>
      )}

      {/* Order Processing Status */}
      {isProcessingOrder && (
        <div className="mx-4 mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-800">
                Processing Order
              </p>
              <p className="text-xs text-blue-700 mt-1">
                {orderStatus || "Please wait..."}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        {view === "form" && (
          <OrderFormView
            formData={formData}
            onChange={handleChange}
            onOpenSearch={handleOpenProductSearch}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            onSendPaymentLink={handleSendPaymentLink}
          />
        )}

        {view === "search" && (
          <ProductSearchView
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
            products={filteredProducts}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {view === "details" && selectedProduct && (
          <ProductDetailsView
            product={selectedProduct}
            quantity={quantity}
            increment={increment}
            decrement={decrement}
            onAdd={handleAddProduct}
          />
        )}

        <OrderModals
          showConfirm={showConfirmModal}
          showSuccess={showSuccessModal}
          onConfirm={handleSubmit}
          onCancel={() => setShowConfirmModal(false)}
          onSuccess={closeSuccessModal}
        />
      </div>
    </aside>
  );
};

export default OrderInfoPanel;
