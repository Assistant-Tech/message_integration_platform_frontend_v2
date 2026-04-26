import React from "react";
import { Button, Input } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/hooks/useOnboardingStore";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Flower2,
  Shirt,
  Sparkles,
  Cpu,
  Utensils,
  Hammer,
  Palette,
  BookOpen,
  MoreHorizontal,
} from "lucide-react";
import {
  onboardingStep3Schema,
  OnboardingStep3FormData,
} from "@/app/features/auth/pages/onboarding/schemas/Onboarding.schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface OnboardingStep3Props {
  onNext: (stepData: { industry: string }) => void;
  onPrevious: () => void;
  isSubmitting: boolean;
  onFinishEarly?: (stepData: { industry: string }) => void;
  showFinishEarlyOption?: boolean;
}

const INDUSTRY_OPTIONS: {
  label: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}[] = [
  { label: "Digital Marketing", Icon: Briefcase },
  { label: "Skin Care", Icon: Flower2 },
  { label: "Clothing & Fashion", Icon: Shirt },
  { label: "Cosmetics", Icon: Sparkles },
  { label: "Electronics", Icon: Cpu },
  { label: "Food & Beverage", Icon: Utensils },
  { label: "Handicraft", Icon: Hammer },
  { label: "Arts", Icon: Palette },
  { label: "Bookstore", Icon: BookOpen },
  { label: "Others", Icon: MoreHorizontal },
];

const OnboardingStep3: React.FC<OnboardingStep3Props> = ({
  onNext,
  onPrevious,
  isSubmitting,
  onFinishEarly,
  showFinishEarlyOption,
}) => {
  const { data } = useOnboardingStore();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<OnboardingStep3FormData>({
    resolver: zodResolver(onboardingStep3Schema),
    defaultValues: {
      industry: data.step3?.industry ?? "",
      isOther: data.step3?.isOther ?? false,
    },
  });

  const isOther = watch("isOther");
  const selectedIndustry = watch("industry");

  const handleIndustryChange = (value: string) => {
    setValue("industry", value === "Others" ? "" : value, { shouldDirty: true });
    setValue("isOther", value === "Others", { shouldDirty: true });
    clearErrors("industry");
  };

  const handleCustomIndustryChange = (value: string) => {
    setValue("industry", value, { shouldDirty: true });
    clearErrors("industry");
  };

  const onSubmit: SubmitHandler<OnboardingStep3FormData> = (values) => {
    onNext({ industry: values.industry.trim() });
  };

  const handleFinishSetup = () => {
    if (!onFinishEarly) return;
    handleSubmit((values) => {
      onFinishEarly({ industry: values.industry.trim() });
    })();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {showFinishEarlyOption && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-success-light/40 border border-success-light">
          <span className="h-8 w-8 rounded-full bg-success/15 text-success flex items-center justify-center text-sm">
            🎉
          </span>
          <div>
            <p className="label-semi-bold-14 text-success-dark">
              You've got the essentials!
            </p>
            <p className="body-regular-16 text-grey-dark/80 mt-0.5">
              Once you pick an industry you can finish setup now, or continue
              with optional steps to upload documents and invite your team.
            </p>
          </div>
        </div>
      )}

      <div>
        <p className="label-semi-bold-14 text-grey-dark mb-3">
          Pick the one that fits best{" "}
          <span className="text-danger">*</span>
        </p>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          role="radiogroup"
          aria-label="Industry"
        >
          {INDUSTRY_OPTIONS.map(({ label, Icon }) => {
            const isSelected =
              label === "Others"
                ? isOther
                : !isOther && selectedIndustry === label;

            return (
              <label
                key={label}
                className={`group flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                    : "border-grey-light/80 hover:border-grey-medium bg-base-white"
                }`}
              >
                <input
                  type="radio"
                  name="industry"
                  value={label}
                  checked={isSelected}
                  onChange={() => handleIndustryChange(label)}
                  className="sr-only"
                />
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-grey-light/60 text-grey-medium group-hover:text-grey-dark"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.8} />
                </span>
                <span
                  className={`label-semi-bold-14 flex-1 ${
                    isSelected ? "text-grey-dark" : "text-grey-dark/90"
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? "border-primary" : "border-grey-light"
                  }`}
                  aria-hidden
                >
                  {isSelected && (
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  )}
                </span>
              </label>
            );
          })}
        </div>

        {errors.industry && (
          <p className="text-sm text-danger mt-3">{errors.industry.message}</p>
        )}
      </div>

      {isOther && (
        <Input
          id="customIndustry"
          label="Tell us your industry"
          placeholder="e.g. Renewable Energy, Edtech, …"
          required
          {...register("industry")}
          onChange={(e) => handleCustomIndustryChange(e.target.value)}
          error={errors.industry?.message}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
        <Button
          label="Back"
          onClick={onPrevious}
          variant="outlined"
          IconLeft={<ArrowLeft size={18} />}
          disabled={isSubmitting}
        />

        <div className="flex flex-col-reverse sm:flex-row gap-3">
          {showFinishEarlyOption && onFinishEarly && (
            <Button
              label="Finish setup now"
              onClick={handleFinishSetup}
              variant="outlined"
              disabled={isSubmitting}
            />
          )}
          <Button
            label="Continue"
            type="submit"
            variant="primary"
            IconRight={<ArrowRight size={18} />}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </form>
  );
};

export default OnboardingStep3;
