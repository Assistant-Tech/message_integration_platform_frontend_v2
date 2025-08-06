const PaymentDetails = () => {
  return (
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
  );
};

export default PaymentDetails;
