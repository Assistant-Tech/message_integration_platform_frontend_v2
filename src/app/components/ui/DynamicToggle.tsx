import React, { useState } from "react";
import { motion } from "framer-motion";

function cn(...inputs: (string | boolean | null | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
}

interface ToggleOption {
  id: string;
  label: string;
  value: string;
  extraLabel?: string;
}

interface DynamicToggleProps {
  options: ToggleOption[];
  defaultSelected?: string;
  onChange?: (selected: ToggleOption) => void;
  className?: string;
}

const DynamicToggle: React.FC<DynamicToggleProps> = ({
  options,
  defaultSelected,
  onChange,
  className = "",
}) => {
  const [selectedId, setSelectedId] = useState(
    defaultSelected || options[0]?.id,
  );

  const handleToggle = (option: ToggleOption) => {
    setSelectedId(option.id);
    onChange?.(option);
  };

  return (
    <div
      className={cn(
        "relative inline-flex p-1 rounded-xl bg-base-white",
        className,
      )}
    >
      {options.map((option) => {
        const isSelected = selectedId === option.id;

        return (
          <button
            key={option.id}
            onClick={() => handleToggle(option)}
            className={cn(
              "relative flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
              "min-w-[100px]", // keeps consistent width
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="toggle-bg"
                className="absolute inset-0 bg-black rounded-lg"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            <span
              className={cn(
                "relative z-10 flex items-center gap-2",
                isSelected ? "text-white" : "text-gray-500",
              )}
            >
              <span>{option.label}</span>
              {option.extraLabel && (
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-lg",
                    isSelected
                      ? "text-black bg-white"
                      : "text-primary bg-primary-light border border-primary",
                  )}
                >
                  {option.extraLabel}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default DynamicToggle;
