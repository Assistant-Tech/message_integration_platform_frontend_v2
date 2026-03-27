import { ChannelApiResponse } from "../types/channel.types";
import api from "@/app/services/api/axios";

// Used for fetching all channels from the API
export const getChannels = async (): Promise<ChannelApiResponse[]> => {
  const response = await api.get("channels");
  return response.data;
};
