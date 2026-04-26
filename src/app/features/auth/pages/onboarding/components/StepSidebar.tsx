import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
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
  totalSteps = 5,
}) => {
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const prevStepRef = useRef(currentStep);

  useEffect(() => {
    setDirection((prev) => {
      if (currentStep > prevStepRef.current) return "forward";
      if (currentStep < prevStepRef.current) return "backward";
      return prev;
    });
    prevStepRef.current = currentStep;
  }, [currentStep]);

  const percent = Math.min(100, Math.round((completedSteps / totalSteps) * 100));

  return (
    <div className="bg-base-white border border-grey-light/60 rounded-2xl p-6">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="label-bold-14 text-grey-dark uppercase tracking-wide">
          Setup Progress
        </h3>
        <span className="caption-medium-12 text-primary font-semibold">
          {percent}%
        </span>
      </div>
      <div className="relative h-[6px] w-full bg-grey-light rounded-full overflow-hidden mb-6">
        <motion.div
          className="absolute inset-y-0 left-0 bg-primary rounded-full"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

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
  );
};

export default StepSidebar;
