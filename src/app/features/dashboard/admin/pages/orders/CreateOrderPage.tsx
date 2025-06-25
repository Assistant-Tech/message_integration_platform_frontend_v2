import { useState } from "react";
import { useForm } from "react-hook-form";
import { BadgeCheck, ChevronDown, Search } from "lucide-react";

import { APP_ROUTES } from "@/app/constants/routes";
import { Breadcrumb, Button, Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";
import { AddProduct } from "@/app/features/dashboard/admin/component/";

// images import
import Khalti from "@/app/assets/icons/khalti.png";
import eSewa from "@/app/assets/icons/esewa.png";
import Stripe from "@/app/assets/icons/stripe.png";
import cod from "@/app/assets/icons/cod.jpg";

interface OrderFormValues {
  customer: string;
  fullName: string;
  phone: string;
  email: string;
  location: string;
  expectedDelivery: string;
  paymentMethod: string;
}

const CreateOrderPage = () => {
  const { register, handleSubmit, reset } = useForm<OrderFormValues>();

  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const categories = [
    "Clothing",
    "T-shirts",
    "Electronics",
    "Shoes",
    "Groceries",
    "Home Applicants",
    "Pet Goods",
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const onSubmit = (data: OrderFormValues) => {
    console.log("Order Form Data:", data);
  };

  const OrderBreadCrumb = [
    { label: "Order", href: APP_ROUTES.ADMIN.ORDERS },
    { label: "Create New Order" },
  ];

  // Mapping the images && Texts for payment methods
  const paymentOptions = [
    { id: "Khalti", image: Khalti, label: "Khalti" },
    { id: "eSewa", image: eSewa, label: "eSewa" },
    { id: "Stripe", image: Stripe, label: "Stripe" },
    { id: "Cash On Delivery", image: cod, label: "Cash On Delivery" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading title="Orders" align="left" className="text-base-black" />
        <Breadcrumb items={OrderBreadCrumb} />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Add Product Section */}
          <div className="border border-grey-light rounded-md">
            <h3 className="h5-bold-16 text-grey px-8 py-4 rounded-t-lg  bg-base-white">
              Add Product
            </h3>
            <div className="w-full px-8 py-6">
              <div className="flex gap-2">
                <Input placeholder="Search Product" className="w-full" />
                <Button
                  label="Browse"
                  variant="primary"
                  onClick={() => setProductModalOpen(true)}
                />
              </div>
              <div className="flex justify-between mt-2 text-grey label-bold-14 pt-4">
                <span>Product</span>
                <span>Qty.</span>
                <span>Total</span>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="border border-grey-light rounded-md">
            <h3 className="h5-bold-16 text-grey px-8 py-4 rounded-t-lg  bg-base-white">
              Customer Information
            </h3>
            <div className="w-full px-8 py-6">
              <div className="space-y-4 pt-4">
                <label
                  htmlFor="customer"
                  className="body-medium-16 text-grey-medium pb-1"
                >
                  Select Customer
                </label>
                <Input
                  iconLeft={<Search size={20} color="grey" justify-center />}
                  {...register("customer")}
                  placeholder="Select customer"
                />
                <label
                  htmlFor="fullName"
                  className="body-medium-16 text-grey-medium pb-1"
                >
                  Full Name
                </label>
                <Input
                  {...register("fullName")}
                  placeholder="Enter full name"
                />
                <label
                  htmlFor="phone"
                  className="body-medium-16 text-grey-medium pb-1"
                >
                  Phone Number
                </label>
                <Input
                  {...register("phone")}
                  placeholder="Enter phone number"
                />
                <label
                  htmlFor="email"
                  className="body-medium-16 text-grey-medium pb-1"
                >
                  E-mail Address
                </label>
                <Input
                  {...register("email")}
                  placeholder="Enter email address"
                />
                <label
                  htmlFor="location="
                  className="body-medium-16 text-grey-medium pb-1"
                >
                  Location
                </label>
                <Input
                  {...register("location")}
                  placeholder="Enter the location"
                />

                <div className="relative">
                  <label
                    htmlFor="exp_delivery"
                    className="body-medium-16 text-grey-medium"
                  >
                    Expected Delivery
                  </label>
                  <Input
                    {...register("expectedDelivery")}
                    placeholder="Select expected delivery"
                  />
                  <ChevronDown
                    className="absolute top-12 right-3 transform -translate-y-1/2 text-grey"
                    size={20}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Payment Details */}
          <div className="border border-grey-light rounded-md">
            <h3 className="h5-bold-16 text-grey px-8 py-4 rounded-t-lg  bg-base-white">
              Payment Details
            </h3>
            <div className="px-8 py-6">
              <div className="space-y-3 border-b border-grey-light mb-4 pb-4">
                <div className="flex justify-between body-medium-16 text-grey-medium">
                  <span>Subtotal</span>
                  <span>Rs.0.00</span>
                </div>
                <div className="flex justify-between body-medium-16 text-grey-medium">
                  <span>Delivery Charge</span>
                  <span>Rs.0.00</span>
                </div>
              </div>
              <div className="flex justify-between body-medium-16 text-grey-medium">
                <span>Total</span>
                <span>Rs.0.00</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="border border-grey-light rounded-md">
            <h3 className="h5-bold-16 text-grey px-8 py-4 rounded-t-lg bg-base-white">
              Payment Methods
            </h3>
            <div className="px-8 py-6">
              <div className="grid grid-cols-2 gap-3">
                {paymentOptions.map((option) => (
                  <label
                    key={option.id}
                    className="relative border border-grey-light rounded-lg p-px flex flex-col items-center gap-1 cursor-pointer transition hover:shadow-sm"
                  >
                    {/* Tick icon when selected */}
                    <input
                      type="radio"
                      value={option.id}
                      {...register("paymentMethod")}
                      className="peer hidden"
                    />
                    <BadgeCheck
                      className="absolute top-2 right-2 text-white rounded-2xl bg-primary-dark bg- opacity-20 peer-checked:opacity-80 transition-opacity"
                      size={24}
                    />
                    <img
                      src={option.image}
                      alt={option.label}
                      className="h-48 object-contain"
                    />
                    <span className="label-bold-14 text-grey">
                      {option.label === "Cash On Delivery" && (
                        <span>{option.label}</span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4">
            <Button
              label=" Clear All"
              onClick={() => reset()}
              variant="outlined"
            />
            <Button label="Save Order" />
          </div>
        </div>
      </form>

      {/* Add Product Component */}
      <AddProduct
        isOpen={isProductModalOpen}
        onClose={() => setProductModalOpen(false)}
        categories={categories}
        selected={selectedTags}
        toggleTag={toggleTag}
      />
    </div>
  );
};

export default CreateOrderPage;
