import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/app/components/ui";
import { Loading } from "@/app/components/common";
import { toast } from "sonner";
import api from "@/app/services/api/axios";
import { useSubscriptionStore } from "@/app/store/subscription.store";

const PaymentCallbackPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const { setResponse } = useSubscriptionStore();

  const queryParams = new URLSearchParams(search);

  const provider = queryParams.get("provider")?.toUpperCase();
  const sessionId =
    queryParams.get("session_id") || queryParams.get("sessionId");
  const pidx = queryParams.get("pidx");
  const base64 = queryParams.get("base64") || queryParams.get("data");
  const subscriptionId = queryParams.get("subscriptionId");
  const transactionId = queryParams.get("transactionId");
  const status = queryParams.get("status");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setPaymentStatus(null);

        if (!provider) {
          toast.error("Payment provider is missing in callback URL.");
          setPaymentStatus("Invalid callback URL");
          return;
        }

        let payload: Record<string, string> = {};

        // 🔹 Handle Khalti
        if (provider === "KHALTI" && pidx) {
          const transactionId =
            queryParams.get("transactionId") ||
            queryParams.get("txnId") ||
            queryParams.get("tidx") ||
            queryParams.get("transaction_id");

          if (!subscriptionId || !transactionId) {
            throw new Error("Missing Khalti required parameters");
          }

          payload = {
            provider: "KHALTI",
            subscriptionId,
            transactionId,
            pidx,
            amount:
              queryParams.get("amount") ||
              queryParams.get("total_amount") ||
              "",
            mobile: queryParams.get("mobile") || "",
            status: status || "",
            purchase_order_id: queryParams.get("purchase_order_id") || "",
            purchase_order_name: queryParams.get("purchase_order_name") || "",
          };
        }

        // 🔹 Handle eSewa
        else if (provider === "ESEWA" && base64) {
          payload = { base64 };
        }

        // 🔹 Handle Stripe
        else if (provider === "STRIPE" && sessionId) {
          payload = { sessionId };
        }

        // 🔹 Handle basic success/failure redirect callbacks
        else if (status) {
          setPaymentStatus(
            status === "success"
              ? "Payment Successful"
              : status === "failure"
                ? "Payment Failed"
                : "Payment status unknown",
          );
          return;
        }

        // 🔹 Handle invalid callbacks
        else {
          toast.error("Invalid or incomplete payment callback parameters.");
          setPaymentStatus("Invalid callback URL");
          return;
        }

        // ✅ Always ensure body is a valid JSON object
        const safePayload =
          payload && Object.keys(payload).length > 0 ? payload : {};

        const { data } = await api.post(
          `/payment/callback?provider=${provider.toLowerCase()}`,
          safePayload,
        );

        if (data?.success) {
          setPaymentStatus("Payment Successful");
          toast.success("Payment verified successfully.");

          // Optional: Complete subscription process if applicable
          if (subscriptionId && transactionId) {
            try {
              const completeRes = await api.get(
                `/subscription/complete?subscriptionId=${subscriptionId}&transactionId=${transactionId}`,
              );
              setResponse(completeRes.data);
            } catch (err) {
              console.error("Error completing subscription:", err);
            }
          }

          setTimeout(() => navigate("/admin/dashboard"), 2000);
        } else {
          setPaymentStatus("Payment Failed");
          toast.error(data?.message || "Payment verification failed.");
        }
      } catch (error: any) {
        console.error("Payment verification failed:", error);
        toast.error("Error verifying payment.");
        setPaymentStatus("Error verifying payment");
      }
    };

    verifyPayment();
  }, [
    provider,
    sessionId,
    pidx,
    base64,
    subscriptionId,
    transactionId,
    status,
    navigate,
    setResponse,
  ]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-base-white text-grey">
      {paymentStatus ? (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-xl font-semibold">{paymentStatus}</h1>
          <Button label="Go Back to Home" onClick={() => navigate("/")} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default PaymentCallbackPage;
