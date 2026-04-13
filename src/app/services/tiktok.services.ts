import api from "@/app/services/api/axios";

export const fetchTikTokOauth = async () => {
  const res = await api.get("/tiktok/oauth");
  return res.data;
};

export const fetchTikTokChannels = async () => {
  const res = await api.get("/tiktok/channels");
  return res.data;
};
