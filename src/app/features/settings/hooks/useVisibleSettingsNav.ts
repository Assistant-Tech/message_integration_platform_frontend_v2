import { useMemo } from "react";
import { matchPath, useLocation, useParams } from "react-router-dom";
import { useCurrentUser } from "@/app/hooks/query/useAuthQuery";
import {
  SETTINGS_NAV_GROUPS,
  type SettingsNavGroup,
  type SettingsNavItem,
  type SettingsRole,
} from "../config/settings.nav";

export interface ResolvedNavItem extends SettingsNavItem {
  absoluteHref: string;
  isActive: boolean;
}

export interface ResolvedNavGroup extends Omit<SettingsNavGroup, "items"> {
  items: ResolvedNavItem[];
}

/**
 * Filters the nav config by the current user's role, resolves each item's
 * absolute href (with tenant slug) and active state from the URL.
 *
 * Single source of truth so both the sidebar and the index redirect agree
 * on what "first visible item" means.
 */
export const useVisibleSettingsNav = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const { data: user } = useCurrentUser();

  const role = (user?.roleType ?? "") as SettingsRole;

  return useMemo(() => {
    const baseAdminPath = slug ? `/app/${slug}/admin` : "";

    const groups: ResolvedNavGroup[] = SETTINGS_NAV_GROUPS.map((group) => {
      const items = group.items
        .filter((item) => item.roles.length === 0 || item.roles.includes(role))
        .map<ResolvedNavItem>((item) => {
          const absoluteHref = `${baseAdminPath}/${item.href}`;
          const isActive =
            Boolean(matchPath({ path: absoluteHref, end: true }, pathname)) ||
            Boolean(
              matchPath({ path: `${absoluteHref}/*`, end: false }, pathname),
            );
          return { ...item, absoluteHref, isActive };
        });
      return { id: group.id, label: group.label, items };
    }).filter((g) => g.items.length > 0);

    const flat = groups.flatMap((g) => g.items);
    const active = flat.find((i) => i.isActive) ?? null;
    const firstVisible = flat[0] ?? null;

    return { groups, active, firstVisible };
  }, [slug, pathname, role]);
};
