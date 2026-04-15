export const INBOX_LIST_PARAMS = { type: "INTERNAL" as const, page: 1, limit: 20 };

export const QUERY_KEYS = {
  CURRENT_USER: ["currentUser"] as const,
  TENANT_LIST: ["tenantList"] as const,
  USER_PERMISSIONS: ["userPermissions"] as const,
  // Authentication
  AUTH: ["auth"],
  USER: ["user"],
  // Inbox
  INBOX: (channelType: string, page: number, limit: number) => [
    "inbox",
    channelType,
    page,
    limit,
  ],
  INBOX_BY_ID: (id: string) => ["inboxById", id],
  // Messages
  MESSAGES: (inboxId: string, limit?: number) =>
    typeof limit === "number"
      ? (["messages", inboxId, limit] as const)
      : (["messages", inboxId] as const),

  // Analytics
  ANALYTICS_SUMMARY: (period: string) =>
    ["analytics", "summary", period] as const,
  ANALYTICS_MESSAGES: (
    period: string,
    channel?: string,
    groupBy?: string,
  ) => ["analytics", "messages", period, channel, groupBy] as const,
  ANALYTICS_CONVERSATIONS: (status?: string, limit?: number) =>
    ["analytics", "conversations", status, limit] as const,
  TEAM_MEMBERS: (params?: object) =>
    ["analytics", "team", "members", params] as const,
  TEAM_SUMMARY: ["analytics", "team", "summary"] as const,
  TEAM_ACTIVITIES: (params?: object) =>
    ["analytics", "team", "activities", params] as const,

  // Contacts
  CONTACTS: (params?: object) => ["contacts", params] as const,
  CONTACT_BY_ID: (id: string) => ["contacts", id] as const,
  CONTACT_CHANNEL_IDENTITIES: (id: string) =>
    ["contacts", id, "channel-identities"] as const,
};
