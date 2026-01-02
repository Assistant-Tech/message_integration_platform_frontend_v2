import type { User, Tenant } from "../../src/app/types/auth.types";

/**
 * Mock user profile datasets for testing
 */

// Base tenant data
export const mockTenants = {
  active: {
    id: "tenant-123",
    slug: "chatblix",
    isOnboarded: true,
    industry: "Technology",
    createdAt: "2024-01-15T10:00:00Z",
  } as Tenant,

  inactive: {
    id: "tenant-456",
    slug: "inactive-company",
    isOnboarded: true,
    industry: "Finance",
    createdAt: "2023-06-20T08:30:00Z",
  } as Tenant,

  notOnboarded: {
    id: "tenant-789",
    slug: "new-company",
    isOnboarded: false,
    industry: undefined,
    createdAt: "2024-12-01T12:00:00Z",
  } as Tenant,

  enterprise: {
    id: "tenant-999",
    slug: "enterprise-corp",
    isOnboarded: true,
    industry: "Enterprise Solutions",
    createdAt: "2022-03-10T09:15:00Z",
  } as Tenant,
};

// Complete user profiles with various states
export const mockUsers = {
  // Admin user - fully verified and onboarded
  admin: {
    id: "user-123",
    name: "John Admin",
    email: "admin@chatblix.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    isVerified: true,
    tenantId: mockTenants.active.id,
    tenantStatus: "ACTIVE",
    requiresOnboarding: false,
    roleId: "role-admin-001",
    roleType: "TENANT_ADMIN",
    userStatus: "ACTIVE",
    firstName: "John",
    lastName: "Admin",
    preferences: {
      theme: "light",
      notifications: true,
    },
    tenant: mockTenants.active,
  } as User,

  // Regular member user
  member: {
    id: "user-456",
    name: "Jane Member",
    email: "jane.member@chatblix.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    isVerified: true,
    tenantId: mockTenants.active.id,
    tenantStatus: "ACTIVE",
    requiresOnboarding: false,
    roleId: "role-member-001",
    roleType: "MEMBER",
    userStatus: "ACTIVE",
    firstName: "Jane",
    lastName: "Member",
    preferences: {
      theme: "dark",
      notifications: true,
    },
    tenant: mockTenants.active,
  } as User,

  // Unverified user
  unverified: {
    id: "user-789",
    name: "Bob Unverified",
    email: "bob.unverified@example.com",
    avatar: null,
    isVerified: false,
    tenantId: mockTenants.active.id,
    tenantStatus: "ACTIVE",
    requiresOnboarding: true,
    roleId: "role-member-002",
    roleType: "MEMBER",
    userStatus: "INACTIVE",
    firstName: "Bob",
    lastName: "Unverified",
    tenant: mockTenants.active,
  } as User,

  // User requiring onboarding
  requiresOnboarding: {
    id: "user-101",
    name: "Alice Newcomer",
    email: "alice.newcomer@chatblix.com",
    avatar: null,
    isVerified: true,
    tenantId: mockTenants.notOnboarded.id,
    tenantStatus: "ACTIVE",
    requiresOnboarding: true,
    roleId: "role-admin-002",
    roleType: "TENANT_ADMIN",
    userStatus: "ACTIVE",
    firstName: "Alice",
    lastName: "Newcomer",
    tenant: mockTenants.notOnboarded,
  } as User,

  // Inactive tenant user
  inactiveTenant: {
    id: "user-202",
    name: "Charlie Inactive",
    email: "charlie@inactive-company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=charlie",
    isVerified: true,
    tenantId: mockTenants.inactive.id,
    tenantStatus: "INACTIVE",
    requiresOnboarding: false,
    roleId: "role-admin-003",
    roleType: "TENANT_ADMIN",
    userStatus: "ACTIVE",
    firstName: "Charlie",
    lastName: "Inactive",
    tenant: mockTenants.inactive,
  } as User,

  // Enterprise user with minimal data
  enterpriseUser: {
    id: "user-303",
    name: "Enterprise User",
    email: "enterprise@enterprise-corp.com",
    avatar: null,
    isVerified: true,
    tenantId: mockTenants.enterprise.id,
    tenantStatus: "ACTIVE",
    requiresOnboarding: false,
    roleId: "role-admin-004",
    roleType: "TENANT_ADMIN",
    userStatus: "ACTIVE",
    tenant: mockTenants.enterprise,
  } as User,

  // User without optional fields
  minimal: {
    id: "user-404",
    name: "Minimal User",
    email: "minimal@example.com",
    avatar: null,
    isVerified: false,
    tenantId: mockTenants.active.id,
    tenantStatus: "ACTIVE",
    requiresOnboarding: true,
    roleId: "role-member-003",
    roleType: "MEMBER",
    userStatus: "INACTIVE",
    tenant: mockTenants.active,
  } as User,

  // User with no tenant (edge case)
  noTenant: {
    id: "user-505",
    name: "No Tenant User",
    email: "notenant@example.com",
    avatar: null,
    isVerified: true,
    tenantId: "",
    tenantStatus: "INACTIVE",
    requiresOnboarding: false,
    roleId: "role-member-004",
    roleType: "MEMBER",
    userStatus: "ACTIVE",
  } as User,
};

/**
 * Helper function to create API response format for user profile
 */
export function createUserProfileResponse(
  user: User,
  wrapped: boolean = true,
) {
  if (wrapped) {
    return {
      success: true,
      data: user,
      timestamp: new Date().toISOString(),
    };
  }
  return user;
}

/**
 * Helper function to create error response format
 */
export function createErrorResponse(
  statusCode: number,
  message: string,
  fieldErrors?: Record<string, string[]>,
) {
  if (fieldErrors) {
    return {
      success: false,
      message,
      statusCode,
      fieldErrors,
      formErrors: [],
    };
  }
  return {
    success: false,
    message,
    statusCode,
  };
}

/**
 * Get mock user by key
 */
export function getMockUser(key: keyof typeof mockUsers): User {
  return mockUsers[key];
}

/**
 * Get mock tenant by key
 */
export function getMockTenant(key: keyof typeof mockTenants): Tenant {
  return mockTenants[key];
}

