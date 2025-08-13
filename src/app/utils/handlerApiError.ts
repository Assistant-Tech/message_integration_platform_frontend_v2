import axios, { AxiosError } from "axios";
import type {
  NormalizedError,
  ValidationErrorResponse,
  ErrorResponse,
} from "../types/error.types";

//function to handle the api error
export function handleApiError(error: unknown): NormalizedError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    // Handle response errors from backend
    if (axiosError.response?.data) {
      const data = axiosError.response.data as
        | ValidationErrorResponse
        | ErrorResponse;

      if ("fieldErrors" in data) {
        return {
          type: "validation",
          fieldErrors: data.fieldErrors || {},
          formErrors: data.formErrors || [],
        };
      }

      if ("message" in data && "statusCode" in data) {
        return {
          type: "api",
          message: data.message,
          statusCode: data.statusCode,
        };
      }
    }

    // Network issue (no response)
    if (!axiosError.response) {
      return {
        type: "network",
        message: "Network error. Please check your connection.",
      };
    }
  }

  // Unknown error fallback
  return {
    type: "unknown",
    message: (error as Error)?.message || "An unexpected error occurred.",
  };
}
