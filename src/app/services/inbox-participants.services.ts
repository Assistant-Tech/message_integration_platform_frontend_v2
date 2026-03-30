import { handleApiError } from "@/app/utils/handlerApiError";
import api from "@/app/services/api/axios";

export const addParticipant = async (
  inboxId: string,
  participantId: string,
) => {
  try {
    const res = await api.post(`/api/inbox/${inboxId}/participants`, {
      participantId,
    });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
