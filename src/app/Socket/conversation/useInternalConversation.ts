import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllInternalConversations,
  getInternalConversationById,
  createInternalConversation,
  updateInternalConversationById,
  removeInternalConversationById,
  addInternalConversationMembers,
  removeMemeberById,
  getInternalConversationMembers,
} from "@/app/services/internal-converstion.services";

import type {
  GetAllInternalConversationsParams,
  CreateInternalConversationPayload,
  AddConversationMembersPayload,
} from "@/app/types/internal-conversation.types";

// 🔹 Get all conversations
export const useInternalConversations = (
  params?: GetAllInternalConversationsParams,
) => {
  return useQuery({
    queryKey: ["internalConversations", params],
    queryFn: () => getAllInternalConversations(params),
    select: (response) => response.data,
  });
};

// 🔹 Get single conversation by ID
export const useInternalConversationById = (conversationId: string) => {
  return useQuery({
    queryKey: ["internalConversation", conversationId],
    queryFn: () => getInternalConversationById(conversationId!),
    enabled: !!conversationId,
  });
};

// 🔹 Create new conversation
export const useCreateInternalConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateInternalConversationPayload) =>
      createInternalConversation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internalConversations"] });
    },
  });
};

// 🔹 Update existing conversation
export const useUpdateInternalConversation = (conversationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { title: string; priority: string }) =>
      updateInternalConversationById(conversationId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["internalConversation", conversationId],
      });
    },
  });
};

// 🔹 Delete conversation
export const useDeleteInternalConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: string) =>
      removeInternalConversationById(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internalConversations"] });
    },
  });
};

export const useAddConversationMembers = (conversationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddConversationMembersPayload) =>
      addInternalConversationMembers(conversationId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["internalConversationMembers", conversationId],
      });
    },
  });
};

// 🔹 Remove a member
export const useRemoveConversationMember = (conversationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => removeMemeberById(conversationId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["internalConversationMembers", conversationId],
      });
    },
  });
};

// 🔹 Get conversation members
export const useInternalConversationMembers = (conversationId: string) => {
  return useQuery({
    queryKey: ["internalConversationMembers", conversationId],
    queryFn: () => getInternalConversationMembers(conversationId!),
    enabled: !!conversationId,
  });
};
