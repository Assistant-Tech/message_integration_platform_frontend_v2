export type NormalizedError =
  | {
      type: "validation";
      fieldErrors: Record<string, string[]>;
      formErrors: string[];
      message?: string;
    }
  | {
      type: "api";
      message: string;
      statusCode: number;
    }
  | {
      type: "network";
      message: string;
    }
  | {
      type: "unknown";
      message: string;
    };

export interface ValidationErrorResponse {
  formErrors: string[];
  fieldErrors: {
    [field: string]: string[];
  };
}

export interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}
