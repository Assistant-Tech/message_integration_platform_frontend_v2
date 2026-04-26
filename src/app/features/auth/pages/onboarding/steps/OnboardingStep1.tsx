import React, { useMemo, useState } from "react";
import { Button, Input } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/hooks/useOnboardingStore";
import {
  onboardingStep1Schema,
  OnboardingStep1FormData,
} from "@/app/features/auth/pages/onboarding/schemas/Onboarding.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ArrowRight, ChevronDown } from "lucide-react";

interface OnboardingStep1Props {
  onNext: (stepData: OnboardingStep1FormData) => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

const COUNTRY_OPTIONS = [
  { label: "Nepal", flag: "🇳🇵", dial: "+977" },
  { label: "India", flag: "🇮🇳", dial: "+91" },
  { label: "USA", flag: "🇺🇸", dial: "+1" },
  { label: "UK", flag: "🇬🇧", dial: "+44" },
];

const OnboardingStep1: React.FC<OnboardingStep1Props> = ({
  onNext,
  isSubmitting,
}) => {
  const { data } = useOnboardingStore();
  const { initialCountryCode, initialContactNumber } = useMemo(() => {
    const stored = data.step1?.contactNumber ?? "";
    if (!stored) {
      return { initialCountryCode: "Nepal", initialContactNumber: "" };
    }

    const [maybeCode, maybeNumber] = stored.split("-", 2);

    if (maybeNumber) {
      return {
        initialCountryCode: maybeCode || "Nepal",
        initialContactNumber: maybeNumber || "",
      };
    }

    return {
      initialCountryCode: "Nepal",
      initialContactNumber: stored,
    };
  }, [data.step1?.contactNumber]);

  const [countryCode, setCountryCode] = useState<string>(initialCountryCode);
  const selectedDial =
    COUNTRY_OPTIONS.find((c) => c.label === countryCode)?.dial ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingStep1FormData>({
    resolver: zodResolver(onboardingStep1Schema),
    defaultValues: {
      organizationName: data.step1?.organizationName ?? "",
      email: data.step1?.email ?? "",
      contactNumber: initialContactNumber,
      website: data.step1?.website ?? "",
    },
  });

  const onSubmit: SubmitHandler<OnboardingStep1FormData> = (values) => {
    const dataWithCountry: OnboardingStep1FormData = {
      ...values,
      contactNumber: `${countryCode}-${values.contactNumber}`,
    };

    if (!values.website) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { website, ...rest } = dataWithCountry;
      onNext(rest as OnboardingStep1FormData);
      return;
    }

    onNext(dataWithCountry);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <Input
        id="organizationName"
        label="Company name"
        placeholder="Acme Inc."
        error={errors.organizationName?.message}
        required
        autoComplete="organization"
        {...register("organizationName")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          id="email"
          type="email"
          label="Company email"
          placeholder="hello@acme.com"
          error={errors.email?.message}
          required
          autoComplete="email"
          {...register("email")}
        />

        <div className="flex flex-col gap-1 w-full">
          <label
            htmlFor="contactNumber"
            className="body-bold-16 text-grey"
          >
            Company phone <span className="text-danger">*</span>
          </label>
          <div
            className={`flex items-stretch rounded-lg border overflow-hidden transition-all focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary/60 ${
              errors.contactNumber ? "border-danger" : "border-grey-light"
            }`}
          >
            <div className="relative flex items-center pl-3 pr-2 bg-grey-light/30 border-r border-grey-light">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="appearance-none bg-transparent pr-6 body-regular-16 text-grey-dark outline-none cursor-pointer"
                aria-label="Country"
              >
                {COUNTRY_OPTIONS.map((c) => (
                  <option key={c.label} value={c.label}>
                    {c.flag} {c.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-2 text-grey-medium"
              />
            </div>
            <span className="flex items-center px-3 body-regular-16 text-grey-medium bg-grey-light/20 border-r border-grey-light">
              {selectedDial}
            </span>
            <input
              id="contactNumber"
              type="tel"
              autoComplete="tel"
              placeholder="9876543210"
              className="flex-1 min-w-0 px-3 body-regular-16 text-grey-dark placeholder:text-grey-medium/60 outline-none"
              {...register("contactNumber")}
            />
          </div>
          {errors.contactNumber && (
            <p className="text-sm text-danger mt-1">
              {errors.contactNumber.message}
            </p>
          )}
        </div>
      </div>

      <Input
        id="website"
        type="url"
        label="Website"
        placeholder="https://acme.com"
        error={errors.website?.message}
        autoComplete="url"
        {...register("website")}
      />
      <p className="-mt-3 caption-medium-12 text-grey-medium">
        Optional — helps teammates recognize your brand.
      </p>

      <div className="flex justify-end pt-2">
        <Button
          label="Continue"
          type="submit"
          variant="primary"
          IconRight={<ArrowRight size={18} />}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default OnboardingStep1;
