import React, { useState } from "react";
import { Button, Input, Logo } from "@/app/components/ui/";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/hooks/useOnboardingStore";
import { StepSidebar } from "@/app/features/auth/pages/onboarding/components/";
import {
  onboardingStep1Schema,
  OnboardingStep1FormData,
} from "@/app/features/auth/pages/onboarding/schemas/Onboarding.schema";
import { ZodError } from "zod";
import { ArrowRight } from "lucide-react";

interface FormErrors {
  companyName?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyWebsite?: string;
}

const OnboardingStep1: React.FC = () => {
  const navigate = useNavigate();
  const { data, setStepData } = useOnboardingStore();

  const currentStep = 1;

  const [formData, setFormData] = useState<OnboardingStep1FormData>(
    data.step1 || {
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      companyWebsite: "",
    },
  );

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (
    field: keyof OnboardingStep1FormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      onboardingStep1Schema.parse(formData);
      setErrors({});
      setStepData("step1", formData);
      navigate("/onboardingform/step-2");
    } catch (err) {
      if (err instanceof ZodError) {
        const newErrors: FormErrors = {};
        err.errors.forEach((error) => {
          if (error.path.length > 0) {
            newErrors[error.path[0] as keyof FormErrors] = error.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-white py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col justify-center">
        {/* Header */}
        <article className="pb-12">
          <Logo />
        </article>

        {/* Intro Text */}
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

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-start max-w-full gap-16">
          {/* Step Sidebar */}
          <StepSidebar
            currentStep={currentStep}
            previousStep={currentStep - 1}
          />

          {/* Form Section */}
          <div className="w-full lg:flex-1">
            <h2 className="h4-bold-24 text-grey mb-6">General Information</h2>

            <div className="space-y-6">
              <Input
                id="companyName"
                label="Company Name"
                placeholder="Enter your company name"
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                error={errors.companyName}
                required
              />

              <Input
                id="companyEmail"
                type="email"
                label="Company Email"
                placeholder="xyzcompany@gmail.com"
                value={formData.companyEmail}
                onChange={(e) =>
                  handleInputChange("companyEmail", e.target.value)
                }
                error={errors.companyEmail}
                required
              />

              <div>
                <label className="body-bold-16 text-grey mb-2">
                  Company Phone Number <span className="text-danger">*</span>
                </label>
                <div className="flex">
                  {/* Country Code Select (consider managing its state if needed) */}
                  <select className="px-2 py-2 border border-grey-light rounded-l-lg text-grey-medium">
                    <option>Nepal</option>
                    <option>India</option>
                    <option>USA</option>
                    <option>UK</option>
                  </select>
                  <Input
                    id="companyPhone"
                    type="tel"
                    placeholder="+977"
                    value={formData.companyPhone}
                    onChange={(e) =>
                      handleInputChange("companyPhone", e.target.value)
                    }
                    error={errors.companyPhone}
                    className="rounded-l-none rounded-r-lg"
                  />
                </div>
              </div>

              <Input
                id="companyWebsite"
                type="url"
                label="Company Website"
                placeholder="https://www.xyz.com"
                value={formData.companyWebsite}
                onChange={(e) =>
                  handleInputChange("companyWebsite", e.target.value)
                }
                error={errors.companyWebsite}
              />

              <div className="flex justify-end pt-4">
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

export default OnboardingStep1;
