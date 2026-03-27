import React, { useMemo, useState } from "react";
import { Button, Input } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/hooks/useOnboardingStore";
import {
  onboardingStep1Schema,
  OnboardingStep1FormData,
} from "@/app/features/auth/pages/onboarding/schemas/Onboarding.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ArrowRight } from "lucide-react";

interface OnboardingStep1Props {
  onNext: (stepData: OnboardingStep1FormData) => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

const OnboardingStep1: React.FC<OnboardingStep1Props> = ({
  onNext,
  isSubmitting,
}) => {
  const { data } = useOnboardingStore();
  const { initialCountryCode, initialContactNumber } = useMemo(() => {
    const stored = data.step1?.contactNumber ?? "";
    if (!stored) {
      return {
        initialCountryCode: "Nepal",
        initialContactNumber: "",
      };
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        id="organizationName"
        label="Company Name"
        placeholder="Enter your company name"
        error={errors.organizationName?.message}
        required
        {...register("organizationName")}
      />

      <Input
        id="email"
        type="email"
        label="Company Email"
        placeholder="xyzcompany@gmail.com"
        error={errors.email?.message}
        required
        {...register("email")}
      />

      <div>
        <label className="body-bold-16 text-grey mb-2 block">
          Company Phone Number <span className="text-danger">*</span>
        </label>
        <div className="flex">
          <select
            className="px-3 py-2 border border-grey-light rounded-l-lg text-grey-medium bg-white min-w-[100px]"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="Nepal">🇳🇵 Nepal</option>
            <option value="India">🇮🇳 India</option>
            <option value="USA">🇺🇸 USA</option>
            <option value="UK">🇬🇧 UK</option>
          </select>
          <div className="flex-1">
            <Input
              id="phone"
              type="tel"
              placeholder="+977 9876543210"
              error={errors.contactNumber?.message}
              className="rounded-l-none border-l-0"
              {...register("contactNumber")}
            />
          </div>
        </div>
      </div>

      <Input
        id="website"
        type="url"
        label="Company Website"
        placeholder="https://www.xyz.com"
        error={errors.website?.message}
        {...register("website")}
      />

      <div className="flex justify-end pt-4">
        <Button
          label="Next"
          type="submit"
          variant="primary"
          IconRight={<ArrowRight size={20} />}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default OnboardingStep1;
