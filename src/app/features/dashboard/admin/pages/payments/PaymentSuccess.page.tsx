import { useNavigate } from "react-router-dom";
import { usePaymentStore } from "@/app/store/payment.store";
import { useAuthStore } from "@/app/store/auth.store";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const tenantSlug = useAuthStore((s) => s.tenantSlug);

  const {
    provider = "stripe",
    subscriptionId,
    transactionId,
    providerReferenceId,
    status,
  } = usePaymentStore();

  if (!subscriptionId || transactionId) {
    return (
      <div className="text-center mt-10 text-red-500">
        Invalid payment data.
      </div>
    );
  }

  const goToInvoices = () => {
    navigate(`/${tenantSlug}/subscription/confirmation`);
  };

  const goToDashboard = () => {
    navigate(`/${tenantSlug}/admin/dashboard`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>

      <div className="text-gray-700 space-y-1 text-center">
        <p>
          <strong>Provider:</strong> {provider}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Subscription ID:</strong> {subscriptionId}
        </p>
        <p>
          <strong>Transaction ID:</strong> {transactionId}
        </p>
        {providerReferenceId && (
          <p>
            <strong>Reference ID:</strong> {providerReferenceId}
          </p>
        )}
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={goToInvoices}
          className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          View Invoice
        </button>
        <button
          onClick={goToDashboard}
          className="px-5 py-2 border border-gray-400 rounded-md hover:bg-gray-100"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
