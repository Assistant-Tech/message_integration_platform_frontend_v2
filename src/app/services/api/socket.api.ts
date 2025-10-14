import api from "@/app/services/api/axios";

export const triggerCron = async () => {
  try {
    const response = await api.get("/subscription/trigger/cron");
    console.log("🚀 ~ triggerCron ~ response data:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "❌ Error triggering cron:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
