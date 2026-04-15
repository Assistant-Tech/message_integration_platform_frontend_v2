import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePaymentStore } from "@/app/store/payment.store";
import * as Dialog from "@radix-ui/react-dialog";
import { Loading } from "@/app/components/common";
import { formatCurrency } from "@/app/utils/helper";

const SubscriptionConfirmation = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const invoiceData = usePaymentStore((state) => state.invoiceData);
  const [showDialog, setShowDialog] = useState(true);

  if (!invoiceData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (invoiceData.length === 0) {
    return <p>No invoice data available.</p>;
  }

  const handleConfirm = () => {
    setShowDialog(false);
    navigate(`/app/${slug}/admin/dashboard`);
  };

  const invoice = invoiceData[0];

  return (
    <Dialog.Root open={showDialog} onOpenChange={setShowDialog}>
      <Dialog.Overlay className="fixed inset-0 bg-black/30 bg-opacity-50 z-50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-lg mx-auto p-6 border rounded-md shadow-lg bg-white z-50">
        <Dialog.Close className="absolute top-2 right-2 text-xl font-semibold text-gray-500">
          ✖
        </Dialog.Close>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Invoice Billing
        </h2>

        <h3 className="text-xl font-semibold mb-4">Invoice Details</h3>

        <table className="w-full text-left border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="text-left text-sm font-medium">Item</th>
              <th className="text-right text-sm font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 font-medium">Invoice Number</td>
              <td className="py-2 text-right">{invoice.invoiceNumber}</td>
            </tr>
            <tr>
              <td className="py-2 font-medium">Status</td>
              <td className="py-2 text-right">{invoice.status}</td>
            </tr>
            <tr>
              <td className="py-2 font-medium">Subtotal</td>
              <td className="py-2 text-right">
                {formatCurrency(Number(invoice.subTotal), "NPR")}
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">Tax</td>
              <td className="py-2 text-right">
                {formatCurrency(Number(invoice.tax), "NPR")}
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">Total</td>
              <td className="py-2 font-bold text-right">
                {formatCurrency(Number(invoice.total), "NPR")}
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">Paid At</td>
              <td className="py-2 text-right">
                {new Date(invoice.paidAt).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6">
          <button
            onClick={handleConfirm}
            className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Go to Dashboard
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default SubscriptionConfirmation;
