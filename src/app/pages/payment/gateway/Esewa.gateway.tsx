import { useEffect, useRef } from "react";
import { EsewaResponse } from "@/app/types/subscription.types";

interface EsewaPaymentProps {
  response: EsewaResponse;
}

const EsewaPayment = ({ response }: EsewaPaymentProps) => {
  const { fields } = response.data;

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  return (
    <div>
      <h3>Redirecting to eSewa...</h3>
      <form ref={formRef} action={response.data?.paymentUrl} method="POST">
        {Object.entries(fields).map(([key, value]) => (
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
