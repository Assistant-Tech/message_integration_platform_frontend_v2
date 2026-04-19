import type { LucideIcon } from "lucide-react";
import {
  Link,
  matchPath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
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
import { useCurrentUser, useLogout } from "@/app/hooks/query/useAuthQuery";
import { getAvatarUrl } from "@/app/utils/avatar";

const SidebarIcon = ({ icon }: { icon: LucideIcon | string }) => {
  if (typeof icon === "string") {
    return (
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
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
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
      <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
    </span>
  );
};

interface LockedSidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const LockedSidebar = ({
  isMobileOpen = false,
  onMobileClose,
}: LockedSidebarProps) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useCurrentUser();
  const logoutMutation = useLogout();

  const stripQuery = (href: string) => href.split("?")[0] ?? href;

  const filteredItems = sidebarItems.filter((item) =>
    item.roles?.includes(user?.roleType ?? ""),
  );

  const basePath =
    user?.roleType === "MEMBER"
      ? `/app/${slug}/dashboard`
      : `/app/${slug}/admin`;

  const userName = user?.name || user?.email?.split("@")[0] || "User";
  const userRole = user?.roleType || "TENANT_ADMIN";
  const profileRoute = slug
    ? user?.roleType === "MEMBER"
      ? `/app/${slug}/dashboard/settings/profile`
      : `/app/${slug}/admin/${APP_ROUTES.ADMIN.SETTINGS_PROFILE}`
    : APP_ROUTES.ADMIN.SETTINGS_PROFILE;

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => navigate("/login"),
    });
  };

  const matchesRoute = (path: string) => {
    const pathOnly = stripQuery(path);
    return (
      Boolean(matchPath({ path: pathOnly, end: true }, location.pathname)) ||
      Boolean(
        matchPath({ path: `${pathOnly}/*`, end: false }, location.pathname),
      )
    );
  };

  return (
    <TooltipProvider delayDuration={100}>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-[59] bg-black/50 md:hidden"
          onClick={onMobileClose}
          aria-hidden
        />
      )}
      <div className="flex bg-grey-light h-full min-h-0" data-tour="sidebar">
        <aside
          className={clsx(
            "bg-primary text-white flex flex-col w-20",
            "fixed top-0 left-0 z-[60] h-full",
            isMobileOpen ? "translate-x-0" : "-translate-x-full",
            "md:relative md:z-auto md:translate-x-0 md:h-full",
          )}
        >
          <div className="p-4 border-primary-dark">
            <div className="flex items-center justify-center pt-2">
              <Logo collapsed variant="white" isDashboard />
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:bg-primary-dark">
            <ul className="space-y-2">
              {filteredItems.map((item, index) => {
                const finalHref = `${basePath}/${item.href}`;
                const hasActiveSubmenu =
                  item.hasSubmenu &&
                  Boolean(
                    item.submenu?.some((sub) =>
                      matchesRoute(`${basePath}/${sub.href}`),
                    ),
                  );
                const isActive =
                  matchesRoute(finalHref) || Boolean(hasActiveSubmenu);

                const tourKey = item.label
                  .toLowerCase()
                  .replace(/\s+/g, "-");

                return (
                  <li key={index} data-tour={`nav-${tourKey}`}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          to={finalHref}
                          className={clsx(
                            "group relative flex items-center justify-center overflow-hidden rounded-lg p-3 transition-all duration-300 cursor-pointer",
                            isActive
                              ? "bg-primary-dark text-white"
                              : "text-white hover:bg-primary-dark hover:scale-105 hover:shadow-xl active:scale-95",
                          )}
                        >
                          {!isActive && (
                            <span
                              className="absolute inset-0 -translate-x-[110%] skew-x-[-13deg] bg-white/25 transition-discrete duration-1000 group-hover:translate-x-[45%]"
                              aria-hidden
                            />
                          )}
                          <SidebarIcon icon={item.icon} />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="text-white bg-grey">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  </li>
                );
              })}
            </ul>
          </nav>

          <hr className="mx-4" />
          <div className="p-2" data-tour="profile">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  type="button"
                  className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg p-2 text-white transition-all duration-300 hover:bg-primary-dark hover:scale-105 hover:shadow-xl active:scale-95"
                  aria-label={`${userName} (${userRole})`}
                >
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
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  side="right"
                  align="end"
                  sideOffset={12}
                  className="z-[70] min-w-[200px] rounded-2xl border border-white/20 bg-base-white backdrop-blur-xl p-2 shadow-xl
                           data-[state=open]:animate-in data-[state=closed]:animate-out
                           data-[state=open]:fade-in data-[state=closed]:fade-out
                           data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
                >
                  <Link to={profileRoute}>
                    <DropdownMenu.Item className="rounded-xl px-4 py-2 text-sm text-grey outline-none transition-all hover:bg-primary-light cursor-pointer">
                      Profile
                    </DropdownMenu.Item>
                  </Link>
                  <DropdownMenu.Item
                    className="rounded-xl px-4 py-2 text-sm text-information outline-none transition-all hover:bg-information-light cursor-pointer"
                    onClick={handleLogout}
                  >
                    Upgrade
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    className="rounded-xl px-4 py-2 text-sm text-danger outline-none transition-all hover:bg-danger-light cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </aside>
      </div>
    </TooltipProvider>
  );
};

export default LockedSidebar;
