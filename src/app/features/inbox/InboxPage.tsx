import { useState } from "react";
import { TABS } from "@/app/utils/helper";
import { cn } from "@/app/utils/cn";
import PlatformIcon from "@/app/components/common/Conversation/chat/PlatformIcons";
import InboxSkeleton from "@/app/components/ui/InboxSkeleton";
import ChatSidebar from "@/app/components/common/Conversation/chat/ChatSidebar";
import ChatPanel from "@/app/components/common/Conversation/chat/ChatPanel";
import NotificationToast from "@/app/components/common/Conversation/chat/NotificationToast";
import { useInboxPage } from "@/app/features/inbox/hooks/useInboxPage";
import ContactDetails from "@/app/components/common/Conversation/panel/ContactDetails";
import AssignDrawer from "@/app/components/common/Conversation/panel/AssignDrawer";

const InboxPage = () => {
  const {
    visibleConversations,
    selected,
    tabCounts,
    assigneeOptions,
    assignedMemberName,
    activeTab,
    hiddenCount,
    isLoading,
    isError,
    setSelected,
    setActiveTab,
    hideConversation,
    restoreHidden,
    handleAssign,
  } = useInboxPage();

  const unreadByTab = visibleConversations.reduce<Record<string, number>>(
    (acc, conversation) => {
      if (conversation.unreadCount <= 0) {
        return acc;
      }

      acc[conversation.channel] =
        (acc[conversation.channel] ?? 0) + conversation.unreadCount;
      return acc;
    },
    {},
  );

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  if (isLoading) return <InboxSkeleton />;
  if (isError)
    return <p className="p-4 text-danger">Failed to load conversations.</p>;

  return (
    <section className="flex h-full min-h-0 flex-col p-4 bg-primary-light/20">
      <NotificationToast activeConversationId={selected?.id ?? null} />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-grey-light">
        {/* Tab bar */}
        <div className="border-b border-grey-light bg-white px-4 py-3">
          <nav aria-label="Conversation platform tabs">
            <ul className="grid w-full grid-cols-5 items-center gap-2">
              {TABS.map((tab) => (
                <li key={tab.id} className="group relative w-full">
                  <button
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    aria-current={activeTab === tab.id ? "page" : undefined}
                    className={cn(
                      "relative flex w-full items-center justify-center gap-2 px-1 py-2 mb-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer",
                      activeTab === tab.id
                        ? "text-primary"
                        : "text-grey-medium hover:text-grey",
                    )}
                  >
                    {tab.id !== "all" && (
                      <PlatformIcon
                        platform={tab.id}
                        size={24}
                        showUnreadDot={(unreadByTab[tab.id] ?? 0) > 0}
                      />
                    )}
                    <span>{tab.label}</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors",
                        activeTab === tab.id
                          ? "bg-primary-light text-primary"
                          : "bg-grey-light text-grey-medium",
                      )}
                    >
                      {tabCounts[tab.id] ?? 0} {/* ← real counts now */}
                    </span>
                  </button>
                  <span
                    className={cn(
                      "pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-center rounded-full bg-primary transition-transform duration-300",
                      activeTab === tab.id
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Content panels */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className="h-full w-full max-w-[360px] flex-shrink-0 overflow-hidden border-r border-grey-light bg-white">
            <ChatSidebar
              conversations={visibleConversations}
              activeTab={activeTab}
              selectedId={selected?.id ?? null}
              onSelect={(c) => {
                setSelected(c.id);
                setIsDetailsOpen(false);
                setIsAssignOpen(false);
              }}
              onHideConversation={hideConversation}
              onRestoreHiddenChats={restoreHidden}
              hiddenCount={hiddenCount}
            />
          </div>

          <div className="min-w-0 flex-1 overflow-hidden">
            <ChatPanel
              conversation={selected}
              onDetailsToggle={() => {
                setIsAssignOpen(false);
                setIsDetailsOpen((p) => !p);
              }}
              isDetailsOpen={isDetailsOpen}
              onAssignToggle={() => {
                setIsDetailsOpen(false);
                setIsAssignOpen((p) => !p);
              }}
              isAssignOpen={isAssignOpen}
              assignedMemberName={assignedMemberName}
            />
          </div>

          {selected && isDetailsOpen && (
            <div className="h-full w-full max-w-[360px] flex-shrink-0 overflow-hidden border-l border-grey-light bg-white">
              <ContactDetails
                conversation={selected}
                onClose={() => setIsDetailsOpen(false)}
                onAssignToggle={() => {
                  setIsDetailsOpen(false);
                  setIsAssignOpen(true);
                }}
              />
            </div>
          )}

          {selected && isAssignOpen && (
            <div className="h-full w-full max-w-[360px] flex-shrink-0 overflow-hidden border-l border-grey-light bg-white">
              <AssignDrawer
                contactName={selected.contact?.name || undefined}
                assignedTo={selected.assignedTo}
                options={assigneeOptions}
                onAssign={handleAssign}
                onClose={() => setIsAssignOpen(false)}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InboxPage;
