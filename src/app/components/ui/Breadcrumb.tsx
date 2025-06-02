import { cn } from "@/app/utils/cn";
import { ChevronRight } from "lucide-react";
import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
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
  return (
    <nav
      className={cn("flex items-center space-x-2 body-semi-bold-16", className)}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && separator}
          {item.href ? (
            <a
              href={item.href}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              {item.label}
            </a>
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
