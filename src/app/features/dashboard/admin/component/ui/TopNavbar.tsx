import { useEffect, useMemo, useRef, useState } from "react";
import type React from "react";
import { ChevronDown, ChevronRight, HelpCircle, Search } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useLogout } from "@/app/hooks/query/useAuthQuery";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";
import NotificationDropdown from "@/app/components/common/Notification/NotificationDropDown";
import { useAuthStore } from "@/app/store/auth.store";
import { cn } from "@/app/utils/cn";
import { getAvatarUrl } from "@/app/utils/avatar";
import { getInitials } from "@/app/components/common/Conversation/customer/customer-chat-panel/helpers";
import { getRouteMeta } from "@/app/utils/helper";

interface TopNavbarAction {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  isActive?: boolean;
}

interface TopNavbarProps {
  title?: React.ReactNode;
  subtitle?: string;
  actions?: TopNavbarAction[];
  showSearch?: boolean;
  showHelp?: boolean;
  showNotifications?: boolean;
  showProfileMenu?: boolean;
  leadingContent?: React.ReactNode;
  className?: string;
}

interface SearchDestination {
  label: string;
  description: string;
  href: string;
  keywords: string[];
  section: string;
}

const TopNavbar = ({
  title,
  subtitle,
  actions = [],
  showSearch = true,
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

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
      ? `/app/${slug}/dashboard/settings/profile`
      : `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_PROFILE}`
    : APP_ROUTES.ADMIN.SETTINGS_PROFILE;
  const searchDestinations = useMemo<SearchDestination[]>(() => {
    if (!slug) {
      return [];
    }

    if (user?.roleType === "MEMBER") {
      return [
        {
          label: "Dashboard",
          description: "Overview of your personal workspace activity",
          href: `/app/${slug}/dashboard`,
          keywords: ["home", "overview", "workspace"],
          section: "Workspace",
        },
        {
          label: "Profile Settings",
          description: "Manage your account details and preferences",
          href: `/app/${slug}/dashboard/settings/profile`,
          keywords: ["profile", "settings", "account"],
          section: "Settings",
        },
      ];
    }

    return [
      {
        label: "Dashboard",
        description: "Overview of workspace activity and account health",
        href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.DASHBOARD}`,
        keywords: ["home", "overview", "workspace"],
        section: "Workspace",
      },
      {
        label: "Conversations",
        description: "Monitor inbound customer conversations",
        href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.CONVERSATION}`,
        keywords: ["inbox", "messages", "chat"],
        section: "Workspace",
      },
      {
        label: "Channels",
        description: "Coordinate internal and external channel discussions",
        href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.CHANNEL}`,
        keywords: ["teams", "discussion", "internal"],
        section: "Workspace",
      },
      {
        label: "Contact",
        description: "View and manage your contact directory",
        href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.CONTACT}`,
        keywords: ["contacts", "people", "directory"],
        section: "Workspace",
      },
      {
        label: "Automation",
        description: "Configure automated replies and bot flows",
        href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.CHATBOT}`,
        keywords: ["automation", "bot", "assistant"],
        section: "Workspace",
      },
      // MVP 1: Orders and Products are excluded from global search destinations.
      // {
      //   label: "Orders",
      //   description: "Track customer orders and order status",
      //   href: `/${slug}/admin/${APP_ROUTES.ADMIN.ORDERS}`,
      //   keywords: ["sales", "purchases", "checkout"],
      //   section: "Commerce",
      // },
      // {
      //   label: "Products",
      //   description: "Manage product catalog, variants, and inventory",
      //   href: `/${slug}/admin/${APP_ROUTES.ADMIN.PRODUCTS}`,
      //   keywords: ["catalog", "inventory", "items"],
      //   section: "Commerce",
      // },
      {
        label: "Tags",
        description: "Organize conversations with reusable tags",
        href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.TAGS}`,
        keywords: ["labels", "categorize", "segment"],
        section: "Workspace",
      },
      {
        label: "Analytics",
        description: "Review conversation and business performance",
        href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.ANALYTICS}`,
        keywords: ["reports", "insights", "metrics"],
        section: "Insights",
      },
      {
        label: "Profile Settings",
        description: "Manage your account details and preferences",
        href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_PROFILE}`,
        keywords: ["profile", "settings", "account"],
        section: "Settings",
      },
      {
        label: "Company Settings",
        description: "Update company and workspace information",
        href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_COMPANY}`,
        keywords: ["business", "tenant", "company"],
        section: "Settings",
      },
      {
        label: "Security Settings",
        description: "Control authentication and security settings",
        href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_SECURITY}`,
        keywords: ["mfa", "password", "security"],
        section: "Settings",
      },
      {
        label: "Notification Settings",
        description: "Choose how notifications are delivered",
        href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_NOTIFICATIONS}`,
        keywords: ["alerts", "email", "notifications"],
        section: "Settings",
      },
      {
        label: "Role Management",
        description: "Assign permissions and manage workspace access",
        href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_ROLE_MANAGEMENT}`,
        keywords: ["permissions", "roles", "members"],
        section: "Settings",
      },
      {
        label: "Chat Settings",
        description: "Adjust chat defaults and routing behavior",
        href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_CHAT_SETTINGS}`,
        keywords: ["chat", "routing", "settings"],
        section: "Settings",
      },
      {
        label: "Shipping Settings",
        description: "Configure delivery and fulfilment options",
        href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_SHIPPING}`,
        keywords: ["shipping", "delivery", "logistics"],
        section: "Settings",
      },
      {
        label: "Subscription",
        description: "Review plan, billing, and renewals",
        href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_SUBSCRIPTION}`,
        keywords: ["billing", "plan", "subscription"],
        section: "Settings",
      },
      {
        label: "Integrations",
        description: "Connect external services and APIs",
        href: `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_INTEGRATION_SETTINGS}`,
        keywords: ["integrations", "api", "connections"],
        section: "Settings",
      },
    ];
  }, [slug, user?.roleType]);
  const filteredSearchDestinations = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return searchDestinations;
    }

    return searchDestinations.filter((destination) => {
      const haystack = [
        destination.label,
        destination.description,
        destination.section,
        ...destination.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [searchDestinations, searchQuery]);

  useEffect(() => {
    if (!showSearch) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (isTyping) return;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }

      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSearch]);

  useEffect(() => {
    if (!isSearchOpen) {
      setSearchQuery("");
      return;
    }

    const timeoutId = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 40);

    return () => window.clearTimeout(timeoutId);
  }, [isSearchOpen]);

  const handleSearchNavigate = (href: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(href);
  };

  return (
    <header
      className={cn(
        "w-full border-b border-grey-light bg-base-white px-12 py-2",
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
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 xl:flex-nowrap">
          {showSearch && (
            <>
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex min-w-[210px] items-center justify-between gap-3 rounded-xl border border-grey-light bg-base-white px-3 py-2 text-left transition-colors hover:border-primary hover:bg-primary-light/30"
              >
                <span className="flex items-center gap-2 text-sm text-grey-medium">
                  <Search className="h-4 w-4" />
                  <span>Search...</span>
                </span>
                <span className="rounded-md bg-grey-light px-2 py-0.5 text-xs font-medium text-grey-medium">
                  {typeof navigator !== "undefined" &&
                  navigator.platform.includes("Mac")
                    ? "⌘ K"
                    : "Ctrl K"}
                </span>
              </button>

              <Dialog.Root open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]" />
                  <Dialog.Content
                    aria-describedby={undefined}
                    className="fixed left-1/2 top-[14%] z-50 w-[min(760px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-[22px] border border-grey-light bg-base-white shadow-[0_32px_120px_rgba(15,23,42,0.25)] outline-none"
                  >
                    <Dialog.Title className="sr-only">
                      Search workspace
                    </Dialog.Title>

                    <div className="border-b border-grey-light px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Search className="h-5 w-5 flex-shrink-0 text-grey-medium" />
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(event) =>
                            setSearchQuery(event.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Escape") {
                              e.preventDefault();
                              setIsSearchOpen(false);
                            }
                          }}
                          placeholder="Search workspace"
                          className="min-w-0 flex-1 bg-transparent text-base text-grey outline-none placeholder:text-grey-medium"
                        />
                        <span className="rounded-md border border-grey-light bg-grey-light/60 px-2 py-1 text-xs text-grey-medium">
                          ESC
                        </span>
                      </div>
                    </div>

                    <div className="max-h-[420px] overflow-y-auto bg-white">
                      {filteredSearchDestinations.length > 0 ? (
                        <div className="p-3">
                          {filteredSearchDestinations.map((destination) => (
                            <button
                              key={destination.href}
                              type="button"
                              onClick={() =>
                                handleSearchNavigate(destination.href)
                              }
                              className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors hover:bg-primary-light/40"
                            >
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-grey">
                                  {destination.label}
                                </p>
                                <p className="mt-1 truncate text-sm text-grey-medium">
                                  {destination.section} /{" "}
                                  {destination.description}
                                </p>
                              </div>
                              <ChevronRight className="h-4 w-4 flex-shrink-0 text-grey-medium" />
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
                          <Search className="h-8 w-8 text-grey-light" />
                          <p className="mt-4 text-lg font-semibold text-grey">
                            No matching pages
                          </p>
                          <p className="mt-1 text-sm text-grey-medium">
                            Try searching for conversations, products,
                            analytics, or settings.
                          </p>
                        </div>
                      )}
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </>
          )}

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
