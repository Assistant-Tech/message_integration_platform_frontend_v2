import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { usePlans } from "@/app/hooks/usePlans";
import { usePricingStore } from "@/app/store/pricing.store";
import { extractFeatures } from "@/app/utils/helper";
import { PricingcardSubscription } from "@/app/features/dashboard/admin/component";
import { Plan, Duration, APIDuration } from "@/app/types/plan.types";
import { changeplan } from "@/app/services/plan.services";
import { Button, DynamicToggle } from "@/app/components/ui";

interface UpgradeSubscriptionProps {
  current: any;
}

const UpgradeSubscription = ({ current }: UpgradeSubscriptionProps) => {
  const { currency, duration, setCurrency, setDuration } = usePricingStore();
  const {
    data: fetchedPlans = [],
    isLoading,
    isError,
  } = usePlans(duration, currency);

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [applyImmediately, setApplyImmediately] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [providerResponse, setProviderResponse] = useState<any>(null);

  const transformPlan = (plan: Plan) => ({
    ...plan,
    title: plan.name,
    subtitle: plan.description,
    price: `${plan.currency === "NPR" ? "रु" : "$"}${plan.totalAmount}`,
    buttonText: plan.totalAmount === 0 ? "Contact Us" : "Choose Plan",
    features: extractFeatures(plan.features),
  });

  const currentPlan = useMemo(() => {
    if (!current?.plan) return null;
    return transformPlan(current.plan);
  }, [current]);

  const upgradePlans = useMemo(() => {
    if (!fetchedPlans || !Array.isArray(fetchedPlans)) return [];
    return fetchedPlans
      .filter((p) => p.id !== current?.planId)
      .map(transformPlan);
  }, [fetchedPlans, current]);

  const pricingOptions = [
    { id: "MONTHLY", label: "Monthly", value: "MONTHLY" },
    {
      id: "YEARLY",
      label: "Bill Yearly",
      value: "YEARLY",
      extraLabel: "Save 10%",
    },
  ];

  const handleUpgrade = async () => {
    if (!selectedPlan) {
      toast.warning("Please select a plan first");
      return;
    }

    setLoading(true);
    try {
      const res = await changeplan(selectedPlan.id, applyImmediately);
      const data = res?.data;

      if (!data) throw new Error("No response data from server");

      if (data.paymentRequires) {
        setProviderResponse(data.providerResponse);
        setOpenDialog(true);
      } else {
        toast.success("Subscription plan changed successfully");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to change plan");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmProvider = () => {
    const provider = selectedProvider || providerResponse?.provider;
    toast.info(`Redirecting to ${provider} checkout...`);
    window.location.href = providerResponse?.paymentUrl;
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="animate-spin text-primary w-6 h-6" />
        <span className="ml-2 text-grey">Loading available plans...</span>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-danger py-6">Failed to load plans.</div>
    );

  return (
    <>
      <motion.div
        className="p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="h4-bold-24 text-grey py-6">Change Your Plan</h2>

        {/* Currency + Duration toggles */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <DynamicToggle
            options={pricingOptions}
            defaultSelected={duration}
            onChange={(val) => setDuration(val.value as APIDuration)}
          />

          <RadioGroup.Root
            value={currency}
            onValueChange={(val: any) => setCurrency(val as any)}
            className="flex gap-4 items-center"
          >
            {["NPR", "USD"].map((cur) => (
              <label
                key={cur}
                className={`flex items-center gap-2 cursor-pointer ${
                  currency === cur
                    ? "text-primary font-medium"
                    : "text-gray-600"
                }`}
              >
                <RadioGroup.Item
                  value={cur}
                  className="w-4 h-4 border border-gray-400 rounded-full data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                />
                <span>{cur === "NPR" ? "Nepal (रु)" : "USD ($)"}</span>
              </label>
            ))}
          </RadioGroup.Root>
        </div>

        {/* CURRENT PLAN */}
        {currentPlan && (
          <div className="mb-10">
            <h3 className="text-sm text-gray-500 mb-2">Your Current Plan</h3>
            <div className="border-2 border-primary rounded-lg p-3 opacity-80 cursor-not-allowed">
              <PricingcardSubscription
                plan={currentPlan}
                duration={duration.toLowerCase() as Duration}
                onSelect={() => {}}
              />
            </div>
          </div>
        )}

        {/* UPGRADE PLANS */}
        <h3 className="text-sm text-gray-500 mb-3">Available Upgrade Plans</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {upgradePlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg transition-all cursor-pointer ${
                selectedPlan?.id === plan.id
                  ? "border-2 border-primary bg-primary-light/40"
                  : "border border-grey-light"
              }`}
              onClick={() => setSelectedPlan(plan)}
            >
              <PricingcardSubscription
                plan={plan}
                duration={duration.toLowerCase() as Duration}
                onSelect={() => setSelectedPlan(plan)}
              />
            </div>
          ))}
        </div>

        {/* Apply Option */}
        <div className="flex items-center gap-4 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="applyOption"
              checked={applyImmediately}
              onChange={() => setApplyImmediately(true)}
            />
            <span>Apply immediately</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="applyOption"
              checked={!applyImmediately}
              onChange={() => setApplyImmediately(false)}
            />
            <span>Apply on next billing cycle</span>
          </label>
        </div>

        <Button
          onClick={handleUpgrade}
          disabled={loading || !selectedPlan}
          className="w-full sm:w-auto"
          label={"Confirm Plan Change"}
        />
      </motion.div>

      {/* Payment Provider Dialog */}
      <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-[50%] left-[50%] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-lg focus:outline-none">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Select Payment Provider
            </Dialog.Title>

            <p className="text-sm text-gray-600 mb-4">
              Choose a payment provider to complete your upgrade.
            </p>

            <div className="flex flex-col gap-3 mb-6">
              {["STRIPE", "ESEWA", "KHALTI"].map((provider) => (
                <label
                  key={provider}
                  className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedProvider === provider
                      ? "border-primary"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="provider"
                    value={provider}
                    checked={
                      selectedProvider === provider ||
                      (!selectedProvider &&
                        provider === providerResponse?.provider)
                    }
                    onChange={() => setSelectedProvider(provider)}
                  />
                  <span className="font-medium">{provider}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                label="Cancel"
                variant="outlined"
                onClick={() => setOpenDialog(false)}
              />
              <Button
                label="Proceed to Payment"
                variant="primary"
                onClick={handleConfirmProvider}
              />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default UpgradeSubscription;
