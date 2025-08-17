import React from "react";
import { motion } from "framer-motion";

import { StepsIndicator } from "@/app/features/auth/pages/onboarding/components";
import onboardingSteps from "@/app/utils/onboarding/onboarding";

interface StepSidebarProps {
  currentStep: number;
  completedSteps: number;
  totalSteps?: number;
}

const StepSidebar: React.FC<StepSidebarProps> = ({
  currentStep,
  completedSteps,
  totalSteps = 5,
}) => {
  const [previousStep, setPreviousStep] = React.useState(currentStep);

  React.useEffect(() => {
    setPreviousStep(currentStep);
  }, [currentStep]);

  return (
    <div className="w-full lg:max-w-md">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-grey-light">
        <h3 className="text-lg font-semibold text-grey mb-6">Setup Progress</h3>

        <div className="space-y-0">
          {onboardingSteps.map((step, idx) => {
            const isActive = step.stepNumber === currentStep;
            const isCompleted = step.stepNumber <= completedSteps;
            const isLast = idx === onboardingSteps.length - 1;
            const direction =
              step.stepNumber < previousStep ? "backward" : "forward";

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

        {/* Progress summary */}
        <div className="mt-6 pt-4 border-t border-grey-light">
          <div className="flex justify-between items-center text-sm">
            <span className="text-grey-medium">
              Progress: {Math.min(completedSteps, totalSteps)}/{totalSteps}{" "}
              steps
            </span>
            <span className="text-primary font-medium">
              {Math.round(
                (Math.min(completedSteps, totalSteps) / totalSteps) * 100,
              )}
              %
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-grey-light rounded-full h-2 mt-2">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${(Math.min(completedSteps, totalSteps) / totalSteps) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          {completedSteps >= 3 && (
            <p className="text-xs text-grey-medium mt-2">
              Steps 4-5 are optional and can be completed later.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepSidebar;
