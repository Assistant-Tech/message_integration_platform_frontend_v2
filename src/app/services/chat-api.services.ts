import {
  GetAllInternalConversationsParams,
  GetInternalConversationsResponse,
} from "@/app/types/internal-chat.types";
import api from "./api/axios";

export const getAllInternalConversations = async (
  params: GetAllInternalConversationsParams = {},
): Promise<GetInternalConversationsResponse> => {
  const { data } = await api.get<GetInternalConversationsResponse>(
    "/internal-chat/conversations",
    {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        includeDefault: params.includeDefault ?? true,
      },
    },
  );
  return data;
};

export const createInternalConversation = async (payload: {
  title: string;
  type: boolean;
  status?: string;
  priority?: string;
}): Promise<any> => {
  const res = await api.post<any>("/internal-conversations", payload);
  return res.data;
};
