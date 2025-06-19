interface StepIndicatorProps {
  stepNumber: number;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted?: boolean;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  stepNumber,
  title,
  description,
  isActive,
  isCompleted = false,
}) => (
  <div className="max-w-md flex items-start space-x-4 mb-6">
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center h5-bold-16 ${
        isActive
          ? "bg-primary-light text-primary border-2 border-primary"
          : isCompleted
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-400"
      }`}
    >
      {stepNumber}
    </div>
    <div className="flex-1">
      <h3
        className={`font-medium ${isActive ? "text-gray-900" : "text-gray-400"}`}
      >
        {title}
      </h3>
      <p className={`text-sm ${isActive ? "text-gray-600" : "text-gray-400"}`}>
        {description}
      </p>
    </div>
  </div>
);
export default StepIndicator;
