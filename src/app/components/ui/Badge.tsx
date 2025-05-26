import { motion } from "framer-motion";
import { cn } from "@/app/utils/cn";

interface BadgeProps {
  title: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const Badge = ({
  title,
  bgColor = "bg-secondary-light",
  textColor = "text-secondary",
  className,
}: BadgeProps) => {
  return (
    <motion.div
      className={cn(
        "inline-flex items-center px-4 py-3 rounded-full",
        bgColor,
        className,
      )}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <span className={cn("body-italic-bold-16 cursor-pointer", textColor)}>
        {title}
      </span>
    </motion.div>
  );
};

export default Badge;
