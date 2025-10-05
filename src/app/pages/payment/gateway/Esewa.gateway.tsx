import { useEffect, useRef } from "react";
import { SubscriptionResponse } from "@/app/types/subscription.types";

interface EsewaPaymentProps {
  response: SubscriptionResponse;
}

const EsewaPayment = ({ response }: EsewaPaymentProps) => {
  console.log("🚀 ~ EsewaPayment ~ response:", response);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  return (
    <div>
      <h3>Redirecting to eSewa...</h3>
      <form ref={formRef} action={response.data.paymentUrl} method="POST">
        {Object.entries(response.data.fields).map(([key, value]) => (
          <input
            key={key}
            type="hidden"
            name={key}
            value={String(value ?? "")}
          />
        ))}
      </form>
    </div>
  );
};

export default EsewaPayment;
