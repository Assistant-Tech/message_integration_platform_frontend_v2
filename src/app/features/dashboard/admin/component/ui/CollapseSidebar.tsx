import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import {
  Link,
  matchPath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";

import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/common/Tooltip";
import { sidebarItems } from "@/app/utils/admin/sidebar.config";
import { Logo } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";
import { useCurrentUser } from "@/app/hooks/query/useAuthQuery";
import { useLogout } from "@/app/hooks/query/useAuthQuery";
import { getAvatarUrl } from "@/app/utils/avatar";
import ham from "@/app/assets/dashboard-icons/ham.svg";

const SidebarIcon = ({
  icon,
  className,
}: {
  icon: LucideIcon | string;
  className?: string;
}) => {
  if (typeof icon === "string") {
    return (
      <span
        className={clsx(
          "inline-flex h-5 w-5 shrink-0 items-center justify-center",
          className,
        )}
      >
        <img
          src={icon}
          className="h-5 w-5 object-contain brightness-0 invert scale-[1.15]"
          alt=""
          aria-hidden
        />
      </span>
    );
  }

  const Icon = icon;
  return (
    <span
      className={clsx(
        "inline-flex h-5 w-5 shrink-0 items-center justify-center",
        className,
      )}
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
    </span>
  );
};

interface CollapsibleSidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const CollapsibleSidebar = ({ isMobileOpen = false, onMobileClose }: CollapsibleSidebarProps) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useCurrentUser();
  const logoutMutation = useLogout();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setExpandedMenu((prev) => (prev === label ? null : label));
  };

  const filteredItems = sidebarItems.filter((item) =>
    item.roles?.includes(user?.roleType ?? ""),
  );

  const planName = "Pro Plan";
  const userName = user?.name || user?.email?.split("@")[0] || "User";
  const userRole = user?.roleType || "TENANT_ADMIN";
  const profileRoute = slug
    ? user?.roleType === "MEMBER"
      ? `/app/${slug}/dashboard/settings/profile`
      : `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_PROFILE}`
    : APP_ROUTES.ADMIN.SETTINGS_PROFILE;

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  const matchesRoute = (path: string) => {
    return (
      Boolean(matchPath({ path, end: true }, location.pathname)) ||
      Boolean(matchPath({ path: `${path}/*`, end: false }, location.pathname))
    );
  };

  return (
    <TooltipProvider delayDuration={100}>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-[59] bg-black/50 md:hidden"
          onClick={onMobileClose}
          aria-hidden
        />
      )}
      <div className="flex bg-grey-light h-full min-h-0">
        <aside
          className={clsx(
            "bg-primary text-white flex flex-col transition-all duration-300 ease-in-out",
            isCollapsed ? "w-20" : "w-64",
            // Mobile: fixed overlay, slides in/out
            "fixed top-0 left-0 z-[60] h-full",
            isMobileOpen ? "translate-x-0" : "-translate-x-full",
            // Desktop: in-flow, always visible
            "md:relative md:z-auto md:translate-x-0 md:h-full",
          )}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-primary-dark relative">
            <div className="flex items-center justify-center px-2 space-x-3 pt-2">
              <Logo collapsed={isCollapsed} variant="white" isDashboard />
            </div>

            {/* Collapse Toggle */}
            <div className="absolute top-2 -right-12">
              <button
                onClick={() => setIsCollapsed((prev) => !prev)}
                className="bg-transparent rounded-full text-primary p-2 cursor-pointer"
              >
                {isCollapsed ? (
                  <img src={ham} className="w-8 h-8" />
                ) : (
                  <img src={ham} className="w-8 h-8" />
                )}
              </button>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:bg-primary-dark">
            <ul className="space-y-2">
              {filteredItems.map((item, index) => {
                const finalHref = `/app/${slug}/admin/${item.href}`;

                const hasActiveSubmenu =
                  item.hasSubmenu &&
                  Boolean(
                    item.submenu?.some((sub) => {
                      const subFinalHref = `/app/${slug}/admin/${sub.href}`;
                      return matchesRoute(subFinalHref);
                    }),
                  );

                const isActive =
                  matchesRoute(finalHref) || Boolean(hasActiveSubmenu);
                const isExpanded =
                  expandedMenu === item.label || Boolean(hasActiveSubmenu);

                const linkContent = (
                  <div
                    className={clsx(
                      "group relative flex items-center justify-between overflow-hidden rounded-lg p-3 transition-all duration-300",
                      "button-semi-bold-16 cursor-pointer",
                      isActive
                        ? "bg-primary-dark text-white"
                        : "text-white hover:bg-primary-dark hover:text-white hover:scale-105 hover:shadow-xl active:scale-95",
                    )}
                    onClick={() => {
                      if (item.hasSubmenu) {
                        toggleMenu(item.label);
                      }
                    }}
                  >
                    {!isActive && (
                      <span
                        className="absolute inset-0 -translate-x-[110%] skew-x-[-13deg] bg-white/25 transition-discrete duration-1000 group-hover:translate-x-[45%]"
                        aria-hidden
                      />
                    )}

                    <div className="flex items-center">
                      <SidebarIcon icon={item.icon} className="relative z-10" />
                      {!isCollapsed && (
                        <span className="relative z-10 ml-3 body-bold-16">
                          {item.label}
                        </span>
                      )}
                    </div>
                    {!isCollapsed &&
                      item.hasSubmenu &&
                      (isExpanded ? (
                        <ChevronUp className="relative z-10 w-4 h-4" />
                      ) : (
                        <ChevronDown className="relative z-10 w-4 h-4" />
                      ))}
                  </div>
                );

                return (
                  <li key={index}>
                    {isCollapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link to={finalHref}>{linkContent}</Link>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="text-white bg-grey"
                        >
                          {item.label}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <>
                        {item.hasSubmenu ? (
                          <div>{linkContent}</div>
                        ) : (
                          <Link to={finalHref}>{linkContent}</Link>
                        )}

                        {item.hasSubmenu && item.submenu && isExpanded && (
                          <ul className="pl-10 mt-1 space-y-1">
                            {item.submenu
                              .filter((sub) => {
                                const allowedRoles = sub.roles ?? item.roles;
                                return allowedRoles?.includes(
                                  user?.roleType ?? "",
                                );
                              })
                              .map((sub, subIndex) => {
                                const subFinalHref = `/app/${slug}/admin/${sub.href}`;
                                const subActive = matchesRoute(subFinalHref);
                                return (
                                  <li key={subIndex}>
                                    <Link
                                      to={subFinalHref}
                                      className={`block py-1.5 px-2 rounded-md body-bold-16 ${
                                        subActive
                                          ? "text-white"
                                          : "text-grey-light hover:text-white"
                                      }`}
                                    >
                                      {sub.label}
                                    </Link>
                                  </li>
                                );
                              })}
                          </ul>
                        )}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <hr className="mx-4" />
          <div>
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="group relative flex items-center justify-center overflow-hidden rounded-lg p-2 text-white transition-all duration-300 hover:bg-primary-dark hover:scale-105 hover:shadow-xl active:scale-95">
                    <span
                      className="absolute inset-0 -translate-x-[110%] skew-x-[-13deg] bg-white/25 transition-discrete duration-1000 group-hover:translate-x-[45%]"
                      aria-hidden
                    />
                    {user ? (
                      <img
                        src={getAvatarUrl(user.avatar)}
                        alt={userName}
                        className="relative z-10 h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="relative z-10 h-8 w-8 rounded-full bg-white/60" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-white bg-primary">
                  {`${userName} (${userRole})`}
                </TooltipContent>
              </Tooltip>
            ) : (
              <>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <div className="group relative w-full flex items-center gap-3 px-2 py-1 my-2 overflow-hidden rounded-lg text-left text-white ">
                      <span
                        className="absolute inset-0 -translate-x-[110%] skew-x-[-13deg] bg-white/25 transition-discrete duration-1000 group-hover:translate-x-[45%]"
                        aria-hidden
                      />
                      {user ? (
                        <img
                          src={getAvatarUrl(user.avatar)}
                          alt={userName}
                          className="relative z-10 h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="relative z-10 h-10 w-10 rounded-full bg-white/60" />
                      )}

                      <div className="relative z-10 min-w-0 flex-1">
                        <p className="truncate body-bold-16">{userName}</p>
                        <p className="text-xs">{planName}</p>
                      </div>
                      <ChevronUp size={18} className="relative z-10" />
                    </div>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      side="top"
                      align="end"
                      sideOffset={20}
                      alignOffset={10}
                      className="z-50 min-w-[200px] rounded-2xl border border-white/20 bg-base-white backdrop-blur-xl p-2 shadow-xl
                               data-[state=open]:animate-in data-[state=closed]:animate-out
                               data-[state=open]:fade-in data-[state=closed]:fade-out
                               data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95
                               will-change-[transform,opacity]"
                    >
                      <Link to={profileRoute}>
                        <DropdownMenu.Item className="rounded-xl px-4 py-2 text-sm text-grey outline-none transition-all hover:bg-primary-light cursor-pointer">
                          Profile
                        </DropdownMenu.Item>
                      </Link>

                      <DropdownMenu.Item
                        className="rounded-xl px-4 py-2 text-sm text-danger outline-none transition-all hover:bg-danger-light cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        className="rounded-xl px-4 py-2 text-sm text-information outline-none transition-all hover:bg-information-light cursor-pointer"
                        onClick={handleLogout}
                      >
                        Upgrade
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </>
            )}
          </div>
        </aside>
      </div>
    </TooltipProvider>
  );
};

export default CollapsibleSidebar;
