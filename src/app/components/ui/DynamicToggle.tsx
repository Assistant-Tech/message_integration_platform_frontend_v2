import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/app/utils/cn";

interface ToggleOption {
  id: string;
  label: string;
  value: string;
}

interface DynamicToggleProps {
  options: ToggleOption[];
  defaultSelected?: string;
  onChange?: (selected: ToggleOption) => void;
  variant?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const DynamicToggle: React.FC<DynamicToggleProps> = ({
  options,
  defaultSelected,
  onChange,
  variant = "primary",
  size = "md",
  className = "",
}) => {
  const [selectedId, setSelectedId] = useState(
    defaultSelected || options[0]?.id,
  );

  const handleToggle = (option: ToggleOption) => {
    setSelectedId(option.id);
    onChange?.(option);
  };

  const sizeClasses = {
    sm: "h-8 text-sm px-3",
    md: "h-12 text-base px-6",
    lg: "h-14 text-lg px-8",
  };

  const variantClasses = {
    primary: {
      container: "bg-base-white",
      active: "bg-base-black text-white",
      inactive: "bg-base-white text-base-black",
    },
    secondary: {
      container: "bg-grey-light",
      active: "bg-gray-800 text-white",
      inactive: "text-gray-600 hover:text-gray-700",
    },
    accent: {
      container: "bg-purple-100",
      active: "bg-purple-600 text-white",
      inactive: "text-purple-600 hover:text-purple-700",
    },
  };

  const currentVariant = variantClasses[variant];
  const currentSize = sizeClasses[size];

  return (
    <div
      className={cn(
        "inline-flex rounded-2xl p-2",
        currentVariant.container,
        className,
      )}
    >
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => handleToggle(option)}
          className={cn(
            "max-w-28 relative flex-1 rounded-xl cursor-pointer",
            currentSize,
            selectedId === option.id
              ? currentVariant.active
              : currentVariant.inactive,
          )}
        >
          {selectedId === option.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-e-2xl"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
          <span className="relative flex items-center text-center justify-center">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default DynamicToggle;
