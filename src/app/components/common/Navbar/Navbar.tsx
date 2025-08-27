import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useClickAway } from "react-use";
import { Button, Logo } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";
import {
  DesktopNavigation,
  AuthButtons,
  MobileMenu,
  MenuMobileToggle,
} from "@/app/components/common";
import { useScrollEffect } from "@/app/hooks/ui/useScrollEffect";
import  DemoDialog  from "@/app/components/common/BookADemo/DemoDialog";

const Navbar = ({ offsetTop = 0 }: { offsetTop?: number }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isDropdownLocked, setIsDropdownLocked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isScrolled = useScrollEffect(50);

  const handleMouseEnter = (itemName: string) => {
    if (!isDropdownLocked) setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    if (!isDropdownLocked) setActiveDropdown(null);
  };

  const handleToggleDropdown = (itemName: string) => {
    const isSame = activeDropdown === itemName;
    const willLock = !(isDropdownLocked && isSame);
    setActiveDropdown(willLock ? itemName : null);
    setIsDropdownLocked(willLock);
  };

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  useClickAway(dropdownRef, () => {
    setActiveDropdown(null);
    setIsDropdownLocked(false);
  });

  const navbarStyles = {
    default: "bg-white border-b border-transparent",
    scrolled:
      "bg-white/85 backdrop-blur-sm shadow-sm border-b border-gray-100/20",
  };

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out h-20 py-2 ${
        isScrolled ? navbarStyles.scrolled : navbarStyles.default
      }`}
      style={{ top: offsetTop }}
    >
      <DemoDialog />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-8 xl:px-12 2xl:px-0">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div
            className={`transition-all duration-300 ${
              isScrolled ? "scale-95" : "scale-100"
            }`}
          >
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div ref={dropdownRef}>
            <DesktopNavigation
              activeDropdown={activeDropdown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onToggleDropdown={handleToggleDropdown}
            />
          </div>

          {/* Auth Buttons */}
          <div
            className={`transition-all duration-300 ${
              isScrolled ? "opacity-90" : "opacity-100"
            }`}
          >
            <AuthButtons />
          </div>

          {/* Mobile CTA + Toggle */}
          <nav className="flex gap-2 lg:hidden items-center">
            {!mobileMenuOpen && (
              <Link to={APP_ROUTES.PUBLIC.REGISTER}>
                <Button
                  label="Start Free Trial"
                  variant="primary"
                  className="py-3 ms-2"
                />
              </Link>
            )}
            <MenuMobileToggle
              isOpen={mobileMenuOpen}
              onToggle={toggleMobileMenu}
            />
          </nav>
        </div>
      </div>

      <MobileMenu isOpen={mobileMenuOpen} />
    </header>
  );
};

export default Navbar;
