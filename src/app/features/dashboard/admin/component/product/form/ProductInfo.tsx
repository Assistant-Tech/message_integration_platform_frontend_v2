import React, { useState, useEffect } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { Button, Input } from "@/app/components/ui";
import { CreateProductData } from "@/app/types/product.types";
import { fetchCategories } from "@/app/services/category.services";
import { AddCategory } from "@/app/features/dashboard/admin/component/";

const weightUnits = ["g", "kg", "lb", "oz"];
const currencies = ["Rupees", "USD", "EUR", "GBP"];

interface Category {
  id: string;
  title: string;
}

interface Props {
  register: UseFormRegister<CreateProductData>;
  errors: FieldErrors<CreateProductData>;
  setValue: UseFormSetValue<CreateProductData>;
  readOnly?: boolean; 
}

const ProductInfo: React.FC<Props> = ({
  register,
  errors,
  setValue,
  readOnly = false,
}) => {
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);

  useEffect(() => {
    if (!readOnly) loadCategories();
  }, [readOnly]);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const data = await fetchCategories();
      const transformed: Category[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
      }));
      setCategories(transformed);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleCategoryAdded = () => {
    loadCategories();
    setShowCategoryModal(false);
  };

  return (
    <div className="bg-white rounded-lg border border-grey-light">
      <div className="px-6 py-4 border-b border-grey-light bg-base-white">
        <h2 className="h5-bold-16 text-grey">Product Information</h2>
      </div>

      {/* Title */}
      <div className="px-6 py-2 space-y-4">
        <Input
          {...register("title")}
          label="Title"
          placeholder="Enter product name"
          required
          error={errors.title?.message}
          disabled={readOnly}
        />

        {/* Category */}
        <div className="relative flex flex-col gap-2">
          <label className="body-bold-16 text-grey-medium mb-2">
            Category <span className="text-danger">*</span>
          </label>

          <div className="flex gap-2 text-grey-medium">
            <select
              {...register("categoryId")}
              disabled={loadingCategories || readOnly}
              className={`w-full px-4 py-3 min-h-[36px] border border-grey-light rounded-lg focus:outline-none focus:ring-2 ${
                readOnly ? "bg-grey-light cursor-not-allowed" : ""
              }`}
            >
              <option value="">
                {loadingCategories ? "Loading categories..." : "Select a category"}
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>

            {!readOnly && (
              <Button
                type="button"
                label="Add New Category"
                onClick={() => setShowCategoryModal(true)}
                className="w-72 bg-grey hover:bg-base-black text-white"
              />
            )}
          </div>

          {errors.categoryId && (
            <p className="mt-1 body-bold-16 text-danger">
              {errors.categoryId.message}
            </p>
          )}
        </div>
      </div>

      {/* SKU + Weight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <Input
          {...register("sku")}
          label="SKU"
          placeholder="e.g. SKU12345"
          disabled={readOnly}
        />

        <div>
          <label className="body-bold-16 text-grey-medium mb-2">Weight</label>
          <div className="flex border border-grey-light rounded-xl">
            <Input
              {...register("weight")}
              placeholder="0.0"
              type="number"
              className="border-none"
              disabled={readOnly}
            />
            <select
              {...register("weightUnit")}
              disabled={readOnly}
              className={`px-3 py-2 rounded-e-xl bg-base-white text-grey ${
                readOnly ? "cursor-not-allowed bg-grey-light" : ""
              }`}
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

      {/* Quantity + Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <Input
          {...register("quantity")}
          label="Quantity"
          type="number"
          placeholder="0"
          disabled={readOnly}
          error={errors.quantity?.message}
        />

        <div>
          <label className="body-bold-16 text-grey-medium mb-2">
            Price <span className="text-red-500">*</span>
          </label>
          <div className="flex border border-grey-light rounded-xl">
            <Input
              {...register("price")}
              placeholder="0.00"
              type="number"
              disabled={readOnly}
              className="border-none"
            />
            <select
              {...register("currency")}
              disabled={readOnly}
              className={`px-3 py-2 rounded-e-lg bg-base-white text-grey ${
                readOnly ? "cursor-not-allowed bg-grey-light" : ""
              }`}
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

      {/* Discounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <Input
          {...register("discountPercentage")}
          label="Discount %"
          type="number"
          placeholder="%"
          disabled={readOnly}
        />

        <Input
          {...register("discountAmount")}
          label="Discount Amount"
          type="number"
          placeholder="0"
          disabled={readOnly}
        />
      </div>

      {/* Add Category Modal */}
      {!readOnly && (
        <AddCategory
          isOpen={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          onSave={handleCategoryAdded}
        />
      )}
    </div>
  );
};

export default ProductInfo;
