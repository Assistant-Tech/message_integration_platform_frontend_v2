import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "@/app/services/api/axios";
import { useAuthStore } from "@/app/store/auth.store";
import { usePaymentStore } from "@/app/store/payment.store";

const PaymentVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tenantSlug = useAuthStore((state) => state.tenantSlug);
  const setPaymentData = usePaymentStore((s) => s.setPaymentData);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provider = params.get("provider");
    console.log("🚀 ~ PaymentVerify ~ provider:", provider);

    if (!provider) {
      navigate("/", { replace: true });
      return;
    }

    const verifyStripe = async () => {
      try {
        const sessionId = params.get("sessionId");
        const subscriptionId = params.get("subscriptionId");
        console.log("🚀 ~ verifyStripe ~ subscriptionId:", subscriptionId);
        const transactionId = params.get("transactionId");
        console.log("🚀 ~ verifyStripe ~ transactionId:", transactionId);

        if (!sessionId || !subscriptionId || !transactionId) {
          throw new Error("Missing Stripe parameters");
        }

        const response = await api.post("/payment/callback", {
          provider: "STRIPE",
          sessionId,
          subscriptionId,
          transactionId,
        });

        if (!response.data.success) throw new Error(response.data.message);

        setPaymentData({
          provider: "stripe",
          sessionId,
          subscriptionId,
          transactionId,
        });
        navigate(`/${tenantSlug}/success`, { replace: true });
      } catch (error: any) {
        console.error(error);
        navigate("/payments/failure", { replace: true });
      }
    };

    const verifyEsewa = async () => {
      try {
        const subscriptionId = params.get("subscriptionId");
        const transactionId = params.get("transactionId");

        if (!subscriptionId || !transactionId) {
          throw new Error("Missing eSewa parameters");
        }

        const response = await api.post("/payment/callback", {
          provider: "ESEWA",
          subscriptionId,
          transactionId,
          base64: params.get("base64") || "",
        });

        if (!response.data.success) throw new Error(response.data.message);

        setPaymentData({ provider: "esewa", subscriptionId, transactionId });
        navigate(`/${tenantSlug}/success`, { replace: true });
      } catch (error: any) {
        console.error(error);
        navigate("/payments/failure", { replace: true });
      }
    };

    const verifyKhalti = async () => {
      try {
        const subscriptionId = params.get("subscriptionId");
        const transactionId =
          params.get("transactionId") ||
          params.get("txnId") ||
          params.get("tidx") ||
          params.get("transaction_id");

        if (!subscriptionId || !transactionId) {
          throw new Error("Missing Khalti parameters");
        }

        const response = await api.post("/payment/callback", {
          provider: "KHALTI",
          subscriptionId,
          transactionId,
          amount: params.get("amount") || params.get("total_amount"),
          mobile: params.get("mobile"),
          pidx: params.get("pidx"),
          status: params.get("status"),
        });
        // debugger;
        console.log("Khalti subscriptionId:", subscriptionId);
        console.log("Khalti transactionId:", transactionId);

        if (!response.data.success) throw new Error(response.data.message);

        setPaymentData({ provider: "khalti", subscriptionId, transactionId });
        navigate(`/${tenantSlug}/success`, { replace: true });
      } catch (error: any) {
        console.error(error);
        navigate("/payments/failure", { replace: true });
      }
    };

    switch (provider.toLowerCase()) {
      case "stripe":
      case "STRIPE":
        verifyStripe();
        break;
      case "esewa":
      case "ESEWA":
        verifyEsewa();
        break;
      case "khalti":
      case "KHALTI":
        verifyKhalti();
        break;
      default:
        navigate("/", { replace: true });
    }
  }, [navigate, tenantSlug, setPaymentData]);

  return <div>Verifying Payment...</div>;
};

export default PaymentVerify;
