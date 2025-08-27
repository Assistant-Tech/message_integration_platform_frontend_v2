import { motion } from "framer-motion";

const RadioButton = ({
  selected,
  onChange,
  disabled = false,
}: {
  selected: boolean;
  onChange: () => void;
  disabled?: boolean;
}) => (
  <motion.button
    className={`relative inline-flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
      selected ? "border-primary bg-primary" : "border-grey-light bg-white"
    } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    onClick={disabled ? undefined : onChange}
    whileTap={disabled ? {} : { scale: 0.9 }}
  >
    {selected && (
      <motion.span
        className="h-2 w-2 rounded-full bg-white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500 }}
      />
    )}
  </motion.button>
);

export default RadioButton;
