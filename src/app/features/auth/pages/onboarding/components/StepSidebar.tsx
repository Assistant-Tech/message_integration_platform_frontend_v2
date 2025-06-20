import { StepsIndicator } from "@/app/features/auth/pages/onboarding/components";
import onboardingSteps from "@/app/utils/onboarding/onboarding";

interface StepSidebarProps {
  currentStep: number;
  previousStep: number;
}

const StepSidebar: React.FC<StepSidebarProps> = ({
  currentStep,
  previousStep,
}) => {
  return (
    <div className="w-full lg:max-w-md space-y-4">
      {onboardingSteps.map((step, idx) => {
        const isActive = step.stepNumber === currentStep;
        const isCompleted = step.stepNumber < currentStep;
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
            isCompleted={isCompleted}
            isLast={isLast}
            direction={direction}
          />
        );
      })}
    </div>
  );
};

export default StepSidebar;
