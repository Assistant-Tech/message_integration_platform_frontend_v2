import api from "@/app/services/api/axios";
import { handleApiError } from "../utils/handlerApiError";
import { InternalChannelPayloadType } from "../types/internal-channels.types";

// Fetch all the internal channels
export const getAllInternalChannels = async () => {
  try {
    const res = await api.get("/internal-channels");
    return res.data;
  } catch (error: any) {
    handleApiError(error) ||
      console.error("Internal channels api error ", error);
  }
};

// Fetch all the internal channels by ID
export const getAllInternalChannelsById = async (channelId: string) => {
  try {
    const res = await api.get(`/internal-channels/${channelId}/participants`);
    return res.data;
  } catch (error: any) {
    handleApiError(error) ||
      console.error("Internal channels api error ", error);
  }
};

// create an internal channel
export const createInternalChannel = async (
  payload: InternalChannelPayloadType,
) => {
  try {
    const res = await api.post("/internal-channels", payload);
    return res.data;
  } catch (error: any) {
    handleApiError(error) || console.error("create api response error", error);
  }
};
