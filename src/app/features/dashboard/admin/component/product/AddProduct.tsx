import { Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";
import { Product, ProductVariant } from "@/app/types/product.types";
import { cn } from "@/app/utils/cn";
import { ChevronLeft, Minus, Plus, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

interface AddProductProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (payload: {
    productId: string;
    variantId: string;
    quantity: number;
  }) => void;
}

const AddProduct: React.FC<AddProductProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
}) => {
  // ✅ STATES (ALL AT TOP — NO HOOK ERRORS)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );
  const [step, setStep] = useState<"selection" | "details">("selection");
  const [quantity, setQuantity] = useState(1);
  const [search, setSearch] = useState("");

  // ✅ FILTER ONLY BY SEARCH (NO CATEGORY)
  const filteredProducts = useMemo(() => {
    return products.filter((prod) =>
      prod.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  // ✅ SAFE CONDITIONAL RENDER
  if (!isOpen) return null;

  // ✅ SELECT PRODUCT
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedVariant((product.variants[0] as ProductVariant) || null);
    setStep("details");
    setQuantity(1);
  };

  // ✅ QTY CONTROLS
  const increment = () => {
    if (selectedVariant && quantity < (selectedVariant.inventory?.stock ?? 0)) {
      setQuantity((q) => q + 1);
    }
  };

  const decrement = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  // ✅ ADD PRODUCT TO ORDER
  const handleConfirmAdd = () => {
    if (!selectedProduct || !selectedVariant || !selectedVariant.id) return;

    onAddProduct({
      productId: selectedProduct.id,
      variantId: selectedVariant.id,
      quantity,
    });

    // ✅ RESET STATE
    setStep("selection");
    setSelectedProduct(null);
    setSelectedVariant(null);
    setQuantity(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="max-w-2xl w-full p-8 bg-white rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* ✅ HEADER */}
        <div className="flex justify-between mb-4">
          <div className="flex gap-2 items-center">
            {step === "details" && (
              <button onClick={() => setStep("selection")}>
                <ChevronLeft size={24} color="grey" />
              </button>
            )}
            <Heading title="Add Product" align="left" className="text-grey" />
          </div>
          <X size={24} onClick={onClose} className="cursor-pointer" />
        </div>

        {/* ✅ STEP 1: PRODUCT LIST */}
        {step === "selection" && (
          <>
            <Input
              placeholder="Search product..."
              type="search"
              className="w-full border border-grey-light rounded-lg"
              iconLeft={<Search size={24} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex flex-col gap-4 mt-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="flex justify-between p-3 border border-grey-light rounded-md cursor-pointer hover:bg-grey-light/30"
                >
                  <div>
                    <p className="text-grey body-semi-bold-16">
                      {product.title}
                    </p>
                    <p className="text-xs text-grey-medium">
                      {product.variants.length} variants
                    </p>
                  </div>

                  <div className="text-primary body-semi-bold-16">
                    Rs. {product.variants[0]?.price}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ✅ STEP 2: VARIANT + QUANTITY */}
        {step === "details" && selectedProduct && (
          <div>
            <h3 className="body-bold-16 text-grey">{selectedProduct.title}</h3>

            <div className="flex flex-wrap gap-2 mt-4">
              {selectedProduct.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={cn(
                    "px-3 py-1 border rounded-md text-xs",
                    selectedVariant?.id === variant.id
                      ? "bg-primary text-white"
                      : "border-grey-light",
                  )}
                >
                  {variant.attributes.color ||
                    variant.attributes.size ||
                    "Default"}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 my-4">
              <button onClick={decrement}>
                <Minus size={22} />
              </button>

              <span>{quantity}</span>

              <button onClick={increment}>
                <Plus size={22} />
              </button>

              {selectedVariant?.inventory?.stock === 0 && (
                <span className="text-danger ml-2">Out of stock</span>
              )}
            </div>

            <button
              className="w-full bg-primary text-white py-2 rounded-md disabled:opacity-50"
              disabled={
                !selectedVariant || selectedVariant.inventory?.stock === 0
              }
              onClick={handleConfirmAdd}
            >
              Add Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
