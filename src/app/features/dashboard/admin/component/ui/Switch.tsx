import { motion } from "framer-motion";

const Switch = ({
  enabled,
  onChange,
  disabled = false,
}: {
  enabled: boolean;
  onChange: () => void;
  disabled?: boolean;
}) => (
  <motion.button
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      enabled ? "bg-primary" : "bg-grey-light"
    } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    onClick={disabled ? undefined : onChange}
    whileTap={disabled ? {} : { scale: 0.95 }}
  >
    <motion.span
      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
        enabled ? "translate-x-6" : "translate-x-1"
      }`}
      layout
      transition={{ type: "spring", stiffness: 700, damping: 30 }}
    />
  </motion.button>
);

export default Switch;
