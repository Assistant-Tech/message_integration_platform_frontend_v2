import { motion } from "framer-motion";
import { cn } from "@/app/utils/cn";

interface Action {
  label: string;
  description?: string;
}

interface SmartCardProps {
  title: string;
  description: string;
  icon?: React.ElementType;
  actions?: Action[];
  className?: string;
}

const SmartCard: React.FC<SmartCardProps> = ({
  title,
  description,
  className = "",
}) => {
  const cardVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className={cn(
        "bg-white rounded-xl p-4 border border-gray-200 shadow-sm transition-all cursor-pointer hover:shadow-md px-8 py-6",
        className,
      )}
    >
      {/* Icon/Image */}
      <div className="w-12 h-12 bg-gray-200 rounded-md mb-3" />

      {/* Title */}
      <h3 className="text-md font-semibold text-gray-900 mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
        {description}
      </p>
    </motion.div>
  );
};

export default SmartCard;
