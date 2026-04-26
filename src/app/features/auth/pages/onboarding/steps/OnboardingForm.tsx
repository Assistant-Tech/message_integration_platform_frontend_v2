import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/hooks/useOnboardingStore";
import { Logo } from "@/app/components/ui/";
import {
  StepSidebar,
  MobileStepProgress,
} from "@/app/features/auth/pages/onboarding/components/";
import {
  OnboardingStep1,
  OnboardingStep3,
  OnboardingStep4,
  OnboardingStep5,
} from "@/app/features/auth/pages/onboarding/steps";
import { AlertCircle } from "lucide-react";

// Lazy-load Step2 — it pulls in country-state-city (~7.7MB of geo JSON)
const OnboardingStep2 = lazy(() => import("./OnboardingStep2"));
import { useOnboarding } from "@/app/hooks/query/useAuthQuery";
import { useAuthStore } from "@/app/store/auth.store";
import type { NormalizedError } from "@/app/types/error.types";

const STEP_META: Record<
  number,
  { title: string; subtitle: string; optional?: boolean }
> = {
  1: {
    title: "Tell us about your company",
    subtitle:
      "Just the basics — name, how to reach you, and where we can find you online.",
  },
  2: {
    title: "Where is your company based?",
    subtitle:
      "We use this to personalize region, language, and compliance settings.",
  },
  3: {
    title: "Which industry fits you best?",
    subtitle: "Helps us recommend templates and integrations tailored to you.",
  },
  4: {
    title: "Upload your business documents",
    subtitle:
      "Optional — you can add these now or from your dashboard later.",
    optional: true,
  },
  5: {
    title: "Invite your team",
    subtitle:
      "Optional — bring teammates in now, or invite them anytime from Settings.",
    optional: true,
  },
};

const OnboardingForm: React.FC = () => {
  const navigate = useNavigate();
  const { data, completedSteps, setStepData, setCompletedSteps, reset } =
    useOnboardingStore();
  const onboardingMutation = useOnboarding();
  const resetAuth = useAuthStore((s) => s.resetAuth);
  const setRequiresOnboarding = useAuthStore((s) => s.setRequiresOnboarding);
  const user = useAuthStore((s) => s.user);
  const firstName = user?.firstName ?? user?.name?.split(" ")[0] ?? "there";

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  // Initialize current step based on completed steps
  useEffect(() => {
    const nextStep = Math.min(completedSteps + 1, 5);
    setCurrentStep(nextStep);
  }, [completedSteps]);

  const handleStepComplete = (step: number, stepData: any) => {
    setStepData(`step${step}` as keyof typeof data, stepData);
    setCompletedSteps(step);

    if (step < 5) {
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

  const isMissingOnboardingTokenError = (error: unknown): boolean => {
    const normalizedError = error as Partial<NormalizedError>;
    return (
      typeof normalizedError?.message === "string" &&
      normalizedError.message
        .toLowerCase()
        .includes("onboarding token not found")
    );
  };

  const handleOnboardingTokenMissing = () => {
    setRequiresOnboarding(false);
    resetAuth();
    useOnboardingStore.persist.clearStorage();
    useOnboardingStore.getState().reset();

    navigate(`/login`, {
      replace: true,
      state: {
        message: "Your onboarding session expired. Please login again.",
      },
    });
  };

  const handleFinishEarly = (step3Data: { industry: string }) => {
    setStepData("step3", step3Data);
    setCompletedSteps(3);
    handleFinalSubmit({ step3: step3Data });
  };

  const handleFinalSubmit = async (overrideData?: Partial<typeof data>) => {
    setIsSubmitting(true);
    setSubmitError("");

    // Merge all step data from store into one object
    const allStepsData = {
      ...data.step1,
      ...data.step2,
      ...data.step3,
      ...data.step4,
      ...data.step5,
      ...overrideData?.step1,
      ...overrideData?.step2,
      ...overrideData?.step3,
      ...overrideData?.step4,
      ...overrideData?.step5,
    };

    const formData = new FormData();

    Object.entries(allStepsData).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (
        Array.isArray(value) &&
        value.length > 0 &&
        value[0] instanceof File
      ) {
        value.forEach((file, idx) => {
          if (file instanceof File) {
            formData.append(`${key}[${idx}]`, file);
          } else {
            formData.append(`${key}[${idx}]`, JSON.stringify(file));
          }
        });
      } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value as string | Blob);
      }
    });

    onboardingMutation.mutate(formData, {
      onSuccess: () => {
        setRequiresOnboarding(false);
        reset();
        navigate(`/login`, {
          state: { message: "Onboarding completed successfully!" },
        });
        useOnboardingStore.persist.clearStorage();
        useOnboardingStore.getState().reset();
      },
      onError: (error: any) => {
        if (isMissingOnboardingTokenError(error)) {
          handleOnboardingTokenMissing();
          return;
        }

        if (error?.message?.includes("Default role")) {
          setSubmitError(
            "Server configuration error: system roles are not initialized. Please contact support.",
          );
        } else {
          setSubmitError(
            error?.message || "Failed to submit onboarding. Please try again.",
          );
        }

        console.error("Onboarding submission error:", error);
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    });
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

  const meta = STEP_META[currentStep];

  return (
    <div className="min-h-screen bg-grey-light/30 pb-16">
      {/* Sticky top bar */}
      <header className="sticky top-0 z-20 bg-base-white/95 backdrop-blur border-b border-grey-light/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Logo />
          <div className="hidden sm:flex items-center gap-2 caption-medium-12 text-grey-medium">
            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">
              Step {currentStep} of 5
            </span>
            {meta?.optional && (
              <span className="px-2.5 py-1 rounded-full bg-grey-light/60 text-grey-medium">
                Optional
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="h3-bold-32 sm:h2-bold-40 text-grey-dark">
            Welcome to Chatblix, {firstName}!
          </h1>
          <p className="mt-2 body-regular-16 text-grey-medium max-w-2xl">
            Let's set up your workspace. It only takes a few minutes — you can
            save and come back anytime.
          </p>
        </div>

        {/* Mobile progress */}
        <div className="mb-6 lg:hidden">
          <MobileStepProgress
            currentStep={currentStep}
            completedSteps={completedSteps}
            totalSteps={5}
          />
        </div>

        {/* Error banner */}
        {submitError && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 p-4 rounded-xl border border-danger-light bg-danger-light/30"
          >
            <AlertCircle
              className="text-danger shrink-0 mt-0.5"
              size={20}
              strokeWidth={1.8}
            />
            <div className="flex-1">
              <p className="label-semi-bold-14 text-danger">
                Something went wrong
              </p>
              <p className="body-regular-16 text-grey-dark/80 mt-0.5">
                {submitError}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSubmitError("")}
              className="label-medium-14 text-grey-medium hover:text-grey-dark underline underline-offset-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <StepSidebar
                currentStep={currentStep}
                completedSteps={completedSteps}
                totalSteps={5}
              />
            </div>
          </aside>

          {/* Form card */}
          <section className="bg-base-white border border-grey-light/60 rounded-2xl shadow-sm">
            <div className="p-6 sm:p-8 border-b border-grey-light/40">
              <h2 className="h4-semi-bold-24 text-grey-dark">{meta?.title}</h2>
              <p className="mt-1.5 body-regular-16 text-grey-medium">
                {meta?.subtitle}
              </p>
            </div>
            <div className="p-6 sm:p-8">
              <Suspense
                fallback={
                  <div className="space-y-4 animate-pulse">
                    <div className="h-11 bg-grey-light rounded-lg w-full" />
                    <div className="h-11 bg-grey-light rounded-lg w-full" />
                    <div className="h-11 bg-grey-light rounded-lg w-3/4" />
                  </div>
                }
              >
                {renderCurrentStep()}
              </Suspense>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
