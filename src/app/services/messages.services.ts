import {
  ApiMessage,
  InboxMessage,
  MessageListResponse,
} from "@/app/types/inbox.types";
import { handleApiError } from "@/app/utils/handlerApiError";
import api from "@/app/services/api/axios";
import { toUISender } from "../components/common/Conversation/customer/customer-chat-panel/helpers";

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
 * Adapt ApiMessage to InboxMessage
 */
export function adaptApiMessage(msg: ApiMessage): InboxMessage {
  return {
    id: msg.id,
    sender: toUISender(msg.senderType),
    senderName: msg.sender?.name ?? "Customer",
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
