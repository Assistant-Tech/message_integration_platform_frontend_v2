import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { navigation } from "@/app/utils/utils";
import { AuthButtons } from "@/app/components/common/";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const isActiveRoute = (path: string) => location.pathname === path;

  const toggleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-white border-t shadow-lg"
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.href ? (
                  <Link
                    to={item.href}
                    className={`px-3 py-2 rounded-md h4-bold-24 transition-colors flex justify-between items-center ${
                      isActiveRoute(item.href)
                        ? "text-primary"
                        : "text-base-black hover:text-primary hover:bg-gray-50"
                    }`}
                    onClick={onClose}
                  >
                    {item.name}
                    <ChevronDown />
                  </Link>
                ) : (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md h4-bold-24 text-base-black hover:text-primary hover:bg-gray-50 transition-colors"
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.name && item.dropdown && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 space-y-1"
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              className="flex items-center px-3 py-2 rounded-md text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                              onClick={onClose}
                            >
                              {dropdownItem.icon && (
                                <dropdownItem.icon className="h-4 w-4 mr-3" />
                              )}
                              <div>
                                <div className="font-medium">
                                  {dropdownItem.name}
                                </div>
                                {dropdownItem.description && (
                                  <div className="text-xs text-gray-500">
                                    {dropdownItem.description}
                                  </div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            ))}

            <AuthButtons isMobile onItemClick={onClose} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default MobileMenu;
