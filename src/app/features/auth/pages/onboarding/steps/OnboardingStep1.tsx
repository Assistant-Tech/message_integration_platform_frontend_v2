import React, { useState } from "react";
import { StepsIndicator } from "@/app/features/auth/components/ui";
import { Button, Input, Logo } from "@/app/components/ui/";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "../../../store/useOnboardingStore";
import onboardingSteps from "@/app/utils/onboarding/onboarding";

interface FormData {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyWebsite?: string;
}

interface FormErrors {
  companyName?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyWebsite?: string;
}

const OnboardingStep1: React.FC = () => {
  const navigate = useNavigate();
  const { data, setStepData } = useOnboardingStore();

  const [formData, setFormData] = useState<FormData>(
    data.step1 || {
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      companyWebsite: "",
    },
  );
  console.log("🚀 ~ formData ~ 1:", formData);

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = "Company email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.companyEmail)) {
      newErrors.companyEmail = "Enter a valid email";
    }
    if (!formData.companyPhone.trim()) {
      newErrors.companyPhone = "Company phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setStepData("step1", formData);
      navigate("/onboardingform/step-2");
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
          {/* Sidebar */}
          <div className="w-full lg:max-w-md space-y-4">
            {onboardingSteps.map((step) => (
              <StepsIndicator
                key={step.stepNumber}
                stepNumber={step.stepNumber}
                title={step.title}
                description={step.description}
                isActive={step.stepNumber === 1}
              />
            ))}
          </div>

          {/* Form */}
          <div className="w-full lg:flex-1">
            <h2 className="text-2xl font-semibold text-grey mb-6">
              General Information
            </h2>

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
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Phone Number <span className="text-danger">*</span>
                </label>
                <div className="flex">
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
                <Button label="Next" onClick={handleSubmit} variant="primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep1;
