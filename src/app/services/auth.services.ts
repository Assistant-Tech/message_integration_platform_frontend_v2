import api from "@/app/services/api/axios";
import { handleApiError } from "@/app/utils/handlerApiError";

/**
 * Service to handle all authentication-related API calls.
 */

/**
 * Fetches the current user's profile from the API.
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
 * Resets a user's password using a userId and token.
 */
export const resetPassword = async (
  userId: string,
  token: string,
  password: string,
  confirmPassword: string,
) => {
  try {
    const res = await api.post(
      `/auth/reset-password?userId=${userId}&token=${token}`,
      {
        token,
        password,
        confirmPassword,
      },
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Sends a forget password request to the API with the user's email.
 */
export const forgetPassword = async (email: string) => {
  try {
    const res = await api.post("/auth/forgot-password", { email });
    return res.data;
  } catch (error) {
    const parsedError = handleApiError(error);
    throw parsedError;
  }
};

/**
 * Handles the user signup API call.
 */
export const signup = async (name: string, email: string, password: string) => {
  try {
    const res = await api.post("/auth/signup", { name, email, password });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Handles the email verification API call.
 */
export const verifyEmail = async (token: string) => {
  try {
    const res = await api.get(`/auth/verify/${token}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Handles the onboarding API call with form data.
 */
export const onboarding = async (data: FormData) => {
  try {
    const res = await api.post("/auth/onboarding", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Handles the user login API call.
 */
export const login = async (email: string, password: string) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Handles the access token refresh API call.
 */
export const refreshAccessToken = async () => {
  try {
    const res = await api.get("/auth/refresh");
    const data = res.data.accessToken;
    console.log("🚀 ~ refreshAccessToken ~ data:", data);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Handles the user logout API call.
 */
export const logout = async () => {
  try {
    await api.post("/auth/logout", {});
  } catch (error) {
    const parsedError = handleApiError(error);
    console.error("Logout error:", parsedError);
    throw parsedError;
  }
};
/**
 * Handles the user resend email API call.
 */
export const resendEmailVerification = async (email: string) => {
  try {
    const res = await api.post("/auth/verify/resend", { email });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
