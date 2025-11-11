import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllInternalConversations,
  getInternalConversationById,
  createInternalConversation,
  updateInternalConversationById,
  removeInternalConversationById,
  addInternalConversationMembers,
  getInternalConversationMembers,
  removeMemberById,
} from "@/app/services/internal-converstion.services";
import type {
  GetAllInternalConversationsParams,
  CreateInternalConversationPayload,
  AddConversationMembersPayload,
  InternalConversationResponse,
  InternalConversationMembersResponse,
  GetInternalConversationsResponse,
} from "@/app/types/internal-conversation.types";

// 🔹 Get all conversations
export const useInternalConversations = (
  params?: GetAllInternalConversationsParams,
) => {
  return useQuery<GetInternalConversationsResponse>({
    queryKey: ["internalConversations", params],
    queryFn: () => getAllInternalConversations(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// 🔹 Get single conversation by ID
export const useInternalConversationById = (
  conversationId: string,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  },
) => {
  return useQuery<InternalConversationResponse>({
    queryKey: ["internalConversation", conversationId],
    queryFn: () => getInternalConversationById(conversationId!),
    enabled: options?.enabled ?? !!conversationId,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
    gcTime: options?.gcTime ?? 10 * 60 * 1000,
  });
};

// 🔹 Create new conversation
export const useCreateInternalConversation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    InternalConversationResponse,
    Error,
    CreateInternalConversationPayload
  >({
    mutationFn: (payload) => createInternalConversation(payload),
    onSuccess: (data) => {
      queryClient.setQueryData<GetInternalConversationsResponse>(
        ["internalConversations"],
        (old) => {
          if (!old) return old;

          const newConversation = data.data || data;

          return {
            ...old,
            data: Array.isArray(old.data)
              ? { ...old.data, data: [newConversation, ...old.data] }
              : old.data,
          };
        },
      );

      queryClient.invalidateQueries({ queryKey: ["internalConversations"] });
    },
  });
};

// 🔹 Update existing conversation
export const useUpdateInternalConversation = (conversationId: string) => {
  const queryClient = useQueryClient();
  return useMutation<
    InternalConversationResponse,
    Error,
    { title: string; priority: string }
  >({
    mutationFn: (payload) =>
      updateInternalConversationById(conversationId, payload),
    onSuccess: (data) => {
      const updatedConversation = data.data || data;

      queryClient.setQueryData(["internalConversation", conversationId], data);

      queryClient.setQueryData<GetInternalConversationsResponse>(
        ["internalConversations"],
        (old) => {
          if (!old || !old.data) return old;

          return {
            ...old,
            data: {
              ...old.data,
              data: old.data.map((conv: any) =>
                conv._id === conversationId ? updatedConversation : conv,
              ),
            },
          };
        },
      );
      queryClient.invalidateQueries({
        queryKey: ["internalConversations"],
      });
    },
  });
};

// 🔹 Delete conversation
export const useDeleteInternalConversation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationFn: (conversationId) =>
      removeInternalConversationById(conversationId),
    onSuccess: (_, conversationId) => {
      queryClient.removeQueries({
        queryKey: ["internalConversation", conversationId],
      });
      queryClient.setQueryData<GetInternalConversationsResponse>(
        ["internalConversations"],
        (old) => {
          if (!old || !old.data) return old;

          return {
            ...old,
            data: {
              ...old.data,
              data: old.data.filter((conv) => conv._id !== conversationId),
            },
          };
        },
      );

      queryClient.invalidateQueries({ queryKey: ["internalConversations"] });
    },
  });
};
export const useAddConversationMembers = (conversationId: string) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, AddConversationMembersPayload>({
    mutationFn: (payload) =>
      addInternalConversationMembers(conversationId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["internalConversationMembers", conversationId],
      });
      queryClient.invalidateQueries({
        queryKey: ["internalConversation", conversationId],
      });
    },
  });
};

// 🔹 Remove a member
export const useRemoveConversationMember = (conversationId: string) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationFn: (userId) => removeMemberById(conversationId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["internalConversationMembers", conversationId],
      });
      queryClient.invalidateQueries({
        queryKey: ["internalConversation", conversationId],
      });
    },
  });
};

// 🔹 Get conversation members
export const useInternalConversationMembers = (
  conversationId: string,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  },
) => {
  return useQuery<InternalConversationMembersResponse>({
    queryKey: ["internalConversationMembers", conversationId],
    queryFn: () => getInternalConversationMembers(conversationId!),
    enabled: options?.enabled ?? !!conversationId,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
    gcTime: options?.gcTime ?? 10 * 60 * 1000,
  });
};
