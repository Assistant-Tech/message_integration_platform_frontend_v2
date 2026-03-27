import React, { useState } from "react";
import { Button, Input } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/hooks/useOnboardingStore";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  onboardingStep3Schema,
  OnboardingStep3FormData,
} from "@/app/features/auth/pages/onboarding/schemas/Onboarding.schema";

interface IndustryErrors {
  industry?: string;
}

interface OnboardingStep3Props {
  onNext: (stepData: { industry: string }) => void;
  onPrevious: () => void;
  isSubmitting: boolean;
  onFinishEarly?: (stepData: { industry: string }) => void;
  showFinishEarlyOption?: boolean;
}

const OnboardingStep3: React.FC<OnboardingStep3Props> = ({
  onNext,
  onPrevious,
  isSubmitting,
  onFinishEarly,
  showFinishEarlyOption,
}) => {
  const { data } = useOnboardingStore();

  const [formData, setFormData] = useState<OnboardingStep3FormData>({
    industry: data.step3?.industry || "",
    isOther: data.step3?.isOther || false,
  });

  const [errors, setErrors] = useState<IndustryErrors>({});

  const industries = [
    "Digital Marketing",
    "Skin Care",
    "Clothing & Fashion",
    "Cosmetics",
    "Electronics",
    "Food & Beverage",
    "Handicraft",
    "Arts",
    "Bookstore",
    "Others",
  ];

  const handleIndustryChange = (value: string) => {
    setFormData({
      industry: value === "Others" ? "" : value,
      isOther: value === "Others",
    });

    if (errors.industry) setErrors({});
  };

  const handleCustomIndustryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      industry: value,
    }));

    if (errors.industry) setErrors({});
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = onboardingStep3Schema.safeParse(formData);

    if (!result.success) {
      const newErrors: IndustryErrors = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0] as keyof IndustryErrors] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});
    // Send only industry to API
    onNext({ industry: formData.industry.trim() });
  };

  const handleFinishSetup = () => {
    const result = onboardingStep3Schema.safeParse(formData);

    if (!result.success) {
      const newErrors: IndustryErrors = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0] as keyof IndustryErrors] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onFinishEarly?.({ industry: formData.industry.trim() });
  };

  return (
    <div className="space-y-6">
      {showFinishEarlyOption && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="text-blue-800 font-medium mb-2">🎉 Great progress!</h4>
          <p className="text-blue-600 text-sm">
            You've completed all the required steps. You can finish your setup
            now or continue with optional steps to add documents and team
            members.
          </p>
        </div>
      )}

      <h3 className="text-lg font-medium text-grey mb-4">
        Choose your Industry <span className="text-danger">*</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {industries.map((industryOption) => {
          const isSelected =
            formData.isOther && industryOption === "Others"
              ? true
              : formData.industry === industryOption;

          return (
            <label
              key={industryOption}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="industry"
                value={industryOption}
                checked={isSelected}
                onChange={() => handleIndustryChange(industryOption)}
                className="hidden"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                  isSelected ? "border-primary" : "border-gray-300"
                }`}
              >
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-sm text-gray-700">{industryOption}</span>
            </label>
          );
        })}
      </div>

      {errors.industry && (
        <p className="text-danger text-sm mt-1">{errors.industry}</p>
      )}

      {formData.isOther && (
        <div className="mt-6">
          <p className="text-grey-medium mb-4">If Others, please specify</p>
          <Input
            id="customIndustry"
            placeholder="Please specify your industry"
            value={formData.industry}
            onChange={(e) => handleCustomIndustryChange(e.target.value)}
            error={errors.industry}
          />
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button
          label="Go Back"
          onClick={onPrevious}
          variant="outlined"
          IconLeft={<ArrowLeft size={20} />}
          disabled={isSubmitting}
        />

        <div className="flex gap-3">
          {showFinishEarlyOption && onFinishEarly && (
            <Button
              label="Finish Setup"
              onClick={handleFinishSetup}
              variant="outlined"
              disabled={isSubmitting}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            />
          )}
          <Button
            label="Continue"
            onClick={handleSubmit}
            variant="primary"
            IconRight={<ArrowRight size={20} />}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep3;
