import React from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Circle, CircleDot } from "lucide-react";
import { ProductFormData } from "@/app/types/product.types";

interface Props {
  register: UseFormRegister<ProductFormData>;
  watchVisibility: string;
  setValue?: UseFormSetValue<ProductFormData>;
}

const ProductVisibility: React.FC<Props> = ({ register, watchVisibility }) => {
  const options: { value: "publish" | "schedule" | "draft"; label: string }[] =
    [
      { value: "publish", label: "Publish" },
      { value: "schedule", label: "Schedule" },
      { value: "draft", label: "Draft" },
    ];

  return (
    <div className="bg-white rounded-lg border border-grey-light">
      <div className="px-6 py-4 border-b border-grey-light bg-base-white">
        <h2 className="h5-bold-16 text-grey">Visibility</h2>
      </div>
      <div className="p-6 flex items-start justify-start gap-4 accent-primary">
        {options.map((option) => (
          <label
            key={option.value}
            htmlFor={option.value}
            className="flex items-center gap-2 cursor-pointer body-regular-16 text-grey-medium"
          >
            <input
              type="radio"
              {...register("visibility")}
              value={option.value}
              id={option.value}
              className="sr-only"
            />
            {watchVisibility === option.value ? (
              <CircleDot color="teal" />
            ) : (
              <Circle color="gray" />
            )}
            {option.label}
          </label>
        ))}
      </div>
      <div className="px-6 pt-2 pb-6">
        {watchVisibility === "publish" && (
          <input
            type="date"
            {...register("publishDate")}
            className="w-full border border-grey-light text-grey-medium rounded-lg px-3 py-2 focus:outline-none"
          />
        )}
        {watchVisibility === "schedule" && (
          <input
            type="datetime-local"
            {...register("publishDate")}
            className="w-full border border-grey-light text-grey-medium rounded-lg px-3 py-2 focus:outline-none"
          />
        )}
        {watchVisibility === "draft" && (
          <input
            type="datetime-local"
            {...register("publishDate")}
            className="w-full border border-grey-light text-grey-light rounded-lg px-3 py-2 focus:outline-none"
          />
        )}
      </div>
    </div>
  );
};

export default ProductVisibility;
