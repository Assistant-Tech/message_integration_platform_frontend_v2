import { handleApiError } from "@/app/utils/handlerApiError";
import api from "@/app/services/api/axios";
import { toUISender } from "@/app/components/common/Conversation/panel/helpers";
import {
  ApiMessage,
  InboxMessage,
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
    senderId: msg.sentBy as string,
    content: msg.content,
    timestamp: msg.sentAt,
    type: msg.type,
    status: msg.status,
    attachments: msg.attachments,
    replyTo: msg.parentId
      ? { id: msg.parentId, senderName: "", content: "" }
      : null,
  };
}
