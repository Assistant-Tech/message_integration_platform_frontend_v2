// --- Tenant ---
export interface Tenant {
  id: string;
  slug: string;
  isOnboarded: boolean;
  /** Backend-owned flag. Flips to true on first onboarding completion, back
   *  to false when the frontend finishes/dismisses the walkthrough. */
  isWalkthroughRequired?: boolean;
  industry?: string;
  isTrialActive?: boolean;
  createdAt?: string;
}

// --- User ---
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  isVerified: boolean;

  tenantId: string;
  tenantStatus: "ACTIVE" | "INACTIVE" | string;
  requiresOnboarding: boolean;

  roleId: string;
  roleType: "TENANT_ADMIN" | "MEMBER" | string;

  userStatus: "ACTIVE" | "INACTIVE" | string;

  // Optional extras (not in API but useful if backend adds them later)
  firstName?: string;
  lastName?: string;
  preferences?: {
    theme?: string;
    notifications?: boolean;
  };

  tenant?: Tenant;
}

// --- Auth Responses ---
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
  message: string;
  success: true;
  data: {
    accessToken: string;
    accessTokenExpiresIn: number;
    csrfToken: string;
    requiresOnboarding: boolean;
    /** Backend flag: when true, show the first-time walkthrough after login.
     *  Authoritative source is `tenant.isWalkthroughRequired` (see
     *  `/tenant/details` / onboarding response), but the login response may
     *  also carry this mirrored value during rollout. */
    isWalkthroughRequired?: boolean;
    tenantSlug: string;
  };
  timestamp: string;
}

export interface MFARequiredResponse {
  message: string;
  success: true;
  data: {
    mfaRequired: true;
    mfaToken: string;
    methods: string[];
    expiresIn: number;
  };
  timestamp: string;
}

export type LoginResponse = LoginSuccessResponse | MFARequiredResponse;

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
