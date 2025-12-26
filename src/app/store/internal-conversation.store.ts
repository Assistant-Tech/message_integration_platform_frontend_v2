import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { InternalConversation } from "@/app/types/internal-conversation.types";

interface InternalConversationState {
  conversations: InternalConversation[];
  selectedConversationId: string | null;
  lastUpdate: number;

  setConversations: (conversations: InternalConversation[]) => void;
  addConversation: (conversation: InternalConversation) => void;
  updateConversation: (updated: InternalConversation) => void;
  updateAndMoveConversation: (updated: InternalConversation) => void;
  removeConversation: (conversationId: string) => void;
  setSelectedConversationId: (conversationId: string | null) => void;
  clearStore: () => void;
  getConversationById: (
    conversationId: string,
  ) => InternalConversation | undefined;
}

export const useInternalConversationStore = create<InternalConversationState>()(
  persist(
    (set, get) => ({
      conversations: [],
      selectedConversationId: null,
      lastUpdate: Date.now(),

      setConversations: (conversations) =>
        set({
          conversations: Array.isArray(conversations) ? conversations : [],
          lastUpdate: Date.now(),
        }),

      addConversation: (conversation) =>
        set(() => ({
          conversations: [conversation],
          lastUpdate: Date.now(),
        })),

      updateConversation: (updated) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c._id === updated._id ? { ...c, ...updated } : c,
          ),
          lastUpdate: Date.now(),
        })),

      updateAndMoveConversation: (updated) =>
        set((state) => {
          const filteredConversations = state.conversations.filter(
            (c) => c._id !== updated._id,
          );
          return {
            conversations: [updated, ...filteredConversations],
            lastUpdate: Date.now(),
          };
        }),

      removeConversation: (conversationId) =>
        set((state) => ({
          conversations: state.conversations.filter(
            (c) => c._id !== conversationId,
          ),
          lastUpdate: Date.now(),
          selectedConversationId:
            state.selectedConversationId === conversationId
              ? null
              : state.selectedConversationId,
        })),

      setSelectedConversationId: (conversationId) =>
        set({ selectedConversationId: conversationId }),

      clearStore: () =>
        set({
          conversations: [],
          selectedConversationId: null,
          lastUpdate: Date.now(),
        }),

      getConversationById: (conversationId) => {
        return get().conversations.find((c) => c._id === conversationId);
      },
    }),
    {
      name: "internal-conversation-store",
      partialize: (state) => ({
        conversations: state.conversations,
        selectedConversationId: state.selectedConversationId,
      }),
      migrate: (persistedState: any) => {
        if (persistedState && !Array.isArray(persistedState.conversations)) {
          persistedState.conversations = [];
        }
        return persistedState as InternalConversationState;
      },
      version: 1,
    },
  ),
);
