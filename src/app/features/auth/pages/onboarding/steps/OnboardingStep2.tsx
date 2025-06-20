import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { StepSidebar } from "@/app/features/auth/pages/onboarding/components";
import { Button, Input, Logo } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/store/useOnboardingStore";
import {
  OnboardingStep2FormData,
  onboardingStep2Schema,
} from "@/app/features/auth/pages/onboarding/schemas/Step2.schema";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface LocationErrors {
  country?: string;
  state?: string;
  city?: string;
}

const OnboardingStep2: React.FC = () => {
  const navigate = useNavigate();
  const { data, setStepData, setCompletedSteps } = useOnboardingStore();
  const currentStep = 2;

  const [formData, setFormData] = useState<OnboardingStep2FormData>(
    data.step2 || {
      country: "",
      state: "",
      city: "",
    },
  );

  const [errors, setErrors] = useState<LocationErrors>({});

  const handleChange = (
    field: keyof OnboardingStep2FormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const result = onboardingStep2Schema.safeParse(formData);

    if (!result.success) {
      const newErrors: LocationErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof LocationErrors;
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
          <StepSidebar
            currentStep={currentStep}
            previousStep={currentStep - 1}
          />

          <div className="w-full lg:flex-1">
            <h2 className="h4-bold-24 text-grey mb-6">Company’s Location</h2>

            <div className="space-y-6">
              <Input
                id="country"
                label="Country"
                placeholder="Select your country"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                error={errors.country}
                required
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
                required
              />

              <div className="flex justify-between pt-4">
                <Button
                  label="Go Back"
                  onClick={() => navigate("/onboardingform/step-1")}
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

export default OnboardingStep2;
