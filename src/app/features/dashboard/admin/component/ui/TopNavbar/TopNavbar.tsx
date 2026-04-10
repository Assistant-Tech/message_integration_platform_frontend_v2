/**
 * TopNavbar
 *
 * The dashboard top navigation bar. Renders the route title/subtitle on the
 * left and the workspace controls (search, help, notifications, profile) on
 * the right.
 *
 * Responsive behaviour
 *   ≥ md  — full layout: title + search bar + help + notifications + profile
 *   < md  — collapsed: title + notifications + hamburger menu
 *
 * The component is intentionally a thin orchestrator. All non-trivial logic
 * lives in sibling files:
 *   • types.ts            — public component contract
 *   • constants.ts        — search destinations, profile route, shortcut label
 *   • hooks/useSearch...  — search dialog state + keyboard shortcut
 *   • SearchDialog.tsx    — Cmd-K search UI
 *   • ProfileMenu.tsx     — desktop profile dropdown
 *   • MobileMenu.tsx      — hamburger for < md
 */

import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HelpCircle, Menu, Search } from "lucide-react";

import { Button } from "@/app/components/ui";
import NotificationDropdown from "@/app/components/common/Notification/NotificationDropDown";
// Note: the search trigger uses a native <button> because its content
// (icon + text + shortcut badge) can't be expressed via Button's
// label/IconLeft/IconRight slots — Button doesn't render `children`.
import { useLogout } from "@/app/hooks/query/useAuthQuery";
import { useAuthStore } from "@/app/store/auth.store";
import { cn } from "@/app/utils/cn";
import { getRouteMeta } from "@/app/utils/helper";

import {
  buildSearchDestinations,
  filterSearchDestinations,
  getSearchShortcutLabel,
  resolveProfileRoute,
} from "./constants";
import { useSearchShortcut } from "./hooks/useSearchShortcut";
import SearchDialog from "./SearchDialog";
import ProfileMenu from "./ProfileMenu";
import MobileMenu from "./MobileMenu";
import type { TopNavbarProps } from "./types";

const TopNavbar = ({
  title,
  subtitle,
  showSearch = true,
  showHelp = true,
  showNotifications = true,
  showProfileMenu = true,
  className,
  onSidebarToggle,
}: TopNavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogout();

  const search = useSearchShortcut(showSearch);

  // ── Derived values ────────────────────────────────────────────────────────
  const routeMeta = getRouteMeta(location.pathname);
  const resolvedTitle = title ?? routeMeta.title;
  const resolvedSubtitle = subtitle ?? routeMeta.subtitle;
  const isPlainTitle = typeof resolvedTitle === "string";

  const userName = user?.name || user?.email?.split("@")[0] || "Jane Doe";
  const userRole = user?.roleType || "Admin";
  const profileRoute = resolveProfileRoute(slug, user?.roleType);
  const shortcutLabel = getSearchShortcutLabel();

  const searchDestinations = useMemo(
    () => buildSearchDestinations(slug, user?.roleType),
    [slug, user?.roleType],
  );

  const filteredDestinations = useMemo(
    () => filterSearchDestinations(searchDestinations, search.query),
    [searchDestinations, search.query],
  );

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => navigate("/login"),
    });
  };

  const handleSearchNavigate = (href: string) => {
    search.setIsOpen(false);
    search.setQuery("");
    navigate(href);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <header
      className={cn(
        "w-full border-b border-grey-light bg-base-white px-6 py-2 md:px-12",
        className,
      )}
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Title / subtitle ─────────────────────────────────────────────── */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {/* Mobile sidebar toggle */}
          {onSidebarToggle && (
            <button
              type="button"
              onClick={onSidebarToggle}
              aria-label="Toggle sidebar"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-grey-light bg-base-white text-grey-medium hover:bg-primary-light hover:text-primary md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
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

        {/* Right-side controls ──────────────────────────────────────────── */}
        <div className="flex items-center justify-end gap-3">

          {/* Desktop (≥ md) — full controls inline */}
          <div className="hidden items-center gap-3 md:flex">
            {showSearch && (
              <button
                type="button"
                onClick={() => search.setIsOpen(true)}
                className="flex min-w-[210px] items-center justify-between gap-3 rounded-xl border border-grey-light bg-base-white px-3 py-2 text-left transition-colors hover:border-primary hover:bg-primary-light/30"
              >
                <span className="flex items-center gap-2 text-sm text-grey-medium">
                  <Search className="h-4 w-4" />
                  <span>Search...</span>
                </span>
                <span className="rounded-md bg-grey-light px-2 py-0.5 text-xs font-medium text-grey-medium">
                  {shortcutLabel}
                </span>
              </button>
            )}

            {showHelp && (
              <Button
                variant="none"
                iconOnly
                size="xs"
                aria-label="Help"
                IconLeft={<HelpCircle className="h-5 w-5" />}
                className="!h-10 !w-10 rounded-full border border-grey-light bg-base-white text-grey-medium hover:bg-primary-light hover:text-primary"
              />
            )}

            {showProfileMenu && (
              <ProfileMenu
                userName={userName}
                userRole={userRole}
                hasUser={Boolean(user)}
                profileRoute={profileRoute}
                onLogout={handleLogout}
              />
            )}
          </div>

          {/* Notifications — visible at every breakpoint */}
          {showNotifications && <NotificationDropdown />}

          {/* Mobile (< md) — hamburger */}
          <div className="md:hidden">
            <MobileMenu
              showSearch={showSearch}
              showHelp={showHelp}
              showProfileMenu={showProfileMenu}
              profileRoute={profileRoute}
              onOpenSearch={() => search.setIsOpen(true)}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </div>

      {/* Search dialog — portalled, lives outside the header layout */}
      {showSearch && (
        <SearchDialog
          isOpen={search.isOpen}
          onOpenChange={search.setIsOpen}
          query={search.query}
          onQueryChange={search.setQuery}
          destinations={filteredDestinations}
          onNavigate={handleSearchNavigate}
          inputRef={search.inputRef}
        />
      )}
    </header>
  );
};

export default TopNavbar;
