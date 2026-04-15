import { TABS } from "@/app/utils/helper";
import { cn } from "@/app/utils/cn";
import PlatformIcon from "@/app/components/common/Conversation/chat/PlatformIcons";
import type { TabId } from "@/app/types/inbox.types";

interface ChannelTabsProps {
  activeTab: TabId;
  onSelect: (id: TabId) => void;
  counts: Record<string, number>;
  unreadByChannel: Record<string, number>;
}

const ChannelTabs = ({
  activeTab,
  onSelect,
  counts,
  unreadByChannel,
}: ChannelTabsProps) => (
  <div className="border-b border-grey-light bg-white px-4 py-3">
    <nav aria-label="Conversation platform tabs">
      <ul className="flex overflow-x-auto gap-2 scrollbar-invisible md:grid md:w-full md:grid-cols-5 md:items-center">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <li
              key={tab.id}
              className="group relative shrink-0 md:shrink md:w-full"
            >
              <button
                type="button"
                onClick={() => onSelect(tab.id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex w-full items-center justify-center gap-2 px-1 py-2 mb-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer",
                  isActive
                    ? "text-primary"
                    : "text-grey-medium hover:text-grey",
                )}
              >
                {tab.id !== "all" && (
                  <PlatformIcon
                    platform={tab.id}
                    size={24}
                    showUnreadDot={(unreadByChannel[tab.id] ?? 0) > 0}
                  />
                )}
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors",
                    isActive
                      ? "bg-primary-light text-primary"
                      : "bg-grey-light text-grey-medium",
                  )}
                >
                  {counts[tab.id] ?? 0}
                </span>
              </button>
              <span
                className={cn(
                  "pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-center rounded-full bg-primary transition-transform duration-300",
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                )}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  </div>
);

export default ChannelTabs;
