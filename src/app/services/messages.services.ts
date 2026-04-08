import { handleApiError } from "@/app/utils/handlerApiError";
import api from "@/app/services/api/axios";
import { toUISender } from "@/app/utils/inbox/messageAdapters";
import {
  ApiAttachment,
  ApiMessage,
  InboxMessage,
  MessageAttachment,
  MessageListResponse,
  SendMessagePayload,
} from "@/app/types/message.types";

/*
 * Fetch Inbox Message
 */
export const fetchInboxMessages = async (
  inboxId: string,
  limit = 50,
): Promise<MessageListResponse> => {
  try {
    const res = await api.get<MessageListResponse>(
      `/inbox/${inboxId}/messages`,
      { params: { limit } },
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/*
 * Send Message API
 */
export const sendMessage = async ({
  conversationId,
  content,
  channel = "FACEBOOK",
}: SendMessagePayload): Promise<InboxMessage> => {
  try {
    const res = await api.post<{ success: boolean; data: ApiMessage }>(
      `/inbox/${conversationId}/messages`,
      { content, channel },
    );
    return adaptApiMessage(res.data.data);
  } catch (error) {
    throw handleApiError(error);
  }
};
/*
 * Adapt ApiMessage to InboxMessage
 */
export function adaptApiMessage(msg: ApiMessage): InboxMessage {
  return {
    id: msg.id,
    sender: toUISender(msg.senderType),
    senderName: msg.senderType,
    senderId: msg.sentBy ?? "",
    content: msg.content ?? "",
    timestamp: msg.sentAt,
    type: msg.type,
    status: msg.status,
    attachments: msg.attachments.map(adaptAttachment),
    replyTo: msg.parentId
      ? { id: msg.parentId, senderName: "", content: "" }
      : null,
  };
}

function adaptAttachment(raw: ApiAttachment): MessageAttachment {
  return {
    // API doesn't provide an id — derive a stable one from the URL
    id: raw.url,
    url: raw.url,
    name: raw.originalFilename || raw.filename,
    mimeType: raw.mimeType,
    size: raw.size,
  };
}
