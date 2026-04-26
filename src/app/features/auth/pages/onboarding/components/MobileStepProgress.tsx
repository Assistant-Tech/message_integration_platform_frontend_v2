import { motion } from "framer-motion";
import { Check } from "lucide-react";
import onboardingSteps from "@/app/utils/onboarding/onboarding.config";

interface MobileStepProgressProps {
  currentStep: number;
  completedSteps: number;
  totalSteps?: number;
}

const MobileStepProgress: React.FC<MobileStepProgressProps> = ({
  currentStep,
  completedSteps,
  totalSteps = 5,
}) => {
  const current = onboardingSteps.find((s) => s.stepNumber === currentStep);
  const percent = Math.min(100, Math.round((completedSteps / totalSteps) * 100));

  return (
    <div className="lg:hidden bg-base-white border border-grey-light/60 rounded-2xl p-4">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <p className="caption-medium-12 text-grey-medium uppercase tracking-wide">
            Step {currentStep} of {totalSteps}
            {current?.isOptional && (
              <span className="ml-2 text-grey-medium/80 normal-case tracking-normal">
                · Optional
              </span>
            )}
          </p>
          <p className="label-semi-bold-14 text-grey-dark mt-0.5">
            {current?.title}
          </p>
        </div>
        <p className="caption-medium-12 text-primary font-semibold">
          {percent}%
        </p>
      </div>

      <div className="relative flex items-center">
        <div className="absolute inset-x-0 h-[2px] bg-grey-light rounded-full" />
        <motion.div
          className="absolute left-0 h-[2px] bg-primary rounded-full"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        <div className="relative flex justify-between w-full">
          {onboardingSteps.map((step) => {
            const isDone = step.stepNumber <= completedSteps;
            const isActive = step.stepNumber === currentStep;
            return (
              <div
                key={step.stepNumber}
                className={`h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-semibold transition-colors ${
                  isDone
                    ? "bg-primary text-white"
                    : isActive
                      ? "bg-white border-2 border-primary text-primary"
                      : "bg-white border-2 border-grey-light text-grey-medium"
                }`}
              >
                {isDone ? <Check size={12} strokeWidth={2.5} /> : step.stepNumber}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileStepProgress;
