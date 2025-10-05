import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSubscriptionStore } from "@/app/store/subscription.store";
import {
  completeSubscription,
  getSubscriptionInvoices,
} from "@/app/services/subscription.services";
import { InvoiceResponse } from "@/app/types/subscription.types";
import api from "@/app/services/api/axios";

const SubscriptionConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const {
    subscription,
    invoices,
    setSubscription,
    setInvoices,
    setLoading,
    setError,
    loading,
  } = useSubscriptionStore();

  const [status, setStatus] = useState("Loading subscription...");

  useEffect(() => {
    const provider = searchParams.get("provider")?.toLowerCase();
    const subscriptionId = searchParams.get("subscriptionId");
    const transactionId =
      searchParams.get("transactionId") ||
      searchParams.get("transaction_id") ||
      searchParams.get("tidx") ||
      searchParams.get("txnId");
    const sessionId = searchParams.get("sessionId");
    const base64 = searchParams.get("base64");

    if (
      !slug ||
      !provider ||
      !subscriptionId ||
      (!transactionId && !sessionId)
    ) {
      setError("Missing required payment information");
      setStatus("Invalid payment data");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setStatus("Completing subscription...");


        const completedSub = await completeSubscription(
          subscriptionId,
          transactionId!,
        );
        setSubscription(completedSub);

        const invoiceData: InvoiceResponse[] =
          await getSubscriptionInvoices(subscriptionId);
        setInvoices(invoiceData);

        setStatus("Subscription completed successfully!");
        toast.success("🎉 Subscription completed successfully!");
      } catch (err: any) {
        console.error(err);
        setError(err?.message || "Failed to complete subscription");
        setStatus("Failed to complete subscription");
        toast.error(err?.message || "Payment verification failed");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams, slug, setSubscription, setInvoices, setLoading, setError]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-lg text-grey-medium">{status}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 border rounded-md shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Subscription Confirmation</h2>

      {subscription ? (
        <>
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

          <h3 className="text-xl font-semibold mt-6 mb-2">Invoices</h3>
          {invoices?.length ? (
            <ul className="list-disc pl-5 space-y-2">
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
            onClick={() => navigate(`/${slug}/admin/dashboard`)}
            className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Go to Dashboard
          </button>
        </>
      ) : (
        <p>No subscription data found.</p>
      )}
    </div>
  );
};

export default SubscriptionConfirmation;
