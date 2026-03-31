import {
  CreateInboxBody,
  InboxDetailResponse,
  InboxListResponse,
  UpdateConversationBody,
} from "@/app/types/inbox.types";
import { handleApiError } from "@/app/utils/handlerApiError";
import api from "@/app/services/api/axios";

/*
 * GET All Inboxes
 */
export const fetchInboxes = async (): Promise<InboxListResponse> => {
  try {
    const res = await api.get<InboxListResponse>("/inbox");
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
