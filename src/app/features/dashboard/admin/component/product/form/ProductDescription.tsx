import React from "react";
import { UseFormRegister } from "react-hook-form";
import { ProductFormData } from "@/app/types/product.types";

interface Props {
  register: UseFormRegister<ProductFormData>;
}

const ProductDescription: React.FC<Props> = ({ register }) => {
  return (
    <div className="bg-white rounded-lg border border-grey-light h-96">
      <div className="px-6 py-4 border-b border-grey-light bg-base-white">
        <h2 className="h5-bold-16 text-grey">Description</h2>
      </div>
      <div className="p-6">
        <textarea
          {...register("description")}
          placeholder="Write a product description..."
          rows={6}
          className="w-full border border-gray-300 rounded-lg px-3 pt-4 pb-30 resize-none focus:outline-none text-grey accent-grey "
        />
      </div>
    </div>
  );
};

export default ProductDescription;
