import { usePaymentStore } from "@/app/store/payment.store";

const PaymentSuccessPage = () => {
  const { provider, sessionId, subscriptionId, transactionId } =
    usePaymentStore();

  console.log("🚀 ~ PaymentSuccessPage ~ provider:", provider);
  console.log("🚀 ~ PaymentSuccessPage ~ sessionId:", sessionId);
  console.log("🚀 ~ PaymentSuccessPage ~ subscriptionId:", subscriptionId);
  console.log("🚀 ~ PaymentSuccessPage ~ transactionId:", transactionId);

  if (!provider || !sessionId || !subscriptionId || !transactionId) {
    return <div>Invalid payment data.</div>;
  }

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Provider: {provider}</p>
      <p>Subscription ID: {subscriptionId}</p>
      <p>Transaction ID: {transactionId}</p>
    </div>
  );
};

export default PaymentSuccessPage;
