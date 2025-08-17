import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface StepIndicatorProps {
  stepNumber: number;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted?: boolean;
  isLast?: boolean;
  direction?: "forward" | "backward";
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  stepNumber,
  title,
  description,
  isActive,
  isCompleted = false,
  isLast = false,
  direction,
}) => {
  return (
    <div className="relative flex items-start space-x-4 pb-8">
      {/* Line and Circle */}
      <div className="relative flex flex-col items-center">
        {/* Step circle */}
        <motion.div
          layout
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold z-10 transition-colors duration-300 ${
            isCompleted
              ? "bg-primary text-white"
              : isActive
                ? "bg-primary text-white"
                : "bg-base-white border border-primary text-primary"
          }`}
        >
          {isCompleted ? <Check size={16} /> : stepNumber}
        </motion.div>

        {/* Vertical animated line */}
        {!isLast && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[2px] h-16 bg-grey-light z-0 overflow-hidden">
            <motion.div
              layout
              className="w-full bg-primary origin-top"
              initial={false}
              animate={{
                scaleY: isCompleted ? 1 : 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              style={{
                transformOrigin: direction === "backward" ? "bottom" : "top",
                height: "100%",
              }}
            />
          </div>
        )}
      </div>

      {/* Step text content */}
      <div className="flex-1 pt-1">
        <h3
          className={`font-medium transition-colors duration-300 ${
            isActive
              ? "text-grey"
              : isCompleted
                ? "text-grey-dark"
                : "text-grey-light"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm transition-colors duration-300 mt-1 ${
            isActive
              ? "text-grey-medium"
              : isCompleted
                ? "text-grey-medium"
                : "text-grey-light"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepIndicator;
