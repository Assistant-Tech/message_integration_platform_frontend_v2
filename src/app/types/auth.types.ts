// --- Type Definitions ---
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  isVerified: boolean;
  preferences: {
    theme: string;
    notifications: boolean;
  };
}

export interface SignupSuccessResponse {
  success: boolean;
  data?: {
    user: User;
    requiresOnboarding?: boolean;
    message?: string;
  };
  timestamp: string;
}

export interface LoginSuccessResponse {
  accessToken: string;
  success: boolean;
  message: string;
  requiresOnboarding: boolean;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

export interface OnboardingField {
  key: string;
  value: string | File[];
  type: "text" | "file";
}
