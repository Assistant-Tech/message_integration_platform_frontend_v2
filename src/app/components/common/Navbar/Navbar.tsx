import { useRef, useState, forwardRef, useImperativeHandle } from "react";
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
import { DemoDialog } from "@/app/components/common/BookADemo/";
import { Container } from "@/app/components/layout";

interface NavbarRef {
  getHeight: () => number;
}

const Navbar = forwardRef<NavbarRef, { offsetTop?: number }>(
  ({ offsetTop = 0 }, ref) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isDropdownLocked, setIsDropdownLocked] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLElement>(null);

    const isScrolled = useScrollEffect(50);

    // Expose `getHeight()` via ref to parent
    useImperativeHandle(ref, () => ({
      getHeight: () => headerRef.current?.offsetHeight || 0,
    }));

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
      // Over the hero: transparent — blends into the aurora background
      // (no glass, no tint) so it feels like part of the hero chrome.
      default: "bg-transparent border-b border-transparent",
      // After scroll: switch to a frosted white glass with a subtle blue
      // shadow and a hairline divider.
      scrolled:
        "bg-white/85 backdrop-blur-xl shadow-[0_8px_24px_-16px_rgba(46,94,153,0.25)] border-b border-grey-light/60",
    };

    return (
      <header
        ref={headerRef}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out h-20 py-2 ${
          isScrolled ? navbarStyles.scrolled : navbarStyles.default
        }`}
        style={{ top: offsetTop }}
      >
        <DemoDialog />

        <Container>
          <div className="grid grid-cols-3 items-center h-16 gap-8">
            {/* 1. Logo — left */}
            <div
              className={`justify-self-start transition-all duration-300 ${
                isScrolled ? "scale-95" : "scale-100"
              }`}
            >
              <Logo />
            </div>

            {/* 2. Desktop Navigation — center */}
            <div
              ref={dropdownRef}
              className="hidden xl:flex justify-center items-center space-x-16"
            >
              <DesktopNavigation
                activeDropdown={activeDropdown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onToggleDropdown={handleToggleDropdown}
              />
            </div>

            {/* 3. Right side — auth (xl+) OR mobile CTA */}
            <div className="justify-self-end flex items-center gap-2">
              <div
                className={`hidden xl:flex transition-all duration-300 ${
                  isScrolled ? "opacity-90" : "opacity-100"
                }`}
              >
                <AuthButtons />
              </div>

              <nav className="flex gap-2 xl:hidden items-center">
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
        </Container>

        <MobileMenu isOpen={mobileMenuOpen} />
      </header>
    );
  },
);

export default Navbar;
