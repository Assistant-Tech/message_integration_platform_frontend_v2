import { Button, Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { EllipsisVertical } from "lucide-react";

const OrderPannel = () => {
  return (
    <aside className="w-full bg-white">
      <div className="flex justify-between items-center border-b border-grey-light py-4 px-4">
        <Heading title="Order Info" className="text-base-black" />
        <EllipsisVertical size={24} color="black" />
      </div>
      {/* form section to search */}
      <div className="p-6">
        <h1 className="body=bold-16 text-grey-medium pb-2 border-b border-grey-light">
          Create Order
        </h1>

        {/* Search Product */}
        <div className="flex flex-col justify-start items-start py-3">
          <h2 className="body-medium-16 text-grey pb-1">Product</h2>
          <div className="flex justify-start items-center w-full">
            <Input
              type="text"
              placeholder="Search"
              className="block w-full py-3 border border-grey-light rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        {/* Full name Product */}
        <div className="flex flex-col justify-start items-start py-3">
          <h2 className="body-medium-16 text-grey pb-1">Full Name</h2>
          <div className="flex justify-start items-center w-full">
            <Input
              type="text"
              placeholder="Enter full name"
              className="block w-full py-3 border border-grey-light rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        {/* Location */}
        <div className="flex flex-col justify-start items-start py-3">
          <h2 className="body-medium-16 text-grey pb-1">Phone Number</h2>
          <div className="flex justify-start items-center w-full">
            <Input
              type="text"
              placeholder="Enter phone number"
              className="block w-full py-3 border border-grey-light rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        {/* Delivery Charge */}
        <div className="flex flex-col justify-start items-start py-3">
          <h2 className="body-medium-16 text-grey pb-1">Delivery Charge</h2>
          <div className="flex justify-start items-center w-full">
            <Input
              type="text"
              placeholder="Enter delivery charge"
              className="block w-full py-3 border border-grey-light rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        {/* Payment Method  */}
        <div className="w-full flex flex-col justify-start items-start py-3">
          <h2 className="body-medium-16 text-grey pb-1">Payment Method</h2>
          <div className="flex justify-start items-center w-full gap-3">
            <select
              name="paymentMethod"
              id="paymentMethod"
              className="block w-full py-3 px-4 border border-grey-light text-grey rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="" disabled selected>
                Select payment method
              </option>
              <option value="paypal">Stripe</option>
              <option value="khalti">Khalti</option>
              <option value="esewa">Esewa</option>
              <option value="cash">Cash On Delivery</option>
            </select>
          </div>
        </div>
        {/* Expected Delivery  */}
        <div className="w-full flex flex-col justify-start items-start py-3">
          <h2 className="body-medium-16 text-grey pb-1">Expected Delivery</h2>
          <div className="flex justify-start items-center w-full gap-3">
            <select
              name="calander"
              id="calander"
              className="block w-full py-3 px-4 border border-grey-light text-grey rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              {/* change calender */}
              <option value="" disabled selected>
                Select expected delivery
              </option>
              <option value="paypal">Stripe</option>
              <option value="khalti">Khalti</option>
              <option value="esewa">Esewa</option>
              <option value="cash">Cash On Delivery</option>
            </select>
          </div>
        </div>

        {/* Totality Calculation */}
        <div className="flex flex-col p-3 bg-grey-light rounded-xl text-grey-medium my-2">
          <div className="flex justify-between items- body-medium-16">
            <h1>Total Amount</h1>
            <p>Rs. 0.0</p>
          </div>
          <div className="flex justify-between items- body-medium-16">
            <h1>Delivery Charge</h1>
            <p>Rs. 0.0</p>
          </div>
          <div className="flex justify-between items- body-medium-16">
            <h5>Total</h5>
            <p>Rs. 0.0</p>
          </div>
        </div>
        {/* Button */}
        <div className="w-full flex justify-end gap-2 pt-4">
          <Button
            label="Cancel"
            variant="none"
            className="w-full bg-grey hover:bg-grey-medium text-white p-4"
          />
          <Button
            label="Confirm Order"
            variant="primary"
            className="px-5 w-full"
          />
        </div>
      </div>
    </aside>
  );
};

export default OrderPannel;
