import { create } from "zustand";
import api from "@/app/services/api/axios";
import { fetchStoredPages } from "@/app/services/meta.services";
import { Page } from "@/app/types/channel.types";

type ChannelsState = {
  pages: Page[];
  isLoading: boolean;
  refreshChannels: () => Promise<void>;
  startMetaOAuth: () => Promise<void>;
};

export const useChannelsStore = create<ChannelsState>((set, get) => ({
  pages: [],
  isLoading: false,

  refreshChannels: async () => {
    set({ isLoading: true });
    try {
      const { data } = await fetchStoredPages();
      set({ pages: data.pages || [] });
    } catch (err) {
      console.error("Failed to fetch channels", err);
    } finally {
      set({ isLoading: false });
    }
  },

  startMetaOAuth: async () => {
    try {
      const { data } = await api.get("/meta/oauth");
      const oauthUrl = data?.data?.oauthUrl;
      if (!oauthUrl) return;

      const popup = window.open(oauthUrl, "_blank", "width=800,height=900");
      if (!popup) return;

      const timer = setInterval(() => {
        try {
          if (popup.closed) {
            clearInterval(timer);
            setTimeout(() => get().refreshChannels(), 10000);
          }
        } catch {
          // popup is on a cross-origin page (Facebook/api.chatblix.com) — keep polling
        }
      }, 500);
    } catch (err) {
      console.error("OAuth failed", err);
    }
  },
}));
