import { useEffect, useMemo, useState } from "react";
import PlatformIcon from "@/app/components/common/Conversation/customer/PlatformIcons";
import { cn } from "@/app/utils/cn";
import { TABS } from "@/app/utils/helper";
import {
  customerConversations,
  type CustomerConversation,
  type Platform,
} from "@/app/features/dashboard/admin/pages/conversation/mockData/customerConversationMockData";
import CustomerChatSidebar from "@/app/components/common/Conversation/customer/CustomerChatSidebar";
import CustomerChatPanel from "@/app/components/common/Conversation/customer/CustomerChatPanel";
import CustomerDetailsDrawer from "@/app/components/common/Conversation/customer/customer-chat-panel/CustomerDetailsDrawer";
import CustomerAssignDrawer from "@/app/components/common/Conversation/customer/customer-chat-panel/CustomerAssignDrawer";

type TabId = "all" | Platform;

const InboxPage = () => {
  const assigneeOptions = useMemo(
    () => [
      { id: "admin-1", label: "Admin - Sarah Khan", role: "Admin" as const },
      { id: "agent-1", label: "Member - John Doe", role: "Member" as const },
      {
        id: "agent-2",
        label: "Member - Priya Sharma",
        role: "Member" as const,
      },
    ],
    [],
  );

  const [selected, setSelected] = useState<CustomerConversation | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [hiddenConversationIds, setHiddenConversationIds] = useState<string[]>(
    [],
  );
  const [assignmentById, setAssignmentById] = useState<
    Record<string, string | undefined>
  >({});

  const conversations = useMemo<CustomerConversation[]>(
    () =>
      customerConversations.map((conversation): CustomerConversation => {
        const assignedTo = assignmentById[conversation._id];
        if (assignedTo === undefined) return conversation;

        return {
          ...conversation,
          assignedTo,
          status: assignedTo ? "assigned" : "unassigned",
        };
      }),
    [assignmentById],
  );

  const filteredConversations = useMemo(() => {
    const list =
      activeTab === "all"
        ? conversations
        : conversations.filter(
            (conversation) => conversation.platform === activeTab,
          );

    return [...list].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  }, [activeTab, conversations]);

  const visibleConversations = useMemo(
    () =>
      filteredConversations.filter(
        (conversation) => !hiddenConversationIds.includes(conversation._id),
      ),
    [filteredConversations, hiddenConversationIds],
  );

  useEffect(() => {
    if (!selected) return;

    const stillVisible = visibleConversations.some(
      (conversation) => conversation._id === selected._id,
    );

    if (!stillVisible) {
      setSelected(visibleConversations[0] ?? null);
      setIsDetailsOpen(false);
      setIsAssignOpen(false);
    }
  }, [selected, visibleConversations]);

  const handleSelectConversation = (conversation: CustomerConversation) => {
    setSelected(conversation);
  };

  const handleAssignConversation = (assigneeId: string | undefined) => {
    if (!selected) return;

    setAssignmentById((prev) => ({ ...prev, [selected._id]: assigneeId }));
    setSelected((prev) =>
      prev
        ? {
            ...prev,
            assignedTo: assigneeId,
            status: assigneeId ? "assigned" : "unassigned",
          }
        : prev,
    );
  };

  const handleHideConversation = (conversationId: string) => {
    setHiddenConversationIds((prev) =>
      prev.includes(conversationId) ? prev : [...prev, conversationId],
    );
  };

  const handleRestoreHiddenChats = () => {
    setHiddenConversationIds([]);
  };

  const assignedMemberName = useMemo(() => {
    if (!selected?.assignedTo) return undefined;

    const option = assigneeOptions.find(
      (item) => item.id === selected.assignedTo,
    );
    if (!option) return selected.assignedTo;

    const [, displayName] = option.label.split(" - ");
    return displayName || option.label;
  }, [assigneeOptions, selected?.assignedTo]);

  return (
    <section className="flex h-full min-h-0 flex-col p-4 bg-primary-light/20">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-grey-light">
        <div className="border-b border-grey-light bg-white px-4 py-3">
          <nav className="w-full" aria-label="Conversation platform tabs">
            <ul className="grid w-full grid-cols-5 items-center gap-2">
              {TABS.map((tab) => {
                const tabCount =
                  tab.id === "all"
                    ? customerConversations.length
                    : conversations.filter(
                        (conversation) => conversation.platform === tab.id,
                      ).length;

                return (
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
                        <PlatformIcon platform={tab.id} size={24} />
                      )}
                      <span>{tab.label}</span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors duration-200",
                          activeTab === tab.id
                            ? "bg-primary-light text-primary"
                            : "bg-grey-light text-grey-medium group-hover:bg-grey-light/80",
                        )}
                      >
                        {tabCount}
                      </span>
                    </button>

                    <span
                      className={cn(
                        "pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-center rounded-full bg-primary transition-transform duration-300 ease-out",
                        activeTab === tab.id
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className="h-full w-full max-w-[360px] flex-shrink-0 overflow-hidden border-r border-grey-light bg-white">
            <CustomerChatSidebar
              conversations={visibleConversations}
              activeTab={activeTab}
              selectedId={selected?._id ?? null}
              onSelect={handleSelectConversation}
              onHideConversation={handleHideConversation}
              onRestoreHiddenChats={handleRestoreHiddenChats}
              hiddenCount={hiddenConversationIds.length}
            />
          </div>

          <div className="min-w-0 flex-1 overflow-hidden bg-base-white">
            <CustomerChatPanel
              conversation={selected}
              onDetailsToggle={() => {
                setIsAssignOpen(false);
                setIsDetailsOpen((prev) => !prev);
              }}
              isDetailsOpen={isDetailsOpen}
              onAssignToggle={() => {
                setIsDetailsOpen(false);
                setIsAssignOpen((prev) => !prev);
              }}
              isAssignOpen={isAssignOpen}
              assignedMemberName={assignedMemberName}
            />
          </div>

          {selected && isDetailsOpen && (
            <div className="h-full w-full max-w-[360px] flex-shrink-0 overflow-hidden border-l border-grey-light bg-white">
              <CustomerDetailsDrawer
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
              <CustomerAssignDrawer
                contactName={selected.contactName}
                assignedTo={selected.assignedTo}
                options={assigneeOptions}
                onAssign={handleAssignConversation}
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
