/*------------------------META API TYPES-------------------------*/
// Fetch stored pages API response
export interface GetStoredPagesApiResponse {
  message: string;
  platform: string;
}

// Connect META API PAGES request
export interface ConnectMetaPageRequest {
  platform: string;
  message: string;
}

export interface MetaPage {
  id: string;
  tenantId: string;
  name: string;
  channelType: string;
  externalId: string;
  linkedPageId: string | null;
  metadata: null;
  createdAt: string;
  updatedAt: string;
}

// Connect META API PAGES response
export interface ConnectMetaPageResponse {
  message: string;
  success: boolean;
  data: {
    pages: MetaPage[];
  };
  timestamp: string;
}

// Meta OAUTH API response
export interface MetaOauthApiResponse {
  message: string;
  platform: string;
}
