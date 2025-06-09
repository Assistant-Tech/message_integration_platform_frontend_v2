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
import { DemoDialog } from "@/app/components/common/Demo";

const Navbar = ({ offsetTop = false }: { offsetTop?: boolean }) => {
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
      } ${offsetTop ? "mt-16" : ""}`}
    >
      {/* Demo Dialog Box */}
      <DemoDialog />
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-8 xl:px-12 2xl:px-0">
        <div className="flex h-16 justify-between items-center">
          <div
            className={`transition-all duration-300 ${isScrolled ? "scale-75" : "scale-100"}`}
          >
            <Logo />
          </div>

          <DesktopNavigation
            activeDropdown={activeDropdown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />

          <div
            className={`transition-all duration-300 ${isScrolled ? "opacity-90" : "opacity-100"}`}
          >
            <AuthButtons />
          </div>

          <nav className="flex gap-2 lg:hidden items-center">
            {!mobileMenuOpen && (
              <Link to={APP_ROUTES.PUBLIC.REGISTER}>
                <Button label="Start Free Trial" variant="primary" />
              </Link>
            )}
            <MenuMobileToggle
              isOpen={mobileMenuOpen}
              onToggle={toggleMobileMenu}
            />
          </nav>
        </div>
      </div>

      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  );
};

export default Navbar;
