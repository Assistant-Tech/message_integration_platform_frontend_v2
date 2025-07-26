import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Country } from "country-state-city";
import axios from "axios";

import { Button, Input, Logo } from "@/app/components/ui";
import { Plus, Minus } from "lucide-react";
import { Invoice } from "@/app/pages/";
import { CheckoutFormData, PlanType } from "@/app/types/plan";

import tickIcon from "@/app/assets/icons/tick.svg";
import tickIcon_filled from "@/app/assets/icons/tick_filled.svg";
import khaltiIcon from "@/app/assets/images/khalti.webp";
import esewaIcon from "@/app/assets/images/esewa.webp";
import stripeIcon from "@/app/assets/images/stripe.webp";

const CheckoutPage = () => {
  const { planId } = useParams<{ planId: string }>();
  const [staffCount, setStaffCount] = useState<number>(1);
  const [plan, setPlan] = useState<PlanType | null>(null);
  const [loading, setLoading] = useState(true);

  type PaymentOption = "khalti" | "esewa" | "stripe";

  const paymentIcons: Record<PaymentOption, string> = {
    khalti: khaltiIcon,
    esewa: esewaIcon,
    stripe: stripeIcon,
  };

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

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    if (!planId) return;
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL_TEST}/plans/${planId}`)
      .then((res) => {
        setPlan(res.data);
      })
      .catch((err) => {
        console.error("Error fetching plan:", err);
      })
      .finally(() => setLoading(false));
  }, [planId]);

  useEffect(() => {
    if (plan?.interval) {
      const defaultType =
        plan.interval === "YEARLY" ? "BILL_YEARLY" : "BILL_MONTHLY";
      setValue("paymentType", defaultType);
    }
  }, [plan, setValue]);

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

    const billingCycle =
      watch("paymentType") === "BILL_YEARLY"
        ? "Yearly"
        : watch("paymentType") === "BILL_MONTHLY"
          ? "Monthly"
          : "";

    return `${baseName} (${billingCycle})`;
  }, [plan?.name, watch("paymentType")]);

  const handleStaffChange = (delta: number) => {
    setStaffCount((prev) => {
      const newCount = Math.max(1, prev + delta);
      setValue("staffCount", newCount);
      return newCount;
    });
  };

  const onSubmit = (data: CheckoutFormData) => {
    console.log("Form Submission:", {
      ...data,
      selectedPlan: plan,
    });
  };

  const handleFinalSubmit = handleSubmit(onSubmit);

  if (loading) return <div className="p-10">Loading plan details...</div>;
  if (!plan) return <div className="p-10 text-danger">Plan not found.</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="py-6">
        <Logo />
      </nav>

      <div className="py-8 sm:py-12">
        <h1 className="h3-bold-32 text-base-black">Billing Information</h1>
      </div>

      <section className="flex flex-col lg:flex-row w-full justify-between items-start gap-12">
        {/* Form Section */}
        <div className="w-full lg:max-w-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="pb-10 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="h4-bold-24 text-grey">{formattedPlanName} Plan</h2>
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
                  {...register("staffCount", { valueAsNumber: true })}
                  onChange={(e) => {
                    const val = Math.max(1, parseInt(e.target.value) || 1);
                    setStaffCount(val);
                    setValue("staffCount", val);
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

            {/* Payment Type */}
            <div>
              <label className="body-bold-16 text-grey pb-1 block">
                Payment Type
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                {["BILL_MONTHLY", "BILL_YEARLY"].map((type) => {
                  const label =
                    type === "BILL_MONTHLY" ? "Bill Monthly" : "Bill Yearly";
                  const isSelected = watch("paymentType") === type;

                  return (
                    <div key={type} className="relative flex-1">
                      <button
                        type="button"
                        onClick={() => setValue("paymentType", type)}
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
              {errors.paymentType && (
                <p className="text-danger body-regular-16 mt-1">
                  {errors.paymentType.message}
                </p>
              )}
            </div>

            {/* Payment Option */}
            <div>
              <label className="body-bold-16 text-grey pb-1 block">
                Payment Option
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(["khalti", "esewa", "stripe"] as PaymentOption[]).map(
                  (option, index) => {
                    const isSelected = watch("paymentOption") === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setValue("paymentOption", option)}
                        className={`relative border rounded-lg p-4 flex items-center justify-center cursor-pointer ${
                          isSelected
                            ? "border-primary ring-1 ring-primary"
                            : "border-grey-light"
                        } ${index === 2 ? "sm:col-span-2 col-span-1" : ""}`}
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
                  },
                )}
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
                <Input
                  placeholder="Enter promo code"
                  className="w-full px-4 py-3"
                  {...register("promoCode")}
                />
                <Button label="Apply" className="bg-base-black text-white" />
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
            onConfirm={handleFinalSubmit}
          />
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
