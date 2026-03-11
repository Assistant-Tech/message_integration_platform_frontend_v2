import type React from "react";
// import { Input } from "@/app/components/ui";
import { ChevronDown, HelpCircle } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useLogout } from "@/app/hooks/query/useAuthQuery";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";
import NotificationDropdown from "@/app/components/common/Notification/NotificationDropDown";
import { useAuthStore } from "@/app/store/auth.store";
import { cn } from "@/app/utils/cn";
import { getAvatarUrl } from "@/app/utils/avatar";

interface TopNavbarAction {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  isActive?: boolean;
}

interface TopNavbarProps {
  title?: React.ReactNode;
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

const getRouteMeta = (pathname: string) => {
  const routes = [
    {
      match: /\/admin\/dashboard$/,
      title: "Dashboard",
      subtitle: "Overview of your workspace and activity",
    },
    {
      match: /\/conversation$/,
      title: "Conversations",
      subtitle: "Manage inbound customer messages across channels",
    },
    {
      match: /\/channel$/,
      title: "Channels",
      subtitle: "Coordinate internal and external channel discussions",
    },
    {
      match: /\/chatbot$/,
      title: "Chatbot",
      subtitle: "Configure automated replies and bot experiences",
    },
    {
      match: /\/orders$/,
      title: "Orders",
      subtitle: "Track and manage customer orders",
    },
    {
      match: /\/tags$/,
      title: "Tags",
      subtitle: "Organize conversations with reusable labels",
    },
    {
      match: /\/analytics$/,
      title: "Analytics",
      subtitle: "Review performance and engagement trends",
    },
    {
      match: /\/settings\/profile$/,
      title: "Profile Settings",
      subtitle: "Manage account details and preferences",
    },
    {
      match: /\/settings\/company$/,
      title: "Company Settings",
      subtitle: "Update workspace and business information",
    },
    {
      match: /\/settings\/security$/,
      title: "Security Settings",
      subtitle: "Control authentication and access safeguards",
    },
    {
      match: /\/settings\/notifications$/,
      title: "Notification Settings",
      subtitle: "Choose when and how alerts are delivered",
    },
    {
      match: /\/settings\/role-management$/,
      title: "Role Management",
      subtitle: "Assign permissions and manage workspace access",
    },
    {
      match: /\/settings\/chat_settings$/,
      title: "Chat Settings",
      subtitle: "Adjust conversation defaults and chat behavior",
    },
    {
      match: /\/settings\/shipping$/,
      title: "Shipping Settings",
      subtitle: "Configure delivery options and fulfilment rules",
    },
    {
      match: /\/settings\/subscription/,
      title: "Subscription",
      subtitle: "Review billing, plans, and renewals",
    },
    {
      match: /\/settings\/integration/,
      title: "Integrations",
      subtitle: "Connect external services and APIs",
    },
    {
      match: /\/products/,
      title: "Products",
      subtitle: "Manage catalog items, variants, and inventory",
    },
    {
      match: /\/checkout$/,
      title: "Checkout",
      subtitle: "Review payment and order completion details",
    },
    {
      match: /\/dashboard\/settings\/profile$/,
      title: "Profile Settings",
      subtitle: "Manage account details and preferences",
    },
    {
      match: /\/dashboard$/,
      title: "Dashboard",
      subtitle: "Overview of your workspace and activity",
    },
  ];

  return (
    routes.find((route) => route.match.test(pathname)) ?? {
      title: "Workspace",
      subtitle: "Manage your day-to-day operations",
    }
  );
};

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
  const location = useLocation();
  const { slug } = useParams();

  const navigate = useNavigate();
  const routeMeta = getRouteMeta(location.pathname);

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
  const resolvedTitle = title ?? routeMeta.title;
  const resolvedSubtitle = subtitle ?? routeMeta.subtitle;
  const isPlainTitle = typeof resolvedTitle === "string";
  const profileRoute = slug
    ? user?.roleType === "MEMBER"
      ? `/${slug}/dashboard/settings/profile`
      : `/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_PROFILE}`
    : APP_ROUTES.ADMIN.SETTINGS_PROFILE;

  return (
    <header
      className={cn(
        "w-full border-b border-grey-light bg-primary-light/60 px-12 py-2",
        className,
      )}
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          {leadingContent}

          {(resolvedTitle || resolvedSubtitle) && (
            <div className="min-w-0 shrink-0">
              {resolvedTitle && (
                <h2
                  className={cn(
                    "text-lg font-semibold text-grey",
                    isPlainTitle
                      ? "truncate"
                      : "flex flex-wrap items-center gap-2",
                  )}
                >
                  {resolvedTitle}
                </h2>
              )}
              {resolvedSubtitle && (
                <p className="truncate text-sm text-grey-medium">
                  {resolvedSubtitle}
                </p>
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
                  {user ? (
                    <img
                      src={getAvatarUrl(user.avatar)}
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
                <Link to={profileRoute}>
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
