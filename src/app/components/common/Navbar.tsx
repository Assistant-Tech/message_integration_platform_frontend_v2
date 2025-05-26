import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Logo } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";
import { useDropdown } from "@/app/hooks/ui/useDropdown";
import {
  DesktopNavigation,
  AuthButtons,
  MobileMenu,
  MenuMobileToggle,
} from "@/app/components/common";
import { useScrollEffect } from "@/app/hooks/ui/useScrollEffect";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeDropdown, handleMouseEnter, handleMouseLeave } = useDropdown();
  const isScrolled = useScrollEffect(50);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navbarStyles = {
    default: "bg-white border-b border-transparent",
    scrolled:
      "bg-white/85 backdrop-blur-sm shadow-sm border-b border-gray-100/20",
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out h-20 py-2 ${
        isScrolled ? navbarStyles.scrolled : navbarStyles.default
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-4 md:px-2">
        <div className="flex h-16 justify-between items-center">
          {/* Logo with scroll animation */}
          <div
            className={`transition-all duration-300 ${
              isScrolled ? "scale-75" : "scale-100"
            }`}
          >
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <DesktopNavigation
            activeDropdown={activeDropdown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />

          {/* Auth Buttons with scroll effect */}
          <div
            className={`transition-all duration-300 ${
              isScrolled ? "opacity-90" : "opacity-100"
            }`}
          >
            <AuthButtons />
          </div>

          {/* Mobile Controls */}
          <nav className="flex gap-2 lg:hidden">
            <Link to={APP_ROUTES.PUBLIC.REGISTER}>
              <Button label="Start Free Trial" variant="primary" />
            </Link>
            <MenuMobileToggle
              isOpen={mobileMenuOpen}
              onToggle={toggleMobileMenu}
            />
          </nav>
        </div>
      </div>

      {/* Mobile Menu with backdrop */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  );
};

export default Navbar;
