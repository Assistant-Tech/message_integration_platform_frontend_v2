import React, { useEffect, useState } from "react";
import { StepsIndicator } from "@/app/features/auth/pages/onboarding/components";
import onboardingSteps from "@/app/utils/onboarding/onboarding.config";

interface StepSidebarProps {
  currentStep: number;
  completedSteps: number;
  totalSteps?: number;
}

const StepSidebar: React.FC<StepSidebarProps> = ({
  currentStep,
  completedSteps,
}) => {
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  useEffect(() => {
    // Compare with previous value directly
    setDirection((prev) => {
      if (currentStep > prevStepRef.current) return "forward";
      if (currentStep < prevStepRef.current) return "backward";
      return prev;
    });
    prevStepRef.current = currentStep;
  }, [currentStep]);

  // Keep a ref of the previous step without triggering re-renders
  const prevStepRef = React.useRef(currentStep);

  return (
    <div className="w-full lg:max-w-md">
      <div className="rounded-lg">
        <h3 className="text-lg font-semibold text-grey mb-6">Setup Progress</h3>

        <div className="space-y-0">
          {onboardingSteps.map((step, idx) => {
            const isActive = step.stepNumber === currentStep;
            const isCompleted = step.stepNumber <= completedSteps;
            const isLast = idx === onboardingSteps.length - 1;

            return (
              <StepsIndicator
                key={step.stepNumber}
                stepNumber={step.stepNumber}
                title={step.title}
                description={step.description}
                isActive={isActive}
                isCompleted={isCompleted && step.stepNumber !== currentStep}
                isLast={isLast}
                direction={direction}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepSidebar;
