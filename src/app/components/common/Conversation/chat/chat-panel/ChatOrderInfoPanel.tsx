import React, { useState } from "react";
import { Button, Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { EllipsisVertical } from "lucide-react";
import { ModalMessageBox } from "@/app/features/dashboard/admin/component/ui";
import { AddProduct } from "@/app/features/dashboard/admin/component/";

interface OrderFormData {
  product: string;
  fullName: string;
  phoneNumber: string;
  deliveryCharge: string;
  paymentMethod: string;
  expectedDelivery: string;
  totalAmount: string;
}
interface OrderInfoPanelProps {
  onSendOrderMessage: (msg: any) => void;
}

const OrderInfoPanel: React.FC<OrderInfoPanelProps> = ({
  onSendOrderMessage,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState<OrderFormData>({
    product: "",
    fullName: "",
    phoneNumber: "",
    deliveryCharge: "",
    paymentMethod: "",
    expectedDelivery: "",
    totalAmount: "",
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

    const orderMessage = {
      _id: crypto.randomUUID(),
      type: "order-confirmation",
      sender: "System",
      createdAt: new Date().toISOString(),
      data: {
        productName: formData.product,
        customerName: formData.fullName,
        phone: formData.phoneNumber,
        location: "Nepal",
        totalAmount: Number(formData.totalAmount) || 0,
        deliveryAmount: Number(formData.deliveryCharge) || 0,
        finalAmount:
          (Number(formData.totalAmount) || 0) +
          (Number(formData.deliveryCharge) || 0),
        paymentMethod: formData.paymentMethod,
        expectedDelivery: formData.expectedDelivery,
      },
    };

    // 🚀 SEND to ChatPanel
    onSendOrderMessage(orderMessage);
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
      totalAmount: "",
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
      totalAmount: "",
    });
  };

  const handleOpenProductDialog = () => {
    setIsOpen(true);
  };

  return (
    <aside className="w-96 bg-white overflow-y-auto border-l border-grey-light">
      <div className="flex justify-between items-center border-b border-grey-light py-[15.2px] px-4">
        <Heading title="Order Info" className="text-grey-medium" />
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

        {/* Total Amount */}
        <div className="flex flex-col py-3">
          <h2 className="body-medium-16 text-grey pb-1">Total Amount</h2>
          <Input
            name="totalAmount"
            value={formData.totalAmount}
            type="number"
            placeholder="Enter total amount"
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
            <p>Rs. {formData.totalAmount || "0.0"}</p>
          </div>
          <div className="flex justify-between">
            <h1>Delivery Charge</h1>
            <p>Rs. {formData.deliveryCharge || "0.0"}</p>
          </div>
          <div className="flex justify-between">
            <h5>Total</h5>
            <p>
              Rs.{" "}
              {(Number(formData.totalAmount) || 0) +
                (Number(formData.deliveryCharge) || 0)}
            </p>
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
      <AddProduct isOpen={isOpen} onClose={() => setIsOpen(false)} />

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

export default OrderInfoPanel;
