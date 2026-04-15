import { useMemo, useCallback, useEffect } from "react";
import { useInboxFetchAllQuery } from "@/app/hooks/query/useInboxQuery";
import { updateConversation } from "@/app/services/inbox.services";
import {
  ASSIGNEE_OPTIONS,
  getDisplayName,
} from "@/app/utils/inbox/inbox.config";
import { useInboxStore } from "@/app/store/inbox.store";
import { INBOX_LIST_PARAMS } from "@/app/constants/queryKeys";
import type { Inbox } from "@/app/types/inbox.types";

export const useInboxPage = () => {
  const {
    selectedId,
    activeTab,
    hiddenIds,
    setSelected,
    setActiveTab,
    hideConversation,
    restoreHidden,
    assignToMember,
  } = useInboxStore();

  const { data, isLoading, isError } = useInboxFetchAllQuery(INBOX_LIST_PARAMS.type, INBOX_LIST_PARAMS.page, INBOX_LIST_PARAMS.limit);
  const conversations: Inbox[] = data?.data ?? [];

  const filteredConversations = useMemo(() => {
    const list =
      activeTab === "all"
        ? conversations
        : conversations.filter((c) => c.channel === activeTab); // platform → channel

    return [...list].sort(
      (a, b) =>
        new Date(b.lastMessageAt).getTime() -
        new Date(a.lastMessageAt).getTime(), // timestamp → lastMessageAt
    );
  }, [activeTab, conversations]);

  const visibleConversations = useMemo(
    () => filteredConversations.filter((c) => !hiddenIds.includes(c.id)), // _id → id
    [filteredConversations, hiddenIds],
  );

  const selected = useMemo(
    () => visibleConversations.find((c) => c.id === selectedId) ?? null, // _id → id
    [visibleConversations, selectedId],
  );

  // Auto-select first when selected is no longer visible
  useEffect(() => {
    if (selectedId && !selected) {
      setSelected(visibleConversations[0]?.id ?? null); // _id → id
    }
  }, [selected, selectedId, visibleConversations, setSelected]);

  // Tab counts — keyed by ChannelType + "all"
  const tabCounts = useMemo(
    () =>
      conversations.reduce<Record<string, number>>((acc, c) => {
        acc["all"] = (acc["all"] ?? 0) + 1;
        acc[c.channel] = (acc[c.channel] ?? 0) + 1; // platform → channel
        return acc;
      }, {}),
    [conversations],
  );

  const handleAssign = useCallback(
    async (assigneeId: string | undefined) => {
      if (!selectedId) return;
      assignToMember(selectedId, assigneeId);
      try {
        await updateConversation(selectedId, {
          assignedTo: assigneeId ?? null,
          // status removed — UpdateConversationBody doesn't have it
        });
      } catch {
        assignToMember(selectedId, undefined);
      }
    },
    [selectedId, assignToMember],
  );

  const assignedMemberName = useMemo(
    () =>
      selected?.assignedTo ? getDisplayName(selected.assignedTo) : undefined,
    [selected?.assignedTo],
  );

  return {
    conversations,
    visibleConversations,
    selected,
    tabCounts,
    assigneeOptions: ASSIGNEE_OPTIONS,
    assignedMemberName,
    activeTab,
    hiddenCount: hiddenIds.length,
    isLoading,
    isError,
    setSelected,
    setActiveTab,
    hideConversation,
    restoreHidden,
    handleAssign,
  };
};
