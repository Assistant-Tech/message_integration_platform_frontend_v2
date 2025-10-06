import { StripeResponse } from "@/app/types/subscription.types";

interface StripePaymentProps {
  response: StripeResponse;
}

const StripePaymentPage = ({ response }: StripePaymentProps) => {
  if (!response?.data) return null;

  const { paymentUrl, sessionId, expiresAt } = response.data;

  const handleStripeRedirect = () => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Stripe Payment
        </h2>
        <p className="text-gray-600 mb-2">
          Your payment has been initiated with Stripe.
        </p>

        <div className="text-left my-4 space-y-2">
          <p>
            <strong>Session ID:</strong> {sessionId}
          </p>
          <p>
            <strong>Expires At:</strong> {new Date(expiresAt).toLocaleString()}
          </p>
        </div>

        <button
          onClick={handleStripeRedirect}
          className="mt-4 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition"
        >
          Proceed to Stripe
        </button>
      </div>
    </div>
  );
};

export default StripePaymentPage;
