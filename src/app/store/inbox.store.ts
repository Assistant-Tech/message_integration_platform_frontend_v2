import { create } from "zustand";
import { TabId } from "@/app/types/inbox.types";

type InboxUIState = {
  selectedId: string | null;
  activeTab: TabId;
  hiddenIds: string[];
  assignmentById: Record<string, string | undefined>;
  // actions
  setSelected: (id: string | null) => void;
  setActiveTab: (tab: TabId) => void;
  hideConversation: (id: string) => void;
  restoreHidden: () => void;
  assignToMember: (id: string, userId?: string) => void;
};

export const useInboxStore = create<InboxUIState>((set) => ({
  selectedId: null,
  activeTab: "all",
  hiddenIds: [],
  assignmentById: {},
  setSelected: (id) => set({ selectedId: id }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  hideConversation: (id) =>
    set((state) => ({
      hiddenIds: state.hiddenIds.includes(id)
        ? state.hiddenIds
        : [...state.hiddenIds, id],
    })),
  restoreHidden: () => set({ hiddenIds: [] }),
  assignToMember: (id, userId) =>
    set((state) => ({
      assignmentById: { ...state.assignmentById, [id]: userId },
    })),
}));
