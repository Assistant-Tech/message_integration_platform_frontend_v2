import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createContact,
  updateContact,
  deleteContact,
} from "@/app/services/contact.services";
import type {
  CreateContactPayload,
  UpdateContactPayload,
} from "@/app/types/contact.types";

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateContactPayload) => createContact(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateContactPayload }) =>
      updateContact(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};
