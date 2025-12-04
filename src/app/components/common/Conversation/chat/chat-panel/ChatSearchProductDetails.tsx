import { ChevronLeft, Minus, Plus, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";
import { cn } from "@/app/utils/cn";
import { fetchCategories } from "@/app/services/category.services";

interface ChatSearchProductDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  onSendProduct: (data: any) => void;
}

interface Product {
  id: string;
  name: string;
  color: string[];
  sizes: string[];
  price: number;
  stock: boolean;
  category: string;
}

interface Category {
  id: string;
  title: string;
  description?: string;
  slug: string;
  parentId: string | null;
  children: Product[];
}

const ChatSearchProductDetails: React.FC<ChatSearchProductDetailsProps> = ({
  isOpen,
  onClose,
  onSendProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categorydata, setCategorydata] = useState<Category[]>([]);
  const [step, setStep] = useState<"selection" | "details">("selection");
  const [quantity, setQuantity] = useState(1);

  // Fetch the categories when the modal opens
  useEffect(() => {
    if (!isOpen) return;

    const fetchCategory = async () => {
      try {
        const response = await fetchCategories();
        console.log("🚀 ~ fetchCategory ~ response:", response[0]);
        setCategorydata(response || []);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategory();
  }, [isOpen]);

  const filteredProducts =
    categorydata.find((cat) => cat.title === selectedCategory)?.children || [];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setStep("details");
    setQuantity(1);
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="max-w-2xl w-full p-8 bg-white rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <div className="flex justify-start gap-2 items-center mb-4">
            <button
              onClick={() => setStep("selection")}
              className="text-primary text-sm flex items-center gap-1"
            >
              <ChevronLeft size={24} color="grey" className="cursor-pointer" />
            </button>
            <Heading
              title="Search Product Details"
              align="left"
              className="text-grey"
            />
          </div>
          <X size={24} onClick={onClose} className="cursor-pointer" />
        </div>

        {/* Step 1: Product Selection */}
        {step === "selection" && (
          <>
            {/* Search */}
            <Input
              name="product"
              placeholder="Search by Product Name, SKN or Category"
              type="search"
              className="w-full border border-grey-light rounded-lg ring-1 ring-primary"
              iconLeft={<Search size={24} />}
            />

            {/* Categories */}
            <h2 className="h5-bold-16 text-start text-grey pt-4">Category</h2>
            <div className="grid grid-cols-3 gap-4 mb-4 pt-3">
              {categorydata.length === 0 && (
                <p className="text-sm text-grey-medium">No categories found</p>
              )}

              {categorydata.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.title)}
                  className={cn(
                    "label-regular-14 px-3 py-2 rounded-md border-grey-light hover:bg-primary hover:text-white",
                    selectedCategory === category.title
                      ? "bg-primary text-white border-primary"
                      : "bg-base-white text-grey-medium",
                  )}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {/* Product List */}
            {selectedCategory && (
              <>
                <p className="text-grey-medium text-sm mb-2">
                  {filteredProducts.length} result
                  {filteredProducts.length !== 1 ? "s" : ""} found for{" "}
                  <span className="font-semibold">{selectedCategory}</span>
                </p>

                <div className="flex flex-col gap-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="flex justify-between items-start p-3 border border-grey-light rounded-md cursor-pointer hover:bg-grey-light/30"
                    >
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-md bg-grey-light" />
                        <div>
                          <p className="text-grey body-semi-bold-16">
                            {product.name}
                          </p>
                          <div className="flex gap-3 flex-wrap text-sm mt-1">
                            {product.color.length > 0 && (
                              <div className="flex items-center gap-1">
                                Colors:
                                {product.color.map((c, i) => (
                                  <span
                                    key={i}
                                    className="inline-block w-4 h-4 rounded-full border border-grey"
                                    style={{ backgroundColor: c }}
                                  />
                                ))}
                              </div>
                            )}
                            {product.sizes.length > 0 && (
                              <div>Size: {product.sizes.join(", ")}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <p className="body-semi-bold-16 text-grey-medium">
                          Rs. {product.price}
                        </p>
                        {!product.stock && (
                          <p className="label-regular-14 text-danger">
                            Out of Stock
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Step 2: Product Details */}
        {step === "details" && selectedProduct && (
          <div>
            <div className="flex gap-4">
              <div className="w-52 h-auto bg-grey-light rounded-md" />
              <div className="flex-1">
                <div className="space-y-1">
                  <h3 className="body-bold-16 text-grey-medium">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-primary body-bold-16">
                    Rs. {selectedProduct.price}
                  </p>
                </div>

                <div className="flex items-center gap-2 my-4">
                  <span className="label-regular-14 text-grey-medium">
                    Colors:
                  </span>
                  {selectedProduct.color.map((c, i) => (
                    <span
                      key={i}
                      className="w-5 h-5 rounded-full border border-grey"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>

                {selectedProduct.sizes.length > 0 && (
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className="label-regular-14 text-grey-medium">
                      Size:
                    </span>
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        className="px-2 py-1 border border-grey-light rounded-md text-xs"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <span className="label-regular-14 text-grey-medium">
                    Quantity:
                  </span>
                  <button
                    onClick={decrement}
                    className="w-8 h-8 border border-grey-light rounded-md label-regular-14 text-grey-medium px-1"
                  >
                    <Minus size={24} className="cursor-pointer" />
                  </button>
                  <span className="label-regular-14 text-grey-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={increment}
                    className="w-8 h-8 border border-grey-light rounded-md label-regular-14 text-grey-medium px-1"
                  >
                    <Plus size={24} className="cursor-pointer" />
                  </button>
                  {!selectedProduct.stock && (
                    <span className="text-danger label-regular-14 ml-3">
                      Out of stock
                    </span>
                  )}
                </div>

                <button
                  className="w-full bg-primary text-white py-2 rounded-md disabled:opacity-50 cursor-pointer"
                  disabled={!selectedProduct.stock}
                  onClick={() => {
                    onSendProduct({
                      type: "product-details",
                      data: {
                        id: selectedProduct.id,
                        name: selectedProduct.name,
                        price: selectedProduct.price,
                        color: selectedProduct.color,
                        sizes: selectedProduct.sizes,
                        category: selectedProduct.category,
                        stock: selectedProduct.stock,
                        quantity: quantity,
                      },
                    });
                    onClose();
                  }}
                >
                  Send Product Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSearchProductDetails;
