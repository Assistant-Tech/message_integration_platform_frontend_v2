import {
  ApiMessage,
  ChannelType,
  CreateInboxBody,
  InboxDetailResponse,
  InboxListResponse,
  InboxMessage,
  MessageListResponse,
  UpdateConversationBody,
} from "@/app/types/inbox.types";
import { handleApiError } from "@/app/utils/handlerApiError";
import api from "@/app/services/api/axios";

/*
 * GET All Inboxes
 */
export const fetchInboxes = async (): Promise<InboxListResponse> => {
  try {
    const res = await api.get<InboxListResponse>(
      "/inbox?type=INTERNAL&isGroup=true&page=1&limit=20",
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/*
 * GET Inbox by ID
 */
export const fetchInboxById = async (
  id: string,
): Promise<InboxDetailResponse> => {
  try {
    const res = await api.get<InboxDetailResponse>(`/api/inbox/${id}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/*
 * POST Create a new Inbox
 */
export const createInbox = async (CreateInboxForm: CreateInboxBody) => {
  try {
    const res = await api.post("/api/inbox", CreateInboxForm);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/*
 * Update a conversation by various sections like title, priority and assignTo()
 */
export const updateConversation = async (
  id: string,
  updateConversationForm: UpdateConversationBody,
) => {
  try {
    const res = await api.patch(`/api/inbox/${id}`, updateConversationForm);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/*
 * Delete a new Inbox
 */
export const deleteInbox = async (id: string) => {
  try {
    const res = await api.delete(`/api/inbox/${id}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/*
 * Fetch Inbox Message
 */
export const fetchInboxMessages = async (
  inboxId: string,
  limit = 50,
): Promise<MessageListResponse> => {
  try {
    const res = await api.get<MessageListResponse>(
      `/api/inbox/${inboxId}/messages`,
      { params: { limit } },
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/*
 * Adapt ApiMessage to InboxMessage
 */
export const adaptApiMessage = (msg: ApiMessage): InboxMessage => ({
  id: msg.id,
  sender:
    msg.senderType === "AGENT"
      ? "agent"
      : msg.senderType === "CONTACT"
        ? "customer"
        : "system",
  senderName: msg.sender.name,
  senderId: msg.sentBy,
  content: msg.content,
  timestamp: msg.sentAt,
  type: msg.type,
  status: msg.status,
  attachments: msg.attachments,
  replyTo: null,
});
