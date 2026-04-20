import { Check } from "lucide-react";
import { cn } from "@/app/utils/cn";

export interface Step {
  id: string;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  activeIndex: number;
  onSelect?: (index: number) => void;
}

const StepIndicator = ({ steps, activeIndex, onSelect }: StepIndicatorProps) => (
  <ol
    aria-label="Broadcast creation steps"
    className="flex items-center gap-2"
  >
    {steps.map((step, index) => {
      const isActive = index === activeIndex;
      const isDone = index < activeIndex;
      const isClickable = typeof onSelect === "function" && index <= activeIndex;
      return (
        <li key={step.id} className="flex items-center gap-2">
          <button
            type="button"
            disabled={!isClickable}
            onClick={() => isClickable && onSelect?.(index)}
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
              isActive && "bg-primary text-white",
              !isActive && isDone && "bg-primary-light/60 text-primary hover:bg-primary-light",
              !isActive && !isDone && "bg-grey-light text-grey-medium cursor-default",
            )}
            aria-current={isActive ? "step" : undefined}
          >
            <span
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded-full text-[10px]",
                isActive && "bg-white/25",
                isDone && "bg-primary text-white",
                !isActive && !isDone && "bg-grey-medium/30 text-grey",
              )}
            >
              {isDone ? <Check className="h-3 w-3" strokeWidth={3} /> : index + 1}
            </span>
            {step.label}
          </button>
          {index < steps.length - 1 && (
            <span
              className={cn(
                "h-px w-6 transition-colors",
                isDone ? "bg-primary" : "bg-grey-light",
              )}
              aria-hidden
            />
          )}
        </li>
      );
    })}
  </ol>
);

export default StepIndicator;
