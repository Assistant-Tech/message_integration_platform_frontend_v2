import { Input } from "@/app/components/ui";
import { Search } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { Product } from "@/app/types/product.types";
import { SelectedImageForProduct } from "@/app/components/common/SelectedImage";

const ProductSearchView = ({
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  onCategoryClick,
  products,
  onSelectProduct,
}: any) => {
  return (
    <>
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Categories or Products"
        iconLeft={<Search size={20} />}
      />

      <div className="grid grid-cols-3 gap-3 py-4">
        {categories.map((cat: any) => (
          <button
            key={cat.id}
            onClick={() => onCategoryClick(cat)}
            className={cn(
              "px-3 py-2 rounded-md",
              selectedCategory?.id === cat.id
                ? "bg-primary text-white"
                : "bg-base-white text-grey border border-grey-light",
            )}
          >
            {cat.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {products.map((product: Product) => {
          const price = product.variants?.[0]?.price ?? 0;
          const image = product.images?.[0]?.url;

          return (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product.id)}
              className="border border-grey-light rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition bg-white"
            >
              {image && <SelectedImageForProduct product={product} />}

              <div className="p-3 space-y-1">
                <h4 className="body-bold-16 text-grey/90">{product.title}</h4>

                <p className="text-sm text-grey-medium ">
                  {product.description}
                </p>

                <div className="flex justify-between items-center pt-1">
                  <span className="body-semi-bold-16 text-grey text-sm">
                    Rs. {price}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductSearchView;
