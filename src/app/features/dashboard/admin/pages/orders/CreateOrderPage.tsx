import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { Breadcrumb, Button, Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";
import {
  AddProduct,
  PaymentDetails,
  PaymentMethods,
  SelectAllCustomer,
} from "@/app/features/dashboard/admin/component/";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/app/store/auth.store";
import { fetchProducts } from "@/app/services/product.services";
import { createOrder } from "@/app/services/order.services";
import { getStripePaymentLink } from "@/app/services/stripe.services";
import {
  orderFormSchema,
  OrderFormValues,
} from "@/app/schemas/createOrder.schema";

interface SelectedItem {
  productId: string;
  variantId: string;
  quantity: number;
}

const CreateOrderPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const tenantSlug = useAuthStore((s) => s.tenantSlug);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [loading, setLoading] = useState(false);

  const addLocalMessage = (msg: any) => {
    // setMessages((prev) => [...prev, msg]);
    console.log("Local Message Added:", msg);
  };

  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isSelectAllCustomerModalOpen, setIsSelectAllCustomerModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Product fetch failed", err);
      }
    };
    loadProducts();
  }, []);

  const handleAddProduct = (payload: {
    productId: string;
    variantId: string;
    quantity: number;
  }) => {
    setSelectedItems((prev) => [...prev, payload]);
  };

  const onSubmit = async (data: OrderFormValues) => {
    if (selectedItems.length === 0) {
      alert("Please add at least one product");
      return;
    }

    const payload = {
      channel: "WHATSAPP",
      items: selectedItems,
      shippingDetails: {
        customerName: data.fullName,
        contactInfo: {
          phone: data.phone,
          email: data.email,
        },
        shippingAddress: data.location,
      },
      discount: 0,
      tax: 0,
      metadata: {
        source: "admin_panel",
        notes: data.orderNotes || "Order created from dashboard",
      },
    };

    try {
      setLoading(true);
      const res = await createOrder(payload);
      const orderId = res.data.id;
      const paymentLinkData = await getStripePaymentLink(orderId);

      addLocalMessage({
        _id: crypto.randomUUID(),
        type: "payment-link",
        content: {
          url: paymentLinkData.paymentLink,
        },
        createdAt: new Date().toISOString(),
        sender: "admin",
      });

      if (paymentLinkData.success) {
        console.log("Payment Link:", paymentLinkData.paymentLink);
      }

      reset();
      navigate(`/${tenantSlug}/admin/orders`);
    } catch (error: any) {
      console.error("❌ Order creation failed:", error.response?.data || error);
      alert(error.response?.data?.message || "Order creation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(`/${tenantSlug}/admin/orders`);
  };

  const OrderBreadCrumb = [
    { label: "Order", onClick: handleBack },
    { label: "Create New Order" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading title="Orders" align="left" className="text-base-black" />
        <Breadcrumb items={OrderBreadCrumb} />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* ✅ LEFT COLUMN */}
        <div className="md:col-span-2 space-y-6">
          {/* ✅ ADD PRODUCT */}
          <div className="border border-grey-light rounded-md">
            <h3 className="h5-bold-16 text-grey px-8 py-4 bg-base-white">
              Add Product
            </h3>
            <div className="w-full px-8 py-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Search Product"
                  className="w-full"
                  onClick={() => setProductModalOpen(true)}
                />
                <Button
                  label="Browse"
                  variant="primary"
                  onClick={() => setProductModalOpen(true)}
                />
              </div>
              <div className="mt-6 space-y-2">
                {selectedItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-grey">
                    <span>{item.productId}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ✅ CUSTOMER INFO */}
          <div className="border border-grey-light rounded-md">
            <h3 className="h5-bold-16 text-grey px-8 py-4 bg-base-white">
              Customer Information
            </h3>
            <div className="w-full px-8 py-6 space-y-4">
              <div>
                <Input
                  {...register("fullName")}
                  placeholder="Full Name"
                  className={errors.fullName ? "border-danger" : ""}
                />
                {errors.fullName && (
                  <p className="text-danger text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register("phone")}
                  placeholder="Phone"
                  className={errors.phone ? "border-danger" : ""}
                />
                {errors.phone && (
                  <p className="text-danger text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register("email")}
                  placeholder="Email"
                  type="email"
                  className={errors.email ? "border-danger" : ""}
                />
                {errors.email && (
                  <p className="text-danger text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register("location")}
                  placeholder="Location"
                  className={errors.location ? "border-danger" : ""}
                />
                {errors.location && (
                  <p className="text-danger text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Order Notes */}
              <div>
                <textarea
                  {...register("orderNotes")}
                  placeholder="Order Notes"
                  className={`w-full px-4 py-3 sm:py-2 min-h-[48px] border rounded-lg outline-none transition-all body-regular-16 text-grey-medium ${
                    errors.orderNotes ? "border-danger" : ""
                  }`}
                />
                {errors.orderNotes && (
                  <p className="text-danger text-sm mt-1">
                    {errors.orderNotes.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <Input
                  {...register("expectedDelivery")}
                  placeholder="Expected Delivery"
                  type="date"
                  className={errors.expectedDelivery ? "border-danger" : ""}
                />
                <ChevronDown className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
                {errors.expectedDelivery && (
                  <p className="text-danger text-sm mt-1">
                    {errors.expectedDelivery.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ RIGHT COLUMN */}
        <div className="space-y-6">
          <PaymentDetails />
          <PaymentMethods />
          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              label="Clear All"
              onClick={() => reset()}
              variant="outlined"
            />
            <Button
              type="submit"
              label={loading ? "Saving..." : "Save Order"}
              disabled={loading}
            />
          </div>
        </div>
      </form>

      {/* ✅ PASS CALLBACK TO PRODUCT MODAL */}
      <AddProduct
        isOpen={isProductModalOpen}
        onClose={() => setProductModalOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
      />
      <SelectAllCustomer
        isOpen={isSelectAllCustomerModalOpen}
        onClose={() => setIsSelectAllCustomerModalOpen(false)}
      />
    </div>
  );
};

export default CreateOrderPage;
