import { useState } from "react";
import { ChevronLeft } from "lucide-react";
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

type MobileView = "list" | "chat" | "panel";

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
  const [mobileView, setMobileView] = useState<MobileView>("list");

  const handleDetailsToggle = () => {
    const nextIsOpen = !isDetailsOpen;
    setIsAssignOpen(false);
    setIsDetailsOpen(nextIsOpen);
    setMobileView(nextIsOpen ? "panel" : "chat");
  };

  const handleAssignToggle = () => {
    const nextIsOpen = !isAssignOpen;
    setIsDetailsOpen(false);
    setIsAssignOpen(nextIsOpen);
    setMobileView(nextIsOpen ? "panel" : "chat");
  };

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
            <ul className="flex overflow-x-auto gap-2 scrollbar-invisible md:grid md:w-full md:grid-cols-5 md:items-center">
              {TABS.map((tab) => (
                <li key={tab.id} className="group relative shrink-0 md:shrink md:w-full">
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
          {/* Left panel — conversation list */}
          <div
            className={cn(
              "h-full overflow-hidden border-r border-grey-light bg-white",
              "md:w-full md:max-w-[360px] md:flex-shrink-0 md:block",
              mobileView === "list" ? "flex-1 w-full" : "hidden md:block",
            )}
          >
            <ChatSidebar
              conversations={visibleConversations}
              activeTab={activeTab}
              selectedId={selected?.id ?? null}
              onSelect={(c) => {
                setSelected(c.id);
                setIsDetailsOpen(false);
                setIsAssignOpen(false);
                setMobileView("chat");
              }}
              onHideConversation={hideConversation}
              onRestoreHiddenChats={restoreHidden}
              hiddenCount={hiddenCount}
            />
          </div>

          {/* Center panel — chat */}
          <div
            className={cn(
              "overflow-hidden flex flex-col",
              "md:min-w-0 md:flex-1",
              mobileView === "chat" ? "flex-1 w-full" : "hidden md:flex",
            )}
          >
            {/* Mobile back button */}
            <button
              type="button"
              onClick={() => setMobileView("list")}
              className="flex shrink-0 items-center gap-1.5 border-b border-grey-light bg-white px-4 py-2.5 text-sm font-medium text-grey hover:text-primary md:hidden"
            >
              <ChevronLeft className="h-4 w-4" />
              All Conversations
            </button>
            <div className="flex-1 min-h-0 overflow-hidden">
              <ChatPanel
                conversation={selected}
                onDetailsToggle={handleDetailsToggle}
                isDetailsOpen={isDetailsOpen}
                onAssignToggle={handleAssignToggle}
                isAssignOpen={isAssignOpen}
                assignedMemberName={assignedMemberName}
              />
            </div>
          </div>

          {/* Right panel — contact details */}
          {selected && isDetailsOpen && (
            <div
              className={cn(
                "h-full overflow-hidden border-l border-grey-light bg-white",
                "md:w-full md:max-w-[360px] md:flex-shrink-0",
                mobileView === "panel" ? "flex-1 w-full" : "hidden md:block",
              )}
            >
              <ContactDetails
                conversation={selected}
                onClose={() => {
                  setIsDetailsOpen(false);
                  setMobileView("chat");
                }}
                onAssignToggle={() => {
                  setIsDetailsOpen(false);
                  setIsAssignOpen(true);
                  setMobileView("panel");
                }}
              />
            </div>
          )}

          {/* Right panel — assign drawer */}
          {selected && isAssignOpen && (
            <div
              className={cn(
                "h-full overflow-hidden border-l border-grey-light bg-white",
                "md:w-full md:max-w-[360px] md:flex-shrink-0",
                mobileView === "panel" ? "flex-1 w-full" : "hidden md:block",
              )}
            >
              <AssignDrawer
                contactName={selected.contact?.name ?? selected.title}
                assignedTo={selected.assignedTo ?? undefined}
                options={assigneeOptions}
                onAssign={handleAssign}
                onClose={() => {
                  setIsAssignOpen(false);
                  setMobileView("chat");
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InboxPage;
