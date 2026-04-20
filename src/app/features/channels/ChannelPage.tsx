import { useMemo } from "react";
import {
  allIntegrations,
  SUPPORTED_PROVIDERS,
} from "@/app/utils/channels/channels.config";
import { Page, ProviderCard } from "@/app/types/channel.types";
import ChannelCard from "@/app/components/ui/ChannelCard";
import { useChannels } from "@/app/hooks/useChannels";
import { groupPagesByProvider } from "@/app/utils/channels/channel.helpers";
import { APP_ROUTES } from "@/app/constants/routes";
import { useNavigate, useParams } from "react-router-dom";
import SkeletonCard from "@/app/components/ui/SkeletonCard";
import PageShell from "@/app/components/layout/PageShell";
import PageHeader from "@/app/components/layout/PageHeader";

const ChannelPage = () => {
  const { pages, isLoading, startMetaOAuth, startTikTokOAuth } = useChannels();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const groupedPages = useMemo(() => {
    return groupPagesByProvider(pages);
  }, [pages]);

  const providerCards = useMemo(() => {
    const comms = allIntegrations.communication ?? [];
    const integrationMap = new Map(comms.map((i) => [i.id, i]));

    return SUPPORTED_PROVIDERS.map((providerId) => {
      const base = integrationMap.get(providerId);
      if (!base) return null;

      const pages = groupedPages[providerId] || [];
      const isConnected = pages.length > 0;

      return {
        ...base,
        isConnected,
        pages,
      };
    }).filter(Boolean) as (ProviderCard & { pages: Page[] })[];
  }, [groupedPages]);

  return (
    <PageShell>
      <PageHeader
        title="Channels"
        description="Connect the platforms your customers message you on."
      />
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : providerCards.map((card) => (
              <ChannelCard
                key={card.id}
                card={card}
                onConnect={() => {
                  if (card.isConnected) {
                    if (!slug) return;
                    navigate(
                      `/app/${slug}/admin/${APP_ROUTES.ADMIN.CHANNEL_SETTINGS.replace(":providerId", card.id)}`,
                    );
                    return;
                  }

                  if (card.id === "facebook") {
                    startMetaOAuth();
                  } else if (card.id === "tiktok") {
                    startTikTokOAuth();
                  }
                }}
              />
            ))}
      </div>
    </PageShell>
  );
};

export default ChannelPage;
