import api from "@/app/services/api/axios";

// Fetch Stored Pages
export const fetchStoredPages = async () => {
  const res = await api.get("/meta/pages");
  return res.data;
};

// Connected META API Pages
export const connectMetaApiPage = async (selectionToken: string) => {
  const res = await api.post("/meta/pages", { selectionToken });
  return res.data;
};

// Fetch META OAUTH
export const fetchMetaOauth = async () => {
  const res = await api.get("/meta/oauth");
  return res.data;
};
