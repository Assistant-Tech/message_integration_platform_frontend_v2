import { motion } from "framer-motion";

interface SwitchProps {
  enabled?: boolean;
  onChange?: () => void;
  checked?: boolean;
  onCheckedChange?: () => void;
  disabled?: boolean;
}

const Switch = ({
  enabled,
  onChange,
  checked,
  onCheckedChange,
  disabled = false,
}: SwitchProps) => {
  const isActive = checked ?? enabled ?? false;
  const handleToggle = onCheckedChange || onChange || (() => {});

  return (
    <motion.button
      type="button"
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        isActive ? "bg-primary" : "bg-grey-light"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={disabled ? undefined : handleToggle}
      whileTap={disabled ? {} : { scale: 0.95 }}
    >
      <motion.span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
          isActive ? "translate-x-6" : "translate-x-1"
        }`}
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      />
    </motion.button>
  );
};

export default Switch;
