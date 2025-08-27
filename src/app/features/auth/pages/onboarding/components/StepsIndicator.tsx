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
  direction = "forward",
}) => {
  // Determine step state based on props
  const getStepState = () => {
    if (isCompleted && !isActive) {
      return "completed"; // Green tick - step is passed/completed
    } else if (isActive) {
      return "active"; // Green circle with number - current step
    } else {
      return "inactive"; // Grey circle with number - not reached/reversed
    }
  };

  const stepState = getStepState();

  // Determine if the connecting line should be filled
  const isLineFilled = isCompleted && !isActive;

  return (
    <div className="relative flex items-start space-x-4">
      {/* Line and Circle */}
      <div className="relative flex flex-col items-center">
        {/* Step circle */}
        <motion.div
          className={`w-8 h-8 rounded-full flex items-center pt-px justify-center text-sm font-semibold z-10 transition-all duration-300 ${
            stepState === "completed"
              ? "bg-primary text-white"
              : stepState === "active"
                ? "bg-white border-primary border text-primary" // White background with green border and text
                : "bg-white border-2 border-grey-light text-grey-light" // Grey border with grey number
          }`}
          initial={false}
          animate={{
            scale: stepState === "active" ? 1.1 : 1,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
        >
          {stepState === "completed" ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <Check size={16} />
            </motion.div>
          ) : (
            <motion.span
              key={`step-${stepNumber}`}
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {stepNumber}
            </motion.span>
          )}
        </motion.div>

        {/* Vertical animated line */}
        {!isLast && (
          <div className="relative w-[2px] h-16">
            {/* Background line */}
            <div className="absolute inset-0 bg-grey-light" />

            {/* Animated progress line */}
            <motion.div
              className="absolute inset-0 bg-primary"
              initial={false}
              animate={{
                scaleY:
                  isLineFilled && direction === "forward"
                    ? 1 // forward → animate fill
                    : isLineFilled && direction === "backward"
                      ? 0 // backward → reset instantly
                      : 0,
              }}
              transition={{
                duration: direction === "forward" ? 0.4 : 0, // 👈 no animation on backward
                ease: "easeInOut",
              }}
              style={{
                transformOrigin: direction === "forward" ? "bottom" : "top",
              }}
            />
          </div>
        )}
      </div>

      {/* Step text content */}
      <div className="flex-1 pt-1">
        <motion.h3
          className={`font-medium transition-colors duration-300 ${
            stepState === "active"
              ? "text-grey-dark" // Dark text for active step
              : stepState === "completed"
                ? "text-grey-dark" // Dark text for completed step
                : "text-grey-light" // Light text for inactive step
          }`}
          initial={false}
          animate={{
            opacity: stepState === "inactive" ? 0.6 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className={`text-sm transition-colors duration-300 mt-1 ${
            stepState === "active"
              ? "text-grey-medium" // Medium grey for active step description
              : stepState === "completed"
                ? "text-grey-medium" // Medium grey for completed step description
                : "text-grey-light" // Light grey for inactive step description
          }`}
          initial={false}
          animate={{
            opacity: stepState === "inactive" ? 0.5 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
};

export default StepIndicator;
