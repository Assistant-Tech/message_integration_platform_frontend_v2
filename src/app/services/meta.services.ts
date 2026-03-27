import api from "@/app/services/api/axios";

// Fetch Stored Pages
export const fetchStoredPages = async () => {
  const res = await api.get("/meta/pages");
  return res.data;
};

// Connected META API Pages
export const connectMetaApiPage = async (selectedToken: string) => {
  const res = await api.post("/meta/pages", { selectedToken });
  return res.data;
};

// Fetch META OAUTH
export const fetchMetaOauth = async () => {
  const res = await api.get("/meta/oauth");
  return res.data;
};
