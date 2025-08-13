import api from "@/app/services/api/axios";
import { handleApiError } from "@/app/utils/handlerApiError";

/**
 * FETCH CURRENT USER.
 */
export const fetchCurrentUser = async () => {
  try {
    const response = await api.get("/user/profile");
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * RESET PASSWORD.
 */
export const resetPassword = async (
  token: string,
  password: string,
  confirmPassword: string,
) => {
  try {
    const res =  await api.post(`/auth/reset-password/${token}`, {
      token,
      password,
      confirmPassword,
    });

    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * FORGET PASSWORD.
 */
export const ForgetPassword = async (email: string) => {
  try {
    const res = await api.post("/auth/forgot-password", { email });
    return res.data;
  } catch (error) {
    const parsedError = handleApiError(error);
    throw parsedError;
  }
};
