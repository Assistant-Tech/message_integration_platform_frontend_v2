import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  ProductInfo,
  ProductImages,
  ProductDescription,
  ProductVisibility,
  ActionButtons,
  ProductVariants,
} from "@/app/features/dashboard/admin/component/product/form";
import { CreateProductData } from "@/app/types/product.types";
import { Breadcrumb } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { APP_ROUTES } from "@/app/constants/routes";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/app/store/auth.store";
import { useCreateProduct } from "@/app/hooks/useProducts";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/app/schemas/createProduct.schema";

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const tenantSlug = useAuthStore((s) => s.tenantSlug);
  const ProductsCrumbs = [
    { label: "All Products", href: APP_ROUTES.ADMIN.PRODUCTS_ALL },
    { label: "Create Product" },
  ];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateProductData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      sku: "",
      weight: "",
      weightUnit: "g",
      quantity: "",
      price: "",
      currency: "Rupees",
      discountPercentage: "",
      discountAmount: "",
      description: "",
      visibility: "publish",
      publishDate: "",
      variants: [],
      images: [] as File[],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const watchVisibility = watch("visibility");

  const { mutate } = useCreateProduct();

  const onSubmit = async (data: CreateProductData) => {
    try {
      mutate(data);
      reset();
      navigate(`/${tenantSlug}/admin/${APP_ROUTES.ADMIN.PRODUCTS_ALL}`);
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  const handleClearAll = () => {
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-light p-6">
      <div className="mb-6">
        <div className="flex flex-col justify-start items-start mb-3 gap-3">
          <Heading title="Products" align="left" className="text-base-black" />
          <Breadcrumb items={ProductsCrumbs} />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side */}
          <div className="lg:col-span-2 flex flex-col gap-6 h-full">
            <ProductInfo
              register={register}
              errors={errors}
              setValue={setValue}
            />
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-6 h-full">
            <ProductDescription register={register} />
            <ProductVisibility
              register={register}
              watchVisibility={watchVisibility}
            />
          </div>
        </div>

        <div className="mt-6">
          <ProductImages setValue={setValue} />
        </div>

        <div className="mt-6">
          <ProductVariants
            register={register}
            fields={fields}
            append={append}
            remove={remove}
          />
        </div>

        <div className="mt-6 w-full flex justify-end items-end">
          <ActionButtons isSubmitting={isSubmitting} onClear={handleClearAll} />
        </div>
      </form>
    </div>
  );
};

export default CreateProductPage;
