import { Link } from "react-router-dom";
import { cn } from "@/app/utils/cn";
import type { ResolvedNavGroup } from "../hooks/useVisibleSettingsNav";

interface SettingsNavProps {
  groups: ResolvedNavGroup[];
}

/**
 * Pure render — takes resolved groups and nothing else. No routing logic,
 * no role checks, no data fetching. Trivially testable with a static fixture.
 */
const SettingsNav = ({ groups }: SettingsNavProps) => (
  <nav
    aria-label="Settings navigation"
    className="flex h-full w-full flex-col gap-5 overflow-y-auto p-4"
  >
    {groups.map((group) => (
      <section key={group.id} aria-labelledby={`group-${group.id}`}>
        <h3
          id={`group-${group.id}`}
          className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-grey-medium"
        >
          {group.label}
        </h3>
        <ul className="space-y-0.5">
          {group.items.map((item) => {
            const Icon = item.Icon;
            return (
              <li key={item.id}>
                <Link
                  to={item.absoluteHref}
                  aria-current={item.isActive ? "page" : undefined}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors duration-150",
                    item.isActive
                      ? "bg-primary text-white"
                      : "text-grey hover:bg-primary-light/40 hover:text-primary",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      item.isActive
                        ? "text-white"
                        : "text-grey-medium group-hover:text-primary",
                    )}
                    strokeWidth={2}
                  />
                  <span className="flex-1 truncate font-medium">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    ))}
  </nav>
);

export default SettingsNav;
