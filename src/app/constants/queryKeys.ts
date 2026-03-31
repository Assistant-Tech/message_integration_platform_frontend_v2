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
  MESSAGES: (inboxId: string) => ["messages", inboxId],
};
