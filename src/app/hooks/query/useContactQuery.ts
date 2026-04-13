import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/app/constants/queryKeys";
import {
  fetchContacts,
  fetchContactById,
  fetchContactChannelIdentities,
} from "@/app/services/contact.services";
import type { ContactListParams } from "@/app/types/contact.types";

export const useContactsQuery = (params?: ContactListParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.CONTACTS(params),
    queryFn: () => fetchContacts(params),
    staleTime: 30_000,
  });
};

export const useContactByIdQuery = (id: string | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.CONTACT_BY_ID(id ?? ""),
    queryFn: () => fetchContactById(id!),
    enabled: !!id,
    staleTime: 60_000,
  });
};

export const useContactChannelIdentitiesQuery = (id: string | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.CONTACT_CHANNEL_IDENTITIES(id ?? ""),
    queryFn: () => fetchContactChannelIdentities(id!),
    enabled: !!id,
    staleTime: 60_000,
  });
};
