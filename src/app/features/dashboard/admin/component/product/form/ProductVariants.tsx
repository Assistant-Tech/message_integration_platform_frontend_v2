import React from "react";
import {
  UseFormRegister,
  UseFieldArrayRemove,
  UseFieldArrayAppend,
} from "react-hook-form";
import { CreateProductData, ProductVariant } from "@/app/types/product.types";
import { Trash2, Plus } from "lucide-react";
import { Input } from "@/app/components/ui";

interface Props {
  register: UseFormRegister<CreateProductData>;
  fields: ProductVariant[];
  append: UseFieldArrayAppend<CreateProductData, "variants">;
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

        {/* ADD VARIANT */}
        <button
          type="button"
          onClick={() =>
            append({
              title: "",
              price: 0,
              attributes: { color: "", size: "" },
              inventory: { stock: 0, lowStock: false },
            })
          }
          className="flex items-center body-medium-16 text-primary cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Variant
        </button>
      </div>

      <div className="p-6 space-y-6">
        {fields.length === 0 && (
          <p className="text-sm text-gray-500">No variants added yet.</p>
        )}

        {fields.map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50"
          >
            {/* Title */}
            <Input
              {...register(`variants.${index}.title` as const)}
              placeholder="Variant Title"
              className="border border-grey-light rounded-lg px-3 py-2"
            />

            {/* Price */}
            <Input
              {...register(`variants.${index}.price` as const, {
                valueAsNumber: true,
              })}
              placeholder="Price"
              type="number"
              className="border border-grey-light rounded-lg px-3 py-2"
            />

            {/* Attributes */}
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                {...register(`variants.${index}.attributes.color` as const)}
                placeholder="Color"
                className="flex-1 border border-grey-light rounded-lg px-3 py-2"
              />

              <Input
                {...register(`variants.${index}.attributes.size` as const)}
                placeholder="Size"
                className="flex-1 border border-grey-light rounded-lg px-3 py-2"
              />
            </div>

            {/* Inventory */}
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                {...register(`variants.${index}.inventory.stock` as const, {
                  valueAsNumber: true,
                })}
                placeholder="Stock"
                type="number"
                className="flex-1 border border-grey-light rounded-lg px-3 py-2"
              />

              <select
                {...register(`variants.${index}.inventory.lowStock` as const, {
                  setValueAs: (v) => v === "true",
                })}
                className="flex-1 border border-grey-light rounded-lg px-3 py-2"
              >
                <option value="false">Low Stock: No</option>
                <option value="true">Low Stock: Yes</option>
              </select>
            </div>

            {/* Delete */}
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-grey-light hover:text-danger cursor-pointer flex items-center justify-start"
            >
              <Trash2 size={20} />
              <span className="ml-2">Remove</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductVariants;
