import { Page, IntegrationRecord } from "@/app/types/channel.types";
import { PROVIDER_ALIASES } from "./channels.config";

export const normalize = (value: unknown): string =>
  String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

export const extractCandidateStrings = (item: IntegrationRecord): string[] => {
  const nestedProvider =
    (item.integration as IntegrationRecord | undefined)?.provider ??
    (item.metadata as IntegrationRecord | undefined)?.provider;

  return [
    item.provider,
    item.platform,
    item.channel,
    item.name,
    item.id,
    item.type,
    nestedProvider,
  ]
    .filter(Boolean)
    .map(normalize);
};

export const hasPageSignal = (item: IntegrationRecord): boolean => {
  if (Array.isArray(item.pages) && item.pages.length > 0) return true;

  const keys = [
    "pageId",
    "page_id",
    "pageName",
    "phoneNumberId",
    "businessAccountId",
  ];

  return keys.some(
    (key) =>
      item[key] !== undefined &&
      item[key] !== null &&
      String(item[key]).trim() !== "",
  );
};

export const hasProviderPage = (
  provider: string,
  integrations: IntegrationRecord[],
): boolean => {
  const aliases = PROVIDER_ALIASES[provider] ?? [provider];

  return integrations.some((integration) => {
    const candidates = extractCandidateStrings(integration);

    const matches = candidates.some((c) => aliases.some((a) => c.includes(a)));

    return matches && hasPageSignal(integration);
  });
};

export const groupPagesByProvider = (pages: Page[]) => {
  return pages.reduce(
    (acc, page) => {
      const key = page.channelType.toLowerCase();

      if (!acc[key]) acc[key] = [];
      acc[key].push(page);

      return acc;
    },
    {} as Record<string, Page[]>,
  );
};
