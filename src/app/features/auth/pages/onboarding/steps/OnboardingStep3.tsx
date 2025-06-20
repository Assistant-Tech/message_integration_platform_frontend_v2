import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepSidebar } from "@/app/features/auth/pages/onboarding/components";
import { Button, Input, Logo } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/store/useOnboardingStore";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  onboardingStep3Schema,
  OnboardingStep3FormData,
} from "@/app/features/auth/pages/onboarding/schemas/Step3.schema";

interface IndustryErrors {
  selectedIndustry?: string;
  customIndustry?: string;
}

const OnboardingStep3: React.FC = () => {
  const navigate = useNavigate();
  const { data, setStepData, setCompletedSteps } = useOnboardingStore();

  const currentStep = 3;

  const [formData, setFormData] = useState<OnboardingStep3FormData>(
    data.step3 || {
      selectedIndustry: "",
      customIndustry: "",
    },
  );

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

  const handleIndustryChange = (industry: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedIndustry: industry,
      customIndustry: industry !== "Others" ? "" : prev.customIndustry,
    }));

    if (errors.selectedIndustry) {
      setErrors((prev) => ({ ...prev, selectedIndustry: "" }));
    }
  };

  const handleCustomIndustryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, customIndustry: value }));

    if (errors.customIndustry) {
      setErrors((prev) => ({ ...prev, customIndustry: "" }));
    }
  };

  const validateForm = (): boolean => {
    const result = onboardingStep3Schema.safeParse(formData);
    if (!result.success) {
      const newErrors: IndustryErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof IndustryErrors;
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setStepData("step3", formData);
      setCompletedSteps(3);
      navigate("/onboardingform/step-4");
    }
  };

  return (
    <div className="min-h-screen bg-base-white py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col justify-center">
        <article className="pb-12">
          <Logo />
        </article>
        <div className="mb-10">
          <h1 className="h2-bold-40 text-base-black mb-2">
            Welcome to Chatblix, Jane!
          </h1>
          <p className="text-grey-medium body-regular-16 max-w-2xl">
            Complete your onboarding process by setting up your workplace. The
            next few steps will contain all the necessary information you will
            need to enter to personalize your Chatblix account.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start max-w-full gap-16">
          <StepSidebar
            currentStep={currentStep}
            previousStep={currentStep - 1}
          />

          <div className="w-full lg:flex-1">
            <h2 className="h4-bold-24 text-grey mb-6">
              Choose your Industry <span className="text-danger">*</span>
            </h2>

            <div className="space-y-6">
              {/* Industry Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {industries.map((industry) => {
                  const isSelected = formData.selectedIndustry === industry;

                  return (
                    <label
                      key={industry}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="industry"
                        value={industry}
                        checked={isSelected}
                        onChange={(e) => handleIndustryChange(e.target.value)}
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
                      <span className="text-sm text-gray-700">{industry}</span>
                    </label>
                  );
                })}
              </div>

              {errors.selectedIndustry && (
                <p className="text-danger text-sm mt-1">
                  {errors.selectedIndustry}
                </p>
              )}

              {/* Custom Industry Input */}
              {formData.selectedIndustry === "Others" && (
                <div className="mt-6">
                  <p className="text-grey-medium mb-4">
                    If Others, please specify
                  </p>
                  <Input
                    id="customIndustry"
                    label=""
                    placeholder="Please specify your industry"
                    value={formData.customIndustry || ""}
                    onChange={(e) => handleCustomIndustryChange(e.target.value)}
                    error={errors.customIndustry}
                  />
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button
                  label="Go Back"
                  onClick={() => navigate("/onboardingform/step-2")}
                  variant="outlined"
                  IconLeft={<ArrowLeft size={20} />}
                />
                <Button
                  label="Next"
                  onClick={handleSubmit}
                  variant="primary"
                  IconRight={<ArrowRight size={20} />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep3;
