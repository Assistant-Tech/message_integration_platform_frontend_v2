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

// --- Type Definitions ---
export interface Tenant {
  id: string;
  slug: string;
  isOnboarded: boolean;
  industry?: string;
  createdAt?: string;
}

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
  tenant?: Tenant;
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
  accessTokenExpiresIn: number;
  csrfToken: string;
  requiresOnboarding: boolean;
  success: boolean;
  message: string;
  timestamp: string;
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
