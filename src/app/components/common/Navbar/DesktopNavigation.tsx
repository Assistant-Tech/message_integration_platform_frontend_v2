import { useLocation } from "react-router-dom";
import { navigation } from "@/app/utils/utils";
import { NavigationItem } from "@/app/components/common";

interface DesktopNavigationProps {
  activeDropdown: string | null;
  onMouseEnter: (itemName: string) => void;
  onMouseLeave: () => void;
}
const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  activeDropdown,
  onMouseEnter,
  onMouseLeave,
}) => {
  const location = useLocation();
  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {navigation.map((item) => (
        <NavigationItem
          key={item.name}
          item={item}
          isActive={item.href ? isActiveRoute(item.href) : false}
          activeDropdown={activeDropdown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </nav>
  );
};

export default DesktopNavigation;
