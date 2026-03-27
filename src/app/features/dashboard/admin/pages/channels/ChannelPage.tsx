import { useMemo } from "react";
import {
  allIntegrations,
  SUPPORTED_PROVIDERS,
} from "@/app/utils/channels/channels.config";
import { Page, ProviderCard } from "@/app/types/channel.types";
import ChannelCard from "@/app/components/ui/ChannelCard";
import { Container } from "@/app/components/layout";
import { useChannels } from "@/app/hooks/useChannels";
import { groupPagesByProvider } from "@/app/utils/channels/channel.helpers";
import { APP_ROUTES } from "@/app/constants/routes";
import { useNavigate, useParams } from "react-router-dom";
import SkeletonCard from "@/app/components/ui/SkeletonCard";

const ChannelPage = () => {
  const { pages, isLoading, handleConnectFacebook } = useChannels();
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
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
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
                    handleConnectFacebook();
                  }
                }}
              />
            ))}
      </div>
    </Container>
  );
};

export default ChannelPage;
