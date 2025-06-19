import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { StepsIndicator } from "@/app/features/auth/components/ui";
import { Button, Input, Logo } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/store/useOnboardingStore";
import onboardingSteps from "@/app/utils/onboarding/onboarding"; // Assuming this array is correctly imported

interface LocationData {
  country: string;
  state: string;
  city: string;
}
interface LocationErrors {
  country?: string;
  state?: string;
  city?: string;
}

const OnboardingStep2: React.FC = () => {
  const navigate = useNavigate();
  const { data, setStepData, setCompletedSteps, completedSteps } =
    useOnboardingStore();

  const [formData, setFormData] = useState<LocationData>(
    data.step2 || {
      country: "",
      state: "",
      city: "",
    },
  );
  console.log("🚀 ~ formData ~ 2:", formData);

  const [errors, setErrors] = useState<LocationErrors>({});

  const handleChange = (field: keyof LocationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: LocationErrors = {};
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setStepData("step2", formData);
      setCompletedSteps(2);
      navigate("/onboardingform/step-3");
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
          {/* Sidebar: Dynamically render steps */}
          <div className="w-full lg:max-w-md space-y-4">
            {onboardingSteps.map(({ stepNumber, title, description }: any) => (
              <StepsIndicator
                key={stepNumber}
                stepNumber={stepNumber}
                title={title}
                description={description}
                isActive={stepNumber === 2}
                isCompleted={completedSteps >= stepNumber}
              />
            ))}
          </div>

          {/* Right Form */}
          <div className="w-full lg:flex-1">
            <h2 className="text-2xl font-semibold text-grey mb-6">
              Company’s Location
            </h2>

            <div className="space-y-6">
              <Input
                id="country"
                label="Country *"
                placeholder="Select your country"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                error={errors.country}
              />

              <Input
                id="state"
                label="State/ Province"
                placeholder="Select your state or province"
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
                error={errors.state}
              />

              <Input
                id="city"
                label="City"
                placeholder="Enter your city"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                error={errors.city}
              />

              <div className="flex justify-between pt-4">
                <Button
                  label="← Go Back"
                  onClick={() => navigate("/onboardingform/step-1")}
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

export default OnboardingStep2;
