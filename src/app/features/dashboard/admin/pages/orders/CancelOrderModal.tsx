import { useState } from "react";
import { cancelOrder } from "@/app/services/order.services";
import { X } from "lucide-react";
import { toast } from "sonner";

interface CancelOrderModalProps {
  orderId: string;
  orderTotal: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CancelOrderModal({
  orderId,
  orderTotal,
  onClose,
  onSuccess,
}: CancelOrderModalProps) {
  const [reason, setReason] = useState("");
  const [refundAmount, setRefundAmount] = useState(orderTotal);
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!reason.trim()) {
      toast.error("Please provide a cancellation reason");
      return;
    }

    try {
      setLoading(true);

      await cancelOrder(orderId, reason, refundAmount);

      toast.success("Order cancelled successfully");
      onSuccess();
      onClose();
    } catch {
      toast.error("Failed to cancel order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Cancel Order</h2>

        <div className="space-y-4">
          {/* Reason */}
          <div>
            <label className="text-sm font-medium  text-grey">
              Cancellation Reason
            </label>
            <textarea
              className="w-full mt-1 border rounded-md p-2 outline-none  text-grey-medium"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>

          {/* Refund Amount */}
          <div>
            <label className="text-sm font-medium  text-grey">
              Refund Amount (Rs. {orderTotal})
            </label>
            <input
              type="number"
              className="w-full mt-1 border rounded-md p-2 outline-none  text-grey-medium"
              value={refundAmount}
              max={orderTotal}
              min={0}
              onChange={(e) => setRefundAmount(Number(e.target.value))}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              className="px-4 py-2 border rounded-md"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 bg-danger text-white rounded-md hover:bg-red-600 transition"
              onClick={handleCancel}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Cancel"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
