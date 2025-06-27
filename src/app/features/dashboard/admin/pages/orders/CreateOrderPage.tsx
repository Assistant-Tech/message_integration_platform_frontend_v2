import { useForm } from "react-hook-form";
import { ChevronDown, Search } from "lucide-react";

import { APP_ROUTES } from "@/app/constants/routes";
import { Breadcrumb, Button, Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";
import {
  AddProduct,
  PaymentDetails,
  PaymentMethods,
  SelectAllCustomer,
} from "@/app/features/dashboard/admin/component/";
import { useState } from "react";

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
  const [isSelectAllCustomerModalOpen, setIsSelectAllCustomerModalOpen] =
    useState<boolean>(false);

  const onSubmit = (data: OrderFormValues) => {
    console.log("Order Form Data:", data);
  };

  const OrderBreadCrumb = [
    { label: "Order", href: APP_ROUTES.ADMIN.ORDERS },
    { label: "Create New Order" },
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
                <Input
                  placeholder="Search Product"
                  className="w-full"
                  onClick={() => setProductModalOpen(true)}
                />
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
                  onClick={() => setIsSelectAllCustomerModalOpen(true)}
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
          <PaymentDetails />
          {/* Payment Method */}
          <PaymentMethods />
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
      />

      {/* Select all the Customers */}
      <SelectAllCustomer
        isOpen={isSelectAllCustomerModalOpen}
        onClose={() => setIsSelectAllCustomerModalOpen(false)}
      />
    </div>
  );
};

export default CreateOrderPage;
