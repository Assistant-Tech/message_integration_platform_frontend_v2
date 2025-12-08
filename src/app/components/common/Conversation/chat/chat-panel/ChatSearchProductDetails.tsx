import { ChevronLeft, Minus, Plus, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";
import { cn } from "@/app/utils/cn";
import {
  fetchCategories,
  fetchProductByCategoryId,
  getCategoryById,
} from "@/app/services/category.services";
import { fetchProductsById } from "@/app/services/product.services";
import { Product } from "@/app/types/product.types";

interface ChatSearchProductDetailsProps {
  isOpen: boolean;
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
  isOpen,
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

  useEffect(() => {
    if (!isOpen) return;

    const fetchCategory = async () => {
      try {
        const response = await fetchCategories("");
        setCategorydata(response || []);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategory();
  }, [isOpen]);

  const handleCategoryClick = async (category: Category) => {
    setSelectedCategory(category);
    getCategoryById(category.id);

    const result = await fetchProductByCategoryId(category.id);
    setProducts(result || []);
  };

  const handleSelectProduct = async (productId: string) => {
    const product = await fetchProductsById(productId);
    setSelectedProduct(product);
    setStep("details");
    setQuantity(1);
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="max-w-2xl w-full p-8 bg-white rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <div className="flex justify-start gap-2 items-center">
            {step === "details" && (
              <button onClick={() => setStep("selection")}>
                <ChevronLeft size={24} />
              </button>
            )}
            <Heading title="Search Product Details" align="left" />
          </div>
          <X size={24} onClick={onClose} className="cursor-pointer" />
        </div>

        {/* STEP 1: SELECTION */}
        {step === "selection" && (
          <>
            <Input
              placeholder="Search product..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              iconLeft={<Search size={20} />}
            />

            <h2 className="pt-4 text-grey">Category</h2>

            <div className="grid grid-cols-3 gap-3 pt-2">
              {categorydata.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className={cn(
                    "px-3 py-2 rounded border border-light-grey hover:bg-primary hover:text-white",
                    selectedCategory?.id === category.id
                      ? "bg-primary text-white"
                      : "bg-white border border-light-grey",
                  )}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {/* ✅ REAL API PRODUCTS */}
            {selectedCategory && (
              <>
                <p className="text-sm mt-4">
                  {filteredProducts.length} result(s) found for{" "}
                  <b>{selectedCategory.title}</b>
                </p>

                <div className="flex flex-col gap-3 mt-2">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="flex justify-between p-3 border border-light-grey rounded cursor-pointer hover:bg-grey-light"
                    >
                      <div>
                        <p className="font-semibold">{product.title}</p>
                        <p className="text-sm text-grey">
                          Rs. {product.variants?.[0]?.price ?? 0}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* STEP 2: DETAILS */}
        {step === "details" && selectedProduct && (
          <div>
            <h3 className="font-bold">{selectedProduct.title}</h3>
            <p className="text-primary">
              Rs. {selectedProduct.variants?.[0]?.price ?? 0}
            </p>

            <div className="flex items-center gap-3 my-4">
              <button onClick={decrement}>
                <Minus />
              </button>
              <span>{quantity}</span>
              <button onClick={increment}>
                <Plus />
              </button>
            </div>

            <button
              className="w-full bg-primary text-white py-2 rounded"
              onClick={() => {
                onSendProduct({
                  type: "product-details",
                  data: {
                    ...selectedProduct,
                    quantity,
                  },
                });
                onClose();
              }}
            >
              Send Product Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSearchProductDetails;
