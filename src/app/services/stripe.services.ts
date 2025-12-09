import api from "@/app/services/api/axios";

export const saveStripeKeys = async ({ provider, type, secret }: any) => {
  const response = await api.post("/tenant/integrations", {
    provider,
    type,
    secret,
  });
  return response.data;
};

export const getStripePaymentLink = async (orderId: string) => {
  const response = await api.get(`/tenant/integrations/stripe/payment-link`, {
    params: { order_id: orderId },
  });
  return response.data;
};

export const fetchStripeIntegrationStatus = async () => {
  const response = await api.get(`/tenant/integrations/stripe/status`);
  return response.data;
};

export const checkStripeConfiguration = async () => {
  const res = await api.get("/tenant/integrations");

  const integrations = res.data.data;

  const apiKey = integrations.find((i: any) => i.type === "api key");
  const webhook = integrations.find((i: any) => i.type === "webhook secret");

  const isConfigured = !!(apiKey && webhook);

  return { success: true, data: { isConfigured } };
};
