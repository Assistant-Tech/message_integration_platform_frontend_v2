import React, { useState } from "react"; // Ensure useState is imported
import { useNavigate } from "react-router-dom";

import { StepsIndicator } from "@/app/features/auth/components/ui";
import { Button, Input, Logo } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/store/useOnboardingStore";
import onboardingSteps from "@/app/utils/onboarding/onboarding";

interface IndustryData {
  selectedIndustry: string;
  customIndustry?: string;
}

interface IndustryErrors {
  selectedIndustry?: string;
  customIndustry?: string;
}

const OnboardingStep3: React.FC = () => {
  const navigate = useNavigate();
  const { data, setStepData, setCompletedSteps, completedSteps } =
    useOnboardingStore();

  const [formData, setFormData] = useState<IndustryData>(
    data.step3 || {
      selectedIndustry: "",
      customIndustry: "",
    },
  );
  console.log("🚀 ~ formData ~ 3:", formData)

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
    const newErrors: IndustryErrors = {};

    if (!formData.selectedIndustry) {
      newErrors.selectedIndustry = "Please select an industry";
    }

    if (
      formData.selectedIndustry === "Others" &&
      (!formData.customIndustry || !formData.customIndustry.trim())
    ) {
      newErrors.customIndustry = "Please specify your industry";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
          {/* Left Sidebar: Dynamically render steps */}
          <div className="w-full lg:max-w-md space-y-4">
            {onboardingSteps.map(({ stepNumber, title, description }: any) => (
              <StepsIndicator
                key={stepNumber}
                stepNumber={stepNumber}
                title={title}
                description={description}
                isActive={stepNumber === 3}
                isCompleted={completedSteps >= stepNumber}
              />
            ))}
          </div>

          {/* Right Form Section */}
          <div className="w-full lg:flex-1">
            <h2 className="text-2xl font-semibold text-grey mb-6">
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
                    value={formData.customIndustry || ""} // Ensure string value for input
                    onChange={(e) => handleCustomIndustryChange(e.target.value)}
                    error={errors.customIndustry}
                  />
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button
                  label="← Go Back"
                  onClick={() => navigate("/onboardingform/step-2")}
                  variant="outlined"
                />
                <Button
                  label="Next →"
                  onClick={handleSubmit}
                  variant="primary"
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
