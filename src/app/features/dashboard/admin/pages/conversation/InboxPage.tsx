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

type TabId = "all" | Platform;

const InboxPage = () => {
  const [selected, setSelected] = useState<CustomerConversation | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [hiddenConversationIds, setHiddenConversationIds] = useState<string[]>(
    [],
  );

  const filteredConversations = useMemo(() => {
    const list =
      activeTab === "all"
        ? customerConversations
        : customerConversations.filter(
            (conversation) => conversation.platform === activeTab,
          );

    return [...list].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  }, [activeTab]);

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
    }
  }, [selected, visibleConversations]);

  const handleSelectConversation = (conversation: CustomerConversation) => {
    setSelected(conversation);
  };

  const handleHideConversation = (conversationId: string) => {
    setHiddenConversationIds((prev) =>
      prev.includes(conversationId) ? prev : [...prev, conversationId],
    );
  };

  const handleRestoreHiddenChats = () => {
    setHiddenConversationIds([]);
  };

  return (
    <section className="flex h-full min-h-0 flex-col p-4 bg-primary-light/20">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-grey-light">
        <div className="border-b border-grey-light bg-white px-4 py-3">
          <nav
            className="grid grid-cols-5 gap-2"
            aria-label="Conversation platform tabs"
          >
            {TABS.map((tab) => {
              const tabCount =
                tab.id === "all"
                  ? customerConversations.length
                  : customerConversations.filter(
                      (conversation) => conversation.platform === tab.id,
                    ).length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex min-w-0 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "border-primary bg-base-white text-primary shadow-sm"
                      : "border-transparent bg-transparent text-grey-medium hover:border-grey-light hover:bg-base-white hover:text-grey",
                  )}
                >
                  {tab.id !== "all" && (
                    <PlatformIcon platform={tab.id} size={16} />
                  )}
                  <span className="truncate">{tab.label}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      activeTab === tab.id
                        ? "bg-primary-light text-primary"
                        : "bg-grey-light text-grey-medium",
                    )}
                  >
                    {tabCount}
                  </span>
                </button>
              );
            })}
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
              onDetailsToggle={() => setIsDetailsOpen((prev) => !prev)}
              isDetailsOpen={isDetailsOpen}
            />
          </div>

          {selected && isDetailsOpen && (
            <div className="h-full w-full max-w-[360px] flex-shrink-0 overflow-hidden border-l border-grey-light bg-white">
              <CustomerDetailsDrawer
                conversation={selected}
                onClose={() => setIsDetailsOpen(false)}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InboxPage;
