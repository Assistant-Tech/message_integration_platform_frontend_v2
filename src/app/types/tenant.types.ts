export interface Session {
  sessionId: string;
  device: string;
  browser: string;
  ip: string;
  location: string | null;
  lastUsedAt: string;
  isActive: boolean;
}

export interface MemberLoginActivity {
  userId: string;
  memberId: string;
  email: string;
  name: string;
  lastLoginAt: string;
  status: "ONLINE" | "OFFLINE";
  activeSecondsToday: number;
  sessions: Session[];
}

export interface LoginActivityMeta {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface LoginActivityResponse {
  message: string;
  data: MemberLoginActivity[];
  meta: LoginActivityMeta;
  success: boolean;
  timestamp: string;
}

export interface InviteMemberPayload {
  email: string;
  role?: string;
}

export interface InviteMemberResponse {
  message: string;
  success: boolean;
  timestamp: string;
}

export interface tenantUsers {
  id: number;
  email: string;
  name: string;
  status: "ONLINE" | "OFFLINE";
  joinedAt: string;
}

/**
 * Interface representing the core User details.
 */
interface User {
  id: string;
  email: string;
  name: string;
  status: "ONLINE" | "OFFLINE" | string; // Use a union type if known, otherwise string
  joinedAt: string; // ISO 8601 string
}

/**
 * Interface representing the Role details assigned to the user.
 */
interface Role {
  id: string;
  name: string;
  type: "TENANT_ADMIN" | "STANDARD_USER" | string; // Use a union type if known
  description: string;
}

/**
 * Interface representing a single Tenant User entry, which combines the user and role.
 */
interface TenantUserData {
  user: User;
  role: Role;
}

/**
 * The root interface for the entire API response payload.
 */
export interface TenantUserResponse {
  message: string;
  data: TenantUserData[];
  success: boolean;
  timestamp: string;
}
export interface TenantRole {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface TenantCreateResponse {
  message: string;
  data: TenantRole;
  success: boolean;
  timestamp: string;
}

/**
 * Payload for creating a tenant role.
 */
export interface CreateTenantRolePayload {
  name: string;
  description: string;
  permissions: string[];
}

export interface UpdateTenantRolePayload {
  name?: string;
  description?: string;
  permissions?: string[];
  addPermissions?: string[];
  removePermissions?: string[];
}

export interface AssignRoleResponse {
  message: string;
  data?: {
    memberId: string;
    roleId: string;
    roleName: string;
  };
}

export interface AssignRolePayload {
  roleId: string;
}

export interface TenantRolesResponse {
  data: TenantRole[];
  message?: string;
}
