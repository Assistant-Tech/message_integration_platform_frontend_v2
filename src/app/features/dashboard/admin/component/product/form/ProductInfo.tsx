import React, { useState } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { Button, Input } from "@/app/components/ui";
import { ProductFormData } from "@/app/types/product.types";
import { Plus } from "lucide-react";

const categories = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports & Outdoors",
  "Books",
  "Toys & Games",
];
const weightUnits = ["g", "kg", "lb", "oz"];
const currencies = ["Rupees", "USD", "EUR", "GBP"];

interface Props {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
}

const ProductInfo: React.FC<Props> = ({ register, errors, setValue }) => {
  const [showCategoryInput, setShowCategoryInput] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>("");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setValue("category", newCategory.trim());
      setNewCategory("");
      setShowCategoryInput(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-grey-light">
      <div className="px-6 py-4 border-b border-grey-light bg-base-white">
        <h2 className="h5-bold-16 text-grey">Product Information</h2>
      </div>
      <div className="px-6 py-2 space-y-4">
        <Input
          {...register("name", { required: "Product name is required" })}
          label="Name"
          placeholder="Enter product name"
          required
          error={errors.name?.message}
        />

        {/* Category */}
        {!showCategoryInput ? (
          <>
            <div className="relative flex flex-col gap-2">
              <div>
                <label className="body-bold-16 text-grey-medium mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="flex gap-2">
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full px-4 py-3 sm:py-3 min-h-[36px] text-grey-medium border border-grey-light rounded-lg focus:outline-none focus:ring-2 focus:ring-information appearance-none"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  label="Add New Category"
                  onClick={() => setShowCategoryInput(true)}
                  className="w-72 bg-grey hover:bg-base-black text-white"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex gap-2 w-full">
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category"
              className="flex-1"
            />
            <Button
              type="button"
              label="Add"
              variant="primary"
              IconLeft={<Plus size={24} />}
              onClick={handleAddCategory}
              disabled={!newCategory.trim()}
            />
            <Button
              type="button"
              label="Cancel"
              variant="neutral"
              onClick={() => {
                setShowCategoryInput(false);
                setNewCategory("");
              }}
            />
          </div>
        )}
      </div>
      {errors.category && (
        <p className="mt-1 body-bold-16 text-danger">
          {errors.category.message}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <Input {...register("sku")} label="SKU" placeholder="e.g. SKU12345" />
        <div>
          <label className="body-bold-16 text-grey-medium mb-2">Weight</label>
          <div className="flex border border-grey-light rounded-xl">
            <Input
              {...register("weight")}
              placeholder="0.0"
              type="number"
              className="border-none"
            />
            <select
              {...register("weightUnit")}
              className="px-3 py-2 rounded-e-xl focus:outline-none bg-base-white text-grey"
            >
              {weightUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <Input
          {...register("quantity", { required: "Quantity is required" })}
          label="Quantity"
          type="number"
          placeholder="0"
          required
          error={errors.quantity?.message}
        />
        <div>
          <label className="body-bold-16 text-grey-medium mb-2">
            Price <span className="text-red-500">*</span>
          </label>
          <div className="flex border border-grey-light rounded-xl">
            <Input
              {...register("price", { required: "Price is required" })}
              placeholder="0.00"
              type="number"
              required
              className="text-grey-medium border-none"
            />
            <select
              {...register("currency")}
              className="px-3 py-2 rounded-e-lg focus:outline-none bg-base-white text-grey"
            >
              {currencies.map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <Input
          {...register("discountPercentage")}
          label="Discount %"
          type="number"
          placeholder="%"
          className="text-grey-medium"
        />
        <Input
          {...register("discountAmount")}
          label="Discount Amount"
          type="number"
          placeholder="0"
          // whereby more props to be here
          className="text-grey-medium"
        />
      </div>
    </div>
  );
};

export default ProductInfo;
