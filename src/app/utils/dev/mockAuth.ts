import type { User } from "@/app/types/auth.types";

const truthyEnvValues = ["true", "1", "yes", "on"];

const isTruthyFlag = (value: unknown): boolean => {
  return truthyEnvValues.includes(
    String(value ?? "")
      .trim()
      .toLowerCase(),
  );
};

const hasPersistedMockSession = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const rawValue = window.localStorage.getItem("auth-store");
    if (!rawValue) {
      return false;
    }

    const parsedValue = JSON.parse(rawValue);
    const persistedAccessToken = parsedValue?.state?.accessToken;

    return typeof persistedAccessToken === "string"
      ? persistedAccessToken.startsWith("dev-access-token")
      : false;
  } catch {
    return false;
  }
};

// Mock user data
export const createMockUser = (overrides?: Partial<User>): User => {
  const tenantSlug = import.meta.env.VITE_DEV_TENANT_SLUG || "demo-company";
  const userRole = import.meta.env.VITE_DEV_USER_ROLE || "TENANT_ADMIN";

  return {
    id: "dev-user-123",
    name: "John Doe (Dev)",
    email: "dev@example.com",
    avatar: null,
    isVerified: true,
    tenantId: "dev-tenant-123",
    tenantStatus: "ACTIVE",
    requiresOnboarding: false,
    roleId: "dev-role-123",
    roleType: userRole,
    userStatus: "ACTIVE",
    firstName: "John",
    lastName: "Doe",
    preferences: {
      theme: "light",
      notifications: true,
    },
    tenant: {
      id: "dev-tenant-123",
      slug: tenantSlug,
      isOnboarded: true,
      industry: "Technology",
      createdAt: new Date().toISOString(),
    },
    ...overrides,
  };
};

// Mock auth tokens
export const createMockAuthState = () => ({
  accessToken: "dev-access-token",
  csrfToken: "dev-csrf-token",
  tenantSlug: import.meta.env.VITE_DEV_TENANT_SLUG || "demo-company",
  isAuthenticated: true,
  requiresOnboarding: false,
  tokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
});

// Enable / Disable auth bypass
export const isAuthBypassEnabled = (): boolean => {
  return (
    isTruthyFlag(import.meta.env.VITE_AUTH_BYPASS) ||
    isTruthyFlag(import.meta.env.VITE_BYPASS_AUTH) ||
    isTruthyFlag(import.meta.env.VITE_MOCK_AUTH) ||
    hasPersistedMockSession()
  );
};
