import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { StepsIndicator } from "@/app/features/auth/components/ui";
import { Button, Input, Logo } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/store/useOnboardingStore";
import onboardingSteps from "@/app/utils/onboarding/onboarding";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface LegalDocsData {
  panNumber: string;
  panFile: File | null;
}

interface LegalDocsErrors {
  panNumber?: string;
  panFile?: string;
}

const OnboardingStep4: React.FC = () => {
  const navigate = useNavigate();
  const { data, setStepData, setCompletedSteps, completedSteps } =
    useOnboardingStore();

  const [formData, setFormData] = useState<LegalDocsData>(
    data.step4 || {
      panNumber: "",
      panFile: null,
    },
  );
  console.log("🚀 ~ formData ~ 4:", formData);

  const [errors, setErrors] = useState<LegalDocsErrors>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, panFile: file }));
    if (errors.panFile) setErrors((prev) => ({ ...prev, panFile: "" }));
  };

  const validateForm = () => {
    const newErrors: LegalDocsErrors = {};
    if (!formData.panNumber.trim()) newErrors.panNumber = "PAN is required.";
    if (!formData.panFile) newErrors.panFile = "PAN file is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setStepData("step4", formData);
      setCompletedSteps(4);
      navigate("/onboardingform/step-5");
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col justify-center">
        <article className="pb-12">
          <Logo />
        </article>

        <div className="mb-10">
          <h1 className="h2-bold-40 text-black mb-2">
            Welcome to Chatblix, Jane!
          </h1>
          <p className="text-grey-medium body-regular-16 max-w-2xl">
            Complete your onboarding process by setting up your workplace. The
            next few steps will contain all the necessary information you will
            need to enter to personalize your Chatblix account.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Stepper */}
          <div className="w-full lg:max-w-md space-y-4">
            {onboardingSteps.map(({ stepNumber, title, description }: any) => (
              <StepsIndicator
                key={stepNumber}
                stepNumber={stepNumber}
                title={title}
                description={description}
                isActive={stepNumber === 4}
                isCompleted={completedSteps >= stepNumber}
              />
            ))}
          </div>

          {/* Right Content */}
          <div className="w-full lg:flex-1">
            <h2 className="h4-bold-24 text-grey mb-8">
              Your Legal Documentation
            </h2>

            {/* INPUT SECTION */}
            <div className="space-y-4">
              {/* PAN Input */}
              <div>
                <label
                  htmlFor="pan"
                  className="block mb-2 body-bold-16 text-grey"
                >
                  Enter Your PAN <span className="text-danger">*</span>
                </label>
                <Input
                  id="pan"
                  placeholder="Enter your pan"
                  value={formData.panNumber}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      panNumber: e.target.value,
                    }));
                    if (errors.panNumber)
                      setErrors((prev) => ({ ...prev, panNumber: "" }));
                  }}
                  error={errors.panNumber}
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block mb-2 body-bold-16 text-grey">
                  Upload Company’s PAN Card{" "}
                  <span className="text-danger">*</span>
                </label>
                <div className="border border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 text-center">
                  <p className="text-sm text-gray-500">
                    Drag & drop attachment here
                  </p>
                  <p className="text-sm text-gray-500 my-2">Or</p>
                  <label
                    htmlFor="panUpload"
                    className="inline-block bg-black text-white px-6 py-2 rounded-md cursor-pointer"
                  >
                    + Add Attachment
                  </label>
                  <input
                    id="panUpload"
                    type="file"
                    accept=".jpeg,.png,.pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {formData.panFile && (
                    <p className="mt-2 text-sm text-gray-600">
                      Attached: {formData.panFile.name}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    You can attach .jpeg, .png or .pdf Files
                  </p>
                  {errors.panFile && (
                    <p className="text-danger text-sm mt-1">{errors.panFile}</p>
                  )}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                <Button
                  label="Go Back"
                  onClick={() => navigate("/onboardingform/step-3")}
                  variant="outlined"
                  IconLeft={<ArrowLeft size={24} />}
                />
                <div className="flex items-center gap-4">
                  <Button
                    label="Next"
                    onClick={handleSubmit}
                    variant="primary"
                    IconRight={<ArrowRight size={24} />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep4;
