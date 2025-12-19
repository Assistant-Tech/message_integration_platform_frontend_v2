import { ChevronLeft, Minus, Plus, Search, Package } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/app/components/ui";
import { cn } from "@/app/utils/cn";
import {
  fetchCategories,
  fetchProductByCategoryId,
  getCategoryById,
} from "@/app/services/category.services";
import { fetchProductsById } from "@/app/services/product.services";
import { Product } from "@/app/types/product.types";
import { Button } from "@/app/components/ui";

interface ChatSearchProductDetailsProps {
  onClose: () => void;
  onSendProduct: (data: any) => void;
}

interface Category {
  id: string;
  title: string;
  slug: string;
  description?: string;
  parentId: string | null;
}

const ChatSearchProductDetails: React.FC<ChatSearchProductDetailsProps> = ({
  onClose,
  onSendProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categorydata, setCategorydata] = useState<Category[]>([]);
  const [step, setStep] = useState<"selection" | "details">("selection");
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const response = await fetchCategories("");
        setCategorydata(response || []);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  const handleCategoryClick = async (category: Category) => {
    setSelectedCategory(category);
    getCategoryById(category.id);
    setLoading(true);
    try {
      const result = await fetchProductByCategoryId(category.id);
      setProducts(result || []);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProduct = async (productId: string) => {
    setLoading(true);
    try {
      const product = await fetchProductsById(productId);
      setSelectedProduct(product);
      setStep("details");
      setQuantity(1);
    } catch (error) {
      console.error("Failed to fetch product details", error);
    } finally {
      setLoading(false);
    }
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSendProduct = () => {
    onSendProduct({
      type: "product-details",
      data: {
        ...selectedProduct,
        quantity,
      },
    });
    onClose();
    // Reset state
    setStep("selection");
    setSelectedCategory(null);
    setSelectedProduct(null);
    setQuantity(1);
    setSearchQuery("");
  };

  return (
    <div className="w-80 h-full border-l border-grey-light bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-grey-light">
        <div className="flex items-center gap-2">
          {step === "details" && (
            <button
              onClick={() => setStep("selection")}
              className="text-gray-500 hover:text-black transition"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <h2 className="font-semibold text-lg text-gray-700">
            {step === "selection" ? "Product Catalog" : "Product Details"}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black transition"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* STEP 1: SELECTION */}
        {step === "selection" && (
          <>
            {/* Search Input */}
            <div className="mb-4">
              <Input
                placeholder="Search product..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                iconLeft={<Search size={20} />}
              />
            </div>

            {/* Categories */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Categories
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {loading && categorydata.length === 0 ? (
                  <div className="col-span-2 text-center py-4 text-gray-400">
                    Loading categories...
                  </div>
                ) : (
                  categorydata.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category)}
                      className={cn(
                        "px-3 py-2 rounded-lg border text-sm transition-all",
                        selectedCategory?.id === category.id
                          ? "bg-primary text-white border-primary"
                          : "bg-white border-light-grey hover:bg-gray-50",
                      )}
                    >
                      {category.title}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Products List */}
            {selectedCategory && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">
                    Products
                  </h3>
                  <span className="text-xs text-gray-500">
                    {filteredProducts.length} result(s)
                  </span>
                </div>

                <div className="space-y-2">
                  {loading ? (
                    <div className="text-center py-8 text-gray-400">
                      Loading products...
                    </div>
                  ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 flex flex-col items-center gap-2">
                      <Package size={32} className="text-gray-300" />
                      <p className="text-sm">No products found</p>
                    </div>
                  ) : (
                    filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSelectProduct(product.id)}
                        className="flex justify-between items-center p-3 border border-light-grey rounded-lg cursor-pointer hover:border-primary hover:bg-gray-50 transition-all"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate text-sm">
                            {product.title}
                          </p>
                          <p className="text-sm text-primary font-medium mt-1">
                            Rs. {product.variants?.[0]?.price ?? 0}
                          </p>
                        </div>
                        <ChevronLeft
                          size={16}
                          className="text-gray-400 rotate-180 flex-shrink-0"
                        />
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </>
        )}

        {/* STEP 2: DETAILS */}
        {step === "details" && selectedProduct && (
          <div className="space-y-6">
            {/* Product Info */}
            <div className="pb-4 border-b border-grey-light">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {selectedProduct.title}
              </h3>
              <p className="text-2xl font-semibold text-primary">
                Rs. {selectedProduct.variants?.[0]?.price ?? 0}
              </p>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Quantity
              </label>
              <div className="flex items-center justify-center gap-4 bg-gray-50 p-3 rounded-lg">
                <button
                  onClick={decrement}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-white transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="text-2xl font-semibold min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={increment}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-white transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Product Description */}
            {selectedProduct.description && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer - Send Button (only in details step) */}
      {step === "details" && (
        <div className="p-4 border-t border-grey-light">
          <Button
            label="Send Product Details"
            onClick={handleSendProduct}
            variant="primary"
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default ChatSearchProductDetails;