import { useState } from "react";
import { generateShippingLabel } from "@/app/services/order.services";
import { X } from "lucide-react";
import { toast } from "sonner";

interface ShippingLabelModalProps {
  orderId: string;
  orderItems: any[];
  customerName: string;
  onClose: () => void;
}

export default function ShippingLabelModal({
  orderId,
  orderItems,
  customerName,
  onClose,
}: ShippingLabelModalProps) {
  const [pickupAddress, setPickupAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!pickupAddress.trim()) {
      toast.error("Pickup address is required");
      return;
    }

    try {
      setLoading(true);

      const res = await generateShippingLabel(orderId, pickupAddress);

      toast.success("Shipping label generated successfully!");
      console.log("Shipping Label:", res);

      onClose();
    } catch {
      toast.error("Failed to generate shipping label");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[450px] p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4 text-grey-medium">
          Generate Shipping Label
        </h2>

        <div className="space-y-4">
          {/* Order Info */}
          <div className="p-3 bg-gray-100 rounded-md">
            <p className="text-sm font-medium  text-grey-medium">
              <strong className=" text-grey">Customer:</strong> {customerName}
            </p>
            <p className="text-sm text-grey-medium">
              <strong className=" text-grey">Items:</strong> {orderItems.length}
            </p>
          </div>

          {/* Pickup Address */}
          <div>
            <label className="text-sm font-medium text-grey">
              Pickup Address
            </label>
            <textarea
              className="w-full mt-1 border rounded-md p-2 outline-none  text-grey-medium"
              rows={3}
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              className="px-4 py-2 border rounded-md"
              onClick={onClose}
              disabled={loading}
            >
              Close
            </button>

            <button
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
