import {
  EllipsisVertical,
  HelpCircle,
  LogOut,
  Search,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@/app/components/ui";
import { cn } from "@/app/utils/cn";

interface Props {
  showSearch: boolean;
  showHelp: boolean;
  showProfileMenu: boolean;
  profileRoute: string;
  onOpenSearch: () => void;
  onLogout: () => void;
}

interface MenuItem {
  key: string;
  label: string;
  Icon: typeof EllipsisVertical;
  onSelect: () => void;
  variant?: "default" | "danger";
}

/**
 * Hamburger dropdown shown on small screens (< md).
 *
 * Collapses the right-side controls of TopNavbar (search, help, profile,
 * logout) into a single menu so the header stays uncluttered on mobile.
 *
 * Notifications stay inline outside this menu — they're a primary touch
 * target for inbox users and the bell icon is small enough to fit.
 */
const MobileMenu = ({
  showSearch,
  showHelp,
  showProfileMenu,
  profileRoute,
  onOpenSearch,
  onLogout,
}: Props) => {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    showSearch && {
      key: "search",
      label: "Search",
      Icon: Search,
      onSelect: onOpenSearch,
    },
    showHelp && {
      key: "help",
      label: "Help",
      Icon: HelpCircle,
      onSelect: () => {
        /* Help action — wire up when help center is available */
      },
    },
    showProfileMenu && {
      key: "profile",
      label: "Profile",
      Icon: User,
      onSelect: () => navigate(profileRoute),
    },
    showProfileMenu && {
      key: "logout",
      label: "Logout",
      Icon: LogOut,
      onSelect: onLogout,
      variant: "danger" as const,
    },
  ].filter(Boolean) as MenuItem[];

  if (items.length === 0) return null;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="none"
          iconOnly
          size="xs"
          aria-label="Open menu"
          IconLeft={<EllipsisVertical className="h-5 w-5" />}
          className="!h-10 !w-10 rounded-full border border-grey-light bg-base-white text-grey-medium hover:border-primary hover:bg-primary-light hover:text-primary"
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-[200px] rounded-2xl border border-grey-light bg-base-white p-2 shadow-md"
        >
          {items.map(({ key, label, Icon, onSelect, variant = "default" }) => (
            <DropdownMenu.Item
              key={key}
              onSelect={onSelect}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors",
                variant === "danger"
                  ? "text-danger hover:bg-danger-light"
                  : "text-grey hover:bg-primary-light/50 hover:text-primary",
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span>{label}</span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default MobileMenu;
