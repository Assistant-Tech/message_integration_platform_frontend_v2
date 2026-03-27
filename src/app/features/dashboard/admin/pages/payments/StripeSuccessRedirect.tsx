import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/app/services/api/axios";
import {
  SubscriptionData,
  InvoiceResponse,
} from "@/app/types/subscription.types";

const StripeSuccessRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("Verifying payment...");
  const [subscription, setSubscription] = useState<SubscriptionData | null>(
    null,
  );
  const [invoices, setInvoices] = useState<InvoiceResponse[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get("sessionId");
    if (!slug || !sessionId) {
      navigate(slug ? `/app/${slug}/admin/dashboard` : "/", {
        replace: true,
      });
      return;
    }

    const completeStripeSubscription = async () => {
      try {
        setStatusMessage("Completing your subscription...");
        setLoading(true);

        // Complete subscription
        const { data: completedSub } = await api.get<{
          data: SubscriptionData;
        }>(`/subscription/complete`, { params: { sessionId } });
        setSubscription(completedSub.data);

        // Fetch invoices
        const { data: invoicesData } = await api.get<{
          data: InvoiceResponse[];
        }>(`/subscription/${completedSub.data.id}/invoices`);
        setInvoices(invoicesData.data);

        toast.success("🎉 Payment verified & subscription completed!");

        // Show the dialog
        setShowDialog(true);
      } catch (err: any) {
        console.error(err);
        toast.error(
          err?.message ||
            "Payment verification or subscription completion failed",
        );
        setStatusMessage("Failed to complete subscription");
      } finally {
        setLoading(false);
      }
    };

    completeStripeSubscription();
  }, [slug, searchParams, navigate]);

  // Show loading spinner while fetching
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg text-grey-medium">{statusMessage}</p>
      </div>
    );
  }

  // Show dialog after loading
  if (showDialog && subscription) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="bg-white p-6 rounded-md shadow-lg max-w-2xl w-full">
          <h2 className="text-2xl font-semibold mb-4">
            Subscription Completed 🎉
          </h2>

          <p className="mb-2">
            <strong>Plan:</strong> {subscription.plan?.name ?? "N/A"} (
            {subscription.plan?.interval ?? "N/A"})
          </p>
          <p className="mb-2">
            <strong>Status:</strong> {subscription.status}
          </p>
          <p className="mb-2">
            <strong>Start Date:</strong>{" "}
            {subscription.startDate
              ? new Date(subscription.startDate).toLocaleDateString()
              : "N/A"}
          </p>
          <p className="mb-2">
            <strong>End Date:</strong>{" "}
            {subscription.endDate
              ? new Date(subscription.endDate).toLocaleDateString()
              : "N/A"}
          </p>

          <h3 className="text-xl font-semibold mt-4 mb-2">Invoices</h3>
          {invoices.length ? (
            <ul className="list-disc pl-5 space-y-1">
              {invoices.map((inv) => (
                <li key={inv.id}>
                  <strong>{inv.invoiceNumber}</strong> - {inv.status} -{" "}
                  {inv.total} {subscription.currency}
                </li>
              ))}
            </ul>
          ) : (
            <p>No invoices found.</p>
          )}

          <button
            onClick={() => navigate(`/app/${slug}/admin/dashboard`)}
            className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Fallback if no dialog & no subscription
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <p className="text-lg text-grey">{statusMessage}</p>
    </div>
  );
};

export default StripeSuccessRedirect;
