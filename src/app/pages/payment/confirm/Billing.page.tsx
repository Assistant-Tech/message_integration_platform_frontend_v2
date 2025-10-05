import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePlans } from "@/app/hooks/usePlans";
import { PlanType } from "@/app/types/plan.types";
import BillingComponent from "../Billing.component";
import { CurrencyType } from "@/app/services/plan.services";

const BillingPage = () => {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("planId");
  const interval = (searchParams.get("interval") || "MONTHLY") as
    | "MONTHLY"
    | "YEARLY";
  const currency: CurrencyType =
    searchParams.get("currency") === "NPR" ? "NPR" : "USD";

  const {
    data: allPlans = [],
    isLoading,
    isError,
  } = usePlans(interval, currency);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const staffCount = 1;

  useEffect(() => {
    if (allPlans && planId) {
      const found = allPlans.find((p: any) => p.id === planId) as
        | PlanType
        | undefined;
      if (found) {
        setSelectedPlan(found);
      }
    }
  }, [allPlans, planId]);

  if (isLoading)
    return <div className="text-center py-10">Loading plan...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">Failed to load plan.</div>
    );
  if (!selectedPlan)
    return <div className="text-center py-10">No plan found.</div>;

  return (
    <div className="max-w-4xl mx-auto my-10">
      <BillingComponent
        plan={selectedPlan}
        staffCount={staffCount}
        interval={interval}
        currency={currency}
      />
    </div>
  );
};

export default BillingPage;
