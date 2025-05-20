// components/ui/DropdownMenu.tsx
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  icon?: React.ElementType;
}

interface DropdownMenuProps {
  items: DropdownItem[];
  isVisible: boolean;
}

const DropdownMenu = ({ items, isVisible }: DropdownMenuProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-50"
        >
          <div className="p-4">
            <div className="grid gap-3">
              {items.map((dropdownItem) => (
                <Link
                  key={dropdownItem.name}
                  to={dropdownItem.href}
                  className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  {dropdownItem.icon && (
                    <dropdownItem.icon className="h-6 w-6 text-primary mt-0.5 mr-3 group-hover:text-primary transition-colors" />
                  )}
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                      {dropdownItem.name}
                    </div>
                    {dropdownItem.description && (
                      <div className="text-sm text-gray-500 mt-1">
                        {dropdownItem.description}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default DropdownMenu;
