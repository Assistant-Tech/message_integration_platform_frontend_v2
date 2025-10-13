import { useEffect } from "react";
import { useSubscriptionStore } from "@/app/store/subscription.store";
import { initiateSubscription } from "@/app/services/subscription.services";
import {
  KhaltiPayment,
  StripePayment,
  EsewaPayment,
} from "@/app/features/dashboard/admin/pages/payments/gateway";
import {
  isEsewaResponse,
  isKhaltiResponse,
  isStripeResponse,
} from "@/app/types/subscription.types";

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

    if (isEsewaResponse(response)) {
      return <EsewaPayment response={response} />;
    }
    if (isKhaltiResponse(response)) {
      return <KhaltiPayment response={response} />;
    }
    if (isStripeResponse(response)) {
      return <StripePayment response={response} />;
    }

    return <div>Unsupported provider</div>;
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {response && renderPaymentComponent()}
    </div>
  );
};

export default PaymentSection;
