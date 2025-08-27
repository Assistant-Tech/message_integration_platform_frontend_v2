import { useCallback } from "react";
import type { NormalizedError } from "@/app/types/error.types";

interface Options {
  onValidation?: (
    fieldErrors: Record<string, string[]>,
    formErrors: string[],
  ) => void;
  onApiError?: (message: string, statusCode: number) => void;
  onNetworkError?: (message: string) => void;
  onUnknownError?: (message: string) => void;
}

export function useNormalizedErrorHandler() {
  return useCallback((error: NormalizedError, options: Options) => {
    switch (error.type) {
      case "validation":
        options.onValidation?.(error.fieldErrors, error.formErrors);
        break;
      case "api":
        options.onApiError?.(error.message, error.statusCode);
        break;
      case "network":
        options.onNetworkError?.(error.message);
        break;
      case "unknown":
        options.onUnknownError?.(error.message);
        break;
    }
  }, []);
}
