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
  onToggleDropdown: (itemName: string) => void;
  className?: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  item,
  isActive,
  activeDropdown,
  onMouseEnter,
  onMouseLeave,
  onToggleDropdown,
  className = "",
}) => {
  const isOpen = activeDropdown === item.name;

  if (item.href) {
    return (
      <Link
        to={item.href}
        className={`body-bold-16 transition-colors ${
          isActive ? "text-primary" : "text-grey-medium hover:text-primary"
        } ${className}`}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <div onMouseEnter={() => onMouseEnter(item.name)} className="relative">
      <button
        onClick={() => onToggleDropdown(item.name)}
        className={`inline-flex items-center body-bold-16 transition-colors ${
          isOpen ? "text-primary" : "text-grey-medium hover:text-primary"
        } ${className}`}
      >
        {item.name}
        <ChevronDown
          className={`ml-2 h-5 w-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {item.dropdown && isOpen && (
          <div onMouseLeave={onMouseLeave}>
            <DropdownMenu
              items={{ name: item.name, dropdown: item.dropdown }}
              isVisible={isOpen}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavigationItem;
