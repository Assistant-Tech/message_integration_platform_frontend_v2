import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Country } from "country-state-city";

import api from "@/app/services/api/auth";

import { Button, Input, Logo } from "@/app/components/ui";
import { Plus, Minus } from "lucide-react";
import { Invoice } from "@/app/pages/";
import { CheckoutFormData, PlanType } from "@/app/types/plan";

import tickIcon from "@/app/assets/icons/tick.svg";
import tickIcon_filled from "@/app/assets/icons/tick_filled.svg";
import { toast } from "sonner";

const CheckoutPage = () => {
  const { planId } = useParams<{ planId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const allowedIntervals = ["MONTHLY", "YEARLY"] as const;
  const allowedCurrencies = ["NPR", "USD"] as const;

  type IntervalType = (typeof allowedIntervals)[number];
  type CurrencyType = (typeof allowedCurrencies)[number];

  // Get initial values from URL params
  const getInitialInterval = useCallback((): IntervalType => {
    const param = searchParams.get("interval")?.toUpperCase();
    return allowedIntervals.includes(param as any)
      ? (param as IntervalType)
      : "MONTHLY";
  }, [searchParams]);

  const getInitialCurrency = useCallback((): CurrencyType => {
    const param = searchParams.get("currency")?.toUpperCase();
    return allowedCurrencies.includes(param as any)
      ? (param as CurrencyType)
      : "USD";
  }, [searchParams]);

  const [interval, setInterval] = useState<IntervalType>(getInitialInterval());
  const [currency, setCurrency] = useState<CurrencyType>(getInitialCurrency());
  const [staffCount, setStaffCount] = useState<number>(1);
  const [plan, setPlan] = useState<PlanType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  type PaymentOption = "khalti" | "esewa" | "stripe";

  const paymentIcons: Record<PaymentOption, string> = {
    khalti:
      "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920905/khalti_xsudv7.webp",
    esewa:
      "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920903/esewa_cmqyoh.webp",
    stripe:
      "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920897/stripe_py4qze.webp",
  };

  // Filter payment options based on currency
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
      paymentType: "",
      paymentOption: "",
      promoCode: "",
    },
  });

  const [countries, setCountries] = useState<
    { name: string; isoCode: string }[]
  >([]);
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState("");

  // Fetch countries only once
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Update URL params and state when currency or interval changes
  const updateUrlParams = useCallback(
    (newCurrency?: CurrencyType, newInterval?: IntervalType) => {
      const params = new URLSearchParams(searchParams);
      let shouldUpdate = false;

      if (newCurrency && newCurrency !== currency) {
        params.set("currency", newCurrency);
        setCurrency(newCurrency);
        shouldUpdate = true;
        console.log("🔄 Currency changed:", currency, "→", newCurrency);
      }

      if (newInterval && newInterval !== interval) {
        params.set("interval", newInterval);
        setInterval(newInterval);
        shouldUpdate = true;
        console.log("🔄 Interval changed:", interval, "→", newInterval);
      }

      if (shouldUpdate) {
        setSearchParams(params);
        // Force clear the current plan to show loading state
        setPlan(null);
        console.log("🔄 URL params updated, plan data will refresh");
      }
    },
    [searchParams, currency, interval, setSearchParams],
  );

  // Fetch plan data - THIS IS THE KEY FIX
  const fetchPlan = useCallback(async () => {
    if (!planId) return;

    setLoading(true);
    setError(null);

    const apiUrl = `/plans/${planId}?interval=${interval}&currency=${currency}`;

    console.log("🔍 Fetching plan with:", {
      planId,
      interval,
      currency,
      apiUrl,
    });

    try {
      const res = await api.get(apiUrl);
      console.log("✅ API Response:", res.data);
      console.log("🔄 Expected vs Received:", {
        expectedInterval: interval,
        receivedInterval: res.data.interval,
        expectedCurrency: currency,
        receivedCurrency: res.data.currency,
      });

      let planData = res.data;

      // TEMPORARY FIX: Transform data if API doesn't handle params correctly
      if (res.data.interval !== interval) {
        console.warn(
          "⚠️ API returned wrong interval, attempting to transform data",
        );

        // Transform yearly to monthly (divide by 12) or monthly to yearly (multiply by 12)
        if (interval === "MONTHLY" && res.data.interval === "YEARLY") {
          planData = {
            ...res.data,
            interval: "MONTHLY",
            name: res.data.name.replace("YEARLY", "MONTHLY"),
            description: res.data.description.replace("Yearly", "Monthly"),
            amount: Math.round(res.data.amount / 12),
            durationInDays: 30,
          };
          console.log("🔄 Transformed yearly to monthly:", planData);
        } else if (interval === "YEARLY" && res.data.interval === "MONTHLY") {
          planData = {
            ...res.data,
            interval: "YEARLY",
            name: res.data.name.replace("MONTHLY", "YEARLY"),
            description: res.data.description.replace("Monthly", "Yearly"),
            amount: res.data.amount * 12,
            durationInDays: 365,
          };
          console.log("🔄 Transformed monthly to yearly:", planData);
        }
      }

      // Validation: Check if the API returned the correct currency
      if (planData.currency !== currency) {
        console.warn("⚠️ API returned different currency than requested:", {
          requested: currency,
          received: planData.currency,
        });
        // You might want to handle currency conversion here if needed
      }

      setPlan(planData);
    } catch (err: any) {
      console.error("❌ Error fetching plan:", err);
      console.error("Error details:", {
        status: err.response?.status,
        message: err.response?.data?.message,
        url: apiUrl,
      });
      setError(err.response?.data?.message || "Failed to fetch plan data");
    } finally {
      setLoading(false);
    }
  }, [planId, interval, currency]);

  // Fetch plan when planId, interval, or currency changes
  useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);

  // Set default payment type based on plan interval
  useEffect(() => {
    if (plan?.interval) {
      const defaultType =
        plan.interval === "YEARLY" ? "BILL_YEARLY" : "BILL_MONTHLY";
      setValue("paymentType", defaultType);
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
      setValue("paymentOption", "");
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

  const handleCurrencyChange = useCallback(
    (newCurrency: CurrencyType) => {
      updateUrlParams(newCurrency, interval);
    },
    [updateUrlParams, interval],
  );

  const handleIntervalChange = useCallback(
    (newInterval: IntervalType) => {
      updateUrlParams(currency, newInterval);

      // Update payment type accordingly
      const newPaymentType =
        newInterval === "YEARLY" ? "BILL_YEARLY" : "BILL_MONTHLY";
      setValue("paymentType", newPaymentType);
    },
    [updateUrlParams, currency, setValue],
  );

  const onSubmit = useCallback(
    (data: CheckoutFormData) => {
      console.log("Form Submission:", {
        ...data,
        selectedPlan: plan,
        currency,
        interval,
      });
      toast.success("Payment successful!");
    },
    [plan, currency, interval],
  );

  const handleFinalSubmit = handleSubmit(onSubmit);

  // Show loading state if plan data is inconsistent with current params
  const isPlanDataStale =
    plan && (plan.interval !== interval || plan.currency !== currency);

  if (loading || isPlanDataStale) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-grey">
            {isPlanDataStale
              ? "Updating plan details..."
              : "Loading plan details..."}
          </p>
          {isPlanDataStale && (
            <p className="text-xs text-grey-light mt-2">
              Current: {plan?.interval} {plan?.currency} → Switching to:{" "}
              {interval} {currency}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-danger mb-4">{error}</p>
          <Button label="Retry" onClick={fetchPlan} />
        </div>
      </div>
    );
  }

  // No plan found
  if (!plan) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-danger">Plan not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="py-6">
        <Logo />
      </nav>

      <div className="py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="h3-bold-32 text-base-black">Billing Information</h1>
          {/* Currency and Interval Selectors */}
          <div className="flex gap-4">
            <select
              value={currency}
              onChange={(e) =>
                handleCurrencyChange(e.target.value as CurrencyType)
              }
              className="px-4 py-2 border border-grey-light rounded-lg text-grey bg-white focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="USD">USD ($)</option>
              <option value="NPR">NPR (₨)</option>
            </select>

            <select
              value={interval}
              onChange={(e) =>
                handleIntervalChange(e.target.value as IntervalType)
              }
              className="px-4 py-2 border border-grey-light rounded-lg text-grey bg-white focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="MONTHLY">Monthly</option>
              <option value="YEARLY">Yearly</option>
            </select>
          </div>
        </div>
      </div>

      <section className="flex flex-col lg:flex-row w-full justify-between items-start gap-12">
        {/* Form Section */}
        <div className="w-full lg:max-w-xl">
          <form onSubmit={handleFinalSubmit} className="pb-10 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="h4-bold-24 text-grey">{formattedPlanName}</h2>
              {plan.isPopular && (
                <motion.div
                  className="inline-flex items-center px-4 py-3 rounded-full bg-secondary"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="body-bold-16 text-white cursor-pointer">
                    Most Popular
                  </span>
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
                className="w-full border placeholder-grey-light text-grey border-grey-light rounded-lg px-4 py-3"
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
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleStaffChange(-1)}
                  className="px-4 py-3 bg-grey-light hover:bg-grey-light cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed"
                  disabled={staffCount <= 1}
                >
                  <Minus size={16} color="grey" />
                </button>
                <Input
                  placeholder="1"
                  type="number"
                  className="text-center border-none focus:ring-0 rounded-none"
                  value={staffCount}
                  onChange={(e) => {
                    const val = Math.max(1, parseInt(e.target.value) || 1);
                    setStaffCount(val);
                  }}
                  min={1}
                />
                <button
                  type="button"
                  onClick={() => handleStaffChange(1)}
                  className="px-4 py-3 bg-grey-light hover:bg-grey-light cursor-pointer"
                >
                  <Plus size={16} color="grey" />
                </button>
              </div>
            </div>

            {/* Payment Type - Syncs with interval */}
            <div>
              <label className="body-bold-16 text-grey pb-1 block">
                Payment Type
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                {["BILL_MONTHLY", "BILL_YEARLY"].map((type) => {
                  const label =
                    type === "BILL_MONTHLY" ? "Bill Monthly" : "Bill Yearly";
                  const isSelected =
                    (type === "BILL_MONTHLY" && interval === "MONTHLY") ||
                    (type === "BILL_YEARLY" && interval === "YEARLY");

                  return (
                    <div key={type} className="relative flex-1">
                      <button
                        type="button"
                        onClick={() => {
                          const newInterval =
                            type === "BILL_MONTHLY" ? "MONTHLY" : "YEARLY";
                          handleIntervalChange(newInterval);
                        }}
                        className={`w-full h-full border rounded-xl py-4 px-6 text-center cursor-pointer relative ${
                          isSelected
                            ? "bg-primary text-white border-primary"
                            : "bg-white border-primary text-primary"
                        }`}
                      >
                        <span className="button-semi-bold-16">{label}</span>
                        {type === "BILL_YEARLY" && (
                          <div className="label-regular-16 mt-1">
                            (Save 10%)
                          </div>
                        )}
                      </button>
                      {isSelected && (
                        <img
                          src={tickIcon}
                          alt="Selected"
                          className="absolute top-2 right-2 w-6 h-6"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payment Option - Filtered by currency */}
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
                      className={`relative border rounded-lg p-4 flex items-center justify-center cursor-pointer ${
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

        {/* Invoice Section */}
        <div className="w-full lg:w-2xl bg-base-white rounded-lg">
          <h2 className="h3-bold-32 text-grey px-6 py-6 border-b-2 border-grey-light">
            Invoice
          </h2>
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
      </section>
    </div>
  );
};

export default CheckoutPage;
