import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { Pencil, Trash2 } from "lucide-react";
import api from "@/app/services/api/axios";
import {
  allIntegrations,
  type Integration,
} from "@/app/utils/integration/integration.config";
import { Button } from "@/app/components/ui";
import {
  getActiveCardClass,
  getActiveContentClass,
  getActiveMutedClass,
} from "@/app/utils/helper";

interface AddedPage {
  id: string;
  provider: string;
  pageName: string;
  pageId: string;
  description: string;
}

const ChannelPage = () => {
  const handlePlatformOauth = async (platform: string) => {
    console.log(platform);
    if (platform === "facebook") {
      const url = await api.get("/meta/oauth");
      window.location.href = url.data.data.oauthUrl;
    }
  };
  const [addedPages, setAddedPages] = useState<AddedPage[]>([]);
  const [disconnectedProviders, setDisconnectedProviders] = useState<string[]>(
    [],
  );
  const [tenantIntegrations, setTenantIntegrations] = useState<
    IntegrationRecord[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [providerToDelete, setProviderToDelete] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchIntegrations = async () => {
      try {
        const response = await api.get("/tenant/integrations");
        const data = response?.data?.data;

        if (!isMounted) {
          return;
        }

        if (Array.isArray(data)) {
          setTenantIntegrations(data as IntegrationRecord[]);
        } else {
          setTenantIntegrations([]);
        }
      } catch {
        if (isMounted) {
          setTenantIntegrations([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchIntegrations();

    return () => {
      isMounted = false;
    };
  }, []);

  const communicationCards = useMemo<Integration[]>(() => {
    const communicationIntegrations = allIntegrations.communication ?? [];

    return communicationIntegrations.filter(
      (integration) =>
        supportedProviders.includes(integration.id) &&
        hasProviderPage(integration.id, tenantIntegrations),
    );
  }, [tenantIntegrations]);

  const connectedProviderIds = useMemo(() => {
    const autoConnected = new Set(communicationCards.map((card) => card.id));
    for (const page of addedPages) {
      autoConnected.add(page.provider);
    }
    for (const provider of disconnectedProviders) {
      autoConnected.delete(provider);
    }
    return autoConnected;
  }, [communicationCards, addedPages, disconnectedProviders]);

  const providerCards = useMemo(() => {
    const communicationIntegrations = allIntegrations.communication ?? [];

    return supportedProviders
      .map((providerId) => {
        const integration = communicationIntegrations.find(
          (item) => item.id === providerId,
        );
        if (!integration) {
          return null;
        }

        const manualPage = addedPages
          .slice()
          .reverse()
          .find((page) => page.provider === providerId);
        const isConnected = connectedProviderIds.has(providerId);

        return {
          ...integration,
          isConnected,
          details: manualPage
            ? {
                pageName: manualPage.pageName,
                pageId: manualPage.pageId,
                description: manualPage.description,
              }
            : null,
        };
      })
      .filter((card): card is NonNullable<typeof card> => Boolean(card));
  }, [addedPages, connectedProviderIds]);

  return (
    <motion.section
      className="flex flex-col h-full px-2 py-4 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-full px-6 py-2">
        <div className="mb-6 rounded-xl border border-grey-light bg-primary-light pt-4 px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="body-bold-16 pb-4 text-grey">
                Connected communication pages
              </h3>
              <p className="mt-1 text-sm text-grey-medium">
                Only channels with active pages are shown below for WhatsApp,
                Facebook, Instagram, and TikTok.
              </p>
            </div>
            <div className="rounded-lg bg-base-white px-3 py-2 mt-2 text-sm font-semibold text-primary whitespace-nowrap">
              {connectedProviderIds.size} connected
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="mb-4 rounded-xl border border-grey-light bg-base-white p-4 text-sm text-grey-medium">
            Checking connected pages...
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providerCards.map((card) => (
            <div
              key={card.id}
              className={`group h-full rounded-xl border p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                card.isConnected
                  ? getActiveCardClass(card.id)
                  : "bg-base-white border-grey-light"
              }`}
            >
              {/* Top Section */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 ${card.logoBackgroundColor} rounded-xl flex items-center justify-center p-2 shadow-sm`}
                  >
                    <div
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{ __html: card.logoSvg }}
                    />
                  </div>

                  <div>
                    <h3
                      className={`label-semi-bold-14 ${
                        card.isConnected
                          ? getActiveContentClass(card.id)
                          : "text-grey"
                      }`}
                    >
                      {card.name}
                    </h3>
                    <p
                      className={`text-xs ${
                        card.isConnected
                          ? getActiveMutedClass(card.id)
                          : "text-grey-medium"
                      }`}
                    >
                      {card.id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    label=""
                    // onClick={() => openEditDialog(card.id)}
                    disabled={!card.isConnected}
                    IconLeft={<Pencil size={14} />}
                    variant="none"
                    className="h-8 w-8 min-h-0 rounded-full border border-grey-light bg-base-white/90 ps-2 text-grey-medium enabled:hover:bg-base-white disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label={`Edit ${card.name}`}
                    title="Edit"
                  />
                  <Button
                    label=""
                    onClick={() => setProviderToDelete(card.id)}
                    disabled={!card.isConnected}
                    IconLeft={<Trash2 size={14} />}
                    variant="none"
                    className="h-8 w-8 min-h-0 rounded-full border border-danger-light bg-base-white/90 ps-2 text-danger enabled:hover:bg-danger-light/40 disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label={`Delete ${card.name}`}
                    title="Delete"
                  />
                </div>
              </div>

              <div className="mb-4">
                <span
                  className={`rounded-full px-2.5 py-1 label-regular-14 ${
                    card.isConnected
                      ? card.id === "tiktok"
                        ? "bg-base-white/20 text-base-white"
                        : "bg-success-light text-success-dark"
                      : "bg-grey-light text-grey-medium"
                  }`}
                >
                  {card.isConnected ? "Connected" : "Not connected"}
                </span>
              </div>

              {/* Description (flex grow keeps cards equal height) */}
              <p
                className={`body-regular-16 mb-4 flex-1 ${
                  card.isConnected ? getActiveMutedClass(card.id) : "text-grey"
                }`}
              >
                {card.isConnected
                  ? card.details?.description ||
                    `${card.description} Page connected and ready to use.`
                  : `${card.description} Connect this page to start showcasing conversations.`}
              </p>

              {/* Bottom Section */}
              {card.isConnected ? (
                <div className="space-y-3 mt-auto">
                  <div
                    className={`rounded-lg px-3 py-2 text-xs ${
                      card.id === "tiktok"
                        ? "border border-grey-medium bg-base-black/30 text-grey-light"
                        : "border border-base-white/70 bg-base-white/70 text-grey"
                    }`}
                  >
                    <p>
                      <span className="font-semibold">Page:</span>{" "}
                      {card.details?.pageName || "Connected page"}
                    </p>
                    <p>
                      <span className="font-semibold">Page ID:</span>{" "}
                      {card.details?.pageId || "Fetched from profile"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-auto">
                  <Button
                    label="Connect"
                    onClick={() => handlePlatformOauth(card.id)}
                    variant="primary"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <Dialog.Root
          open={Boolean(providerToDelete)}
          onOpenChange={(open) => {
            if (!open) {
              setProviderToDelete(null);
            }
          }}
        >
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-base-black/40" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(480px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-base-white p-6 shadow-2xl">
              <Dialog.Title className="text-lg font-semibold text-grey">
                Delete connected page?
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm text-grey-medium">
                This will remove the page from this card. You can reconnect it
                later by using the Connect button.
              </Dialog.Description>

              <div className="mt-6 flex justify-end gap-3">
                <Dialog.Close asChild>
                  <Button label="Cancel" variant="outlined" />
                </Dialog.Close>
                <Button
                  label="Delete"
                  variant="danger"
                  // onClick={confirmDeleteProvider}
                />
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </motion.section>
  );
};

export default ChannelPage;

type IntegrationRecord = Record<string, unknown>;

const supportedProviders = ["whatsapp", "facebook", "instagram", "tiktok"];

const providerAliases: Record<string, string[]> = {
  whatsapp: ["whatsapp", "whatsappbusiness", "wa"],
  facebook: ["facebook", "fb", "meta"],
  instagram: ["instagram", "ig"],
  tiktok: ["tiktok", "tt"],
};

const normalize = (value: unknown): string =>
  String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

const extractCandidateStrings = (item: IntegrationRecord): string[] => {
  const directFields = [
    item.provider,
    item.platform,
    item.channel,
    item.name,
    item.id,
    item.type,
  ];

  const nestedProvider =
    (item.integration as IntegrationRecord | undefined)?.provider ??
    (item.metadata as IntegrationRecord | undefined)?.provider;

  return [...directFields, nestedProvider]
    .filter(Boolean)
    .map((entry) => normalize(entry));
};

const hasPageSignal = (item: IntegrationRecord): boolean => {
  const pages = item.pages;
  if (Array.isArray(pages) && pages.length > 0) {
    return true;
  }

  const pageKeys = [
    "pageId",
    "page_id",
    "pageName",
    "page_name",
    "phoneNumberId",
    "phone_number_id",
    "businessAccountId",
    "business_account_id",
  ];

  return pageKeys.some((key) => {
    const value = item[key];
    return value !== undefined && value !== null && String(value).trim() !== "";
  });
};

const hasProviderPage = (
  provider: string,
  integrations: IntegrationRecord[],
): boolean => {
  const aliases = providerAliases[provider] ?? [provider];

  const matched = integrations.filter((integration) => {
    const candidates = extractCandidateStrings(integration);

    return candidates.some((candidate) =>
      aliases.some((alias) => candidate.includes(alias)),
    );
  });

  if (matched.length === 0) {
    return false;
  }

  // Fallback to provider presence because different backends expose page fields differently.
  return matched.some(hasPageSignal) || matched.length > 0;
};
