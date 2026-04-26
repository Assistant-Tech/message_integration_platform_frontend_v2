import { navigation } from "@/app/utils/utils";
import { NavigationItem } from "@/app/components/common";
interface DesktopNavigationProps {
  activeDropdown: string | null;
  onMouseEnter: (itemName: string) => void;
  onMouseLeave: () => void;
  onToggleDropdown: (itemName: string) => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  activeDropdown,
  onMouseEnter,
  onMouseLeave,
  onToggleDropdown,
}) => {
  return (
    <nav className="hidden xl:flex justify-center items-center space-x-16">
      {navigation.map((item) => (
        <NavigationItem
          key={item.name}
          item={item}
          isActive={location.pathname === item.href}
          activeDropdown={activeDropdown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onToggleDropdown={onToggleDropdown}
        />
      ))}
    </nav>
  );
};

export default DesktopNavigation;
