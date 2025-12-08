import { SelectedImageForProduct } from "@/app/components/common/SelectedImage";
import { Product } from "@/app/types/product.types";
import { Minus, Plus } from "lucide-react";

interface ProductDetailsViewProps {
  product: Product;
  quantity: number;
  increment: () => void;
  decrement: () => void;
  onAdd: () => void;
}

const ProductDetailsView = ({
  product,
  quantity,
  increment,
  decrement,
  onAdd,
}: ProductDetailsViewProps) => {
  const price = product.variants?.[0]?.price ?? 0;
  const stock = product.variants?.[0]?.inventory?.stock ?? true;
  const image = product.images?.[0]?.url;

  return (
    <div className="border border-grey-light rounded-xl p-4 bg-white space-y-4">
      {image && <SelectedImageForProduct product={product} />}

      <div className="space-y-1">
        <h3 className="h4-bold-24 text-grey">{product.title}</h3>
        <p className="h5-semi-bold-16 text-grey">{product.description}</p>
        <p className="body-regular-16 text-grey">SKU: {product.sku}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-xl font-bold text-primary">Rs. {price}</p>

        <span
          className={`px-3 py-1 rounded-full text-xs ${
            product.visibility
              ? "bg-green-100 text-success"
              : "bg-red-100 text-danger"
          }`}
        >
          {product.visibility ? "Visible" : "Hidden"}
        </span>
      </div>

      <div className="flex gap-3 text-sm text-grey">
        <span>Color: {product.color}</span>
        <span>Status: {product.status}</span>
      </div>

      <div className="flex gap-3 items-center">
        <button
          onClick={decrement}
          className="p-2 border rounded hover:bg-grey-light"
        >
          <Minus size={18} />
        </button>

        <span className="font-semibold">{quantity}</span>

        <button
          onClick={increment}
          className="p-2 border rounded hover:bg-grey-light"
        >
          <Plus size={18} />
        </button>
      </div>

      <button
        onClick={onAdd}
        disabled={!stock}
        className="w-full bg-primary text-white py-2 rounded-lg disabled:opacity-50"
      >
        Add Product
      </button>
    </div>
  );
};

export default ProductDetailsView;
