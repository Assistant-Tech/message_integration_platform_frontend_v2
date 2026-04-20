import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/app/utils/cn";
import InboxSkeleton from "@/app/components/ui/InboxSkeleton";
import ChatSidebar from "@/app/components/common/Conversation/chat/ChatSidebar";
import ChatPanel from "@/app/components/common/Conversation/chat/ChatPanel";
import ContactDetails from "@/app/components/common/Conversation/panel/ContactDetails";
import AssignDrawer from "@/app/components/common/Conversation/panel/AssignDrawer";
import { useInboxPage } from "@/app/features/inbox/hooks/useInboxPage";
import { useCurrentUser } from "@/app/hooks/query/useAuthQuery";
import type { InboxView } from "@/app/features/inbox/utils/helper";
import type { Inbox } from "@/app/types/inbox.types";

type MobileView = "list" | "chat" | "panel";

interface InboxWorkspaceProps {
  onViewCountsChange?: (counts: Partial<Record<InboxView, number>>) => void;
}

const applyView = (
  list: Inbox[],
  view: InboxView,
  currentUserId?: string,
): Inbox[] => {
  switch (view) {
    case "mine":
      return currentUserId
        ? list.filter((c) => c.assignedTo === currentUserId)
        : [];
    case "unassigned":
      return list.filter((c) => !c.assignedTo);
    case "customer":
      return list.filter((c) => c.type === "CUSTOMER");
    case "team":
      return list.filter((c) => c.type === "INTERNAL");
    case "mentions":
      return [];
    case "all":
    default:
      return list;
  }
};

const InboxWorkspace = ({ onViewCountsChange }: InboxWorkspaceProps) => {
  const {
    visibleConversations,
    selected,
    assigneeOptions,
    assignedMemberName,
    activeTab,
    hiddenCount,
    isLoading,
    isError,
    setSelected,
    hideConversation,
    restoreHidden,
    handleAssign,
  } = useInboxPage();

  const { data: user } = useCurrentUser();
  const [searchParams] = useSearchParams();
  const view = (searchParams.get("view") ?? "all") as InboxView;

  const viewFilteredConversations = useMemo(
    () => applyView(visibleConversations, view, user?.id),
    [visibleConversations, view, user?.id],
  );
  const viewCounts = useMemo<Partial<Record<InboxView, number>>>(
    () => ({
      all: visibleConversations.length,
      mentions: 0,
      mine: user?.id
        ? visibleConversations.filter((c) => c.assignedTo === user.id).length
        : 0,
      unassigned: visibleConversations.filter((c) => !c.assignedTo).length,
      customer: visibleConversations.filter((c) => c.type === "CUSTOMER")
        .length,
      team: visibleConversations.filter((c) => c.type === "INTERNAL").length,
    }),
    [visibleConversations, user?.id],
  );

  useEffect(() => {
    onViewCountsChange?.(viewCounts);
  }, [viewCounts, onViewCountsChange]);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>("list");

  const handleDetailsToggle = () => {
    const next = !isDetailsOpen;
    setIsAssignOpen(false);
    setIsDetailsOpen(next);
    setMobileView(next ? "panel" : "chat");
  };

  const handleAssignToggle = () => {
    const next = !isAssignOpen;
    setIsDetailsOpen(false);
    setIsAssignOpen(next);
    setMobileView(next ? "panel" : "chat");
  };

  if (isLoading) return <InboxSkeleton />;
  if (isError)
    return <p className="p-4 text-danger">Failed to load conversations.</p>;

  return (
    <section className="flex h-full min-h-0 flex-1 flex-col bg-primary-light/20">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-md">
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div
            className={cn(
              "h-full overflow-hidden border-r border-grey-light bg-white",
              "md:w-full md:max-w-[360px] md:flex-shrink-0 md:block",
              mobileView === "list" ? "flex-1 w-full" : "hidden md:block",
            )}
          >
            <ChatSidebar
              conversations={viewFilteredConversations}
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

          <div
            className={cn(
              "overflow-hidden flex flex-col",
              "md:min-w-0 md:flex-1",
              mobileView === "chat" ? "flex-1 w-full" : "hidden md:flex",
            )}
          >
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

export default InboxWorkspace;
