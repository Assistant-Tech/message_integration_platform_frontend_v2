import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { InternalConversation } from "@/app/types/internal-conversation.types";

interface InternalConversationState {
  conversations: InternalConversation[];
  selectedConversationId: string | null;

  setConversations: (conversations: InternalConversation[]) => void;
  addConversation: (conversation: InternalConversation) => void;
  updateConversation: (updated: InternalConversation) => void;
  updateAndMoveConversation: (updated: InternalConversation) => void;
  removeConversation: (conversationId: string) => void;
  setSelectedConversationId: (conversationId: string | null) => void;
  clearStore: () => void;
}

export const useInternalConversationStore = create<InternalConversationState>()(
  persist(
    (set) => ({
      conversations: [],
      selectedConversationId: null,

      setConversations: (conversations) => set({ conversations }),

      addConversation: (conversation) =>
        set((state) => ({
          conversations: [conversation, ...state.conversations],
        })),

      updateConversation: (updated) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c._id === updated._id ? { ...c, ...updated } : c,
          ),
        })),

      updateAndMoveConversation: (updated) =>
        set((state) => {
          const filteredConversations = state.conversations.filter(
            (c) => c._id !== updated._id,
          );
          return {
            conversations: [updated, ...filteredConversations],
          };
        }),

      removeConversation: (conversationId) =>
        set((state) => ({
          conversations: state.conversations.filter(
            (c) => c._id !== conversationId,
          ),
        })),

      setSelectedConversationId: (conversationId) =>
        set({ selectedConversationId: conversationId }),

      clearStore: () =>
        set({ conversations: [], selectedConversationId: null }),
    }),
    {
      name: "internal-conversation-store",
    },
  ),
);
