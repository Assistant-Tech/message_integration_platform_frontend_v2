import { useEffect, useState, useCallback, useMemo } from "react";
import { Button, Input } from "@/app/components/ui";
import { Minus, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Country } from "country-state-city";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { PlanType, CheckoutFormData } from "@/app/types/plan.types";

import tickIcon_filled from "@/app/assets/icons/tick_filled.svg";
import { GenericDialog } from "@/app/components/common";
import { Invoice } from "@/app/pages";
import {
  ESEWA_IMAGE_URL,
  KHALTI_IMAGE_URL,
  STRIPE_IMAGE_URL,
} from "@/app/constants/image-cloudinary";
import { useAuthStore } from "@/app/store/auth.store";

interface CheckoutDialogProps {
  open: boolean;
  onClose: () => void;
  plan?: PlanType;
}

const CheckoutDialogPop = ({ open, onClose, plan }: CheckoutDialogProps) => {
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  // Get authentication status from AuthContext
  const allowedIntervals = ["MONTHLY", "YEARLY"] as const;
  const allowedCurrencies = ["NPR", "USD"] as const;

  // If the user is not authenticated, redirect them to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  // log
  console.log("🚀 ~ CheckoutDialogPop ~ allowedIntervals:", allowedIntervals);
  console.log("🚀 ~ CheckoutDialogPop ~ allowedCurrencies:", allowedCurrencies);

  type IntervalType = (typeof allowedIntervals)[number];
  type CurrencyType = (typeof allowedCurrencies)[number];

  const [interval, setInterval] = useState<IntervalType>(
    plan?.interval === "YEARLY" ? "YEARLY" : "MONTHLY",
  );
  const [currency, setCurrency] = useState<CurrencyType>(
    plan?.currency === "NPR" ? "NPR" : "USD",
  );
  const [staffCount, setStaffCount] = useState<number>(1);
  const [countries, setCountries] = useState<
    { name: string; isoCode: string }[]
  >([]);
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  type PaymentOption = "khalti" | "esewa" | "stripe";

  const paymentIcons: Record<PaymentOption, string> = {
    khalti: KHALTI_IMAGE_URL,
    esewa: ESEWA_IMAGE_URL,
    stripe: STRIPE_IMAGE_URL,
  };

  const getAvailablePaymentOptions = useCallback((): PaymentOption[] => {
    return currency === "NPR" ? ["khalti", "esewa"] : ["stripe"];
  }, [currency]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormData>({
    defaultValues: {
      fullName: "",
      country: "",
      staffCount: 1,
      paymentType: plan?.interval === "YEARLY" ? "BILL_YEARLY" : "BILL_MONTHLY",
      promoCode: "",
    },
  });

  // Fetch countries only once
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Sync interval with plan
  useEffect(() => {
    if (plan?.interval) {
      const defaultType =
        plan.interval === "YEARLY" ? "BILL_YEARLY" : "BILL_MONTHLY";
      setValue("paymentType", defaultType);
      setInterval(plan.interval === "YEARLY" ? "YEARLY" : "MONTHLY");
    }
  }, [plan?.interval, setValue]);

  // Reset payment option when currency changes
  useEffect(() => {
    const availableOptions = getAvailablePaymentOptions();
    const currentPaymentOption = watch("paymentOption");

    if (
      currentPaymentOption &&
      !availableOptions.includes(currentPaymentOption as PaymentOption)
    ) {
      setValue("paymentOption", "esewa" as PaymentOption);
    }
  }, [currency, setValue, watch, getAvailablePaymentOptions]);

  // Sync staff count with form
  useEffect(() => {
    setValue("staffCount", staffCount);
  }, [staffCount, setValue]);

  const formattedPlanName = useMemo(() => {
    if (!plan?.name) return "";

    const cleanedName = plan.name
      .replace(/_/g, " ")
      .replace(/\b(Monthly|Yearly|Plan)\b/gi, "")
      .trim();

    const baseName = cleanedName
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return `${baseName} Plan`;
  }, [plan?.name]);

  const handleStaffChange = useCallback(
    (delta: number) => {
      setStaffCount((prev) => {
        const newCount = Math.max(1, prev + delta);
        setValue("staffCount", newCount);
        return newCount;
      });
    },
    [setValue],
  );

  const handleCurrencyChange = useCallback((newCurrency: CurrencyType) => {
    setCurrency(newCurrency);
  }, []);

  const handleIntervalChange = useCallback(
    (newInterval: IntervalType) => {
      setInterval(newInterval);
      setValue(
        "paymentType",
        newInterval === "YEARLY" ? "BILL_YEARLY" : "BILL_MONTHLY",
      );
    },
    [setValue],
  );

  const initiateSubscription = async (data: {
    planId: string;
    paymentProvider: string;
    billingCycle: string;
    currency: string;
    useTrial: boolean;
    callbackUrl: string;
  }) => {
    console.log("Initiating subscription:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const onSubmit = async (data: CheckoutFormData) => {
    if (!plan) {
      toast.error("Plan data is not available. Please try again.");
      return;
    }
    if (!data.paymentOption) {
      toast.error("Please select a payment option.");
      return;
    }

    try {
      await initiateSubscription({
        planId: plan.id,
        paymentProvider: data.paymentOption,
        billingCycle: interval === "YEARLY" ? "YEARLY" : "MONTHLY",
        currency,
        useTrial: true,
        callbackUrl: `${window.location.origin}/payment/callback`,
      });

      toast.success("Subscription successfully initiated!");
      setConfirmed(true);
    } catch (err) {
      console.error("Checkout failed", err);
      toast.error("Checkout failed. Please try again.");
    }
  };

  const handleFinalSubmit = handleSubmit(onSubmit);

  if (!plan) return null;

  return (
    <GenericDialog open={open} onClose={onClose} title="Billing Information">
      {/* Currency + Interval Selectors */}
      <div className="flex justify-end gap-4 mb-6">
        <select
          value={currency}
          onChange={(e) => handleCurrencyChange(e.target.value as CurrencyType)}
          className="px-4 py-2 border border-grey-light rounded-lg text-grey bg-white"
        >
          <option value="USD">USD ($)</option>
          <option value="NPR">NPR (₨)</option>
        </select>

        <select
          value={interval}
          onChange={(e) => handleIntervalChange(e.target.value as IntervalType)}
          className="px-4 py-2 border border-grey-light rounded-lg text-grey bg-white"
        >
          <option value="MONTHLY">Monthly</option>
          <option value="YEARLY">Yearly</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-full gap-12">
        {/* Form Section */}
        <div className="w-full lg:max-w-xl">
          <form onSubmit={handleFinalSubmit} className="space-y-6">
            {/* Plan Header */}
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="h4-bold-24 text-grey">{formattedPlanName}</h2>
              {plan.isPopular && (
                <motion.div
                  className="inline-flex items-center px-4 py-3 rounded-full bg-secondary"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="body-bold-16 text-white">Most Popular</span>
                </motion.div>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="body-bold-16 text-grey pb-1 block">
                Full Name
              </label>
              <Input
                placeholder="Jane Doe"
                className="w-full"
                {...register("fullName", { required: "Full Name is required" })}
              />
              {errors.fullName && (
                <p className="text-danger body-regular-16">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="body-bold-16 text-grey pb-1 block">
                Your Country
              </label>
              <select
                className="w-full border rounded-lg px-4 py-3 text-grey"
                {...register("country", { required: "Country is required" })}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select your country
                </option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-danger body-regular-16">
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* Staff Count */}
            <div>
              <label className="body-bold-16 text-grey pb-1 block">
                Number of Staffs
              </label>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleStaffChange(-1)}
                  className="px-4 py-3 bg-grey-light disabled:opacity-10"
                  disabled={staffCount <= 1}
                >
                  <Minus size={16} color="grey" />
                </button>
                <Input
                  placeholder="Staff Count"
                  type="number"
                  className="text-center border-none focus:ring-0 rounded-none"
                  value={staffCount}
                  onChange={(e) =>
                    setStaffCount(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  min={1}
                />
                <button
                  type="button"
                  onClick={() => handleStaffChange(1)}
                  className="px-4 py-3 bg-grey-light"
                >
                  <Plus size={16} color="grey" />
                </button>
              </div>
            </div>

            {/* Payment Options */}
            <div>
              <label className="body-bold-16 text-grey pb-1 block">
                Payment Option
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {getAvailablePaymentOptions().map((option, index) => {
                  const isSelected = watch("paymentOption") === option;
                  const availableOptions = getAvailablePaymentOptions();

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setValue("paymentOption", option)}
                      className={`relative border rounded-lg p-4 flex items-center justify-center ${
                        isSelected
                          ? "border-primary ring-1 ring-primary"
                          : "border-grey-light"
                      } ${
                        availableOptions.length === 1
                          ? "sm:col-span-2 col-span-1"
                          : index === 2
                            ? "sm:col-span-2 col-span-1"
                            : ""
                      }`}
                    >
                      {isSelected && (
                        <img
                          src={tickIcon_filled}
                          alt="Selected"
                          className="absolute top-1 right-1 h-8 w-8"
                        />
                      )}
                      <img
                        src={paymentIcons[option]}
                        alt={option}
                        className="h-6 sm:h-16 object-contain"
                      />
                    </button>
                  );
                })}
              </div>
              {errors.paymentOption && (
                <p className="text-danger body-regular-16 mt-1">
                  {errors.paymentOption.message}
                </p>
              )}
            </div>

            {/* Promo Code */}
            <div>
              <label className="body-bold-16 text-grey pb-1 block">
                Add a Promo Code (Optional)
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  value={promoInput}
                  placeholder="Enter promo code"
                  className="w-full px-4 py-3 border border-grey-light rounded-lg"
                  onChange={(e) => setPromoInput(e.target.value)}
                />
                <Button
                  type="button"
                  label="Apply"
                  onClick={() => setAppliedPromoCode(promoInput)}
                  className="bg-base-black text-white px-4 py-3"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Invoice */}
        <div className="w-full lg:w-2xl bg-base-white rounded-lg">
          <h2 className="h3-bold-32 text-grey px-6 py-6 border-b-2">Invoice</h2>
          <Invoice
            plan={plan}
            staffCount={staffCount}
            paymentType={watch("paymentType")}
            paymentOption={watch("paymentOption")}
            currency={currency}
            interval={interval}
            onConfirm={handleFinalSubmit}
            promocode={appliedPromoCode}
          />
        </div>
      </div>
    </GenericDialog>
  );
};

export default CheckoutDialogPop;
