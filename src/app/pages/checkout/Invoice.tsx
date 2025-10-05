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
  onSubmit?: (e?: React.FormEvent) => void;
}

const DIVISOR = 100;

const safeNumber = (value: any): number =>
  value && !isNaN(Number(value)) ? Number(value) / DIVISOR : 0;

const normalizePlan = (plan: PlanType): PlanType => ({
  ...plan,
  basePrice: safeNumber(plan.basePrice),
  discountAmount: safeNumber(plan.discountAmount),
  originalAmount: safeNumber(plan.originalAmount),
  taxAmount: safeNumber(plan.taxAmount),
  totalAmount: safeNumber(plan.totalAmount),
  taxRate: Number(plan.taxRate) || 0,
});

const Invoice: React.FC<InvoiceProps> = ({
  plan,
  staffCount,
  paymentType = "",
  paymentOption = "",
  currency = "USD",
  interval = "MONTHLY",
  promocode = "",
  onSubmit,
}) => {
  const normalizedPlan = useMemo(() => normalizePlan(plan), [plan]);

  const effectiveCurrency = normalizedPlan.currency || currency;
  const effectiveInterval = normalizedPlan.interval || interval;

  const getCurrencySymbol = (currency: string) =>
    currency === "NPR" ? "Rs." : "$";

  const calculations = useMemo(() => {
    const STAFF_COST = {
      NPR: 50000, // paisa = Rs. 500
      USD: 500, // cents = $5.00
    };

    const additionalStaffCost =
      (STAFF_COST[effectiveCurrency as keyof typeof STAFF_COST] ?? 0) / DIVISOR;
    const extraStaffCount = Math.max(0, staffCount - 1);
    const additionalStaffs = extraStaffCount * additionalStaffCost;

    const normalizedBaseAmount = normalizedPlan.basePrice;
    const normalizedPlanDiscount = normalizedPlan.discountAmount;
    const normalizedTaxAmount = normalizedPlan.taxAmount;
    const planTotalAfterPlanDiscount = normalizedPlan.totalAmount;

    const subtotalExclVat =
      normalizedPlan.taxRate > 0
        ? normalizedBaseAmount / (1 + normalizedPlan.taxRate)
        : normalizedBaseAmount;

    const vat = normalizedTaxAmount || normalizedBaseAmount - subtotalExclVat;

    const baseTotal = planTotalAfterPlanDiscount + additionalStaffs;
    const isPromoApplied = promocode?.toUpperCase() === "ABC123";
    const promoDiscount = isPromoApplied ? baseTotal * 0.1 : 0;

    const total = Math.max(0, baseTotal - promoDiscount);

    return {
      additionalStaffCost,
      extraStaffCount,
      additionalStaffs,
      subtotalExclVat,
      vat,
      baseTotal: planTotalAfterPlanDiscount,
      promoDiscount,
      isPromoApplied,
      planDiscount: normalizedPlanDiscount,
      total,
    };
  }, [normalizedPlan, staffCount, effectiveCurrency, promocode]);

  const formatPlanName = useMemo(() => {
    if (!normalizedPlan?.name) return "";
    return (
      normalizedPlan.name
        .toLowerCase()
        .replace("yearly", "")
        .replace("monthly", "")
        .trim()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") + " Plan"
    );
  }, [normalizedPlan?.name]);

  const paymentMethodDisplay = useMemo(() => {
    if (!paymentOption || !paymentType) return "Not Selected";
    return paymentOption.charAt(0).toUpperCase() + paymentOption.slice(1);
  }, [paymentOption, paymentType]);

  const formatAmount = (amount: number | string | null | undefined) => {
    const num = Number(amount) || 0;
    const symbol = getCurrencySymbol(effectiveCurrency);
    return effectiveCurrency === "NPR"
      ? `${symbol} ${Math.round(num).toLocaleString()}`
      : `${symbol} ${num.toFixed(2)}`;
  };

  if (!plan) {
    return (
      <div className="px-8 py-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
          <span className="body-bold-16">{paymentMethodDisplay}</span>
        </div>

        <div className="flex justify-between pt-6 border-t-2 border-grey-light">
          <span className="body-regular-16">Subtotal (Excl. VAT):</span>
          <span className="body-bold-16">
            {formatAmount(calculations.subtotalExclVat)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="body-regular-16">
            VAT ({normalizedPlan.taxRate}%):
          </span>
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
          onClick={onSubmit}
        />
      </div>

      <Agreement text="Your subscription will automatically be cancelled after your plan has ended. Once purchased, the subscription cannot be reversed." />
    </div>
  );
};

export default Invoice;
