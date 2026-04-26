import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/app/utils/cn";
import { useRedirect } from "@/app/hooks/ui/useRedirect";

interface Action {
  label: string;
  description?: string;
}

interface SmartCardProps {
  title: string;
  description: string;
  redirectTo?: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  actions?: Action[];
  className?: string;
}

const SmartCard: React.FC<SmartCardProps> = ({
  title,
  description,
  Icon,
  redirectTo,
  className = "",
}) => {
  const redirect = useRedirect();

  const cardVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  const handleClick = () => {
    if (redirectTo) {
      redirect(redirectTo);
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      className={cn(
        "bg-white rounded-xl border border-grey-light transition-all cursor-pointer hover:shadow-md px-8 py-6 h-full flex flex-col justify-between w-full",
        className,
      )}
    >
      <div>
        {/* Icon container with debugging */}
        <div className="w-12 h-12 bg-primary-light rounded-md mb-3 flex items-center justify-center">
          {Icon ? (
            <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
          ) : (
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white text-xs font-bold">
              {title.charAt(0)}
            </div>
          )}
        </div>

        <h3 className="h5-bold-16 text-base-black mb-2">{title}</h3>
        <p className="body-regular-16 text-grey-medium line-clamp-3">
          {description}
        </p>
      </div>

      <div className="pt-2">
        <span className="button-semi-bold-16 text-primary underline">
          Learn more
        </span>
      </div>
    </motion.div>
  );
};

export default SmartCard;
