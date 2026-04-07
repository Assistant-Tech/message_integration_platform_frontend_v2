export interface ChannelData {
  _id: string;
  title: string;
  channelType: "INTERNAL" | "EXTERNAL" | "CUSTOMER";
  channel: "FACEBOOK" | "WHATSAPP" | "TIKTOK" | "INSTAGRAM";
  isDefault: boolean;
  priority: string;
  participants: string[];
  unreadCount?: number;
  isPrivate?: boolean;
}

/*--------------------- TYPES FOR API & API SERVICES  */
export interface ChannelApiResponse {
  platform: string;
}

/* -------------------- TYPES FOR CONSTANTS -------------------- */

export type Page = {
  id: string;
  name: string;
  channelType: "INTERNAL" | "EXTERNAL" | "CUSTOMER";
  externalId: string;
  linkedPageId?: string | null;
};

export type UseChannelsReturn = {
  integrations: IntegrationRecord[];
  pages: Page[];
  isLoading: boolean;
  startMetaOAuth: () => void;
  linkMetaPages: (token: string) => Promise<unknown>;
};

export interface Integration {
  id: string;
  name: string;
  description: string;
  logoSvg: string;
  logoBackgroundColor: string;
  defaultEnabled: boolean;
  badge?: {
    label: "Most Popular" | "Popular" | "Beta";
    tone: "Most Popular" | "popular" | "beta";
  };
  cardGradient?: string;
}

export type IntegrationRecord = Record<string, unknown>;

export interface ProviderCard extends Integration {
  isConnected: boolean;
  details: Page | null;
}
