import { StripeResponse } from "@/app/types/subscription.types";

interface StripePaymentProps {
  response: StripeResponse;
}

const StripePaymentPage = ({ response }: StripePaymentProps) => {
  if (!response?.data) return null;

  const { paymentUrl, sessionId, expiresAt } = response.data;

  const handleStripeRedirect = () => {
    if (paymentUrl) {
      window.open(paymentUrl, "_blank");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Complete Payment
          </h2>
          <p className="text-gray-600">
            Click the button below to proceed with Stripe
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
          <div>
            <p className="text-sm text-gray-500 mb-1">Session ID</p>
            <p className="text-sm text-gray-900 font-mono break-all">{sessionId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Expires At</p>
            <p className="text-sm text-gray-900">
              {new Date(expiresAt).toLocaleString()}
            </p>
          </div>
        </div>

        <button
          onClick={handleStripeRedirect}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition"
        >
          Continue to Stripe
        </button>
      </div>
    </div>
  );
};

export default StripePaymentPage;