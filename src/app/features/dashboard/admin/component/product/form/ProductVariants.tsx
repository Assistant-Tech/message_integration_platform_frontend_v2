import React from "react";
import {
  UseFormRegister,
  UseFieldArrayRemove,
  UseFieldArrayAppend,
} from "react-hook-form";
import { ProductFormData, ProductVariant } from "@/app/types/product";
import { Trash2, Plus } from "lucide-react";
import { Input } from "@/app/components/ui";

interface Props {
  register: UseFormRegister<ProductFormData>;
  fields: ProductVariant[];
  append: UseFieldArrayAppend<ProductFormData, "variants">;
  remove: UseFieldArrayRemove;
}

const ProductVariants: React.FC<Props> = ({
  register,
  fields,
  append,
  remove,
}) => {
  return (
    <div className="bg-white rounded-lg border border-grey-light">
      <div className="px-6 py-4 border-b border-grey-light bg-base-white flex justify-between items-center">
        <h2 className="h5-bold-16 text-grey">Variants</h2>
        <button
          type="button"
          onClick={() =>
            append({ color: "", size: "", price: "", quantity: "" })
          }
          className="flex items-center body-medium-16 text-primary cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Variant
        </button>
      </div>
      <div className="p-6 space-y-4">
        {fields.length === 0 && (
          <p className="text-sm text-gray-500">No variants added yet.</p>
        )}
        {fields.map((_, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-4 items-end"
          >
            <Input
              {...register(`variants.${index}.color` as const)}
              placeholder="Color"
              className="flex-1 border border-grey-light rounded-lg px-3 py-2"
            />
            <Input
              {...register(`variants.${index}.size` as const)}
              placeholder="Size"
              className="flex-1 border border-grey-light rounded-lg px-3 py-2"
            />
            <Input
              {...register(`variants.${index}.price` as const)}
              placeholder="Price"
              type="number"
              className="flex-1 border border-grey-light rounded-lg px-3 py-2"
            />
            <Input
              {...register(`variants.${index}.quantity` as const)}
              placeholder="Qty"
              type="number"
              className="flex-1 border border-grey-light rounded-lg px-3 py-2"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-grey-light hover:text-danger cursor-pointer flex items-center justify-center p-2"
            >
              <Trash2 size={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductVariants;
