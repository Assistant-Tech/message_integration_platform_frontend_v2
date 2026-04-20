import { Link, useSearchParams } from "react-router-dom";

import { cn } from "@/app/utils/cn";
import {
  formatCount,
  InboxView,
  QUEUE_ITEMS,
  SECONDARY_ITEMS,
  CHANNEL_ITEMS,
} from "@/app/features/inbox/utils/helper";
import { BookOpen } from "lucide-react";
import PlatformIcon from "@/app/components/common/Conversation/chat/PlatformIcons";

interface InboxRailProps {
  counts?: Partial<Record<InboxView, number>>;
}

const InboxRail = ({ counts }: InboxRailProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = (searchParams.get("view") ?? "all") as InboxView;

  const setView = (view: InboxView) => {
    const next = new URLSearchParams(searchParams);
    if (view === "all") next.delete("view");
    else next.set("view", view);
    setSearchParams(next, { replace: true });
  };

  return (
    <aside
      aria-label="Inbox navigation"
      className="hidden md:flex h-full w-60 shrink-0 flex-col border-r border-grey-light bg-white"
    >
      {/* Scroll area */}
      <div className="flex-1 overflow-y-auto py-3">
        {/* Queues */}
        <nav aria-label="Conversation views" className="px-2">
          <p className="px-2 pb-1.5 pt-1 h5-bold-16 text-grey-medium">
            Conversations
          </p>
          {/* Three dotted bar */}
          <ul className="space-y-0.5">
            {QUEUE_ITEMS.map(({ id, label, Icon }) => {
              const isActive = active === id;
              const count = formatCount(counts?.[id]);
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setView(id)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 body-regular-16 transition-colors duration-150 cursor-pointer",
                      isActive
                        ? "bg-primary text-white"
                        : "text-grey hover:bg-primary-light/40 hover:text-primary",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive
                          ? "text-white"
                          : "text-grey-medium group-hover:text-primary",
                      )}
                      strokeWidth={2}
                    />
                    <span className="flex-1 truncate text-left font-medium">
                      {label}
                    </span>
                    {count && (
                      <span
                        className={cn(
                          "min-w-[20px] rounded px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-grey-light text-grey-medium",
                        )}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Channels nav */}
        <nav aria-label="Channels" className="mt-5 px-2">
          <p className="px-2 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-grey-medium">
            Channels
          </p>
          <ul className="space-y-0.5">
            {CHANNEL_ITEMS.map((item) => {
              const isLocked = item.kind === "soon";
              const isBeta = item.kind === "beta";
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    disabled={isLocked}
                    aria-disabled={isLocked}
                    className={cn(
                      "group flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors duration-150",
                      isLocked
                        ? "cursor-not-allowed text-grey-medium"
                        : "text-grey hover:bg-primary-light/40 hover:text-primary cursor-pointer",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center",
                        isLocked && "opacity-50",
                      )}
                    >
                      {item.kind === "platform" || item.kind === "beta" ? (
                        <PlatformIcon
                          platform={item.platform}
                          size={16}
                          className="h-4 w-4"
                        />
                      ) : (
                        <item.Icon
                          className="h-4 w-4 text-grey-medium"
                          strokeWidth={2}
                        />
                      )}
                    </span>
                    <span className="flex-1 truncate text-left">
                      {item.label}
                    </span>
                    {isLocked && (
                      <span className="rounded bg-grey-light px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-grey-medium">
                        comming soon
                      </span>
                    )}
                    {isBeta && (
                      <span className="rounded bg-success-dark text-white px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                        beta
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Secondary nav */}
        <nav aria-label="Inbox tools" className="mt-5 px-2">
          <p className="px-2 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-grey-medium">
            Workspace
          </p>
          <ul className="space-y-0.5">
            {SECONDARY_ITEMS.map(({ to, label, Icon }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm font-medium text-grey transition-colors duration-150 hover:bg-primary-light/40 hover:text-primary"
                >
                  <Icon
                    className="h-4 w-4 shrink-0 text-grey-medium group-hover:text-primary"
                    strokeWidth={2}
                  />
                  <span className="truncate">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Pinned footer */}
      <div className="border-t border-grey-light p-2">
        <Link
          to="#start-guide"
          className="group flex items-center gap-2.5 rounded-md px-2 py-1.5 body-regular-16 text-grey-medium transition-colors duration-150 hover:bg-primary-light/40 hover:text-primary"
        >
          <BookOpen className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span className="truncate">Start guide</span>
        </Link>
      </div>
    </aside>
  );
};

export default InboxRail;
