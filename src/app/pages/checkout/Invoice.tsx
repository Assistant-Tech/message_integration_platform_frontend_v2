import { Agreement, Button } from "@/app/components/ui";
import { PlanType } from "@/app/types/plan";

interface InvoiceProps {
  plan: PlanType;
  staffCount: number;
  paymentType?: string;
  paymentOption?: string;
  onConfirm?: () => void;
}

const Invoice: React.FC<InvoiceProps> = ({
  plan,
  staffCount,
  paymentType = "",
  paymentOption = "",
  onConfirm,
}) => {
  const VAT_RATE = 0.13;

  const additionalStaffs = Math.max(0, staffCount - 1) * 150;

  const getPlanAmount = () => {
    if (!paymentType) return plan.amount;

    if (
      (plan.interval === "YEARLY" && paymentType === "BILL_YEARLY") ||
      (plan.interval === "MONTHLY" && paymentType === "BILL_MONTHLY")
    ) {
      return plan.amount;
    }

    if (plan.interval === "YEARLY" && paymentType === "BILL_MONTHLY") {
      return plan.amount / 12;
    } else if (plan.interval === "MONTHLY" && paymentType === "BILL_YEARLY") {
      return plan.amount * 12;
    }

    return plan.amount;
  };

  const currentPlanAmount = getPlanAmount();

  const baseAmount = currentPlanAmount / (1 + VAT_RATE);

  const baseTotal = baseAmount + additionalStaffs;
  const vat = baseTotal * VAT_RATE;
  const total = baseTotal + vat;

  const formatPlanName = (name: string) => {
    return name
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getPaymentMethodDisplay = () => {
    if (!paymentOption || !paymentType) return "Not Selected";

    const methodName =
      paymentOption.charAt(0).toUpperCase() + paymentOption.slice(1);
    const billingType = paymentType === "BILL_YEARLY" ? "Yearly" : "Monthly";

    return `${methodName} - ${billingType}`;
  };

  return (
    <div className="px-8 py-6">
      <div className="py-6 space-y-4 text-sm text-grey-medium">
        <div className="flex justify-between">
          <span className="body-regular-16 text-grey-medium">Plan Name:</span>
          <span className="body-bold-16 text-grey-medium">
            {formatPlanName(
              plan.name
                ?.replace("Yearly", " ")
                .replace("Monthly", " ")
                .trim() ?? "",
            )}
            (
            {paymentType === "BILL_YEARLY"
              ? "Yearly"
              : paymentType === "BILL_MONTHLY"
                ? "Monthly"
                : ""}
            )
          </span>
        </div>

        <div className="flex justify-between pb-4">
          <span className="body-regular-16 text-grey-medium">
            Payment Type:
          </span>
          <span className="body-bold-16 text-grey-medium">
            {getPaymentMethodDisplay()}
          </span>
        </div>

        <div className="flex justify-between pt-6 border-t-2 border-grey-light">
          <span className="body-regular-16 text-grey-medium">
            Plan Cost ({paymentType === "BILL_YEARLY" ? "Yearly" : "Monthly"}):
          </span>
          <span className="body-bold-16 text-grey-medium">
            {plan.currency} {baseAmount.toFixed(2)}
          </span>
        </div>

        {staffCount > 1 && (
          <div className="flex justify-between">
            <span className="body-regular-16 text-grey-medium">
              Additional Staff: ({staffCount - 1} × {plan.currency} 150)
            </span>
            <span className="body-bold-16 text-grey-medium">
              {plan.currency} {additionalStaffs.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="body-regular-16 text-grey-medium">Sub Total:</span>
          <span className="body-bold-16 text-grey-medium">
            {plan.currency} {baseTotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between pb-4">
          <span className="body-regular-16 text-grey-medium">VAT (13%):</span>
          <span className="body-bold-16 text-grey-medium">
            {plan.currency} {vat.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between h4-bold-24 text-base-black border-t-2 border-grey-light pt-6">
          <span>Total:</span>
          <span>
            {plan.currency} {total.toFixed(2)}
          </span>
        </div>

        <Button
          label="Confirm and Pay"
          className="w-full mt-6 mb-3"
          disabled={!paymentType || !paymentOption}
          onClick={onConfirm}
        />
      </div>

      <Agreement text="Your subscription will automatically be cancelled after your plan has ended. Once purchased, the subscription cannot be reversed." />
    </div>
  );
};

export default Invoice;
