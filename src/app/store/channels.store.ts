import { create } from "zustand";
import api from "@/app/services/api/axios";
import { fetchStoredPages } from "@/app/services/meta.services";
import { fetchTikTokChannels } from "@/app/services/tiktok.services";
import { Page } from "@/app/types/channel.types";

type ChannelsState = {
  pages: Page[];
  isLoading: boolean;
  refreshChannels: () => Promise<void>;
  startMetaOAuth: () => Promise<void>;
  startTikTokOAuth: () => Promise<void>;
};

const openOAuthPopup = (
  oauthUrl: string,
  onClose: () => void,
): Window | null => {
  const popup = window.open(oauthUrl, "_blank", "width=800,height=900");
  if (!popup) return null;

  const timer = setInterval(() => {
    try {
      if (popup.closed) {
        clearInterval(timer);
        onClose();
      }
    } catch {
      // popup is on a cross-origin page — keep polling
    }
  }, 500);

  return popup;
};

export const useChannelsStore = create<ChannelsState>((set, get) => ({
  pages: [],
  isLoading: false,

  refreshChannels: async () => {
    set({ isLoading: true });
    try {
      const [metaRes, tiktokRes] = await Promise.allSettled([
        fetchStoredPages(),
        fetchTikTokChannels(),
      ]);

      const metaPages =
        metaRes.status === "fulfilled" ? metaRes.value?.data?.pages || [] : [];
      const tiktokChannels =
        tiktokRes.status === "fulfilled"
          ? tiktokRes.value?.data?.channels || []
          : [];

      set({ pages: [...metaPages, ...tiktokChannels] });
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

      openOAuthPopup(oauthUrl, () => {
        setTimeout(() => get().refreshChannels(), 10000);
      });
    } catch (err) {
      console.error("Meta OAuth failed", err);
    }
  },

  startTikTokOAuth: async () => {
    try {
      const { data } = await api.get("/tiktok/oauth");
      const oauthUrl = data?.data?.oauthUrl;
      if (!oauthUrl) return;

      openOAuthPopup(oauthUrl, () => {
        setTimeout(() => get().refreshChannels(), 5000);
      });
    } catch (err) {
      console.error("TikTok OAuth failed", err);
    }
  },
}));
