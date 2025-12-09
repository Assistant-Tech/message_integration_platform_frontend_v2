import React from "react";
import { Button, Input } from "@/app/components/ui";
import Select from "@/app/components/ui/Select";

interface OrderFormViewProps {
  formData: any;
  onChange: (e: any) => void;
  onOpenSearch: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  onSendPaymentLink?: () => void;
}

const OrderFormView: React.FC<OrderFormViewProps> = ({
  formData,
  onChange,
  onOpenSearch,
  onCancel,
  onSubmit,
  onSendPaymentLink,
}) => {
  return (
    <>
      <h1 className="body-bold-16 text-grey-medium pb-2 border-b border-grey-light">
        Create Order
      </h1>

      <div className="flex flex-col py-3">
        <h2 className="body-medium-16 text-grey pb-1">Product</h2>
        <Input
          name="product"
          value={formData.product}
          placeholder="Search"
          onClick={onOpenSearch}
          readOnly
        />
      </div>
      <section className="space-y-4">
        <Input
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          placeholder="Full Name"
        />
        <Input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={onChange}
          placeholder="Phone Number"
        />
        <Input
          name="totalAmount"
          value={formData.totalAmount}
          onChange={onChange}
          placeholder="Total Amount"
        />
        <Input
          name="deliveryCharge"
          value={formData.deliveryCharge}
          onChange={onChange}
          placeholder="Delivery Charge"
        />
        <Select
          value={formData.paymentMethod}
          onChange={onChange}
          options={[
            { label: "Khalti", value: "khalti" },
            { label: "Esewa", value: "esewa" },
            { label: "Stripe", value: "stripe" },
            { label: "Cash On Delivery", value: "cod" },
          ]}
          className="text-grey body-regular-16"
        />
        <Input
          name="expectedDeliveryDate"
          value={formData.expectedDeliveryDate}
          onChange={onChange}
          placeholder="mm/dd/yyyy"
        />
        <div className="flex flex-col items-center justify-start gap-2">
          <label
            htmlFor="orderNotes"
            className="self-start body-medium-16 text-grey"
          >
            Order Notes
          </label>
          <textarea
            className="w-full p-3 border border-grey-light rounded-md resize-none h-24 text-grey body-regular-16"
            placeholder="Order Notes"
            name="orderNotes"
            onChange={onChange}
            // value={formData.orderNotes}
          />
        </div>
      </section>

      <div className="flex gap-2 pt-4">
        <Button
          label="Cancel"
          onClick={onCancel}
          variant="danger"
          className="w-full h-18"
        />
        <Button label="Confirm Order" onClick={onSubmit} className="w-full h-18" />
        <Button
          label="Send Payment"
          type="button"
          onClick={onSendPaymentLink}
          variant="outlined"
          className="w-full h-18"
        />
      </div>
    </>
  );
};

export default OrderFormView;
