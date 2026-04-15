import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  Download,
  Eye,
  Calendar,
  FileText,
  Receipt,
  EyeIcon,
  X,
} from "lucide-react";
import {
  getSubscriptionInvoices,
  getSubscriptionInvoiceById,
} from "@/app/services/subscription.services";
import {
  getTranscation,
  getTranscationById,
} from "@/app/services/payment.services";
import { toast } from "sonner";
import { Invoice } from "@/app/types/subscription.types";
import jsPDF from "jspdf";

interface Transaction {
  id: string;
  amount: string;
  currency: string;
  status: string;
  type: string;
  providerTransactionId: string;
  createdAt: string;
  paymentMethod: {
    provider: string;
  };
  Invoice: {
    invoiceNumber: string;
  };
}

export interface TransactionDetails {
  id: string;
  tenantId: string;
  paymentMethodId: string;
  subscriptionId: string;
  amount: string;
  currency: string;
  status: string;
  type: string;
  providerTransactionId: string;
  providerReferenceId: string;
  processingFee: string | null;
  netAmount: string | null;
  createdAt: string;
  updatedAt: string;
  invoiceId: string;
  Invoice: Invoice;
}

const BillingSubscription = ({
  subscriptionId,
}: {
  subscriptionId: string | undefined;
}) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionDetails | null>(null);

  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  useEffect(() => {
    if (subscriptionId) {
      fetchInvoices(subscriptionId);
      fetchTransactions();
    }
  }, [subscriptionId]);

  const fetchInvoices = async (subId: string) => {
    try {
      setLoading(true);
      const response = await getSubscriptionInvoices(subId);
      setInvoices(response);
    } catch {
      toast.error("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      setLoadingTransactions(true);
      const response = await getTranscation();
      setTransactions(response?.data || []);
    } catch {
      toast.error("Failed to load transactions");
    } finally {
      setLoadingTransactions(false);
    }
  };

  const handleViewInvoice = async (invoiceId: string) => {
    try {
      const response = await getSubscriptionInvoiceById(invoiceId);
      setSelectedInvoice(response?.data ?? null);
      setIsInvoiceModalOpen(true);
    } catch {
      toast.error("Failed to load invoice details");
    }
  };

  const handleViewTransactionDetails = async (transactionId: string) => {
    try {
      const response = await getTranscationById(transactionId);
      setSelectedTransaction(response?.data ?? null);
      setIsTransactionModalOpen(true);
    } catch {
      toast.error("Failed to load transaction details");
    }
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    try {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("Invoice", 20, 20);
      doc.setFontSize(12);
      doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 20, 40);
      doc.text(`Date: ${formatDate(invoice.createdAt)}`, 20, 50);
      doc.text(
        `Total: ${formatAmount(invoice.total, invoice.currency)}`,
        20,
        60,
      );
      doc.text(`Status: ${invoice.status}`, 20, 70);
      doc.text(`Currency: ${invoice.currency}`, 20, 80);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 100);

      doc.save(`${invoice.invoiceNumber || "invoice"}.pdf`);
      toast.success("Invoice downloaded successfully");
    } catch {
      toast.error("Failed to generate PDF");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
      case "success":
        return "bg-primary-light text-primary";
      case "pending":
        return "bg-warning-light text-warning-dark";
      case "failed":
        return "bg-danger-light text-danger-dark";
      case "draft":
        return "bg-grey-light text-grey-medium";
      default:
        return "bg-grey-light text-grey-medium";
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

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
      {/* HEADER */}
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

      {/* INVOICES */}
      {!loading && invoices.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs text-grey uppercase tracking-wider">
                    Invoice Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-grey uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-grey uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-grey uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-grey uppercase tracking-wider">
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
                    <td className="px-6 py-4 whitespace-nowrap text-grey-medium">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(invoice.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-grey">
                      <div className="flex items-center gap-2">
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
                        className="p-2 text-primary hover:bg-primary-light rounded-lg"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadInvoice(invoice)}
                        className="p-2 text-primary hover:bg-primary-light rounded-lg"
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

      {/* TRANSACTION HISTORY */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Receipt className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-grey">Transaction History</h2>
        </div>
        <p className="text-grey-medium body-medium-16">
          View all your payment transactions and their status
        </p>
      </div>

      {loadingTransactions && (
        <div className="flex justify-center items-center py-12 bg-white rounded-lg">
          <Loader2 className="animate-spin text-primary w-6 h-6" />
          <span className="ml-2 text-grey">Loading transactions...</span>
        </div>
      )}

      {!loadingTransactions && transactions.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-grey uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-left text-xs text-grey uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-4 text-left text-xs text-grey uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs text-grey uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs text-grey uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-4 text-left text-xs text-grey uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs text-grey uppercase tracking-wider">
                  View
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((t) => (
                <motion.tr
                  key={t.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-grey-medium font-mono text-sm">
                    {t.providerTransactionId}
                  </td>
                  <td className="px-6 py-4">
                    {t.Invoice?.invoiceNumber || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(t.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-grey">
                    <div className="flex items-center gap-2">
                      {formatAmount(t.amount, t.currency)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-information rounded-full text-xs">
                      {t.paymentMethod?.provider || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                        t.status,
                      )}`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleViewTransactionDetails(t.id)}
                      className="p-2 text-primary hover:bg-primary-light rounded-lg"
                    >
                      <EyeIcon size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TRANSACTION DETAILS MODAL */}
      {isTransactionModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold text-grey">
                Transaction Details
              </h3>
              <button
                onClick={() => setIsTransactionModalOpen(false)}
                className="text-grey-medium hover:text-grey"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-grey-medium mb-1">Transaction ID</p>
                  <p className="text-grey font-mono text-sm">
                    {selectedTransaction.providerTransactionId}
                  </p>
                </div>
                <div>
                  <p className="text-grey-medium mb-1">Amount</p>
                  <p className="text-grey">
                    {formatAmount(
                      selectedTransaction.amount,
                      selectedTransaction.currency,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-grey-medium mb-1">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs ${getStatusColor(
                      selectedTransaction.status,
                    )}`}
                  >
                    {selectedTransaction.status}
                  </span>
                </div>
                <div>
                  <p className="text-grey-medium mb-1">Payment Method</p>
                  <p className="text-grey">
                    {selectedTransaction?.Invoice?.paymentMethod || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-grey-medium mb-1">Created</p>
                  <p className="text-grey">
                    {formatDate(selectedTransaction.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-grey-medium mb-1">Invoice</p>
                  <p className="text-grey">
                    {selectedTransaction?.Invoice?.invoiceNumber || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex justify-end">
              <button
                onClick={() => setIsTransactionModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* INVOICE DETAILS MODAL */}
      {isInvoiceModalOpen && selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold text-grey">Invoice Details</h3>
              <button
                onClick={() => setIsInvoiceModalOpen(false)}
                className="text-grey-medium hover:text-grey"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-grey-medium mb-1">Invoice #</p>
                <p className="text-grey">{selectedInvoice.invoiceNumber}</p>
              </div>
              <div>
                <p className="text-grey-medium mb-1">Date</p>
                <p className="text-grey">
                  {formatDate(selectedInvoice.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-grey-medium mb-1">Total</p>
                <p className="text-grey">
                  {formatAmount(
                    selectedInvoice.total,
                    selectedInvoice.currency,
                  )}
                </p>
              </div>
              <div>
                <p className="text-grey-medium mb-1">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs ${getStatusColor(
                    selectedInvoice.status,
                  )}`}
                >
                  {selectedInvoice.status}
                </span>
              </div>
            </div>

            <div className="p-6 border-t flex justify-between gap-3">
              <button
                onClick={() => handleDownloadInvoice(selectedInvoice)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={() => setIsInvoiceModalOpen(false)}
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
