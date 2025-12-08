import React, { useEffect, useState } from "react";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { EllipsisVertical, ChevronLeft } from "lucide-react";
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

interface Category {
  id: string;
  title: string;
  parentId: string | null;
  slug: string;
  description: string;
}

interface OrderFormData {
  product: string;
  fullName: string;
  phoneNumber: string;
  deliveryCharge: string;
  paymentMethod: string;
  expectedDelivery: string;
  totalAmount: string;
}

interface OrderInfoPanelProps {
  onSendOrderMessage: (msg: any) => void;
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

  const [formData, setFormData] = useState<OrderFormData>({
    product: "",
    fullName: "",
    phoneNumber: "",
    deliveryCharge: "",
    paymentMethod: "",
    expectedDelivery: "",
    totalAmount: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setShowConfirmModal(true);
  };

  const confirmOrder = () => {
    setShowConfirmModal(false);

    const orderMessage = {
      _id: crypto.randomUUID(),
      type: "order-confirmation",
      sender: "System",
      createdAt: new Date().toISOString(),
      data: {
        productName: formData.product,
        customerName: formData.fullName,
        phone: formData.phoneNumber,
        location: "Nepal",
        totalAmount: Number(formData.totalAmount) || 0,
        deliveryAmount: Number(formData.deliveryCharge) || 0,
        finalAmount:
          (Number(formData.totalAmount) || 0) +
          (Number(formData.deliveryCharge) || 0),
        paymentMethod: formData.paymentMethod,
        expectedDelivery: formData.expectedDelivery,
      },
    };

    onSendOrderMessage(orderMessage);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setFormData({
      product: "",
      fullName: "",
      phoneNumber: "",
      deliveryCharge: "",
      paymentMethod: "",
      expectedDelivery: "",
      totalAmount: "",
    });
  };

  const handleCancel = () => {
    setFormData((prev) => ({
      ...prev,
      fullName: "",
      phoneNumber: "",
      deliveryCharge: "",
      paymentMethod: "",
      expectedDelivery: "",
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
    const products = fetchProductByCategoryId(category.id);
    products.then((res) => setProducts(res));
  };

  const handleSelectProduct = async (productId: string) => {
    const product = await fetchProductsById(productId);
    setSelectedProduct(product);
    setView("details");
    setQuantity(1);
  };

  const handleAddProduct = () => {
    if (!selectedProduct) return;

    const price = selectedProduct.variants?.[0]?.price ?? 0;
    const total = price * quantity;

    setFormData((prev) => ({
      ...prev,
      product: selectedProduct.title,
      totalAmount: String(total),
    }));

    setView("form");
    setSelectedProduct(null);
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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

      {/* Form Section */}
      <div className="p-6">
        {view === "form" && (
          <OrderFormView
            formData={formData}
            onChange={handleChange}
            onOpenSearch={handleOpenProductSearch}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
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
          onConfirm={confirmOrder}
          onCancel={() => setShowConfirmModal(false)}
          onSuccess={closeSuccessModal}
        />
      </div>
    </aside>
  );
};

export default OrderInfoPanel;
