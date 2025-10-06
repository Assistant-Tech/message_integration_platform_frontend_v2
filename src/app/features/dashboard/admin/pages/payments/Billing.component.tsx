import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Invoice } from "@/app/pages/";
import PaymentSection from "@/app/features/dashboard/admin/pages/payments/PaymentSection";
import { useSubscriptionStore } from "@/app/store/subscription.store";
import { SubscriptionInitiationData } from "@/app/types/subscription.types";
import { PlanType } from "@/app/types/plan.types";

interface CheckoutFormData {
  paymentOption: "stripe" | "khalti" | "esewa" | "";
  useTrial: boolean;
}

interface BillingComponentProps {
  plan: PlanType;
  staffCount: number;
  interval: "MONTHLY" | "YEARLY";
  currency: string;
}

const BillingComponent: React.FC<BillingComponentProps> = ({
  plan,
  staffCount,
  interval,
  currency,
}) => {
  const [confirmed, setConfirmed] = useState(false);
  const { register, handleSubmit, watch } = useForm<CheckoutFormData>({
    defaultValues: {
      paymentOption: "",
      useTrial: false,
    },
  });

  const { setInitiationData } = useSubscriptionStore();

  const onSubmit = async (data: CheckoutFormData) => {
    if (!plan) {
      toast.error("Plan data is not available. Please try again.");
      return;
    }
    if (!data.paymentOption) {
      toast.error("Please select a payment option.");
      return;
    }

    const initiationPayload: SubscriptionInitiationData = {
      planId: plan.id,
      paymentProvider: data.paymentOption,
      billingCycle: interval,
      currency,
      useTrial: data.useTrial ?? false,
      callbackUrl: `${window.location.origin}/payment/callback`,
    };

    try {
      setInitiationData(initiationPayload);
      setConfirmed(true);
    } catch (err) {
      console.error("Checkout failed", err);
      toast.error("Checkout failed. Please try again.");
    }
  };

  const paymentOption = watch("paymentOption");

  if (confirmed) {
    return <PaymentSection />;
  }

  return (
    <div className="p-8 space-y-6">
      <h2 className="h3-bold-24 text-base-black mb-2">Billing Information</h2>

      {/* Payment Method */}
      <div>
        <label className="body-bold-16 text-grey pb-1 block">
          Select Payment Method
        </label>
        <select
          {...register("paymentOption")}
          className="w-full text-grey border border-grey-light rounded-lg px-3 py-2"
        >
          <option value="">-- Choose Payment Option --</option>
          <option value="khalti">Khalti</option>
          <option value="esewa">eSewa</option>
          <option value="stripe">Stripe</option>
        </select>
      </div>

      {/* Use Trial Period */}
      <div>
        <label className="body-bold-16 text-grey pb-1 block">
          Use Trial Period
        </label>
        <div className="flex items-center">
          <input type="checkbox" {...register("useTrial")} className="mr-2" />
          <span className="body-regular-16 text-grey">
            Enable trial period for this subscription
          </span>
        </div>
      </div>

      {/* Invoice Summary */}
      <div className="border border-grey-light rounded-xl shadow-sm">
        <Invoice
          plan={plan}
          staffCount={staffCount}
          interval={interval}
          currency={currency}
          paymentType={paymentOption}
          paymentOption={paymentOption}
          onSubmit={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
};

export default BillingComponent;
