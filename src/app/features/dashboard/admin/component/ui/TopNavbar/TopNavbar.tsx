import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HelpCircle, Search } from "lucide-react";

import { Button } from "@/app/components/ui";
import NotificationDropdown from "@/app/components/common/Notification/NotificationDropDown";
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
        "w-full border-b border-grey-light bg-base-white px-4 py-2 md:px-12",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Title / subtitle ─────────────────────────────────────────────── */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {(resolvedTitle || resolvedSubtitle) && (
            <div className="min-w-0">
              {resolvedTitle && (
                <h2
                  className={cn(
                    "text-base md:text-lg font-semibold text-grey",
                    isPlainTitle
                      ? "truncate"
                      : "flex flex-wrap items-center gap-2",
                  )}
                >
                  {resolvedTitle}
                </h2>
              )}
              {resolvedSubtitle && (
                <p className="hidden md:block truncate text-sm text-grey-medium">
                  {resolvedSubtitle}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right-side controls ──────────────────────────────────────────── */}
        <div className="flex items-center justify-end gap-2 md:gap-3 shrink-0">
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
