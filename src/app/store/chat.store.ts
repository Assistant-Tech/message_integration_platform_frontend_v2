import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  name: string;
  members: string[];
}

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: Record<string, Message[]>; 
  connected: boolean;

  // actions
  setConversations: (list: Conversation[]) => void;
  setActiveConversation: (id: string) => void;
  addMessage: (conversationId: string, msg: Message) => void;
  setConnected: (status: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeConversationId: null,
      messages: {},
      connected: false,

      setConversations: (list) => set({ conversations: list }),
      setActiveConversation: (id) => set({ activeConversationId: id }),
      addMessage: (conversationId, msg) => {
        const prev = get().messages[conversationId] || [];
        set({
          messages: {
            ...get().messages,
            [conversationId]: [...prev, msg],
          },
        });
      },
      setConnected: (status) => set({ connected: status }),
      clearMessages: () => set({ messages: {} }),
    }),
    {
      name: "chat-storage", // key in localStorage
      partialize: (state) => ({
        messages: state.messages,
        conversations: state.conversations,
      }),
    }
  )
);
