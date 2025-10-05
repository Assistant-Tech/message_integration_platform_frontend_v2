import { useEffect } from "react";
import { useSubscriptionStore } from "@/app/store/subscription.store";
import { initiateSubscription } from "@/app/services/subscription.services";
import {
  KhaltiPayment,
  StripePayment,
  EsewaPayment,
} from "@/app/pages/payment/gateway";

const PaymentSection = () => {
  const { initiationData, response, loading, setResponse } =
    useSubscriptionStore();

  useEffect(() => {
    if (!initiationData) return;

    initiateSubscription(initiationData)
      .then((res) => {
        console.log("Subscription response: ", res);
        setResponse(res);
      })
      .catch((err) => {
        console.error("Subscription error: ", err);
      });
  }, [initiationData, setResponse]);

  const renderPaymentComponent = () => {
    if (!response || !initiationData) return null;

    switch (initiationData.paymentProvider) {
      case "esewa":
        return <EsewaPayment response={response} />;
      case "khalti":
        return <KhaltiPayment response={response} />;
      case "stripe":
        return <StripePayment response={response} />;
      default:
        return <div>Unsupported provider</div>;
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {response && renderPaymentComponent()}
    </div>
  );
};

export default PaymentSection;
