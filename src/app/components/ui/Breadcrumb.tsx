import { cn } from "@/app/utils/cn";
import { ChevronRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = <ChevronRight className="w-4 h-4 text-gray-400" />,
  className,
}) => {
  const navigate = useNavigate();

  const handleClick = (item: BreadcrumbItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      navigate(item.href);
    }
  };

  return (
    <nav
      className={cn("flex items-center space-x-2 body-semi-bold-16", className)}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && separator}
          {item.href || item.onClick ? (
            <button
              type="button"
              onClick={() => handleClick(item)}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span
              className={cn(
                index === items.length - 1
                  ? "text-grey font-medium"
                  : "text-grey",
              )}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
