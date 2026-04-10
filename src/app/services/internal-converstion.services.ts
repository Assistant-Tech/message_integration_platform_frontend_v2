/**
 * Internal Conversation Services
 *
 * Note: filename kept as "converstion" (typo) to match existing imports.
 * TODO: rename to "internal-conversation.services.ts" and update imports.
 */

import api from "@/app/services/api/axios";
import { handleApiError } from "@/app/utils/handlerApiError";
import type {
  GetAllInternalConversationsParams,
  CreateInternalConversationPayload,
  AddConversationMembersPayload,
} from "@/app/types/internal-conversation.types";

const BASE = "/internal-conversations";

export const getAllInternalConversations = async (
  params?: GetAllInternalConversationsParams,
) => {
  try {
    const res = await api.get(BASE, { params });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getInternalConversationById = async (id: string) => {
  try {
    const res = await api.get(`${BASE}/${id}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createInternalConversation = async (
  payload: CreateInternalConversationPayload,
) => {
  try {
    const res = await api.post(BASE, payload);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateInternalConversationById = async (
  id: string,
  payload: { title: string; priority: string },
) => {
  try {
    const res = await api.patch(`${BASE}/${id}`, payload);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const removeInternalConversationById = async (id: string) => {
  try {
    const res = await api.delete(`${BASE}/${id}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const addInternalConversationMembers = async (
  conversationId: string,
  payload: AddConversationMembersPayload,
) => {
  try {
    const res = await api.post(`${BASE}/${conversationId}/members`, payload);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getInternalConversationMembers = async (
  conversationId: string,
) => {
  try {
    const res = await api.get(`${BASE}/${conversationId}/members`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const removeMemberById = async (
  conversationId: string,
  userId: string,
) => {
  try {
    const res = await api.delete(
      `${BASE}/${conversationId}/members/${userId}`,
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
