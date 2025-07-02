import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { DropdownMenu } from "@/app/components/common";

interface NavigationItemProps {
  item: {
    name: string;
    href?: string;
    dropdown?: Array<{
      name: string;
      href: string;
      description?: string;
      icon?: string;
    }>;
  };
  isActive: boolean;
  activeDropdown: string | null;
  onMouseEnter: (itemName: string) => void;
  onMouseLeave: () => void;
  className?: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  item,
  isActive,
  activeDropdown,
  onMouseEnter,
  onMouseLeave,
  className = "",
}) => {
  if (item.href) {
    return (
      <Link
        to={item.href}
        className={`body-bold-16 transition-colors ${
          isActive ? "text-primary" : "text-gray-700 hover:text-primary"
        } ${className}`}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <div
      onMouseEnter={() => item.dropdown && onMouseEnter(item.name)}
      onMouseLeave={onMouseLeave}
    >
      <button
        className={`inline-flex items-center body-bold-16 transition-colors ${
          activeDropdown === item.name
            ? "text-primary"
            : "text-gray-700 hover:text-primary"
        } ${className}`}
      >
        {item.name}
        <ChevronDown
          className={`ml-2 h-6 w-6 transition-transform ${
            activeDropdown === item.name ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {item.dropdown && activeDropdown === item.name && (
          <DropdownMenu
            items={{ name: item.name, dropdown: item.dropdown }}
            isVisible={activeDropdown === item.name}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
export default NavigationItem;
