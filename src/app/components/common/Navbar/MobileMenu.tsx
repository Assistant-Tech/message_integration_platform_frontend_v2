import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { NavigationItem, navigation } from "@/app/utils/utils";
import { AuthButtons } from "@/app/components/common/";
import SubMenu from "./SubMenu";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<NavigationItem | null>(
    null,
  );

  const handleItemClick = (item: NavigationItem) => {
    if (item.dropdown && item.dropdown.length > 0) {
      // Show submenu
      setActiveSubmenu(item);
    } else if (item.href) {
      // Direct navigation
      window.location.href = item.href;
      onClose();
    }
  };

  const handleSubItemClick = (href: string) => {
    // Navigate to the specific page
    window.location.href = href;
    onClose();
  };

  const handleBackToMain = () => {
    setActiveSubmenu(null);
  };

  const handleClose = () => {
    setActiveSubmenu(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-white min-h-screen flex flex-col relative overflow-hidden"
        >
          {/* Main Menu */}
          <AnimatePresence>
            {!activeSubmenu && (
              <motion.div
                key="main-menu"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col min-h-screen justify-between "
              >
                {/* NAVIGATION SECTION */}
                <ul className="flex-1 pt-4 pb-6 space-y-2 overflow-y-auto px-4">
                  {navigation.map((item: NavigationItem) => (
                    <li
                      key={item.id}
                      className="py-3 border-b border-grey-light flex justify-between items-center hover:bg-grey-light rounded cursor-pointer transition-colors"
                      onClick={() => handleItemClick(item)}
                    >
                      <h4 className="h4-bold-24">{item.name}</h4>
                      {item.dropdown && <ChevronRight size={24} />}
                    </li>
                  ))}
                </ul>

                {/* AUTH BUTTONS SECTION */}
                <div className="pb-24 bg-base-white">
                  <AuthButtons isMobile onItemClick={handleClose} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submenu */}
          <AnimatePresence>
            {activeSubmenu && (
              <SubMenu
                key="submenu"
                item={activeSubmenu}
                onBack={handleBackToMain}
                onClose={handleClose}
                onItemClick={handleSubItemClick}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
