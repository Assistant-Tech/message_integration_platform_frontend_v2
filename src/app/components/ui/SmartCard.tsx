import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

import { cn } from "@/app/utils/cn";

interface Action {
  label: string;
  description?: string;
}

interface SmartCardProps {
  title: string;
  description: string;
  redirectTo?: string;
  icon?: LucideIcon;
  actions?: Action[];
  className?: string;
}

const SmartCard: React.FC<SmartCardProps> = ({
  title,
  description,
  icon,
  redirectTo,
  className = "",
}) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (redirectTo) {
      navigate(redirectTo);
      window.scrollTo(0, 0);
    }
  };

  const cardVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className={cn(
        "bg-white rounded-xl p-4 border border-grey-light transition-all cursor-pointer hover:shadow-md px-8 py-6 h-full flex flex-col justify-between",
        className,
      )}
    >
      <div>
        {icon && (
          <div className="w-12 h-12 bg-primary-light rounded-md mb-3 flex items-center justify-center text-gray-700">
            {React.createElement(icon, { size: 24, color: "teal" })}
          </div>
        )}
        <h3 className="h5-bold-16 text-base-black mb-2">{title}</h3>
        <p className="body-regular-16 text-grey-medium line-clamp-3">
          {description}
        </p>
      </div>

      <div className="pt-2">
        <span
          onClick={handleRedirect}
          className="button-semi-bold-16 text-primary underline "
        >
          Learn more
        </span>
      </div>
    </motion.div>
  );
};

export default SmartCard;
