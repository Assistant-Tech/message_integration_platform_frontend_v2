import { useEffect } from "react";
import { useChannelsStore } from "@/app/store/channels.store";

export const useChannels = () => {
  const pages = useChannelsStore((s) => s.pages);
  const isLoading = useChannelsStore((s) => s.isLoading);
  const refreshChannels = useChannelsStore((s) => s.refreshChannels);
  const startMetaOAuth = useChannelsStore((s) => s.startMetaOAuth);

  useEffect(() => {
    refreshChannels();
  }, []);

  return {
    pages,
    isLoading,
    refreshChannels,
    startMetaOAuth,
  };
};
