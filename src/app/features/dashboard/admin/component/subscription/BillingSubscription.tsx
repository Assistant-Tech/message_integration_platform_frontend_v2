import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  Download,
  Eye,
  Calendar,
  CreditCard,
  FileText,
} from "lucide-react";
import {
  getSubscriptionInvoices,
  getSubscriptionInvoiceById,
} from "@/app/services/subscription.services";
import { useSubscriptionStore } from "@/app/store/subscription.store";
import { toast } from "sonner";
import { Invoice } from "@/app/types/subscription.types";
import api from "@/app/services/api/axios";

const BillingSubscription = ({
  subscriptionId,
}: {
  subscriptionId: string | undefined;
}) => {
  console.log("🚀 ~ BillingSubscription ~ subscriptionId:", subscriptionId);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, setLoading } = useSubscriptionStore();

  useEffect(() => {
    if (subscriptionId) {
      fetchInvoices(subscriptionId);
    }
  }, [subscriptionId]);

  const fetchInvoices = async (subId: string) => {
    try {
      setLoading(true);
      const response = await getSubscriptionInvoices(subId);
      console.log("🚀 ~ fetchInvoices ~ response:", response);

      setInvoices(response);
    } catch (error) {
      toast.error("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  const handleViewInvoice = async (invoiceId: string) => {
    try {
      const response = await getSubscriptionInvoiceById(invoiceId);
      setSelectedInvoice(response?.data ?? null);
      setIsModalOpen(true);
    } catch (error) {
      toast.error("Failed to load invoice details");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatAmount = (amount: string | number, currency: string = "NPR") => {
    const numericAmount = typeof amount === "string" ? Number(amount) : amount;
    const normalized = numericAmount / 100;
    return currency === "NPR"
      ? `रु${normalized.toFixed(2)}`
      : `$${normalized.toFixed(2)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-grey">
            Billing Information & Invoices
          </h2>
        </div>
        <p className="text-grey-medium body-medium-16">
          View and download your billing history and invoices
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-12 bg-white rounded-lg">
          <Loader2 className="animate-spin text-primary w-6 h-6" />
          <span className="ml-2 text-grey">Loading invoices...</span>
        </div>
      )}

      {/* Invoice Table */}
      {!loading && invoices.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs  text-grey uppercase tracking-wider">
                    Invoice Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs  text-grey uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs  text-grey uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs  text-grey uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs  text-grey uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap body-medium-16 text-grey-medium">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap body-medium-16 text-grey-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(invoice.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap body-medium-16 text-grey">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-grey-medium" />
                        {formatAmount(invoice.total, invoice.currency)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                          invoice.status,
                        )}`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <button
                        onClick={() => handleViewInvoice(invoice.id)}
                        className="p-2 text-primary hover:bg-primary-light rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        // onClick={() => handleDownloadInvoice(invoice.id)}
                        className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && invoices.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <FileText className="w-16 h-16 text-grey-light mx-auto mb-4" />
          <h3 className="text-lg  text-grey mb-2">No Invoices Yet</h3>
          <p className="text-grey-medium">
            Your billing history will appear here once you have an active
            subscription
          </p>
        </div>
      )}

      {/* Invoice Details Modal */}
      {isModalOpen && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 flex justify-between">
              <h3 className="text-xl font-bold text-grey">Invoice Details</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-grey-medium hover:text-grey text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="body-medium-16 text-grey-medium mb-1">
                    Invoice #
                  </p>
                  <p className=" text-grey">{selectedInvoice.invoiceNumber}</p>
                </div>
                <div>
                  <p className="body-medium-16 text-grey-medium mb-1">Date</p>
                  <p className=" text-grey">
                    {formatDate(selectedInvoice.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="body-medium-16 text-grey-medium mb-1">Total</p>
                  <p className=" text-grey">
                    {formatAmount(
                      selectedInvoice.total,
                      selectedInvoice.currency,
                    )}
                  </p>
                </div>
                <div>
                  <p className="body-medium-16 text-grey-medium mb-1">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full body-medium-16 ${getStatusColor(
                      selectedInvoice.status,
                    )}`}
                  >
                    {selectedInvoice.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                // onClick={() => handleDownloadInvoice(selectedInvoice.id)}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default BillingSubscription;
