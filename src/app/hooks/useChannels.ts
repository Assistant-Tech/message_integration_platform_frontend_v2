import { useState, useEffect, useCallback } from "react";
import api from "@/app/services/api/axios";
import {
  connectMetaApiPage,
  fetchStoredPages,
} from "@/app/services/meta.services";
import { IntegrationRecord, Page } from "@/app/types/channel.types";

export const useChannels = () => {
  const [integrations, setIntegrations] = useState<IntegrationRecord[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshChannels = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchStoredPages();

      const fetchedPages = response.data?.pages || [];
      setPages(fetchedPages);

      setIntegrations([]);
    } catch (err) {
      console.error("Failed to fetch channels", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshChannels();
  }, [refreshChannels]);

  // Connect Facebook function
  const handleConnectFacebook = useCallback(async () => {
    try {
      const { data } = await api.get("/meta/oauth");
      const oauthUrl = data?.data?.oauthUrl;

      if (oauthUrl) {
        const width = 600;
        const height = 750;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        const popup = window.open(
          oauthUrl,
          "Facebook Login",
          `width=${width},height=${height},left=${left},top=${top}`,
        );

        const handleMessage = async (event: MessageEvent) => {
          if (event.origin !== window.location.origin) return;

          if (event.data?.type === "OAUTH_SUCCESS") {
            const { token } = event.data.payload;

            if (popup) popup.close();
            window.removeEventListener("message", handleMessage);

            try {
              setIsLoading(true);
              const res = await connectMetaApiPage(token);

              if (res.success) {
                await refreshChannels();
              }
            } catch (err) {
              console.error("Connection failed", err);
            } finally {
              setIsLoading(false);
            }
          }
        };

        window.addEventListener("message", handleMessage);
      }
    } catch (err) {
      console.error("OAuth init failed", err);
    }
  }, [refreshChannels]);

  return {
    integrations,
    pages,
    isLoading,
    handleConnectFacebook,
    refreshChannels,
  };
};
