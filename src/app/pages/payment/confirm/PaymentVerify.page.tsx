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
    async function handlePaymentCallback() {
      const params = new URLSearchParams(location.search);
      const provider = params.get("provider");
      console.log("🚀 ~ PaymentVerify ~ provider:", provider);
      if (!provider) {
        navigate("/", { replace: true });
        return;
      }
      const response = await api.post(`/payment/callback?${params.toString()}`);

      setPaymentData(response.data?.data);
    }
    handlePaymentCallback();
  }, [location, navigate, setPaymentData]);

  return <div>Verifying Payment...</div>;
};

export default PaymentVerify;
