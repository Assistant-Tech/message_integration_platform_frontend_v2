import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "@/app/services/api/axios";
import { usePaymentStore } from "@/app/store/payment.store";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/app/store/auth.store";
import { parseQuery } from "@/app/utils/queryParser";

const PaymentVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tenantSlug = useAuthStore((s) => s.tenantSlug);

  const setPaymentData = usePaymentStore((s) => s.setPaymentData);
  const setInvoiceData = usePaymentStore((s) => s.setInvoiceData);
  const setSubscriptionId = usePaymentStore((s) => s.setSubscriptionId);

  useEffect(() => {
    async function handlePaymentCallback() {
      const params = new URLSearchParams(location.search);
      const provider = params.get("provider");
      const query = parseQuery(params.toString());

      console.log("query", query);

      if (!provider) {
        navigate("/", { replace: true });
        return;
      }

      try {
        const response = await api.post(`/payment/callback?${query}`);

        if (response.data) {
          const {
            provider,
            subscriptionId,
            transactionId,
            providerReferenceId,
            status,
          } = response.data.data;

          setPaymentData({
            provider,
            subscriptionId,
            transactionId,
            providerReferenceId,
            status,
          });

          setSubscriptionId(subscriptionId);

          if (status === "SUCCESS") {
            const invoiceResponse = await api.get(
              `/subscription/${subscriptionId}/invoices`,
            );
            setInvoiceData(invoiceResponse.data.data);

            setTimeout(() => {
              navigate(`/app/${tenantSlug}/subscription/confirmation`, {
                replace: true,
              });
            }, 2000);
          }
        } else {
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error("Payment verification failed:", error);
        navigate("/", { replace: true });
      }
    }

    handlePaymentCallback();
  }, [
    location,
    navigate,
    setPaymentData,
    setInvoiceData,
    setSubscriptionId,
    tenantSlug,
  ]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-lg font-semibold text-grey-medium">
          Verifying your payment...
        </p>
      </div>
    </div>
  );
};

export default PaymentVerify;
