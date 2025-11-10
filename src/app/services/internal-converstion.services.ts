import api from "@/app/services/api/axios";
import {
  CreateInternalConversationPayload,
  GetAllInternalConversationsParams,
  GetInternalConversationsResponse,
  InternalConversationResponse,
  InternalConversationMembersResponse,
  AddConversationMembersPayload,
  SearchParamstypes,
} from "@/app/types/internal-conversation.types";
import { handleApiError } from "@/app/utils/handlerApiError";

// ------------------------------------------
// 🔹 Get all internal conversations --> Yesma Type issue cha  fix garne pachi when implemented in the component
// ------------------------------------------
export const getAllInternalConversations = async (
  params: GetAllInternalConversationsParams = {},
): Promise<GetInternalConversationsResponse> => {
  const { page = 1, limit = 20, includeDefault = true, search } = params;

  const query: Record<string, any> = { page, limit, includeDefault };

  if (search && search.trim().length > 0) {
    query.search = search.trim();
  }

  const res = await api.get<GetInternalConversationsResponse>(
    "/internal-conversations?page=1&limit=20&includeDefault=true"
  );
  console.log("🚀 ~ getAllInternalConversations ~ res:", res)

  return res.data;
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

// -------------------------------------------------------
// 🔹 Get conversation by ID or also conversation details
// -------------------------------------------------------
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
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const addInternalConversationMembers = async (
  conversationId: string,
  payload: AddConversationMembersPayload,
) => {
  const invalid = payload.participants.filter((p) => !UUID_REGEX.test(p));
  if (invalid.length > 0) {
    throw new Error(`Invalid UUID(s): ${invalid.join(", ")}`);
  }

  const { data } = await api.post(
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
// 🔹 Remove a memeber via userId into specific channels
// ------------------------------------------
export const removeMemberById = async (
  conversationId: string,
  userId: string,
) => {
  const { data } = await api.delete(
    `/internal-conversations/${conversationId}/members/${userId}`,
  );
  return data;
};

// ------------------------------------------
// 🔹 Delete conversation by Conversation - ID --> YOO baki chha to add types of the deletion
// ------------------------------------------
export const removeInternalConversationById = async (
  conversationId: string,
) => {
  const { data } = await api.delete<any>(
    `/internal-conversations/${conversationId}`,
  );
  return data;
};

// ------------------------------------------
// 🔹 Search Conversation in internal-conversation
// ------------------------------------------
export const searchBetweenInternalConversation = async (
  params: SearchParamstypes,
) => {
  try {
    const { search, includeDefault } = params;
    const res = await api.get(
      `/internal-conversations?search=${search}&includeDefault=${includeDefault}`,
    );
    return res.data;
  } catch (error: any) {
    handleApiError(error) ||
      console.error("Search Filter api not working", error);
  }
};
