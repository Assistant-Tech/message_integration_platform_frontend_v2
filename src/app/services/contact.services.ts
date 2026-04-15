import api from "@/app/services/api/axios";
import { handleApiError } from "@/app/utils/handlerApiError";
import type {
  Contact,
  ContactChannelIdentity,
  ContactListParams,
  CreateContactPayload,
  UpdateContactPayload,
  MergeContactPayload,
} from "@/app/types/contact.types";

export const fetchContacts = async (params: ContactListParams = {}) => {
  try {
    const res = await api.get("/contacts", { params });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchContactById = async (id: string) => {
  try {
    const res = await api.get<{ data: Contact }>(`/contacts/${id}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createContact = async (payload: CreateContactPayload) => {
  try {
    const res = await api.post<{ data: Contact }>("/contacts", payload);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateContact = async (id: string, payload: UpdateContactPayload) => {
  try {
    const res = await api.patch<{ data: Contact }>(`/contacts/${id}`, payload);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteContact = async (id: string) => {
  try {
    const res = await api.delete(`/contacts/${id}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchContactChannelIdentities = async (id: string) => {
  try {
    const res = await api.get<{ data: ContactChannelIdentity[] }>(`/contacts/${id}/channel-identities`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const mergeContacts = async (targetId: string, payload: MergeContactPayload) => {
  try {
    const res = await api.post<{ data: Contact }>(`/contacts/${targetId}/merge`, payload);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
