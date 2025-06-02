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
    <div className={cn("inline-flex p-1 rounded-full bg-gray-100", className)}>
      {options.map((option) => {
        const isSelected = selectedId === option.id;

        return (
          <button
            key={option.id}
            onClick={() => handleToggle(option)}
            className={cn(
              "relative z-10 flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="toggle"
                className="absolute inset-0 z-0 bg-black rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}

            <span
              className={cn(
                "relative z-10 flex items-center gap-2",
                isSelected ? "text-white" : "text-gray-400",
              )}
            >
              <span>{option.label}</span>

              {option.extraLabel && (
                <span className="text-xs font-medium text-primary bg-primary-light border border-primary px-2 py-0.5 rounded-full">
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
