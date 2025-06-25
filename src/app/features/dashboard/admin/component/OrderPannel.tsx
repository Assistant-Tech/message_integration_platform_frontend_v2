import React, { useState } from "react";
import { Button, Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { EllipsisVertical, Search, X } from "lucide-react";
import { ModalMessageBox } from "@/app/features/dashboard/admin/component/ui";

interface OrderFormData {
  product: string;
  fullName: string;
  phoneNumber: string;
  deliveryCharge: string;
  paymentMethod: string;
  expectedDelivery: string;
}

const OrderPannel: React.FC = () => {
  const [isOpen, setIsoOpen] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState<OrderFormData>({
    product: "",
    fullName: "",
    phoneNumber: "",
    deliveryCharge: "",
    paymentMethod: "",
    expectedDelivery: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setShowConfirmModal(true);
  };

  const confirmOrder = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setFormData({
      product: "",
      fullName: "",
      phoneNumber: "",
      deliveryCharge: "",
      paymentMethod: "",
      expectedDelivery: "",
    });
  };

  const handleCancel = () => {
    setFormData({
      product: "",
      fullName: "",
      phoneNumber: "",
      deliveryCharge: "",
      paymentMethod: "",
      expectedDelivery: "",
    });
  };

  const handleOpenProductDialog = () => {
    setIsoOpen(true);
  };

  const categories = [
    "Clothing",
    "T-shirts",
    "Electronics",
    "Shoes",
    "Groceries",
    "Home Applicants",
    "Pet Goods",
  ];

  const [selected, setSelected] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };
  return (
    <aside className="w-full bg-white">
      <div className="flex justify-between items-center border-b border-grey-light py-4 px-4">
        <Heading title="Order Info" className="text-base-black" />
        <EllipsisVertical size={24} color="black" />
      </div>

      <div className="p-6">
        <h1 className="body-bold-16 text-grey-medium pb-2 border-b border-grey-light">
          Create Order
        </h1>

        {/* Product Search */}
        <div className="flex flex-col py-3">
          <h2 className="body-medium-16 text-grey pb-1">Product</h2>

          <Input
            name="product"
            placeholder="Search"
            onClick={handleOpenProductDialog}
            className="w-full py-3 border border-grey-light rounded-lg"
          />
        </div>

        {/* Full Name */}
        <div className="flex flex-col py-3">
          <h2 className="body-medium-16 text-grey pb-1">Full Name</h2>
          <Input
            name="fullName"
            value={formData.fullName}
            type="text"
            placeholder="Enter full name"
            onChange={handleChange}
            className="w-full py-3 border border-grey-light rounded-lg"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col py-3">
          <h2 className="body-medium-16 text-grey pb-1">Phone Number</h2>
          <Input
            name="phoneNumber"
            value={formData.phoneNumber}
            type="text"
            placeholder="Enter phone number"
            onChange={handleChange}
            className="w-full py-3 border border-grey-light rounded-lg"
          />
        </div>

        {/* Delivery Charge */}
        <div className="flex flex-col py-3">
          <h2 className="body-medium-16 text-grey pb-1">Delivery Charge</h2>
          <Input
            name="deliveryCharge"
            value={formData.deliveryCharge}
            type="text"
            placeholder="Enter delivery charge"
            onChange={handleChange}
            className="w-full py-3 border border-grey-light rounded-lg"
          />
        </div>

        {/* Payment Method */}
        <div className="flex flex-col py-3">
          <h2 className="body-medium-16 text-grey pb-1">Payment Method</h2>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full py-3 px-4 border border-grey-light text-grey rounded-lg"
          >
            <option value="">Select payment method</option>
            <option value="stripe">Stripe</option>
            <option value="khalti">Khalti</option>
            <option value="esewa">Esewa</option>
            <option value="cash">Cash On Delivery</option>
          </select>
        </div>

        {/* Expected Delivery */}
        <div className="flex flex-col py-3">
          <h2 className="body-medium-16 text-grey pb-1">Expected Delivery</h2>
          <select
            name="expectedDelivery"
            value={formData.expectedDelivery}
            onChange={handleChange}
            className="w-full py-3 px-4 border border-grey-light text-grey rounded-lg"
          >
            <option value="">Select expected delivery</option>
            <option value="1-day">1 Day</option>
            <option value="3-days">3 Days</option>
            <option value="week">1 Week</option>
          </select>
        </div>

        {/* Totals - These should be calculated dynamically if needed */}
        <div className="flex flex-col p-3 bg-grey-light rounded-xl text-grey-medium my-2">
          <div className="flex justify-between">
            <h1>Total Amount</h1>
            <p>Rs. 0.0</p>
          </div>
          <div className="flex justify-between">
            <h1>Delivery Charge</h1>
            <p>Rs. {formData.deliveryCharge || "0.0"}</p>
          </div>
          <div className="flex justify-between">
            <h5>Total</h5>
            <p>Rs. {formData.deliveryCharge || "0.0"}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex justify-end gap-2 pt-4">
          <Button
            label="Cancel"
            onClick={handleCancel}
            variant="none"
            className="w-full bg-grey hover:bg-grey-medium text-white p-4"
          />
          <Button
            label="Confirm Order"
            onClick={handleSubmit}
            variant="primary"
            className="px-5 w-full"
          />
        </div>
      </div>

      {/* Product Dialog Box */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="max-w-2xl w-full p-6 bg-white rounded-2xl">
            <div className="flex justify-between items-center">
              <Heading title="Add Product" align="left" className="text-grey" />
              <X
                size={24}
                onClick={() => setIsoOpen(false)}
                className="cursor-pointer"
                color="grey"
              />
            </div>
            <Input
              name="product"
              placeholder="Search by Product Name, SKN or Category"
              type="search"
              onClick={handleOpenProductDialog}
              className="w-full py-3 my-4 border border-grey-light rounded-lg ring-1 ring-primary"
              iconLeft={<Search size={24} />}
            />
            <h2 className="h5-bold-16 text-start text-grey">Category</h2>
            <div className="grid grid-cols-3 gap-4 mb-4 pt-3">
              {categories.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => toggleTag(tag)}
                  className={`label-regular-14 px-3 py-2 rounded-md border border-grey-light hover:bg-primary hover:text-white cursor-pointer ${
                    selected.includes(tag)
                      ? "bg-primary text-white border-primary"
                      : "bg-base-white text-grey-medium"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Confirm Order */}
      {showConfirmModal && (
        <ModalMessageBox
          type="success"
          title="Confirm Order?"
          description="Are you sure you want to place this order?"
          confirmLabel="Yes, Confirm"
          cancelLabel="Cancel"
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={confirmOrder}
        />
      )}

      {/* Modal: Success */}
      {showSuccessModal && (
        <ModalMessageBox
          type="success"
          title="Order Placed!"
          description="Your order has been successfully submitted."
          confirmLabel="OK"
          onCancel={closeSuccessModal}
          onConfirm={closeSuccessModal}
        />
      )}
    </aside>
  );
};

export default OrderPannel;
