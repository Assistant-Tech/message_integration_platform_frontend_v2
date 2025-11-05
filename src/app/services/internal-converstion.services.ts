import api from "./api/axios";
import {
  CreateInternalConversationPayload,
  GetAllInternalConversationsParams,
  GetInternalConversationsResponse,
  InternalConversationResponse,
  InternalConversationMembersResponse,
  AddConversationMembersPayload,
  AddConversationMembersResponse,
} from "@/app/types/internal-chat.types";

// ------------------------------------------
// 🔹 Get all internal conversations
// ------------------------------------------
export const getAllInternalConversations = async (
  params: GetAllInternalConversationsParams = {},
): Promise<GetInternalConversationsResponse> => {
  const { page = 1, limit = 20, includeDefault = true, search } = params;

  const query: Record<string, any> = { page, limit, includeDefault };

  if (search && search.trim().length > 0) {
    query.search = search.trim();
  }

  const { data } = await api.get<GetInternalConversationsResponse>(
    "/internal-conversations",
    { params: query },
  );

  return data;
};

// ------------------------------------------
// 🔹 Create a new internal conversation
// ------------------------------------------
export const createInternalConversation = async (
  payload: CreateInternalConversationPayload,
): Promise<InternalConversationResponse> => {
  const { data } = await api.post<InternalConversationResponse>(
    "/internal-conversations",
    payload,
  );
  return data;
};

// ------------------------------------------
// 🔹 Get conversation by ID
// ------------------------------------------
export const getInternalConversationById = async (
  conversationId: string,
): Promise<InternalConversationResponse> => {
  const { data } = await api.get<InternalConversationResponse>(
    `/internal-conversations/${conversationId}`,
  );
  return data;
};

// ------------------------------------------
// 🔹 Get members of a conversation
// ------------------------------------------
export const getInternalConversationMembers = async (
  conversationId: string,
): Promise<InternalConversationMembersResponse> => {
  const { data } = await api.get<InternalConversationMembersResponse>(
    `/internal-conversations/${conversationId}/members`,
  );
  return data;
};

// ------------------------------------------
// 🔹 Add members to a conversation
// ------------------------------------------
export const addInternalConversationMembers = async (
  conversationId: string,
  payload: AddConversationMembersPayload,
): Promise<AddConversationMembersResponse> => {
  const { data } = await api.post<AddConversationMembersResponse>(
    `/internal-conversations/${conversationId}/members`,
    payload,
  );
  return data;
};

// ------------------------------------------
// 🔹 Update conversation by ID
// ------------------------------------------
export const updateInternalConversationById = async (
  conversationId: string,
  payload: {
    title: string;
    priority: string;
  },
): Promise<InternalConversationResponse> => {
  const { data } = await api.put<InternalConversationResponse>(
    `/internal-conversations/${conversationId}`,
    payload,
  );
  return data;
};

// ------------------------------------------
// 🔹 Delete conversation by Conversation - ID --> YOO baki chha to add types of the deletion
// ------------------------------------------
export const removeInternalConversationById = async (
  conversationId: string,
): Promise<any> => {
  const { data } = await api.delete<any>(
    `/internal-conversations/${conversationId}`,
  );
  return data;
};
