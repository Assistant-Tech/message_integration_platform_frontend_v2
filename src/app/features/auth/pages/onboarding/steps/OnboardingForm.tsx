import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/hooks/useOnboardingStore";
import { Logo } from "@/app/components/ui/";
import { StepSidebar } from "@/app/features/auth/pages/onboarding/components/";
import {
  OnboardingStep1,
  OnboardingStep2,
  OnboardingStep3,
  OnboardingStep4,
  OnboardingStep5,
} from "@/app/features/auth/pages/onboarding/steps";
import { Cross } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/app/store/auth.store";

const OnboardingForm: React.FC = () => {
  const navigate = useNavigate();
  const { data, completedSteps, setStepData, setCompletedSteps, reset } =
    useOnboardingStore();

  const { onboarding } = useAuthStore();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  // Initialize current step based on completed steps
  useEffect(() => {
    const nextStep = Math.min(completedSteps + 1, 5);
    setCurrentStep(nextStep);
  }, [completedSteps]);

  const handleStepComplete = (step: number, stepData: any) => {
    // Save step data to store
    setStepData(`step${step}` as keyof typeof data, stepData);
    setCompletedSteps(step);

    // Move to next step or submit if it's the last required step
    if (step < 3) {
      setCurrentStep(step + 1);
    } else if (step === 3) {
      setCurrentStep(step + 1);
    } else if (step === 4) {
      setCurrentStep(step + 1);
    } else if (step === 5) {
      handleFinalSubmit();
    }
  };

  const handleSkipOptionalStep = (step: number) => {
    if (step === 4) {
      setCurrentStep(5);
    } else if (step === 5) {
      handleFinalSubmit();
    }
  };

  const handleFinishEarly = () => {
    handleFinalSubmit();
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Merge all step data from store into one object
      const allStepsData = {
        ...data.step1,
        ...data.step2,
        ...data.step3,
        ...data.step4,
        ...data.step5,
      };

      const formData = new FormData();

      Object.entries(allStepsData).forEach(([key, value]) => {
        if (value instanceof File) {
          // Single file
          formData.append(key, value);
        } else if (
          Array.isArray(value) &&
          value.length > 0 &&
          value[0] instanceof File
        ) {
          // Multiple files
          value.forEach((file, idx) => {
            if (file instanceof File) {
              formData.append(`${key}[${idx}]`, file);
            } else {
              // If not a File, serialize to JSON string
              formData.append(`${key}[${idx}]`, JSON.stringify(file));
            }
          });
        } else if (Array.isArray(value)) {
          // Array of strings/numbers/objects
          formData.append(key, JSON.stringify(value));
        } else if (typeof value === "object" && value !== null) {
          // Serialize objects to JSON string
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          // Normal text/number fields
          formData.append(key, value as string | Blob);
        }
      });

      const response = await onboarding(formData);

      reset();
      navigate(`/${response.slug}/admin/dashboard`, {
        state: { message: "Onboarding completed successfully!" },
      });
      toast.success("Onboarding completed successfully!");

      //Clear localstorage
      useOnboardingStore.persist.clearStorage();
      useOnboardingStore.getState().reset();
    } catch (error) {
      setSubmitError("Failed to submit onboarding. Please try again.");
      console.error("Onboarding submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    const commonProps = {
      onNext: (stepData: any) => handleStepComplete(currentStep, stepData),
      onPrevious: handlePrevious,
      onSkip:
        currentStep >= 4
          ? () => handleSkipOptionalStep(currentStep)
          : undefined,
      isSubmitting,
    };

    switch (currentStep) {
      case 1:
        return <OnboardingStep1 {...commonProps} />;
      case 2:
        return <OnboardingStep2 {...commonProps} />;
      case 3:
        return (
          <OnboardingStep3
            {...commonProps}
            onFinishEarly={handleFinishEarly}
            showFinishEarlyOption={true}
          />
        );
      case 4:
        return <OnboardingStep4 {...commonProps} isOptional={true} />;
      case 5:
        return <OnboardingStep5 {...commonProps} isOptional={true} />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "General Information";
      case 2:
        return "Location Details";
      case 3:
        return "Industry Selection";
      case 4:
        return "Document Upload (Optional)";
      case 5:
        return "Add Your Memebers (Optional)";
      default:
        return "";
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
          {currentStep >= 4 && (
            <p className="text-grey-medium body-regular-14 max-w-2xl mt-2">
              Steps {currentStep}-5 are optional. You can skip them if you want
              to start using Chatblix immediately.
            </p>
          )}
        </div>

        {/* Error Message */}
        {submitError && (
          <div className="mb-6 p-4 bg-danger-light text-grey rounded-lg flex items-center gap-2">
            <Cross className="text-danger" />
            <p className="text-danger text-sm">{submitError}</p>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-start max-w-full gap-16">
          {/* Step Sidebar */}
          <StepSidebar
            currentStep={currentStep}
            completedSteps={completedSteps}
            totalSteps={5}
          />

          {/* Form Section */}
          <div className="w-full lg:flex-1">
            <h2 className="h4-bold-24 text-grey mb-6">{getStepTitle()}</h2>
            {renderCurrentStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
