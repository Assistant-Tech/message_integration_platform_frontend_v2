import { useMemo } from "react";
import { Agreement, Button } from "@/app/components/ui";
import { PlanType } from "@/app/types/plan.types";

interface InvoiceProps {
  plan: PlanType;
  staffCount: number;
  paymentType?: string;
  paymentOption?: string;
  currency?: string;
  interval?: string;
  promocode?: string;
  onConfirm?: () => void;
}

const Invoice: React.FC<InvoiceProps> = ({
  plan,
  staffCount,
  paymentType = "",
  paymentOption = "",
  currency = "USD",
  interval = "MONTHLY",
  promocode = "",
  onConfirm,
}) => {
  const effectiveCurrency = plan.currency || currency;
  const effectiveInterval = plan.interval || interval;

  const calculations = useMemo(() => {
    const getAdditionalStaffCost = () =>
      effectiveCurrency === "NPR" ? 500 : 5;

    const additionalStaffCost = getAdditionalStaffCost();
    const extraStaffCount = Math.max(0, staffCount - 1);
    const additionalStaffs = extraStaffCount * additionalStaffCost;

    const baseAmount = plan.originalAmount || plan.amount;

    // Subtotal excluding VAT (since baseAmount includes VAT)
    const subtotalExclVat = baseAmount / 1.13;
    const vat = baseAmount - subtotalExclVat;

    const baseTotal = baseAmount + additionalStaffs;

    const isPromoApplied = promocode === "ABC123";
    const promoDiscount = isPromoApplied ? baseTotal * 0.1 : 0;

    const planDiscount = plan.discountAmount || 10;

    const total = baseTotal + vat - promoDiscount - planDiscount;

    return {
      additionalStaffCost,
      extraStaffCount,
      additionalStaffs,
      subtotalExclVat,
      vat,
      baseAmount,
      baseTotal,
      promoDiscount,
      isPromoApplied,
      planDiscount,
      total,
    };
  }, [plan, staffCount, effectiveCurrency, promocode]);

  const formatPlanName = useMemo(() => {
    if (!plan?.name) return "";
    return (
      plan.name
        .toLowerCase()
        .replace("yearly", "")
        .replace("monthly", "")
        .trim()
        .split("_")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") + " Plan"
    );
  }, [plan?.name]);

  const getPaymentMethodDisplay = useMemo(() => {
    if (!paymentOption || !paymentType) return "Not Selected";
    return paymentOption.charAt(0).toUpperCase() + paymentOption.slice(1);
  }, [paymentOption, paymentType]);

  const getCurrencySymbol = (currency: string) =>
    currency === "NPR" ? "Rs." : "$";

  const formatAmount = (amount: number) => {
    const symbol = getCurrencySymbol(effectiveCurrency);
    return effectiveCurrency === "NPR"
      ? `${symbol} ${Math.round(amount).toLocaleString()}`
      : `${symbol} ${amount.toFixed(2)}`;
  };

  if (!plan || !plan.amount) {
    return (
      <div className="px-8 py-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-6">
      <div className="py-6 space-y-4 text-sm text-grey-medium">
        <div className="flex justify-between">
          <span className="body-regular-16">Plan Name:</span>
          <span className="body-bold-16">{formatPlanName}</span>
        </div>

        <div className="flex justify-between">
          <span className="body-regular-16">Payment Type:</span>
          <span className="body-bold-16">
            {effectiveInterval === "YEARLY" ? "Yearly" : "Monthly"}
          </span>
        </div>

        <div className="flex justify-between pb-4">
          <span className="body-regular-16">Payment Method:</span>
          <span className="body-bold-16">{getPaymentMethodDisplay}</span>
        </div>

        <div className="flex justify-between pt-6 border-t-2 border-grey-light">
          <span className="body-regular-16">Subtotal (Excl. VAT):</span>
          <span className="body-bold-16">
            {formatAmount(calculations.subtotalExclVat)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="body-regular-16">VAT (13%):</span>
          <span className="body-bold-16">{formatAmount(calculations.vat)}</span>
        </div>

        {calculations.extraStaffCount > 0 && (
          <div className="flex justify-between">
            <span className="body-regular-16">
              Additional Staff ({calculations.extraStaffCount} ×{" "}
              {formatAmount(calculations.additionalStaffCost)}):
            </span>
            <span className="body-bold-16">
              {formatAmount(calculations.additionalStaffs)}
            </span>
          </div>
        )}

        {calculations.isPromoApplied && (
          <div className="flex justify-between text-primary">
            <span className="body-regular-16 text-grey-medium">
              Promo "{promocode}" (10% off):
            </span>
            <span className="body-bold-16">
              - {formatAmount(calculations.promoDiscount)}
            </span>
          </div>
        )}

        {calculations.planDiscount > 0 && (
          <div className="flex justify-between text-primary">
            <span className="body-regular-16 text-grey-medium">Discount:</span>
            <span className="body-bold-16">
              - {formatAmount(calculations.planDiscount)}
            </span>
          </div>
        )}

        <div className="flex justify-between h4-bold-24 text-base-black border-t-2 border-grey-light pt-6">
          <span>Total:</span>
          <span>{formatAmount(calculations.total)}</span>
        </div>

        <Button
          label="Confirm and Pay"
          className="w-full mt-6 mb-3 px-4 py-3"
          disabled={!paymentType || !paymentOption}
          onClick={onConfirm}
        />
      </div>

      <Agreement text="Your subscription will automatically be cancelled after your plan has ended. Once purchased, the subscription cannot be reversed." />
    </div>
  );
};

export default Invoice;
