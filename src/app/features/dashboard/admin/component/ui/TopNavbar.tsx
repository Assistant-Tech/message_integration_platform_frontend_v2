import type React from "react";
// import { Input } from "@/app/components/ui";
import { ChevronDown, HelpCircle } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useLogout } from "@/app/hooks/query/useAuthQuery";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";
import NotificationDropdown from "@/app/components/common/Notification/NotificationDropDown";
import { useAuthStore } from "@/app/store/auth.store";
import { cn } from "@/app/utils/cn";

interface TopNavbarAction {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  isActive?: boolean;
}

interface TopNavbarProps {
  title?: string;
  subtitle?: string;
  // searchPlaceholder?: string;
  // searchValue?: string;
  // onSearchChange?: (value: string) => void;
  actions?: TopNavbarAction[];
  showHelp?: boolean;
  showNotifications?: boolean;
  showProfileMenu?: boolean;
  leadingContent?: React.ReactNode;
  className?: string;
}

const getInitials = (value?: string) =>
  value
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "JD";

const TopNavbar = ({
  title,
  subtitle,
  // searchPlaceholder = "Search",
  // searchValue,
  // onSearchChange,
  actions = [],
  showHelp = true,
  showNotifications = true,
  showProfileMenu = true,
  leadingContent,
  className,
}: TopNavbarProps) => {
  const logoutMutation = useLogout();
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  const userName = user?.name || user?.email?.split("@")[0] || "Jane Doe";
  const userRole = user?.roleType || "Admin";
  const navbarActions = actions;

  return (
    <header
      className={cn(
        "w-full border-b border-grey-light bg-primary-light/60 px-6 py-2",
        className,
      )}
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          {leadingContent}

          {(title || subtitle) && (
            <div className="min-w-0 shrink-0">
              {title && (
                <h2 className="truncate text-lg font-semibold text-grey">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="truncate text-sm text-grey-medium">{subtitle}</p>
              )}
            </div>
          )}
          {/* 
          <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(event) => onSearchChange?.(event.target.value)}
              iconLeft={<Search className="h-5 w-5 text-grey-medium" />}
              className="border-grey-light bg-base-white focus:border-primary"
            />
          </div> */}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 xl:flex-nowrap">
          {navbarActions.map(({ label, icon: Icon, onClick, isActive }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary-light text-primary"
                  : "border-grey-light bg-base-white text-grey-medium hover:border-primary hover:bg-primary-light hover:text-primary",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}

          {showHelp && (
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-grey-light bg-base-white text-grey-medium transition-colors hover:bg-primary-light hover:text-primary"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
          )}

          {showNotifications && <NotificationDropdown />}

          {showProfileMenu && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="flex items-center gap-3 rounded-full border border-grey-light bg-base-white px-3 py-2 text-left transition-colors hover:bg-primary-light">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={userName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
                      {getInitials(userName)}
                    </div>
                  )}
                  <div className="hidden min-w-0 sm:block">
                    <p className="truncate text-sm font-semibold text-grey">
                      {userName}
                    </p>
                    <p className="truncate text-xs text-grey-medium">
                      {userRole}
                    </p>
                  </div>
                  <ChevronDown size={20} className="text-grey-medium" />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content
                sideOffset={8}
                align="end"
                className="z-50 min-w-[180px] rounded-2xl border border-grey-light bg-base-white p-2 shadow-sm"
              >
                <Link to={APP_ROUTES.ADMIN.SETTINGS_PROFILE}>
                  <DropdownMenu.Item className="rounded-xl px-4 py-2 text-sm text-grey outline-none transition-colors hover:bg-primary-light">
                    Profile
                  </DropdownMenu.Item>
                </Link>
                <DropdownMenu.Item
                  className="rounded-xl px-4 py-2 text-sm text-danger outline-none transition-colors hover:bg-danger-light"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
